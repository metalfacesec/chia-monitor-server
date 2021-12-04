var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(`${__dirname}/../../db/chia-monitor.sql`);

class DbUtils {
	static init() {
		db.serialize(function() {
			db.run("CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
			db.run("CREATE TABLE IF NOT EXISTS heartbeat_log (id INTEGER PRIMARY KEY AUTOINCREMENT, clientId INT , created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
			db.run("CREATE TABLE IF NOT EXISTS system_log (id INTEGER PRIMARY KEY AUTOINCREMENT, clientId INT, totalMemory INT, freeMemory INT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
			db.run("CREATE TABLE IF NOT EXISTS wallets (id INTEGER PRIMARY KEY AUTOINCREMENT, walletId INT, ip TEXT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
			db.run("CREATE TABLE IF NOT EXISTS wallet_balance (id INTEGER PRIMARY KEY AUTOINCREMENT, walletId INT, balance TEXT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
			
			// TODO: This needs to be reworked using the new lib
			db.run("CREATE TABLE IF NOT EXISTS blockchain_log (id INTEGER PRIMARY KEY AUTOINCREMENT, clientId INT, size INT, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
		});
	}

	static insertOne(query, data) {
		return new Promise((resolve, reject) => {
			db.run(query, data, function(err) {
				if (err) {
					return reject(err.message);
				}
				
				resolve(this.lastID);
			});
		});
	}

	static query(query) {
		return new Promise((resolve, reject) => {
			db.serialize(function() {
				db.all(query, function(err, rows) {
					if (err) {
						return reject(err);
					}

					resolve(rows);
				});
			});
		});
	}
}

module.exports = DbUtils;