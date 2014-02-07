
/*
 * GET users listing.
 */
mongoose = require('mongoose');
//mongoose.connect('192.168.0.108','mydb');
mongoose.connect('mongodb://192.168.0.108/mydb');
Schema = mongoose.Schema;
userSchema = new Schema({
	name:String,
	pwd:String
});
UsersModel = mongoose.model('users',userSchema);

exports.listUser = function(req, res){
	UsersModel.find(function (err, docs) {
	  res.render('index', { users : docs });
	});

};

exports.addUser = function(req,res){
	var _name = req.query.name;
	var _pwd = req.query.pwd;
	var _entry = new UsersModel({
		name:_name,
		pwd:_pwd
	});
	_entry.save(function (err,docs){
		UsersModel.find(function (err, docs) {
		  res.render('index', { users : docs });
		});
	});
}

exports.deleteUser = function(req,res){
	var _id = req.query.id;
	UsersModel.remove({_id:_id},function(err,docs){
				UsersModel.find(function (err, docs) {
				  res.render('index', { users : docs });
				});
		});
}

exports.updateUser = function(req,res){
	var _id = req.query.id;
	var _name = req.query.name;
	var _pwd = req.query.pwd;
	var _entry = new UsersModel({
		name:_name,
		pwd:_pwd
	});
	_entry.save(function (err,docs){
		UsersModel.find(function (err, docs) {
		  res.send(docs);
		});
	});
	
}