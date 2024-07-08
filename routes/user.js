const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Books = require('../models/books')


router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        book_borrowed: req.body.book_borrowed
    })

    try {
        const user1 = await user.save()
        res.json(user1)
    } catch (err) {
        res.send('error')
    }
})

//get all the user details
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.send('error' + err)
    }
})

//get all the books details
router.get('/books', async (req, res) => {
    try {
        const books = await Books.find()
        res.json(books)
    } catch (err) {
        res.send('error' + err)
    }
})

//search books by name ,author or category
router.get('/books/search', async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const category = req.query.category

    try {
        const query = {};
        if (title) query.title = new RegExp(title, 'i');
        if (author) query.author = new RegExp(author, 'i');
        if (category) query.category = new RegExp(category, 'i');

        const book = await Books.find(query);
        res.json(book);

    } catch (err) {
        res.send('error' + err)
    }
});


//histroy of books
// router.get('/books/history', 
//      async (req, res) => {

//     try {

//         const id = req.query.id;
//         console.log(id);

//         const book = await Books.findById(id);
//         if (!book) {
//             return res.status(404).send('Book not found');
//         }
//         res.json(book);
        
//     } catch (err) {
//         res.status(500).send('Error: ' + err);
//     }
// });

module.exports = router