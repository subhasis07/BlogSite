const express= require('express')
const app =express();

const cors= require('cors')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const jwt = require("jsonwebtoken")

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
const dotenv = require("dotenv")
dotenv.config();


const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qmhyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

app.post('/register', async (req,res) => {

  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, `${process.env.DB_SECRET}`, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, `${process.env.DB_SECRET}`, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.listen(4000);