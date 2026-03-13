import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly logger = new Logger(MinioService.name);
  private client: Minio.Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: this.configService.get<number>('MINIO_PORT', 9000),
      useSSL: this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY', ''),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY', ''),
    });

    this.bucket = this.configService.get<string>('MINIO_BUCKET', 'sprint-review-attachments');
  }

  async onModuleInit(): Promise<void> {
    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        this.logger.log(`✅ Bucket "${this.bucket}" créé avec succès`);
      } else {
        this.logger.log(`✅ Bucket "${this.bucket}" existe déjà`);
      }
    } catch (error) {
      this.logger.warn(`⚠️ Impossible de vérifier/créer le bucket MinIO : ${error.message}`);
    }
  }

  /**
   * Upload un fichier dans MinIO
   */
  async uploadFile(
    objectName: string,
    buffer: Buffer,
    size: number,
    mimeType: string,
  ): Promise<void> {
    await this.client.putObject(this.bucket, objectName, buffer, size, {
      'Content-Type': mimeType,
    });
    this.logger.log(`📤 Fichier uploadé : ${objectName}`);
  }

  /**
   * Télécharge un fichier depuis MinIO (retourne un stream)
   */
  async downloadFile(objectName: string): Promise<Readable> {
    return await this.client.getObject(this.bucket, objectName);
  }

  /**
   * Supprime un fichier de MinIO
   */
  async deleteFile(objectName: string): Promise<void> {
    await this.client.removeObject(this.bucket, objectName);
    this.logger.log(`🗑️ Fichier supprimé : ${objectName}`);
  }

  /**
   * Génère une URL pré-signée (valide 7 jours par défaut)
   */
  async getPresignedUrl(objectName: string, expirySeconds = 7 * 24 * 60 * 60): Promise<string> {
    return await this.client.presignedGetObject(this.bucket, objectName, expirySeconds);
  }

  /**
   * Récupère les métadonnées d'un objet
   */
  async getObjectStat(objectName: string): Promise<Minio.BucketItemStat> {
    return await this.client.statObject(this.bucket, objectName);
  }

  /**
   * Liste tous les objets avec un préfixe donné
   */
  async listObjects(prefix: string): Promise<Minio.BucketItem[]> {
    return new Promise((resolve, reject) => {
      const items: Minio.BucketItem[] = [];
      const stream = this.client.listObjects(this.bucket, prefix, true);
      stream.on('data', (item) => items.push(item as Minio.BucketItem));
      stream.on('end', () => resolve(items));
      stream.on('error', (err) => reject(err));
    });
  }

  getBucketName(): string {
    return this.bucket;
  }
}
