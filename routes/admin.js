const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Books = require('../models/books')


router.post('/', async(req,res)=>{
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    })

    try{
        const admin1 = await admin.save()
        res.json(admin1)
    }catch(err){
        res.send('error')
    }
})

//Find all the admins in the database
router.get('/', async(req,res)=> {
    try{
        const admin = await Admin.find()
        res.json(admin)
    }catch(err){
        res.send('error' + err)
    }
})

//find admins according to the adminID
router.get('/:id', async(req,res)=> {
    try{
        const admin = await Admin.findById(req.params.id)
        res.json(admin)
    }catch(err){
        res.send('error' + err)
    }
})

//Adding a new book
router.post('/books', async(req,res)=>{
    const books = new Books({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    })

    try{
        const books1 = await books.save()
        res.json(books1)
    }catch(err){
        res.send('error')
    }
})

//Updating a book
router.put('/books/:id', async(req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const category = req.body.category;

        try{
            const book1 = await Books.findById(req.params.id)
            res.json(admin)
        }catch(err){
            res.send('error' + err)
        }
    })


module.exports = router