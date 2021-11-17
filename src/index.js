const express = require('express');
const DbUtils = require('./utils/DbUtils');
const DeviceUtils = require('./utils/DeviceUtils');
const RequestUtils = require('./utils/RequestUtils');
const HeartbeatUtils = require('./utils/HeartbeatUtils');

var app = express();

app.get('/connect', function (req, res) {
	res.send('Hello World');
});

app.post('/log-heartbeat', function (req, res) {
	let ip = RequestUtils.getIpFromRequest(req);
	HeartbeatUtils.log(ip);
	
	res.send('Hello World');
});

app.post('/register', function (req, res) {
	let ip = RequestUtils.getIpFromRequest(req);
	Client.create(ip);
	
	res.send('Hello World');
});

app.get('/devices', async function (req, res) {
	try {
		let devices = await DeviceUtils.getAll();
		res.send({status: 200, data: devices});
	} catch (err) {
		res.send({status: 500, data: []});
	}
});

var server = app.listen(8081, function () {
	let host = server.address().address;
	let port = server.address().port;

	DbUtils.init();
	
	console.log("App listening at http://%s:%s", host, port)
});