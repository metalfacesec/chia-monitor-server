const DbUtils = require('./DbUtils');

class DeviceUtils {
	static async getAll() {
		return await DbUtils.query(`SELECT c.id, c.ip, c.created, (SELECT created FROM heartbeat_log WHERE clientId=c.id ORDER BY created DESC LIMIT 1) as last_heartbeat FROM client c`);
	}
}

module.exports = DeviceUtils;