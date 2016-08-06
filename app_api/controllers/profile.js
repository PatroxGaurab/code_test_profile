var mongoose = require('mongoose');
var User = mongoose.model('User');
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {

		res.status(200).json(user);
	//}
	//res.status(200).json({redirect_to: sig});
      });
  }

};

module.exports.profileEdit = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	User.findOneAndUpdate({ _id : req.payload._id }, req.body.updateParam , {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
	//res.status(200).json(req.body.name);

  }

};


module.exports.uploadImage = function(req, res) {
console.log(req.files);
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	    var file = req.files.file;
	    console.log(file.name);
	    console.log(file.type);

  }

};

