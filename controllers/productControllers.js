// models
const Product = require("../models/Product");

// controllers functions
//
// create one product
const createOneProduct = async (req, res) => {
  const data = req.body;

  const newProduct = new Product({
    name: data.name,
    description: data.description,
    price: data.price,
    discountPrice: data.discountPrice,
    countInStock: data.countInStock,
    category: data.category,
    brand: data.brand,
    sizes: data.sizes,
    colors: data.colors,
    collections: data.collections,
    material: data.material,
    gender: data.gender,
    images: data.images,
    isFeatured: data.isFeatured,
    isPublished: data.isPublished,
    tags: data.tags,
    dimensinos: data.dimensinos,
    weight: data.weight,
    sku: data.sku,
    user: req.user._id,
  });

  newProduct
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server error");
    });
};

module.exports = {
  createOneProduct,
};
