module.exports = function(app){

 var shares = require('./../controllers/shares.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

app.route('/api/shares')
    .get(shares.list)
    .post(shares.create);

app.route('/api/shares/:shareId')
	.get(shares.read)
    .delete(users.requiresLogin, shares.delete);

app.route('/api/shares/edit/:shareId')
	.get(shares.read)
	.put(users.requiresLogin, shares.update);
	
app.route('/shares/:shareId')
	.get(shares.view)


app.param('shareId', shares.shareByID);


}
