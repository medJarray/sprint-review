import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attachment, AttachmentDocument } from './schemas/attachment.schema';
import { MinioService } from '../minio/minio.service';
import { UploadAttachmentDto } from './dto/attachment.dto';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';
import * as path from 'path';

@Injectable()
export class AttachmentsService {
  private readonly logger = new Logger(AttachmentsService.name);

  constructor(
    @InjectModel(Attachment.name) private readonly attachmentModel: Model<AttachmentDocument>,
    private readonly minioService: MinioService,
  ) {}

  /**
   * Upload un fichier dans MinIO et enregistre les métadonnées en base
   */
  async upload(
    file: Express.Multer.File,
    dto: UploadAttachmentDto,
  ): Promise<AttachmentDocument> {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    const objectKey = `${dto.sprintId}/${dto.category || 'general'}/${uniqueName}`;

    // Upload dans MinIO
    await this.minioService.uploadFile(objectKey, file.buffer, file.size, file.mimetype);

    // Enregistrement en base
    const attachment = new this.attachmentModel({
      sprintId: dto.sprintId,
      originalName: file.originalname,
      fileName: uniqueName,
      mimeType: file.mimetype,
      size: file.size,
      objectKey,
      bucket: this.minioService.getBucketName(),
      category: dto.category || 'general',
      description: dto.description,
      uploadedBy: dto.uploadedBy,
    });

    const saved = await attachment.save();
    this.logger.log(`📎 Pièce jointe "${file.originalname}" enregistrée (sprint: ${dto.sprintId})`);
    return saved;
  }

  /**
   * Liste toutes les pièces jointes d'un sprint (avec URL pré-signée)
   */
  async findBySprintId(sprintId: string, category?: string): Promise<any[]> {
    const filter: any = { sprintId };
    if (category) filter.category = category;

    const attachments = await this.attachmentModel
      .find(filter)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Ajouter une URL pré-signée à chaque pièce jointe
    return Promise.all(
      attachments.map(async (att) => ({
        ...att,
        downloadUrl: await this.minioService.getPresignedUrl(att.objectKey, 3600), // 1h
      })),
    );
  }

  /**
   * Récupère une pièce jointe par son ID (avec URL pré-signée)
   */
  async findById(id: string): Promise<any> {
    const attachment = await this.attachmentModel.findById(id).lean().exec();
    if (!attachment) {
      throw new NotFoundException(`Pièce jointe "${id}" introuvable`);
    }

    return {
      ...attachment,
      downloadUrl: await this.minioService.getPresignedUrl(attachment.objectKey, 3600),
    };
  }

  /**
   * Télécharge le contenu du fichier depuis MinIO
   */
  async download(id: string): Promise<{ stream: Readable; attachment: AttachmentDocument }> {
    const attachment = await this.attachmentModel.findById(id).exec();
    if (!attachment) {
      throw new NotFoundException(`Pièce jointe "${id}" introuvable`);
    }

    const stream = await this.minioService.downloadFile(attachment.objectKey);
    return { stream, attachment };
  }

  /**
   * Supprime une pièce jointe (MinIO + base)
   */
  async delete(id: string): Promise<{ deleted: boolean; originalName: string }> {
    const attachment = await this.attachmentModel.findById(id).exec();
    if (!attachment) {
      throw new NotFoundException(`Pièce jointe "${id}" introuvable`);
    }

    // Supprimer de MinIO
    await this.minioService.deleteFile(attachment.objectKey);

    // Supprimer de la base
    await this.attachmentModel.findByIdAndDelete(id).exec();

    this.logger.log(`🗑️ Pièce jointe "${attachment.originalName}" supprimée`);
    return { deleted: true, originalName: attachment.originalName };
  }

  /**
   * Supprime toutes les pièces jointes d'un sprint
   */
  async deleteBySprintId(sprintId: string): Promise<{ deletedCount: number }> {
    const attachments = await this.attachmentModel.find({ sprintId }).exec();

    // Supprimer tous les fichiers de MinIO
    await Promise.all(
      attachments.map((att) => this.minioService.deleteFile(att.objectKey)),
    );

    // Supprimer tous les enregistrements
    const result = await this.attachmentModel.deleteMany({ sprintId }).exec();
    this.logger.log(`🗑️ ${result.deletedCount} pièce(s) jointe(s) supprimée(s) pour le sprint ${sprintId}`);
    return { deletedCount: result.deletedCount };
  }
}
