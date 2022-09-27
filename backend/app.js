const express = require('express');
const mongoose = require('mongoose');

const {User} = require("./dataBase");


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user)
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await app.listen(+process.env.PORT, process.env.HOST);
        console.log(`Server listening on ${process.env.PORT} port...`);
    } catch (e) {
        console.log(e);
        console.log('Error!!');
    }
}

start()
