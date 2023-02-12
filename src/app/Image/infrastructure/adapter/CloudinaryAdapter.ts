import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import Image from '../../domain/model/Image';
import ImageAdapterRepository from '../../application/repository/ImageAdapterRepository';

type Cloudinary = typeof cloudinary;

export default class CloudinaryAdapter implements ImageAdapterRepository {
  private readonly cloudinryClient: Cloudinary;

  constructor() {
    this.cloudinryClient = cloudinary;

    this.cloudinryClient.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  readonly uploadImage = async (pathImage: string) => {
    try {
      const response = await this.cloudinryClient.uploader.upload(pathImage, { format: 'webp' });
      return this.parseCloudinaryResponseToImage(response);
    } catch (error) {
      throw new Error('Failed uploading image to cloudinary');
    }
  };

  readonly deleteImage = async (public_id: string) => {
    try {
      return await cloudinary.uploader.destroy(public_id);
    } catch (e) {
      throw new Error('Failed when try delete image');
    }
  };

  private readonly parseCloudinaryResponseToImage = (response: UploadApiResponse) =>
    new Image(
      response.original_filename,
      response.url,
      response.secure_url,
      response.format,
      response.public_id,
      String(response.version),
    );
}

// function uploadImageToCloudinary(pathImage: any) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(pathImage, { format: 'webp' }, (err: any, res: UploadApiResponse | undefined) => {
//       if (err) reject(err);
//       resolve(res);
//     });
//   });
// }

// async function deleteImageToCloudinary(public_id: string) {
//   try {
//     const destroyed = await cloudinary.uploader.destroy(public_id);
//     return Promise.resolve(destroyed);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }
