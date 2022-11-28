//npm install --save-dev nodemon

const express = require('express');
const mongoose = require("mongoose")
const app = express();
const url = 'mongodb+srv://sfq:sfq123@realmcluster.expo3mw.mongodb.net/UserDB?retryWrites=true&w=majority';
const cors = require('cors')


app.use(express.json()) // json format use cheyyaaaan

app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect(url, {
    useNewUrlParser: true, //warning oyivakkaan {}
    useUnifiedTopology: true,
    // useCreateIndex: true
})
const con = mongoose.connection  // we will hold on connection
con.on('open', function () {
    console.log("connected...")
})

const userRouter = require("./router/userRouter")
app.use('/user',userRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("server is running 0n 4000")
})

