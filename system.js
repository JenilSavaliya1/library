const express= require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/library'
const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const connect = mongoose.connection

connect.on('open',() =>{
    console.log('connected')
})
app.use(express.json()) //middleware 

const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

const userRouter = require('./routes/user')
app.use('/user', userRouter) 

const historyRouter = require('./routes/history')
app.use('/history', historyRouter)

app.listen(9000, () =>{
    console.log('server started')
})