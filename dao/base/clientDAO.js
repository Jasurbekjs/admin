const clientModel = require(ROOT_DIR + '/models/base/client.js');

function createClient(client) {
	return clientModel.create(client);
}
function updateClient(client, params) {
	return clientModel.update(client, params);
}
function deleteClient(params) {
	return clientModel.destroy(params);
}
function getClients(params, pagination, order) {
	return clientModel.findAndCountAll({
		where:params,
		raw: true,
	  order:order,
	  limit: pagination.limit,
	  offset: pagination.offset
	});

}
function getAllClients(params) {
	return clientModel.findAll(params);
}
function getClient(params) {
	return clientModel.findOne(params);
}

const clientDAO = {
	'createClient': createClient,
	'updateClient': updateClient,
	'deleteClient': deleteClient,
	'getClients': getClients,
	'getAllClients':  getAllClients,
	'getClient': getClient
}

module.exports = clientDAO;