import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export function uploadImageToCloudinary(pathImage: any) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      pathImage,
      { format: "webp" },
      (err: any, res: any) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}

export async function deleteImageToCloudinary(public_id: string) {
  try {
    const destroyed = await cloudinary.uploader.destroy(public_id);
    return Promise.resolve(destroyed);
  } catch (e) {
    return Promise.reject(e);
  }
}
