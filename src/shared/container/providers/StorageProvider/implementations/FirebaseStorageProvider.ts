import fs from 'fs';
import { resolve } from 'path'
import { v4 as uuid } from 'uuid'
import { IStorageProvider } from '../IStorageProvider';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import upload from '@config/upload';
const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('../serviceAccount.json');



class FirebaseStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        const admin = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount)
          }); 

        const bucket = admin.storage().bucket('gs://horizontinvestimentos.appspot.com')
        const originalName = resolve(upload.tmpFolder, file);

       const storage = await bucket.upload(originalName, {
            public: true,
            destination: `/${folder}/${file}`,
            metadata: {
                firebaseStorageDownloadTokens: uuid(),
            }
        });

        return storage[0].metadata.mediaLink;
    }

    async delete(file: string, folder: string): Promise<void> {
        const admin = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount)
          }); 

        const bucket = admin.storage().bucket('gs://horizontinvestimentos.appspot.com')
       // Create a reference to the file to delete
        var desertRef = await bucket.child(`/${folder}/${file}`);

        // Delete the file
        desertRef.delete().then(function() {
            console.log('deletou')
        // File deleted successfully
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        });
    }
   
}


export {
    FirebaseStorageProvider
}