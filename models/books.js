const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    status : { 
        available: {
            type: Boolean,
            required: true
        },
        date_available: {
            type: Date
        }
    }
})

module.exports = mongoose.model('Books', booksSchema)