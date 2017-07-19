// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var path       = require('path');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

var port     = process.env.PORT || 3001; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var User     = require('./app/models/user');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

	// create a bear (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res) {

		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({
				message: 'User created!',
				user: user,
			});
		});


	})

	// get all the users (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {
		console.log('getting usersssss');
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});


router.route('/login')

	// create a bear (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res) {
		console.log('/login', req.body);
		const user = {
			username: req.body.username,
			password: req.body.password
		}
		User.findOne(user, function (err, user) {
			if(user){
				console.log('user', user);
				res.json({
					user: user,
				});
			} else {
				console.log('no user found');
			}
		})
	})


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
