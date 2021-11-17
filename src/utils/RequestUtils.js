class RequestUtils {
	static getIpFromRequest(req) {
		let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
		if (ip.substr(0, 7) == "::ffff:") {
			return ip.substr(7);
		}

		return ip;
	}
}

module.exports = RequestUtils;