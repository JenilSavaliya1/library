const express = require('express');
const moment = require('moment');
const router = express.Router();
const Admin = require('../models/admin');
const Books = require('../models/books');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Secret key for JWT
const JWT_SECRET = 'f!s@f#s$fs';

//login route for admins
router.post('/login',async(req,res)=>{
    try{
        const data =  {...req.body};

        //finding admin using username
        const admin = await Admin.findOne({username});
        if(!admin){
            return res.status(400).json({message: 'invalid username or password'});
        }

        //checking if the passowrd matches the passowrd inputed 
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(400).json({message:' invalid username or password'});
        }

        // create and sign a JWT token
        const token = jwt.sign({ id: admin.id }, JWT_SECRET, { algorithm: 'RS256', expiresIn: '1h' });

        res.json({token});

    }catch(err){
        res.status(500).json({message: 'server error was occurred'});
    }
    
});

//veriy the token
const verifyToken = (req,res, next) =>{
    const token = req.header('authorization');

    if(!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['RS256'] });
        req.admin = decoded; // Attaching the decoded token data to the request object
        next(); // Passing control to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};


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
            return res.status(404).send('Book is assigned to someone else');
        }

        const assignedBook = await Books.findByIdAndUpdate(bookId, {
            $set: {
                "status.avaiable": false,
                "status.returnDate": new Date(returnDate),
                "status.assignedTo": userId
            },
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
router.get('/books/dueToday', async (req, res) => {
    const today = moment().startOf('day');
    const tomorrow = moment(today).add(1, 'day');

    try {
        //{exp: {$gte:start,$lt: end}}
        const booksDueToday = await Books.aggregate([{
            $match: {
                'status.returnDate': {
                    $gte: today.toDate(),
                    $lt: tomorrow.toDate()
                }
            }
        }
        ]);
        if (booksDueToday.length > 0) {
            res.json(booksDueToday);
        } else {
            res.json({ message: 'No books are due today.' });
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

module.exports = router;
module.exports = verifyToken;