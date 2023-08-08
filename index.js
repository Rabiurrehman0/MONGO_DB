const express = require('express')
const app = express()
// const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.SERVER_PORT
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }))
  app.use('/api', require('./api/users/router'))
  app.use('/api', require('./api/products/router'))
  app.use('/api', require('./api/brands/router'))
  app.use('/api', require('./api/category/router'))
  app.use('/api', require('./api/mailer/router'))
  app.use('/api', require('./api/orders/router'))
  

// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log("DB CONNECTED"))
// .catch((err)=> console.log("somthing wrong"))
app.get('/', (req, res) => {
    res.send('Hello World!')
})


// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("DB Connected"))
//     .catch((err) => console.log(err.message))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
