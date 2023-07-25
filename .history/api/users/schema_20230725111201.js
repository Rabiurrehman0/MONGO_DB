const { Schema, model } = require('mongoose')


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },
        profile_pic:{
            type: String,
            required: true,
            default: "https://cdn-icons-png.flaticon.com/512/666/666201.png"

        }
        joining: {
            type: Date,
            default: Date.now
        }

    }
)


const User = model('user', UserSchema)
module.exports = User;