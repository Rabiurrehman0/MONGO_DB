const Products = require('./schema')

const getProducts = (req, res) => {
  res.json({
    message: "kuch bhi"
  })
};

const postProducts = (req, res) => {
  res.json({
    message: "Product Added Successfully",
  });
};

module.exports = { getProducts, postProducts };
