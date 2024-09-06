const express = require('express')
const router = express.Router()
const History = require('../models/history')

router.post('/', async (req, res) => {
    const history = new History({
        BorrowedDate: req.body.BorrowedDate,
        returnDate: req.body.returnDate,
        expectedreturnDate: req.body.expectedreturnDate

    })
    try {
        const history1 = await history.save()
        res.json(history1)
    } catch (err) {
        res.send('error')
    }
})

//history of books
router.get('/books/history', async (req, res) => {

    try {

        const bookID = req.query.id;
        
        const historyofbook = await History.find({ bookId: bookID })
        if (historyofbook.length === 0) {
            return res.json({message: 'no history of the book found'})
        }

        return res.json(historyofbook)
    } catch (err) {
        res.status(500).send('Error' + err);
    }
});


module.exports = router