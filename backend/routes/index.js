const express = require('express');
const router = express.Router();

const { addUser, getSingle } = require('../controller/userCtrl')
const {  addCollege,
    updateCollege,
    getSingleCollege,
    deleteCollege,
    getAllColleges} =require('../controller/collegectrl')

router.post('/adduser', addUser)
router.post('/getsingle', getSingle)


router.get('/addcollge', addCollege);
router.put('/updateCollege/:id', updateCollege);
router.get('/getSingleCollege/:id', getSingleCollege);
router.delete('/deleteCollege/:id', deleteCollege);
router.get('/getAllColleges', getAllColleges);

module.exports = router;