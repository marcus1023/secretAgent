angular.module('excelCourses').directive('mainHead', function(){
  return {
    restrict: 'AE',
    controller: "mainController",
    templateUrl: 'JS/templates/directives/mainHeader.html'
  }
});
