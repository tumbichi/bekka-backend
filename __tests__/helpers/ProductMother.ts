import Product from "../../src/product/domain/models/Product";

export default class ProductMother {
  public static createValidProduct(id: number) {
    return new Product(id, "Titulo", "image url", 350.75, true, true, 9, {
      id: 2,
      title: "Category title",
    });
  }
}
