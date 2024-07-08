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








module.exports = router