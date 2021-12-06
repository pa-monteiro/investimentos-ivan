import { IStorageProvider } from "../IStorageProvider";
import fs from 'fs';
import { resolve } from 'path';
import { S3 } from 'aws-sdk';
import upload from "@config/upload";

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor(){
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION
        })
    }

    save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file)
        throw new Error("Method not implemented.");
    }
    delete(file: string, folder: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}