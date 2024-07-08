const express = require('express')
const router = express.Router()
const Books = require('../models/books')

router.post('/', async(req,res)=>{
    const books = new Books({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        

    })

    try{
        const books1 = await books.save()
        res.json(books1)
    }catch(err){
        res.send('error')
    }
})

router.get('/', async(req,res)=> {
    try{
        const books = await Books.find()
        res.json(books)
    }catch(err){
        res.send('error' + err)
    }
});


module.exports = router