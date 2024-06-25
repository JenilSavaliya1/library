const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Books = require('../models/books')


router.post('/', async(req,res)=>{
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        book_borrowed: req.body.book_borrowed,
        history: req.body.history
    })

    try{
        const user1 = await user.save()
        res.json(user1)
    }catch(err){
        res.send('error')
    }
})

//get all the user details
router.get('/', async(req,res)=> {
    try{
        const user = await User.find()
        res.json(user)
    }catch(err){
        res.send('error' + err)
    }
})

//get all the books details
router.get('/books',async(req,res)=>{
    try{
        const books = await Books.find()
        res.json(books)
    }catch (err){
        res.send('error' + err)
    }
})


module.exports = router