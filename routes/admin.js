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
    const data = { ...req.body }

    const details = await Books.create(data)

    if (details) {
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

        if (!data || !id) {
            throw new Error('Id or data was not found')
        }

        const updatedDetails = await Books.findByIdAndUpdate(id, { $set: data })

        if (!updatedDetails) {
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
    const details = await Books.findByIdAndDelete(id)


    if (details) {
        return res.status(200).json({
            message: 'Data deleted successfuly'
        })
    }
})

//assigning the book
router.post('/books/assign', async (req, res) => {
    const bookId = req.query.bookId;
    const userId = req.query.userId;
    const returnDate = req.body.returnDate;

    try {
        const book = await Books.findById(bookId);
        const user = await User.findById(userId);

        if (!book || !user) {
            return res.status(404).send('Book or user not found');
        }
        if (!book.status.avaiable) {
            return res.status(400).send('Book is assigned to someone else');
        }

        const assignedBook = await Books.findByIdAndUpdate(bookId, {
            $set: {
                "status.avaiable": false,
                "status.returnDate": new Date(returnDate),
                "status.assignedTo": userId
            },
        //     $push: {
        //         history: {
        //             userId: userId,
        //             borrowedDate: new Date(),
        //             returnedDate: null //as it is returned and in the history so set it to null and updated as returned back
        //         }
        //     }
             },
            { new: true }
        );


        if (!assignedBook) {
            throw new Error('id was incorrect')
        }

        return res.status(200).json({
            assignedBook
        })


    } catch (err) {
        res.status(500).send('error' + err);
    }

})

//find all users and its details
router.get('/user', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).send('error' + err);
    }
});

//books to be returned today
// router.get('/books/dueToday', async(req,res)=>{
//     const today = new Date();
//     const todayISO = today.toISOString().split('T')[0];

//     try {
//         moment module
//         {exp: {$gte:start,$lt: end}}
//         const booksDueToday = await Books.find({ 'status.returnDate': todayISO });
//         if (booksDueToday.length > 0) {
//             res.json(booksDueToday);
//         } else {
//             res.json({ message: 'No books are due today.' });
//         }
//     } catch (err) {
//         res.status(500).send('Error: ' + err);
//     }
// });

module.exports = router