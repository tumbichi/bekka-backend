import "jest";
import ProductMother from "../../helpers/ProductMother";

describe("Simple test for product", () => {
  it("Should create a Product with id 1", () => {
    const product = ProductMother.createValidProduct(1);

    expect(product.id).toEqual(1);
  });
});
