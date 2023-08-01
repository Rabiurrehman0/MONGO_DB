const Brand = require('./schema');
const mongoose = require('mongoose')
require('dotenv').config()

const getBrands = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    const brand = await Brand.find()
    res.json(
      {
        brand
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

const postBrand = async (req, res) => {
  const { name, description,image } = req.body;
  try {
    if (name && description && image) {
      await mongoose.connect(process.env.MONGO_URL)
      await Brand.create({ name, description , image })
      res.status(201).json({
        message: "brand Add Successfully"
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
      message: error.message,
    });
  }
};


const getBrandbyID = async (req, res) => {

  const { _id } = req.params


  try {
    await mongoose.connect(process.env.MONGO_URL)
    const brand = await Brand.findOne({ _id })
    res.json(
      {
        brand
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


const DelBrands = async (req, res) => {
  const { _id } = req.body
  try {
    await mongoose.connect(process.env.MONGO_URL)
   await Brand.deleteOne({_id})
   const brand = await Brand.find()
    res.json(
      {
        brand,
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

const updateBrand = async (req, res) => {

  const { _id, name, image } = req.body

  const filter = { _id };
  const update = { name, image };

  try {
      await connect(process.env.MONGO_URI)
      await Brand.findOneAndUpdate(filter, update, {
          new: true
      })

      const brands = await Brand.find()

      res.json({
          message: "Success",
          brands
      })

  }

  catch (error) {
      res.json({
          message: error.message,
      })
  }
}


module.exports = { getBrands, postBrand, getBrandbyID, DelBrands, updateBrand};
