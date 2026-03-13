import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';
export declare class MinioService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private client;
    private bucket;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    uploadFile(objectName: string, buffer: Buffer, size: number, mimeType: string): Promise<void>;
    downloadFile(objectName: string): Promise<Readable>;
    deleteFile(objectName: string): Promise<void>;
    getPresignedUrl(objectName: string, expirySeconds?: number): Promise<string>;
    getObjectStat(objectName: string): Promise<Minio.BucketItemStat>;
    listObjects(prefix: string): Promise<Minio.BucketItem[]>;
    getBucketName(): string;
}
