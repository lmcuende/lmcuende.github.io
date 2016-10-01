(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.dishList = '';
  $scope.message = '';
  $scope.checkTooMuch = function() {
    var words = 0;
    var value = $scope.dishList.replace(" ", " ");
    words = value.split(",");
    if (words.length > 3) {
      $scope.message = "Too Much"
    }
      else {
          $scope.message = "Enjoy!"
    }
  }
}

})();
