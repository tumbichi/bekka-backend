import Image from '../../domain/model/Image';
import ImageAdapterRepository from '../repository/ImageAdapterRepository';
import ImageRepository from '../repository/ImageRepository';

export default class ImageService {
  readonly imageRepository: ImageRepository;
  readonly imageAdapterRepository: ImageAdapterRepository;

  constructor(repository: ImageRepository, adapterRepository: ImageAdapterRepository) {
    this.imageRepository = repository;
    this.imageAdapterRepository = adapterRepository;
  }

  /**
   * Upload image service
   * @throws {Error}
   */
  uploadImage = async (filepath: string): Promise<Image> => {
    console.log('[ImageService] Upload image started...');
    console.log('[ImageService] filepath', filepath);

    const imageUploaded = await this.imageAdapterRepository.uploadImage(filepath);
    console.log('[ImageService] Image uploaded ', imageUploaded);

    const image = await this.imageRepository.createImage(imageUploaded);
    console.log('[ImageService] Image created on database ', image);

    console.log('[ImageService] Upload image end...');
    return image;
  };

  /**
   * Delete image service
   * @throws {Error}
   */
  deleteImage = async (publicId: string) => {
    console.log('[ImageService] Delete image started...');

    let deletedFromStorage = false;
    let deletedFromDatabase = false;

    try {
      await this.imageAdapterRepository.deleteImage(publicId);
      deletedFromStorage = true;
    } catch (error) {
      console.log('[ImageService] Delete image from storage failed', error);
    }

    try {
      await this.imageRepository.deleteImageByPublicId(publicId);
      deletedFromDatabase = true;
    } catch (error) {
      console.log('[ImageService] Delete image from database failed', error);
    }

    if (!deletedFromStorage && !deletedFromDatabase) {
      console.log('[ImageService] Delete image failed');
      throw new Error('Failed when try delete image');
    }

    console.log('[ImageService] Deleted image from storage', deletedFromStorage);
    console.log('[ImageService] Deleted image from database', deletedFromDatabase);
    console.log('[ImageService] Delete image end...');
  };
}
