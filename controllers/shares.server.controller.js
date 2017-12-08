var mongoose = require('mongoose');
var Share = require('./../models/Share.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Share.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  console.log(req.body);
  var share = new Share(req.body);
  share.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.share);
};

module.exports.view = function(req, res) {
  res.render('./../public/views/share/view.ejs', {
    request: req,
    share: req.share
  });
};


exports.delete = function(req, res) {
	var share = req.share;
	share.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(share);
		}
	});
};


module.exports.update = function(req, res) {
    var share = req.share;

  	share = _.extend(share, req.body);

  	share.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(share);
  		}
  	});
};

exports.shareByID = function(req, res, next, id) {
    console.log(id);
	  Share.findById(id)
    // id = String(id);
    // Share.findOne({'fid': id})
	     // .populate('user', 'email')
	      .exec(function(err, share) {
		if (err) return next(err);
		if (!share) return next(new Error('Failed to load share ' + id));
		req.share = share;
		next();
	});
};
