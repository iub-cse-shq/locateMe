module.exports = function(app){

 var groups = require('./../controllers/groups.server.controller.js');
 var persons = require('./../controllers/persons.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

app.route('/api/groups')
    .get(groups.list)
    .post(users.requiresLogin, groups.create);

app.route('/api/groups/:groupId')
	.post(users.requiresLogin, groups.read)
    .delete(users.requiresLogin, groups.delete);

app.route('/api/groups/edit/:groupId')
	.get(groups.read)
	.put(users.requiresLogin, groups.update);

app.route('/api/groups/')
    .get(groups.list)
    .post(users.requiresLogin, groups.create);
    
app.route('/api/groups/join/:groupId')
    .post(users.requiresLogin, groups.join);




app.param('groupId', groups.groupByID);
app.param('personId', persons.personByID);

}
