const app = require('express');
const router = app.Router();
const { getCat, postCat, getCatbyID,DelCat,updateCat } = require('./controller'); 
router.get('/category', getCat); 
router.post('/category', postCat);
router.get('/category/:_id', getCatbyID); 
router.delete('/category',DelCat)
router.put('/category',updateCat)

module.exports = router;
