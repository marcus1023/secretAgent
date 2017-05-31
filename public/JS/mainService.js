angular.module('excelCourses' ).service('mainService', function($http, $q){
  // This is creating a new mission with all 3 requirements
  this.createMission = function(data){
    return $http({
      method: 'POST',
      url: "/api/createMission",
      data: data
    })
  }

})
