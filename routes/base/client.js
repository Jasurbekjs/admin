const {express, jsonParser} = require(ROOT_DIR + "/startup/exporter.js");

const {adminDB} = require(ROOT_DIR + "/db");

const {clientDAO} = require(ROOT_DIR + "/startup/exporter.js");

const {auth, pagExt} = require(ROOT_DIR + "/startup/exporter.js");

const {isAdmin} = require(ROOT_DIR + "/startup/exporter.js");

const {timeParser} = require(ROOT_DIR + "/startup/exporter.js");

const router = express.Router();

router.post('/create', [jsonParser, auth, isAdmin], async (req, res) => {
	clientDAO.createClient(req.body.client)
	.then(client => res.status(200).send({'status':true,'details':(client.get())}))
	.catch(err => res.send({'status': false, "error":err}));
});

router.put('/edit/:id', [jsonParser, auth, isAdmin], async (req, res) => {
	clientDAO.updateClient(req.body.client, {where: {id: req.params.id}, raw: true})
	.then(() => res.status(200).send({'status': true}))
	.catch(err => res.send({'status': false, "error":err}));
});

router.delete('/delete/:id', [jsonParser, auth, isAdmin], async (req, res) => {
	clientDAO.deleteClient({ where:{ id: req.params.id}, raw: true})
	.then(() => res.status(200).send({'status': true}))
	.catch(err => res.send({'status': false, "error":err}));
});


router.get('/show', [jsonParser, auth, pagExt], async (req, res) => {
	clientDAO.getClients(req.body.params, req.body.pagination, [['id', 'DESC']])
	.then(clients => 
		{
			res.status(200).send({
	  	'status': true,
	  	"data": clients.rows,
	  	"total": Math.ceil( clients.count / req.body.pagination.limit),
	  	"count": clients.count})
		})
		.catch(err => res.send({'status': false, 'error': err}));
});

router.get('/show/:id', [jsonParser, auth], async (req, res) => {
	clientDAO.getClient({where: {id: req.params.id}, raw: true})
	.then(client => res.status(200).send({'status':true,'clients':(client)}))
	.catch(err => res.send({'status': false, "error":err}));
});

router.get('/find', [jsonParser, auth], async (req,res) => {
	clientDAO.getClients(req.query)
	.then(clients => res.status(200).send({'status': true, 
		"clients": (clients.rows), "count": clients.count}))
	.catch(err => res.send({'status': false, 'error': err.message}));
});

router.get('/orders', [jsonParser, auth, pagExt], async (req, res) => {
  let respData = {};
  return adminDB.transaction( async t => {
  	await clientDAO.getClient({where: req.body.params, raw: true, transaction: t}).then( async client => {
  		await orderDAO.getOrders({where: {client_id: client.id}, transaction: t}, req.body.pagination).then( orders => {
  			orders.rows.forEach( async (order, index) => {
  				orders[index].layers = await orderLayerDAO.getAllLayers({where: {order_id: order.id}, raw:true, transaction: t});
  				orders[index].price = await orderPriceDAO.getPrice({where: {order_id: order.id}, raw: true, transaction :t});
  			});
  			 respData = {
  				"client": (client),
  				"orders": (orders),
  				"total": Math.ceil(orders.count / req.body.pagination.limit),
  				"count": orders.counts
  			}
  		})
  	})
  })
  .then(result => res.status(200).send({'status': true, "client": respData.client, "orders": respData.orders, "total": respData.pages, "count": respData.count}))
  .catch(err => res.status(200).send({'status': false, 'error': err}));
});







module.exports = router;