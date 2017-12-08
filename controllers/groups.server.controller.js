var mongoose = require('mongoose');
var Group = require('./../models/Group.js');
var Person = require('./../models/Person.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Group.find(function(err, data) {
    if (err) {
      return res.status(400).send({

        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  console.log(req.body);
  var group = new Group(req.body);
  group.save(function(err, data) {
    if (err) {
      return res.status(400).send({

        message: errorHandler.getErrorMessage(err)
      });
    }
    else {
      res.status(200).send(data);
    }
  });
  
  var pid = req.body.persons[0];
  Person.findById(pid)
	      .exec(function(err, person) {
		if (err) return console.log(err);
		if (!person) console.log('Failed to load person ' + pid);
		person.groups.push(group._id);
		person.save(function(err, data){
		  if(err) console.log('person group update failed');
		  else console.log(data);
		});
  });
};

module.exports.read = function(req, res) {
  res.json(req.group);
};


exports.delete = function(req, res) {
  var group = req.group;
  group.remove(function(err) {
    if (err) {
      return res.status(400).send();
    }
    else {
      res.json(group);
    }
  });
};


module.exports.update = function(req, res) {
  var group = req.group;

  group = _.extend(group, req.body);

  group.save(function(err) {
    if (err) {
      return res.status(400).send();
    }
    else {
      res.json(group);
    }
  });
};

module.exports.join = function(req, res) {
  var group = req.group;
  var alreadyJoined = false;
  group.persons.forEach(function(e){
    if(String(e._id) === req.body.person) alreadyJoined = true;
    console.log(e._id +' - '+req.body.person);
  });
  
  if(alreadyJoined) return res.status(400).send();
  
  group.persons.push(req.body.person);
  group.save(function(err) {
    if (err) {
      return res.status(400).send();
    }
    else {
      res.json(group);
    }
  });
  
  Person.findById(req.body.person).exec(function(err,person){
    if(err) return console.log(err);
    if (!person) return console.log(new Error('Failed to load person ' + req.body.person));
    
    person.groups.push(group._id);
    person.save(function(err){
      if(err) return console.log(err);
      if (!person) return console.log(new Error('Failed to load person ' + req.body.person));
      console.log("Person("+person.fid+") joined group("+group._id+")!")
    });
  });
};

exports.groupByID = function(req, res, next, id) {
  console.log(id);
  Group.findById(id)
    .populate('persons')
    // id = String(id);
    // Group.findOne({'fid': id})
    // .populate('user', 'email')
    .exec(function(err, group) {
      if (err) return next(err);
      if (!group) return next(new Error('Failed to load group ' + id));
      req.group = group;
      next();
    });
};
