angular.module('excelCourses').controller('mainController', function(mainService, $scope, $interval, $compile, $state  ){
// Check if all data has been added and send to Service then to server
$scope.createMission = function(newMission){
  if(!newMission.agentNum ||!newMission.disc ||!newMission.timer ){
    alert("You are missing some mission info!")
  }else{
    mainService.createMission(newMission).then(function(res){
      getMissions();
    })
  }
}
// Mission Updates Control
$scope.deleteMission = function(){
  mainService.deleteMission().then(function(res){

  })
}
$scope.changeAgent = function(){
  mainService.changeAgent().then(function(res){

  })
}
$scope.changeTimeout = function(){
  mainService.changeTimeout().then(function(res){

  })
}
$scope.changeMissionDisc = function(){
  mainService.changeMissionDisc().then(function(res){

  })
}
// Set Update
$scope.update = {}
$scope.setUpdate = function(type, id){
  document.getElementById('updates').style.display = "flex";
  document.getElementById('updates-black').style.display = "flex";
  console.log('got here')
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
  }
}
$scope.routeUpdate = function(updateType){
  let id = $scope.update.id
  let newVal = update.value
  let data = {id: id, value: newVal}
  console.log(newVal)
  if(updateType === 'updateAgent'){
    $scope.changeAgent()
  }
}
$scope.exitUpdate = function(){
  document.getElementById('updates').style.display = "none";
  document.getElementById('updates-black').style.display = "none";
}

//Auto Call functions

function getMissions(){
  mainService.getMissions().then(function(res){
    $scope.mission = res;
    console.log($scope.mission)
  });
}
getMissions();

})
