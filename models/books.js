const mongoose = require('mongoose')
const user = require('./user')

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
            required: true,
            default: true
        },
        returnDate: {
            type: String,
            
        },
        assignedTo: {
        type: mongoose.Schema.Types.ObjectId, //assigned the user id to the book borrowed
        ref : user
        }
    }
})

module.exports = mongoose.model('Books', booksSchema)