const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./schema')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')


const Dummy = (req, res) => {
    res.json({
        user: "BQ " + req.body.user
    })
}

const SignUp = async (req, res) => {
    const { username, password, email } = req.body;
    console.log({ username, password, email })
    try {


        if (!username || !password || !email) {
            res.status(403).json({
                message: "Required Fields"
            })

        }


        else {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("DB Connected")
            const existingUser = await User.exists({ email: email })
            if (existingUser) {
                res.status(208).json({
                    message: "User Already Exists"
                })
            }

            else {
                await User.create({ username, email, password: await hash(password, 12) })
                console.log("User Created")
                res.status(201).json({
                    message: "Signup Successfully"
                })
            }
        }


    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const Login = async (req, res) => {

    const { password, email } = req.body;

    try {
        await mongoose.connect(process.env.MONGO_URL)
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }

        else {

            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }

            else {
                res.json({
                    message: "invalid Credentials"
                })
            }





        }

    }
    catch (error) {
        res.json({
            message: error.message
        })

    }
}

const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Users = await User.find()
        res.json(
            {
                Users: Users
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


const getUserbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
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


const userbyEmail = async (req, res) => {

    const { email } = req.query


    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
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
const  DelUser = async (req, res) => {
    const { name, _id } = req.body
    try {
      await mongoose.connect(process.env.MONGO_URL)
     await User.deleteOne({name,_id})
     const user = await User.find()
      res.json(
        {
          user,
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
  
  const updateUser = async (req, res) => {
  
    const { _id,username, password, email} = req.body
  
    const filter = { _id };
    const update = { username, password, email };
  
    try {
        await connect(process.env.MONGO_URL)
        await User.findOneAndUpdate(filter, update, {
            new: true
        })
  
        const user = await User.find()
  
        res.json({
            message: "Success",
            user
        })
  
    }
  
    catch (error) {
        res.json({
            message: error.message,
        })
    }
  }
  
  
  
  
  
  



module.exports = { Dummy, SignUp, Login, allUsers, getUserbyEmail, userbyEmail , DelUser,updateUser }