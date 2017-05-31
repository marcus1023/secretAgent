angular.module('excelCourses').controller('mainController', function(mainService, $scope, $interval, $compile, $state  ){
// Check if all data has been added and send to Service then to server
$scope.createMission = function(newMission){
  if(!newMission.agentNum ||!newMission.disc ||!newMission.timer ){
    alert("You are missing some mission info!")
  }else{
    mainService.createMission(newMission).then(function(res){
      console.log(res.data)
    })
  }
}

})
