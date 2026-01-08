import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Dell Laptop",
      imageUrl:
        "https://imgs.search.brave.com/cm6k4r6Gc0QkYF2ngwxe-DfHanOwKYjxpOZyH28kY9U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFYeE1rQTdFQUwu/anBn",
      price: 35000,
      stock: 10,
    },
  ];

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
