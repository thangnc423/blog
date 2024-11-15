const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://blog:qNz46U6h2QTaCrmR@cluster0.cco02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt)});
        res.json(userDoc);
    } catch(e) {
        res.status(400).json(e);
    }
});

app.listen(4000);
// mongodb+srv://blog:qNz46U6h2QTaCrmR@cluster0.cco02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// qNz46U6h2QTaCrmR