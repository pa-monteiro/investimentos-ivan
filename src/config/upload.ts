import multer from 'multer'
import { resolve } from 'path';

const tmpFolder =  resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename: (request, file, callback) => {
                    const fileName = file.originalname;

                    return callback(null, fileName);
                }
            })
}