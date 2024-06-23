const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Books = require('../models/books')


router.post('/', async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const admin1 = await admin.save()
        res.json(admin1)
    } catch (err) {
        res.send('error')
    }
})

//Find all the admins in the database
router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find()
        res.json(admin)
    } catch (err) {
        res.send('error' + err)
    }
})

//find admins according to the adminID
router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        res.json(admin)
    } catch (err) {
        res.send('error' + err)
    }
})

//Adding a new book
router.post('/books', async (req, res) => {
    let data = {...req.body}

    let details = await Books.create(data)

    if(details){
        return res.status(200).json({
            details
        })
    }
})

//Updating a book
router.post('/books/update', async (req, res) => {

    try {
        let data = { ...req.body }
        let id = req.query.id

        console.log(id);

        if(!data || !id){
            throw new Error('Id or data was not found')
        }
    
        let updatedDetails = await Books.findByIdAndUpdate(id, {$set: data})
    
        if(!updatedDetails){
            throw new Error('id was incorrect')
        }

        return res.status(200).json({
            updatedDetails
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

})


router.get('/books/delete', async (req, res, next) => {
    let id = req.query.id;
    console.log(id);
    let details  = await Books.findByIdAndDelete(id)


    if(details){
        return res.status(200).json({
            message: 'Data deleted successfuly'
        });
    }
})



module.exports = router