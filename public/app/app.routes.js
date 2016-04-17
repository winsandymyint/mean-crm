// angular.module('app.routes',['ngRoute'])
// .config(function($routeProvider,$locationProvider){
// 	$routeProvider
// 	.when('/',{
// 		templateUrl : 'app/views/pages/home.html'
// 	})
// 	.when('/login',{
// 		templateUrl : 'app/views/pages/login.html'
// 		controller  : 'mainController',
// 		controlerAs : 'login'
// 	});

// 	$locationProvider.html5Mode(true);
// });

angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login'
		})
		
		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		});
		
		// show all courses
		.when('/courses', {
			templateUrl: 'app/views/pages/courses/all.html',
			controller: 'courseController',
			controllerAs: 'course'
		})

		// form to create a new courses
		// same view as edit page
		.when('/courses/create', {
			templateUrl: 'app/views/pages/courses/single.html',
			controller: 'courseCreateController',
			controllerAs: 'course'
		})

		// page to edit a courses
		.when('/courses/:course_id', {
			templateUrl: 'app/views/pages/courses/single.html',
			controller: 'courseEditController',
			controllerAs: 'course'
		});

	$locationProvider.html5Mode(true);

});