const DbUtils = require('./DbUtils');

class BlockchainUtils {
	static async insert(clientIp, size) {
		// TODO: Method me
		let clientId = null;
		let client = await DbUtils.query(`SELECT * FROM client WHERE ip = '${clientIp}' LIMIT 1`);

		if (client.length) {
			clientId = client[0].id;
		} else {
			clientId = await DbUtils.insertOne(`INSERT INTO client (ip) VALUES (?)`, [clientIp]);
		}

		return await DbUtils.insertOne("INSERT INTO blockchain_log (clientId, size) VALUES (?,?)", [clientId, size]);
	}
}

module.exports = BlockchainUtils;