const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { ERROR_MESSAGES, STATUS_MESSAGES, SUCCESS_MESSAGES } = require('../src/config/message');
const authRoute = require('./config/auth');
 require('dotenv').config();

 console.log(process.env.CLIENT_ID)

//intializing cors & express

app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(
    session({
        secret: 'this is sk sec',
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

//API Controllers
const postReview = require('./controllers/post/post-review');
const allReview = require('./controllers/get/get-all-review');
const { server, port } = require('./config/set-server-port');
const { User } = require('./config/database');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//fetching API
app.route('/moview/api').get(allReview).post(postReview);
app.use('/auth', authRoute);

app.post('/login', function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function () {
                res.status(200).send({
                    staus: STATUS_MESSAGES.SUCCESS,
                    data: {
                        successMessage: SUCCESS_MESSAGES.RESOURCE_ADDED,
                    },
                });
            });
        }
    });
});

app.post('/register', function (req, res) {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            res.status(404).send({
                staus: STATUS_MESSAGES.FAIL,
                data: {
                    errorMessage: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                },
            });
        } else {
            passport.authenticate('local')(req, res, () => {
                res.status(200).send({
                    staus: STATUS_MESSAGES.SUCCESS,
                    data: {
                        successMessage: SUCCESS_MESSAGES.RESOURCE_ADDED,
                    },
                });
            });
        }
    });
});

//connecting to server
app.listen(port, server);
