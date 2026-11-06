import { mkdirSync } from 'node:fs';
import { open, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import multer from 'multer';

const uploadsDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../uploads'
);
const imageExtensions = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

mkdirSync(uploadsDirectory, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDirectory,
    filename: (req, file, callback) => {
      callback(null, `${randomUUID()}${imageExtensions[file.mimetype]}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8
  },
  fileFilter: (req, file, callback) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      callback(new Error('Gebruik alleen JPG-, PNG- of WebP-afbeeldingen.'));
      return;
    }

    callback(null, true);
  }
});

export function uploadCarImages(req, res, next) {
  upload.array('images', 8)(req, res, async error => {
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    try {
      for (const file of req.files) {
        const handle = await open(file.path, 'r');
        const signature = Buffer.alloc(12);
        let bytesRead;
        try {
          ({ bytesRead } = await handle.read(signature, 0, signature.length, 0));
        } finally {
          await handle.close();
        }

        const validImage = file.mimetype === 'image/jpeg'
          ? bytesRead >= 3 && signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff
          : file.mimetype === 'image/png'
            ? bytesRead >= 8 && signature.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
            : bytesRead >= 12
              && signature.toString('ascii', 0, 4) === 'RIFF'
              && signature.toString('ascii', 8, 12) === 'WEBP';

        if (!validImage) {
          throw new Error('Een bestand is geen geldige JPG-, PNG- of WebP-foto.');
        }
      }
    } catch (validationError) {
      try {
        await Promise.all(req.files.map(file => unlink(file.path)));
      } catch (cleanupError) {
        console.error('Ongeldige autofoto opruimen mislukt:', cleanupError.message);
      }
      res.status(400).json({ error: validationError.message });
      return;
    }

    next();
  });
}

export default uploadsDirectory;
