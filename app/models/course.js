var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// couse schema 
var CouseSchema   = new Schema({
	instructorid: String,
	title: String,
	subtitle: String, 
	language: String, 
	category: String,
	instructionlevel: String,
	duration: String,
	summary: String, 
	coverimage: String, 
	video: String, 
	price: String,
	review: String
});

// hash the password before the couse is saved
/*CouseSchema.pre('save', function(next) {
	var couse = this;

	// hash the password only if the password has been changed or couse is new
	if (!couse.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(couse.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		couse.password = hash;
		next();
	});
});*/

// method to compare a given password with the database hash
/*CouseSchema.methods.comparePassword = function(password) {
	var couse = this;

	return bcrypt.compareSync(password, couse.password);
};*/

module.exports = mongoose.model('Course', CouseSchema);