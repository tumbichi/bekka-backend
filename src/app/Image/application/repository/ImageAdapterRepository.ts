import Image from '../../domain/model/Image';

export default interface ImageAdapterRepository {
  uploadImage: (imagePath: string) => Promise<Image>;
  // TODO: Fix this any
  /* Should be test what returns cloudinary delete and map this with a business response like a model or not, 
  maybe you can be use a boolean or maybe undefined */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteImage: (publicId: string) => Promise<any>;
}
