angular.module('excelCourses').controller('mainController', function(mainService, $scope, $interval, $compile, $state  ){
// Check if all data has been added and send to Service then to server
$scope.createMission = function(newMission){
  console.log(newMission)
  if(!newMission.agentNum ||!newMission.disc ||!newMission.timer ){
    alert("You are missing some mission info!")
  }else{
    mainService.createMission(newMission).then(function(res){
      getMissions();
    })
  }
}
// Mission Updates Control
$scope.deleteMission = function(id){
  let data = {id: id}
  mainService.deleteMission(data).then(function(res){
    getMissions();
  })
}
$scope.changeAgent = function(data){
  mainService.changeAgent(data).then(function(res){
    getMissions();
  })
}
$scope.changeTimeout = function(data){
  mainService.changeTimeout(data).then(function(res){
    getMissions();
  })
}
$scope.changeMissionDisc = function(data){
  mainService.changeMissionDisc(data).then(function(res){
    getMissions();
  })
}
$scope.findResource = function(data){
  mainService.findResource(data).then(function(res){
    console.log(res)
    document.getElementById('updates-black').style.display = "flex";
    document.getElementById('found-resource').style.display = "flex";
    $scope.foundResource = res.data[0]
  })
}
// Set Update
$scope.update = {}
$scope.setUpdate = function(type, id){
  document.getElementById('updates').style.display = "flex";
  document.getElementById('updates-black').style.display = "flex";
  if(type === 'changeAgent'){
    $scope.update = {
      title: 'Agent',
      type: "updateAgent",
      id: id
    }
  }else if(type === 'changeMission'){
    $scope.update = {
      title: 'Mission',
      type: "changeMission",
      id: id
    }
  }else if(type === 'changeTimeout'){
    $scope.update = {
      title: 'Self Distruct Timer',
      type: "changeTimeout",
      id: id
    }
  }else if(type === 'findResource'){
    $scope.update = {
      title: ' Type: Find Resource',
      type: "findResource",
      id: "to be set"
    }
  }
}
// Route Updates to Node JS API
$scope.routeUpdate = function(updateType){
  document.getElementById('updates').style.display = "none";
  document.getElementById('updates-black').style.display = "none";
  let id = $scope.update.id
  let newVal = $scope.update.value
  let data = {id: id, value: newVal}
  console.log(data)
  if(updateType === 'updateAgent'){
    $scope.changeAgent(data);
  }else if(updateType === 'changeMission'){
    $scope.changeMissionDisc(data);
  }else if(updateType === 'changeTimeout'){
    $scope.changeTimeout(data);
  }else if(updateType === 'findResource'){
    $scope.findResource(data);
  }
}
$scope.exitUpdate = function(){
  document.getElementById('updates').style.display = "none";
  document.getElementById('updates-black').style.display = "none";
  document.getElementById('found-resource').style.display = "none";
}

//Auto Call functions

function getMissions(){
  mainService.getMissions().then(function(res){
    $scope.mission = res;
  });
}
getMissions();
$interval(function () {
    getMissions();
}, 1000);
})
