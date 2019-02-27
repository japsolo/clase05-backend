const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const faker = require('faker');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.listen(3030, function () {
	console.log('Listening 3030 port');
});

app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
// Las views se van a buscar dentro de una carpeta llamada "views". Las vistas deben tener extensión *.ejs.

// Route System

let personas = [];

for (var i = 1; i <= 15; i++) {
	personas.push({
		name: faker.name.firstName(),
		lastName: faker.name.lastName(),
		avatar: faker.image.imageUrl()
	});
}

app.get('/testView', function (req, res) {
	res.render('test', { usuarios: personas });
});

app.get('/', function (req, res) {
	let pathToIndex = path.join(__dirname, '/pages/index.html');
	let indexHTML = fs.readFileSync(pathToIndex, 'utf-8');
	res.send(indexHTML);
});

app.get('/registerok', function (req, res) {
	let pathToWelcome = path.join(__dirname, '/pages/welcome.html');
	let welcomeHTML = fs.readFileSync(pathToWelcome, 'utf-8');
	welcomeHTML = welcomeHTML.replace('{USER}', req.query.user);
	welcomeHTML = welcomeHTML.replace('{EMAIL}', req.query.email);
	welcomeHTML = welcomeHTML.replace('{AGE}', req.query.age);
	welcomeHTML = welcomeHTML.replace('{CITY}', req.query.city);
	res.send(welcomeHTML);
});

app.post('/registerok', urlEncodedParser, function (req, res) {
	let pathToWelcome = path.join(__dirname, '/pages/welcome.html');
	let welcomeHTML = fs.readFileSync(pathToWelcome, 'utf-8');
	welcomeHTML = welcomeHTML.replace('{USER}', req.body.user);
	welcomeHTML = welcomeHTML.replace('{EMAIL}', req.body.email);
	welcomeHTML = welcomeHTML.replace('{AGE}', req.body.age);
	welcomeHTML = welcomeHTML.replace('{CITY}', req.body.city);
	res.send(welcomeHTML);
});
