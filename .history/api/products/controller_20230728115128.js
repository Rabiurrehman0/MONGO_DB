import products from './products.model';

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

export default { getProducts, postProducts };
