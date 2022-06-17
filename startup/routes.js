const userRoute = require(ROOT_DIR + '/routes/user/user.js');
const clientRoute = require(ROOT_DIR + '/routes/base/client.js');

module.exports = function(app){
	app.use('/api/users', userRoute);
	app.use('/api/clients', clientRoute);
}