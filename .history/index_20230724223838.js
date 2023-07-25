const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.SERVER_PORT



app.use(express.json())

app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/products/router'))


app.get('/', (req, res) => {
    res.send('Hello World!')
})


// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("DB Connected"))
//     .catch((err) => console.log(err.message))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})