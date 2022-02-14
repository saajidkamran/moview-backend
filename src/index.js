const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//API Controllers
const allReview = require('./controllers/get/get-all-review');
const postReview = require('./controllers/post/post-review');
const server = require('./config/set-server-port');
const database = require('./config/database');

//database connection
database();

//intializing cors & express
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

//fetching API
app.route('/moview/api').get(allReview).post(postReview);

// initializing port
const port = process.env.PORT || 3000;
//connecting to server
app.listen(port, server);
