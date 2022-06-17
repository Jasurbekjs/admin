function parser(date) {
	date = new Date(date);;
	return {
		date: date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
		time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	};
}

function recursion(obj) {
	if(Array.isArray(obj)){
		for(el in obj){
			el = recursion(el);
		}
	}
	if(typeof obj === 'object' && obj !== null){
		Object.keys(obj).forEach(key => {
			if(key == "createdAt" || key == "updatedAt"){
				obj[key] = parser(obj[key]);
			}else{
				recursion(obj[key]);
			}
		})
	}
	return obj;
}

module.exports = recursion;