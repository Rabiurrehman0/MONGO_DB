// const Category = require('./schema')
// const mongoose = require('mongoose')
// require('dotenv').config()

// const getCat =async (req, res) => {
//   try {
//       await mongoose.connect(process.env.MONGO_URL)
//       const category = await Category.find()
//       res.json(
//           {
//             category
//           }
//       )
//   }
//   catch (error) {
//       res.json(
//           {
//               message: error.message
//           }
//       )

//   }
// }

// const postCat = async (req, res) => {
//   const {name,description} = req.body;
//   try {
//     if (name && description) {
//       await mongoose.connect(process.env.MONGO_URL)
//       await Category.create({ name,description })
//       res.status(201).json({
//         message: "category Add Successfully"
//       })
//     }

//     else {
//       res.status(403).json({
//         message: "Required Fields"
//       })
//     }
//   }
//   catch (error) {
//     res.json({
//       message: error.message
//     })
//   }

// };

// const getCatbyID = async (req, res) => {

//   const { _id } = req.params


//   try {
//       await mongoose.connect(process.env.MONGO_URL)
//       const category = await Category.findOne({ _id})
//       res.json(
//           {
//               category
//           }
//       )

//   }

//   catch (error) {
//       res.json(
//           {
//               message: error.message
//           }
//       )

//   }
// };

// const  DelCat = async (req, res) => {
//   const { name } = req.body
//   try {
//     await mongoose.connect(process.env.MONGO_URL)
//    await Category.deleteOne({name})
//    const category = await Category.find()
//     res.json(
//       {
//         category,
//         message : "succesfully deleted"
//       }
//     )
//   }
//   catch (error) {
//     res.json(
//       {
//         message: error.message
//       }
//     )

//   }
// };

// const updateCat = async (req, res) => {

//   const { _id, name, description } = req.body

//   const filter = { _id };
//   const update = { name, description};

//   try {
//       await connect(process.env.MONGO_URL)
//       await Category.findOneAndUpdate(filter, update, {
//           new: true
//       })

//       const category = await Category.find()

//       res.json({
//           message: "Success",
//           category
//       })

//   }

//   catch (error) {
//       res.json({
//           message: error.message,
//       })
//   }
// }




// module.exports = { getCat, postCat ,getCatbyID,DelCat,updateCat};
const Category = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()

const getAllCategories = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const allCategories = await Category.find()
        res.json({
            category: allCategories
        })

    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


const getCategoryByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URL)
        const category = await Category.findOne({ _id })
        res.json({ category })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(400).json({
                    message: "Category Already Exists"
                })
            }

            else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()

                res.json({
                    message: "DB Connected",
                    category: allCategories
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

const updateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id };
    const update = { CategoryName, CategoryImage };

    try {
        await connect(process.env.MONGO_URL)

        await Category.findOneAndUpdate(filter, update, {
            new: true
        });

        const category = await Category.find()

        res.json({
            message: "Success",
            category
        })

    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const deleteCategory = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URL)
        await Category.deleteOne({ _id })
        const category = await Category.find()
        res.status(200).json({
            message: "Deleted Successfully",
            category
        })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

module.exports = { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory }