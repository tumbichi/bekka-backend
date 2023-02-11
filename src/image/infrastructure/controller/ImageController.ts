import { Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import ImageService from '../../application/service/ImageService';

// TODO: Type fields and files that extract from resquest
const extractFilesFromRequest = (req: Request): Promise<{ fields: any; files: any }> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false,
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log('[ImageController] Extract files from request', JSON.stringify({ fields, files }, undefined, 2));
      resolve({ fields, files });
    });
  });

export default class ImageController {
  private readonly imageService: ImageService;

  constructor(service: ImageService) {
    this.imageService = service;
  }

  uploadImage = async (req: Request, res: Response) => {
    const { files, fields } = await extractFilesFromRequest(req);

    if (!files?.image?.filepath || typeof files.image.filepath !== 'string') {
      return res.status(400).json({ message: 'Invalid image' });
    }

    this.imageService
      .uploadImage(files.image.filepath)
      .then((imageCreated) => {
        res.status(201).json(imageCreated);
      })
      .catch((error) => {
        switch (error.name) {
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };

  deleteImage = async (req: Request, res: Response) => {
    const { public_id } = req.body;

    this.imageService
      .deleteImage(public_id)
      .then(() => {
        return res.status(204);
      })
      .catch((error) => {
        switch (error.name) {
          default: {
            const jsonResponse =
              error?.message && typeof error.message === 'string' ? { message: error.message } : error;
            return res.status(500).json(jsonResponse);
          }
        }
      });
  };
}

// export const uploadImage = async (req: Request, res: Response) => {
//   const fData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
//     const form = new IncomingForm({
//       multiples: false,
//     });
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });

//   const imageData = await uploadImageToCloudinary(fData.files.image.filepath);

//   const result = await prisma.image.create({
//     data: {
//       publicId: imageData.public_id,
//       format: imageData.format,
//       version: imageData.version.toString(),
//       url: imageData.url,
//       secure_url: imageData.secure_url,
//       name: imageData.original_filename,
//     },
//   });

//   return res.status(201).json(result);
// };

// export const deleteImage = async (req: Request, res: Response) => {
//   const { public_id } = req.body;

//   try {
//     await deleteImageToCloudinary(public_id);
//     const deleted = await prisma.image.delete({
//       where: { publicId: public_id },
//     });

//     return Promise.resolve(deleted);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };
