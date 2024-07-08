const mongoose = require('mongoose')
const user = require('./user')
const books = require('./books')


const historySchema = new mongoose.Schema({

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    bookId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: books
    },
    BorrowedDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    expectedreturnDate: {
        type: Date
    }
    
})

module.exports = mongoose.model('History', historySchema)