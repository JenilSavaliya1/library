const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Books = require('../models/books')


router.post('/', async(req,res)=>{
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        book_borrowed: req.body.book_borrowed,
       
    })

    try{
        const user1 = await user.save()
        res.json(user1)
    }catch(err){
        res.send('error')
    }
})

router.get('/', async(req,res)=> {
    try{
        const user = await User.find()
        res.json(user)
    }catch(err){
        res.send('error' + err)
    }
})


module.exports = router