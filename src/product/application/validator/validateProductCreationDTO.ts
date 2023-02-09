import ProductCreationDTO from '../dto/ProductCreationDTO';
import InvalidImageUrlException from '../exeption/InvalidImageUrlException';
import InvalidProductPriceException from '../exeption/InvalidProductPriceException';
import InvalidProductTitleException from '../exeption/InvalidProductTitleException';
import StoreNotExistException from '../exeption/StoreNotExistException';
import CategoryNotExistException from '../../../Category/application/exeption/CategoryNotExistException';

import validateUrl from '../../../Shared/validateUrl';

/**
 * Validate prodcut creation dto
 * @throws {InvalidProductTitleException}
 * @throws {InvalidProductPriceException}
 * @throws {InvalidImageUrlException}
 * @throws {CategoryNotExistException}
 * @throws {StoreNotExistException}
 */
const validateProductCreationDTO = (productDto: ProductCreationDTO): void | never => {
  if (!productDto.title || productDto.title.length < 2) {
    const msg = productDto.title.length ? 'The product name must be at least two characters long' : undefined;
    throw new InvalidProductTitleException(msg);
  }

  if (!productDto.price || typeof productDto.price !== 'number') {
    const msg = typeof productDto.price !== 'number' ? 'Price must be numerical' : undefined;
    throw new InvalidProductPriceException(msg);
  }

  const isValidUrl = validateUrl(productDto.imageUrl);
  if (!productDto.imageUrl || !isValidUrl) {
    const msg = productDto.imageUrl ? 'The product image url is not a valid url' : undefined;
    throw new InvalidImageUrlException(msg);
  }

  if (!productDto.categoryId || typeof productDto.categoryId !== 'number') {
    throw new CategoryNotExistException();
  }

  if (!productDto.storeId || typeof productDto.storeId !== 'number') {
    throw new StoreNotExistException();
  }
};

export default validateProductCreationDTO;
