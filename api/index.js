const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMidddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'b3tC9$hZ8*R5wLf@K1pX7&vG0jYq!dZm';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

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

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    // if user is not found
    if (!userDoc) {
        return res.status(400).json("User not found");
    }
    const passValid = bcrypt.compareSync(password, userDoc.password);
    if (passValid) {
        // correct username and password
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) {
                return res.status(500).json("Error creating token");
            }
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json("Wrong login credentials.");
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    // if logged out, reset cookie token to empty string
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMidddleware.single('file'), async (req, res) => {
    // handles new post creation requests
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length -1];
    const newPath = path+'.'+extension
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary, 
            content, 
            cover:newPath,
            author:info.id,
        });
    
        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
});

app.listen(4000);
// mongodb+srv://blog:qNz46U6h2QTaCrmR@cluster0.cco02.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// qNz46U6h2QTaCrmR