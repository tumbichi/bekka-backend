import { ImageEntity, Prisma } from '../../../db';
import ImageRepository from '../../application/repository/ImageRepository';
import Image from '../../domain/model/Image';

export default class ImageDataSource implements ImageRepository {
  private readonly imageClient: Prisma.ImageDelegate<'rejectOnNotFound'>;

  constructor(prismaClient: Prisma.ImageDelegate<'rejectOnNotFound'>) {
    this.imageClient = prismaClient;
  }

  createImage = async (image: Image): Promise<Image> => {
    try {
      const imageEntity = await this.imageClient.create({
        data: {
          name: image.name,
          url: image.url,
          secure_url: image.secure_url,
          format: image.format,
          publicId: image.publicId,
          version: image.version,
        },
      });
      return this.parseImageEntityToDomain(imageEntity);
    } catch (error) {
      console.log('[ImageDataSource] createImage ', error);
      throw new Error('Failed when try create image');
    }
  };

  deleteImageByPublicId = async (publicId: string): Promise<Image> => {
    try {
      const imageEntity = await this.imageClient.delete({ where: { publicId } });
      return this.parseImageEntityToDomain(imageEntity);
    } catch (error) {
      console.log('[ImageDataSource] deleteImageByPublicId ', error);
      throw new Error('Failed when try delete image');
    }
  };

  private parseImageEntityToDomain = (imageEntity: ImageEntity) =>
    new Image(
      imageEntity.name,
      imageEntity.url,
      imageEntity.secure_url,
      imageEntity.format,
      imageEntity.publicId,
      imageEntity.version,
    );
}
