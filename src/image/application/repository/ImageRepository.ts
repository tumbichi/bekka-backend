import Image from '../../domain/model/Image';

export default interface ImageRepository {
  createImage: (image: Image) => Promise<Image>;
  deleteImageByPublicId: (publicId: string) => Promise<Image>;
  getImageBySecureUrl: (secureUrl: string) => Promise<Image | null>;
}
