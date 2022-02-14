const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


//API Controllers
const postReview = require('./controllers/post/post-review');
const allReview = require('./controllers/get/get-all-review');
const {server,port} = require('./config/set-server-port');




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
app.route('/moview/api').get(allReview)
.post(postReview);



//connecting to server
app.listen(port, server);
