import { Request, Response } from "express";
import { prisma } from "../../../db";
import { IncomingForm } from "formidable";
import { deleteImageToCloudinary, uploadImageToCloudinary } from "../out/cloudinary.adapter";


export const deleteImage = async (req: Request, res: Response) => {
  const { public_id } = req.body;

  try {
    await deleteImageToCloudinary(public_id);
    const deleted = await prisma.image.delete({
      where: { publicId: public_id },
    });

    return Promise.resolve(deleted)
  } catch (e) {
    return Promise.reject(e)
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const fData = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
      });
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }
  );

  const imageData: any = await uploadImageToCloudinary(
    fData.files.image.filepath
  );

  const result = await prisma.image.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
      url: imageData.url,
      secure_url: imageData.secure_url,
      name: imageData.original_filename,
    },
  });

  return res.status(201).json(result);
};
