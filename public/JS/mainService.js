angular.module('excelCourses' ).service('mainService', function($http, $q){
  // This is creating a new mission with all 3 requirements
  this.createMission = function(data){
    return $http({
      method: 'POST',
      url: "/api/createMission",
      data: data
    })
  }
  this.changeAgent = function(data){
    return $http({
      method: 'POST',
      url: "/api/changeAgent",
      data: data
    })
  }
  this.changeTimeout = function(data){
    return $http({
      method: 'POST',
      url: "/api/changeTimeout",
      data: data
    })
  }
  this.changeMissionDisc = function(data){
    return $http({
      method: 'POST',
      url: "/api/changeMissionDisc",
      data: data
    })
  }
  this.deleteMission = function(data){
    return $http({
      method: 'POST',
      url: "/api/deleteMission",
      data: data
    })
  }
// get all mission
  this.getMissions = function(data){
    var defer = $q.defer();
     $http({
      method: 'GET',
      url: "/api/getMissions",
      data: data
    }).then(function(res){
      defer.resolve(res.data)
      })
    return defer.promise
  }
})
