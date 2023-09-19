import { diskStorage } from 'multer';
import { extname } from 'path';

export const customStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.random() * 1e9;
    const etext = extname(file.originalname);
    const fileName = `${file.originalname}-${uniqueSuffix}${etext}`;

    cb(null, fileName);
  },
});
