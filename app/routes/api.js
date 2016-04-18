var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var Course     = require('../models/course');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to generate sample user
	apiRouter.post('/sample', function(req, res) {

		// look for the user named chris
		console.log(Course)

		User.findOne({ 'username': 'chris' }, function(err, user) {

			// if there is no chris user, create one
			if (!user) {
				var sampleUser = new User();

				sampleUser.name = 'Dede';  
				sampleUser.username = 'ivy'; 
				sampleUser.password = 'vampire';

				sampleUser.save();
			} else {
				console.log(user);

				// if there is a chris, update his password
				user.password = 'vampire';
				user.save();
			}

		});

	});

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			console.log(res.body)
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)
			user.avator = req.body.avator;
			user.location = req.body.location;
			user.gender = req.body.gender;
			user.birthday = req.body.birthday;
			user.aboutme = req.body.aboutme;
			user.websitelink = req.body.websitelink;
			user.country = req.body.country;
			user.type = req.body.type;

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	apiRouter.route('/courses')

		// create a course (accessed at POST http://localhost:8080/courses)
		.post(function(req, res) {
			console.log(res.body)
			var course = new Course();		// create a new instance of the User model
			course.instructorid = req.body.instructorid;  // set the courses name (comes from the request)
			course.title = req.body.title;  // set the courses coursename (comes from the request)
			course.subtitle = req.body.subtitle;  // set the courses password (comes from the request)
			course.language = req.body.language;
			course.category = req.body.category;
			course.instructionlevel = req.body.instructionlevel;
			course.duration = req.body.duration;
			course.summary = req.body.summary;
			course.coverimage = req.body.coverimage;
			course.video = req.body.video;
			course.price = req.body.price;
			course.review = req.body.review;

			course.save(function(err) {
				if (err) {
					return res.send(err);
				}
				// return a message
				res.json({ message: 'Course created!' });
			});

		})

		// get all the courses (accessed at GET http://localhost:8080/api/courses)
		.get(function(req, res) {

			Course.find({}, function(err, courses) {
				if (err) res.send(err);

				// return the courses
				res.json(courses);
			});
		});
	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				console.log(req.body)
				// if (req.body.user.avator) = req.body.avator;
				// if (req.body.user.location) = req.body.location;
				// if (req.body.user.gender) = req.body.gender;
				// if (req.body.user.birthday) = req.body.birthday;
				// if (req.body.user.aboutme) = req.body.aboutme;
				// if (req.body.user.websitelink) = req.body.websitelink;
				// if (req.body.user.country) = req.body.country;
				// if (req.body.user.type) = req.body.type;
				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	apiRouter.route('/courses/:course_id')

		// get the course with that id
		.get(function(req, res) {
			Course.findById(req.params.course_id, function(err, course) {
				if (err) res.send(err);

				// return that course
				res.json(course);
			});
		})

		// update the course with this id
		.put(function(req, res) {
			Course.findById(req.params.course_id, function(err, course) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) course.name = req.body.name;
				if (req.body.username) course.username = req.body.username;
				if (req.body.password) course.password = req.body.password;
				console.log(req.body)
				// if (req.body.user.avator) = req.body.avator;
				// if (req.body.user.location) = req.body.location;
				// if (req.body.user.gender) = req.body.gender;
				// if (req.body.user.birthday) = req.body.birthday;
				// if (req.body.user.aboutme) = req.body.aboutme;
				// if (req.body.user.websitelink) = req.body.websitelink;
				// if (req.body.user.country) = req.body.country;
				// if (req.body.user.type) = req.body.type;
				// save the user
				course.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the course with this id
		.delete(function(req, res) {
			Course.remove({
				_id: req.params.course_id
			}, function(err, course) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};