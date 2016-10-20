(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var narrowItDown = this;
    var searchTerm = narrowItDown.searchterm;
    var key;


  narrowItDown.clicked = function(searchterm) {
      if ($scope.searchterm=="" || $scope.searchterm == undefined) {
        $scope.message= "Found Nothing";
        MenuSearchService.getMatchedMenuItems(searchterm).then(function(response) {
          response= "";
          narrowItDown.found= response;
        })
      }
      else {
        $scope.message = "";
        var promise=MenuSearchService.getMatchedMenuItems(searchterm);
        promise.then(function(response) {
          if (response == "") {
            $scope.message = "Found Nothing";
          }
          else {
            narrowItDown.found = response;
            for (key=0; key<narrowItDown.found.length; key++) {
              if (narrowItDown.found[key].matchitems.description.indexOf(searchterm.toLowerCase())== -1) {
                $scope.message = "Found Nothing";
              }
              else $scope.message="";
            }

          }
        })


      }
  }
  narrowItDown.ItemRemoved = function(itemIndex) {
    narrowItDown.found.splice(itemIndex, 1);
  }
} //end NarrowItDownController

MenuSearchService.$inject = ['$http', '$q'];
  function MenuSearchService($http, $q) {
    var service = this;
    var foundItems = [];
    var match;
    service.getMatchedMenuItems = function(searchTerm) {
      var deferred = $q.defer();
      if (searchTerm==undefined) {
        return deferred.promise;
      }
      return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      })
      .then(function (result) {
        foundItems=[];
        for(match=0; match<result.data.menu_items.length; match++) {
          var description = {
            "matchitems": result.data.menu_items[match]
          }
          if (result.data.menu_items[match].description.indexOf(searchTerm.toLowerCase()) !== -1) {
            deferred.resolve(foundItems.push(description));
          }
        }
        return foundItems;
      })
      return deferred.promise;
    }
  }

  function FoundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl : 'foundItems.html',
      scope : {
        myList: '<myList',
        onRemove: '&'
      },
      controller: ListDirectiveController,
      controllerAs: 'myCtrl',
      bindToController: true
    }
    return ddo;
  }

  function ListDirectiveController() {
    var list = this;

    list.containsItems = function() {
      if (list.myList.found != undefined) {
        var items = list.myList.found;
        return  items.length>0;
      }
    }
  }

})();
