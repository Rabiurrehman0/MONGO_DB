const app = require('express')
const router = app.Router()
const { getProducts, postProducts,getProductbyID,getProductbyCategory,getProductbyBrand,DelPro,updatePro } = require('./controller')

router.get('/products', getProducts)
router.post('/products', postProducts)
router.get('/products/:_id',getProductbyID)
router.get('/products',getProductbyCategory )
router.get('/products', getProductbyBrand)
router.delete('/products',DelPro)
router.put('/products', updatePro)


module.exports = router;