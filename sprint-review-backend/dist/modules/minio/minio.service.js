"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MinioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = require("minio");
let MinioService = MinioService_1 = class MinioService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(MinioService_1.name);
        this.client = new Minio.Client({
            endPoint: this.configService.get('MINIO_ENDPOINT', 'localhost'),
            port: this.configService.get('MINIO_PORT', 9000),
            useSSL: this.configService.get('MINIO_USE_SSL', 'false') === 'true',
            accessKey: this.configService.get('MINIO_ACCESS_KEY', ''),
            secretKey: this.configService.get('MINIO_SECRET_KEY', ''),
        });
        this.bucket = this.configService.get('MINIO_BUCKET', 'sprint-review-attachments');
    }
    async onModuleInit() {
        try {
            const exists = await this.client.bucketExists(this.bucket);
            if (!exists) {
                await this.client.makeBucket(this.bucket);
                this.logger.log(`✅ Bucket "${this.bucket}" créé avec succès`);
            }
            else {
                this.logger.log(`✅ Bucket "${this.bucket}" existe déjà`);
            }
        }
        catch (error) {
            this.logger.warn(`⚠️ Impossible de vérifier/créer le bucket MinIO : ${error.message}`);
        }
    }
    async uploadFile(objectName, buffer, size, mimeType) {
        await this.client.putObject(this.bucket, objectName, buffer, size, {
            'Content-Type': mimeType,
        });
        this.logger.log(`📤 Fichier uploadé : ${objectName}`);
    }
    async downloadFile(objectName) {
        return await this.client.getObject(this.bucket, objectName);
    }
    async deleteFile(objectName) {
        await this.client.removeObject(this.bucket, objectName);
        this.logger.log(`🗑️ Fichier supprimé : ${objectName}`);
    }
    async getPresignedUrl(objectName, expirySeconds = 7 * 24 * 60 * 60) {
        return await this.client.presignedGetObject(this.bucket, objectName, expirySeconds);
    }
    async getObjectStat(objectName) {
        return await this.client.statObject(this.bucket, objectName);
    }
    async listObjects(prefix) {
        return new Promise((resolve, reject) => {
            const items = [];
            const stream = this.client.listObjects(this.bucket, prefix, true);
            stream.on('data', (item) => items.push(item));
            stream.on('end', () => resolve(items));
            stream.on('error', (err) => reject(err));
        });
    }
    getBucketName() {
        return this.bucket;
    }
};
exports.MinioService = MinioService;
exports.MinioService = MinioService = MinioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MinioService);
//# sourceMappingURL=minio.service.js.map