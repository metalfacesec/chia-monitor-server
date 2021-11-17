const DbUtils = require('./DbUtils');

class DeviceUtils {
	static async getAll() {
		return await DbUtils.query(`SELECT c.id, c.ip, c.created, (SELECT created FROM heartbeat_log WHERE clientId=c.id ORDER BY created DESC LIMIT 1) as last_heartbeat FROM client c`);
	}

	static async getDeviceHeartbeatLog(clientId, limit) {
		return await DbUtils.query(`SELECT c.id, c.ip, hl.created as heartbeat_time FROM client c LEFT JOIN heartbeat_log hl ON hl.clientId = c.id WHERE c.id=${clientId} ORDER BY hl.created DESC LIMIT ${limit}`);
	}
}

module.exports = DeviceUtils;