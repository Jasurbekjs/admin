module.exports = function isAdmin(req, res ,next){
	if(req.body.user.role === 'supervisor'){
		next();
	}else{
		return res.status(403).send({error: "Нет разрешения на данное дейстивие! ad"});
	}
}