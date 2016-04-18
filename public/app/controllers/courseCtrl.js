angular.module('courseCtrl', ['courseService'])

.controller('courseController', function(Course) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the courses at page load
	Course.all()
		.success(function(data) {

		console.log(vm.processing)
		console.log(data)
			// when all the courses come back, remove the processing variable
			vm.processing = false;

			// bind the courses that come back to vm.courses
			vm.courses = data;
		});

	// function to delete a user
	vm.deleteCourse = function(id) {
		console.log("DELETE")
		vm.processing = true;

		Course.delete(id)
			.success(function(data) {

				// get all courses to update the table
				// you can also set up your api 
				// to return the list of courses with the delete call
				Course.all()
					.success(function(data) {
						vm.processing = false;
						vm.courses = data;
					});

			});
	};

})

// controller applied to user creation page
.controller('courseCreateController', function(Course) {
	console.log("COURSE CREATION")
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveCourse = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the userService
		Course.create(vm.courseData)
			.success(function(data) {
				vm.processing = false;
				vm.courseData = {};
				vm.message = data.message;
			});
			
	};	

})

// controller applied to user edit page
.controller('courseEditController', function($routeParams, Course) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the user data for the user you want to edit
	// $routeParams is the way we grab data from the URL
	Course.get($routeParams.user_id)
		.success(function(data) {
			vm.courseData = data;
		});

	// function to save the user
	vm.saveCourse = function() {
		vm.processing = true;
		vm.message = '';

		// call the userService function to update 
		Course.update($routeParams.user_id, vm.courseData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.courseData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});