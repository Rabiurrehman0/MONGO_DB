
const app = require('express')
const router = app.Router()
const { getBrands, postBrand, getBrandbyID,DelBrands,updateBrand } = require('./controller')

router.get('/brand', getBrands)
router.post('/brand', postBrand)
router.get('/brand/:_id', getBrandbyID)
router.delete('/brand',DelBrands)
router.put('/brand', updateBrand)

module.exports = router;
