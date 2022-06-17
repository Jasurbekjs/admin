const userModel = require(ROOT_DIR + '/models/user/user.js');

function createUser(user) {
	return userModel.create(user);
}
function updateUser(user, params) {
	return userModel.update(user, params);
}
function deleteUser(params) {
	return userModel.destroy(params);
}
function getUsers(params, pagination, order) {
	const {where, transaction} = params;
	return userModel.findAndCountAll({
		where: where,
		transaction: transaction,
		raw: true,
	  order:order,
	  limit: pagination.limit,
	  offset: pagination.offset
	});

}
function getAllUsers(params) {
	return userModel.findAll(params);
}
function getUser(params) {
	return userModel.findOne(params);
}

const userDAO = {
	'createUser': createUser,
	'updateUser': updateUser,
	'deleteUser': deleteUser,
	'getUsers': getUsers,
	'getAllUsers':  getAllUsers,
	'getUser': getUser
}

module.exports = userDAO;