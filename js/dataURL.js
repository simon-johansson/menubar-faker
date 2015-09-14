
const URL = require('url');
const http = require('http');

module.exports = function(sURL, callback) {
	const oURL = URL.parse(sURL);
	const client = http.createClient(80, oURL.hostname);
	const request = client.request('GET', oURL.pathname, {'host': oURL.hostname});

	request.end();
	request.on('response', function (response) {
		var type = response.headers["content-type"];
		var prefix = "data:" + type + ";base64,";
		var body = "";

		response.setEncoding('binary');
		response.on('end', function () {
	    var base64 = new Buffer(body, 'binary').toString('base64');
	    var data = prefix + base64;
	    callback(data);
		});

		response.on('data', function (chunk) {
			if (response.statusCode == 200) body += chunk;
		});
	});
}
