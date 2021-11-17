const express = require('express');
const bodyParser = require('body-parser');
const DbUtils = require('./utils/DbUtils');
const DeviceUtils = require('./utils/DeviceUtils');
const RequestUtils = require('./utils/RequestUtils');
const HeartbeatUtils = require('./utils/HeartbeatUtils');
const SystemLogUtils = require('./utils/SystemLogUtils');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/connect', function (req, res) {
	res.send('Hello World');
});

app.post('/log-heartbeat', function (req, res) {
	let ip = RequestUtils.getIpFromRequest(req);
	HeartbeatUtils.log(ip);
	
	res.send('Hello World');
});

app.post('/log-system-stats', async function (req, res) {
	if (typeof req.body.total_memory === 'undefined' || typeof req.body.free_memory === 'undefined') {
		return res.send({status: 500});
	}

	let ip = RequestUtils.getIpFromRequest(req);
	
	await SystemLogUtils.insert(ip, req.body.total_memory, req.body.free_memory);
	
	res.send({status: 200});
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

app.get('/device-heartbeat-log', async function (req, res) {
	if (Number.isNaN(req.query.id)) {
		return res.send({status: 500, data: []});
	}
	
	try {
		let devices = await DeviceUtils.getDeviceHeartbeatLog(req.query.id, 50);
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