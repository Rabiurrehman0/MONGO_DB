const Products = require('./schema')
const mongoose = require('mongoose')
require('dotenv').config()

const getProducts =async (req, res) => {
  try {
      await mongoose.connect(process.env.MONGO_URL)
      const products = await Products.find()
      res.json(
          {
            products
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
}

const postProducts = async (req, res) => {
  const { name, price, category, brand, image, description } = req.body;
  try {
    if (name && price && category && brand && image && description) {
      await mongoose.connect(process.env.MONGO_URL)
      await Products.create({ name, price, category, brand, image, description })
      res.status(201).json({
        message: "Product Add Successfully"
      })
    }

    else {
      res.status(403).json({
        message: "Required Fields"
      })
    }
  }
  catch (error) {
    res.json({
      message: error.message
    })
  }

};

const getProductbyID = async (req, res) => {

  const { _id } = req.params


  try {
      await mongoose.connect(process.env.MONGO_URL)
      const products = await Products.findOne({ _id})
      res.json(
          {
              products
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
};

const getProductbyCategory = async (req, res) => {

  const { category } = req.params


  try {
      await mongoose.connect(process.env.MONGO_URL)
      const products = await Products.find({ category})
      res.json(
          {
              products
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
};
const getProductbyBrand = async (req, res) => {

  const { brand } = req.params


  try {
      await mongoose.connect(process.env.MONGO_URL)
      const products = await Products.find({ brand})
      res.json(
          {
              products
          }
      )

  }

  catch (error) {
      res.json(
          {
              message: error.message
          }
      )

  }
};
const  DelPro = async (req, res) => {
  const { name, _id } = req.body
  try {
    await mongoose.connect(process.env.MONGO_URL)
   await Products.deleteOne({name,_id})
   const products = await Products.find()
    res.json(
      {
        products,
        message : "succesfully deleted"
      }
    )
  }
  catch (error) {
    res.json(
      {
        message: error.message
      }
    )

  }
};

const updatePro = async (req, res) => {

  const { _id, name, price, category, brand, image, description } = req.body

  const filter = { _id };
  const update = { name,price, category, brand, image, description };

  try {
      await connect(process.env.MONGO_URL)
      await Products.findOneAndUpdate(filter, update, {
          new: true
      })

      const products = await Products.find()

      res.json({
          message: "Success",
          products
      })

  }

  catch (error) {
      res.json({
          message: error.message,
      })
  }
}





module.exports = { getProducts, postProducts,getProductbyID,DelPro,getProductbyCategory,getProductbyBrand,updatePro};
