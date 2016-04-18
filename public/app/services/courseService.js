angular.module('courseService', [])

.factory('Course', function($http) {

	// create a new object
	var courseFactory = {};

	// get a single course
	courseFactory.get = function(id) {
		return $http.get('/api/courses/' + id);
	};

	// get all courses
	courseFactory.all = function() {
		return $http.get('/api/courses/');
	};

	// create a course
	courseFactory.create = function(courseData) {
		return $http.post('/api/courses/', courseData);
	};

	// update a course
	courseFactory.update = function(id, courseData) {
		return $http.put('/api/courses/' + id, courseData);
	};

	// delete a course
	courseFactory.delete = function(id) {
		return $http.delete('/api/courses/' + id);
	};

	// return our entire courseFactory object
	return courseFactory;

});