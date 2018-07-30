const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require ('./controllers/image.js');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'm2laks9e1',
		database: 'smart-brain'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;

if(PORT){
	app.listen(process.env.PORT , () => {
		console.log(`server levantado en puerto ${PORT}`);
	})
} else {
	app.listen(3000 , () => {
		console.log('server levantado en puerto 3000');
	})
}

app.get('/', (req, res) => { res.json('working!') })

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(get, res, db)})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})