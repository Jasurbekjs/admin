module.exports = (req, res, next) => {
	let per_page = (req.query.per_page ? Number(req.query.per_page) : 10);
	let page = (req.query.page ? (Number(req.query.page) - 1) * per_page : 0);

	req.body.pagination = {
		limit: per_page,
		offset: page
	}

	delete req.query.page;
	delete req.query.per_page;
	req.body.params = req.query;
	next();
}