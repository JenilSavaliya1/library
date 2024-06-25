const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Books = require('../models/books')
const User = require('../models/user')


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


//Adding a new book
router.post('/books', async (req, res) => {
    const data = {...req.body}

    const details = await Books.create(data)

    if(details){
        return res.status(200).json({
            details
        })
    }
})

//Updating a book
router.post('/books/update', async (req, res) => {

    try {
        const data = { ...req.body }
        const id = req.query.id

        if(!data || !id){
            throw new Error('Id or data was not found')
        }
    
        const updatedDetails = await Books.findByIdAndUpdate(id, {$set: data})
    
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

//delete a book
router.get('/books/delete', async (req, res, next) => {
    const id = req.query.id;
    const details  = await Books.findByIdAndDelete(id)


    if(details){
        return res.status(200).json({
            message: 'Data deleted successfuly'
        });
    }
})

router.post('/books/assign', async (req,res) =>{
    const bookId = req.query.bookId;
    const userId = req.body.userId;
    const returnDate = req.body.returnDate;

    try{
        const books = await Books.findbyId(bookId);
        const user = await User.findById(userId);

        if(!books || !user){
            return res.status(404).send('Book or user not found');
        }
        if(!book.status.avaiable){
            return res.status(400).send('Book is assigned to someone else');
        }

        book.status.avaiable = false;
        book.status.returnDate = new Date(returnDate);
    
    }catch(err){
        res.status(500).send('error' +err);
    }

})

//find all users and its details
router.get('/user', async (req,res) =>{
    try{
        const user = await User.find()
        res.json(user)
    }catch (err){
        res.status(500).send('error' +err);
    }
})



module.exports = router