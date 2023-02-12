import Product from '../../app/Product/domain/model/Product';

export default class ProductMother {
  public static createValidProduct(id: number) {
    return new Product(
      'Titulo',
      'image url',
      350.75,
      true,
      true,
      9,
      {
        id: 2,
        title: 'Category title',
      },
      {},
      id,
    );
  }
}
