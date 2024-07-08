const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    book_borrowed : {
        type :[String],
        required: true
    }
    // history : {
    //     book : {
    //         type: [String],
    //         required: true
    //     },
    //     returnDate : {
    //         type: [Date],
    //         required: true  
    //     } 
    // }
    
})

module.exports = mongoose.model('User', userSchema)