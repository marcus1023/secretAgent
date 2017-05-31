var express = require('express');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');
var massive = require('massive');
var connect = massive.connectSync({connectionString: config.connectionString});
var massiveInstance = massive.connectSync({connectionString : config.connectionString})
var app = module.exports = express();

app.set('db', massiveInstance);
var db = app.get('db');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge:(1000*60*60*24*7)
	}
}));

//DB controllers required
let missionCrtl = require('./controllers/missions.js') ;

// check missions every 2 seconds and delete timed out ones
function checkMissions(){
	missionCrtl.checkMissions();
}
setInterval(checkMissions, 20000);


// system API routes
// Create a new Mission
app.post('/api/createMission', missionCrtl.createMission);

app.listen(3000 , function(){
  console.log('I\'m listening on port 3k ');
})
