const DbUtils = require('./DbUtils');

class SystemLogUtils {
	static async insert(clientIp, total_memory, free_memory) {
		// TODO: Method me
		let clientId = null;
		let client = await DbUtils.query(`SELECT * FROM client WHERE ip = '${clientIp}' LIMIT 1`);

		if (client.length) {
			clientId = client[0].id;
		} else {
			clientId = await DbUtils.insertOne(`INSERT INTO client (ip) VALUES (?)`, [clientIp]);
		}

		return await DbUtils.insertOne("INSERT INTO system_log (clientId, totalMemory, freeMemory) VALUES (?,?,?)", [clientId, total_memory, free_memory]);
	}

	static async get() {
		let log = await DbUtils.query(`SELECT * FROM system_log ORDER BY created DESC LIMIT 20`);
		return log;
	}
}

module.exports = SystemLogUtils;