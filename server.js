//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true,
  }
});


const app = express();
app.use(cors());
app.use(bodyParser.json());


const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password:'cookie',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2223',
      name: 'Taka',
      email: 'Taka@gmail.com',
      password:'cookie22',
      entries: 0,
      joined: new Date()
    },
  ]
};



app.get('/', (req,res) =>{
  console.log('app is working!');
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000,() =>{
  console.log("server running on port 3000");
});
