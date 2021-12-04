const DbUtils = require('./DbUtils');

class WalletUtils {
	static async getOrCreateByWalletId(walletId, ip) {
		let wallet = await DbUtils.query(`SELECT id FROM wallets WHERE walletId = ${walletId} AND ip='${ip}'`);
		if (wallet.length) {
			return wallet[0].id;
		}

		return await DbUtils.insertOne(`INSERT INTO wallets (walletId, ip) VALUES (?, ?)`, [walletId, ip]);
	}

	static async insertBalance(walletId, balance) {
		return await DbUtils.insertOne(`INSERT INTO wallet_balance (walletId, balance) VALUES (?, ?)`, [walletId, balance]);
	}
}

module.exports = WalletUtils;