const DbUtils = require('./DbUtils');

class HeartbeatUtils {
	static async log(ip) {
		try {
			let clientID = null;
			let client = await DbUtils.query(`SELECT * FROM client WHERE ip = '${ip}' LIMIT 1`);

			if (client.length) {
				clientID = client[0].id;
			} else {
				clientID = await DbUtils.insertOne(`INSERT INTO client (ip) VALUES (?)`, [ip]);
			}

			if (clientID === null) {
				return;
			}

			await DbUtils.insertOne(`INSERT INTO heartbeat_log (clientId) VALUES (?)`, [clientID]);
		} catch (e) {
			console.log(e);
		}
		
	}
}

module.exports = HeartbeatUtils;