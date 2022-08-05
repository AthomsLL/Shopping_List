require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

// MongoDB Database connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Database Shopping_List connected !'))
	.catch(() => console.log('MongoDB Database connection failed !'))

// Helmet initialization
app.use(helmet());

// CORS Configuration
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Conntent-Type', 'Application/json');
	res.removeHeader('X-Powered-By');
	next();
});

// Passport initialization
app.use(passport.initialize());

// JWT strategy call
require('./middleware/passport')(passport);

// Reading requests Content
app.use(bodyParser.json());

// Routes calls
app.use('api/products', productRoutes);
app.use('api/auth', userRoutes);

module.exports = app;
