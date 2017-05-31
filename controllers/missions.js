let app = require('../server.js') ;
var massive = require('massive');
var massiveInstance = massive.connectSync({connectionString : "postgres://ekmunzfy:IILWrNhORaiaAolvoGK2scY1S97db8o-@stampy.db.elephantsql.com:5432/ekmunzfy"})
app.set('db', massiveInstance);
var db = app.get('db');


module.exports = {
  createMission: function (req, res) {
    let mis = req.body;
    let agentNum = mis.agentNum;
    let message = mis.disc;
    let timeout = mis.timer;
    let unix = Math.round(new Date().getTime()/1000)
    db.createMission([agentNum, message,timeout, unix ], function (err, result) {
      if(err != null){
        res.send('Could not Create - Check argument input');
        return;
      }else{
        res.send('New Mission Created!');
        return
      }
    });
  },
  checkMissions: function (req, res) {
    db.checkMissions(function (err, result) {
      for(let i = 0; i < result.length; i++){
        let originDate = result[i].unixtime
        let timeout = result[i].timeout
        let currentUnix = Math.round(new Date().getTime()/1000)
        if(currentUnix > originDate + timeout){
          console.log('delete the record of agent' + result[i].agent + " their id:" + result[i].id)
        }
      }
    });
  }
}
