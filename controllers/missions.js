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
      if(result){
        for(let i = 0; i < result.length; i++){
          let originDate = result[i].unixtime;
          let timeout = result[i].timeout;
          let id = result[i].id;
          let currentUnix = Math.round(new Date().getTime()/1000);
          if(currentUnix > originDate + timeout){
            db.deleteMission([id], function (err, result) {
              console.log(err, result)
            })
          }
        }
      }
    });
  },
  changeAgent: function (req, res) {
    console.log(req.body)
    let id = req.body.id
    let value = req.body.value
    db.changeAgent([value, id],function (err, result) {
      res.send('Success')
    });
  },
  deleteMission: function (req, res) {
    let id = req.body.id
    db.deleteMission([id],function (err, result) {
      res.send('Success')
    });
  },
  changeMissionDisc: function (req, res) {
    let id = req.body.id
    let value = req.body.value
    console.log('got here')
    console.log(req.body)
    db.changeMissionDisc([value, id],function (err, result) {
      res.send('Success')
    });
  },
  changeTimeout: function (req, res) {
    let id = req.body.id
    let value = req.body.value
    let currentUnix = Math.round(new Date().getTime()/1000);
    console.log('got here')
    console.log(req.body)
    db.changeTimeout([value, id],function (err, result) {
      db.changeUnix([currentUnix, id],function (err, result) {

      });
      res.send('Success')
    });
  },
  findResource: function (req, res) {
    let id = req.body.value
    db.findResource([id],function (err, result) {
      console.log(result);
      res.send(result)
    });
  },
  getMissions: function (req, res) {
    db.checkMissions(function (err, result) {
      res.status(200).send(result)
    });
  },
}
