const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next){
	const token = req.header('x-auth-token');
	if(!token)
	{
		return res.status(401).send({error: "Token не обнаружен!"});
	}

	try{
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		let expireCheck = ((Date.parse(new Date))/1000 - decoded.iat);
		expireCheck = ((expireCheck / 60)/60)/24;
		if (expireCheck > 1){
			return res.status(200).send({error: "Время действия токена истекло!"});
		}
		req.body.user = decoded;
		next();
	}
	catch(err){
		return res.status(401).send({error: "Token не действителен!"});
	}
}