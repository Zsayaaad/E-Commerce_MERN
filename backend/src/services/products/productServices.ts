import productModel from "../../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        imageUrl:
          "https://images.electronicexpress.com/product.c.405/569290-000.jpg",
        price: 35000,
        stock: 10,
      },
      {
        title: "Lenovo Laptop",
        imageUrl:
          "https://images.electronicexpress.com/product.c.405/571013-000.jpg",
        price: 15000,
        stock: 10,
      },
      {
        title: "ASUS Laptop",
        imageUrl:
          "https://images.electronicexpress.com/product.c.405/571067-000.jpg",
        price: 50000,
        stock: 10,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error: any) {
    console.error("Cannot see database.", error.message);
  }
};
