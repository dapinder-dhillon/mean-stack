var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var serverDetails = new Schema({
	hostname: String,
	ip: String,
	status: String,
	path: String,
	host: String,
	port: String
});

var hostDetail = new Schema({
	hostHdrName: String,
	hostDetails: [serverDetails]
});

var keyValue = new Schema({
	keyHdrName: String,
	keyValueData: [{key: String, value:String}]
});

var envSchema = new Schema({
	hostnme: String,
	ip: String,
	cpu: String,
	memory: String,
	disk: String,
	downtime: String,
 	version: String,
 	hostDetails: [hostDetail],
 	keyValues: [keyValue],
	activities:{
		recent: [keyValue],
		planned: [keyValue]
	}
});

var dashboardSchema = new Schema({
	envName: String,
	envDetails: [envSchema]
});

var Dashboard = mongoose.model('Dashboard', dashboardSchema);
var EnvSchema = mongoose.model('EnvSchema', envSchema);

module.exports = {
    Dashboard: Dashboard,
    EnvSchema: EnvSchema
};
