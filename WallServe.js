var express = require('express');
var low = require('lowdb');

var app = express();
var db = low('db.json');

var isStopping = false;

app.locals.title = "WallServe";
app.locals.email = "a.ackermann@wolpertingergames.com";
app.use(express.static('static'));

app.use(function(req,resp, next) {
	if ( !isStopping) {
		return next();
	}
	else {
		resp.setHeader('Connection','close');
		resp.send(503,"Server is stopping");
	}
});

// we could also just serve static pages and load all data via ajax

var display = express();
display.get('/', function(req, res) {
	res.send('display');
})

var control = express();
control.get('/', function(req, res) {
	res.send('control');
})

app.use('/display', display);
app.use('/control', control);

var httpListener = app.listen(8089);

function shutDown() {
	isStopping = true;
	
	httpListener.close( function() {
		console.log("Colising DB");		
		db.save();
		console.log("DB closed");
		process.exit();
	});
	
	setTimeout(function() {
		console.error("shutDown timed out");
		process.exit(1);
	}, 30 * 1000);
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);