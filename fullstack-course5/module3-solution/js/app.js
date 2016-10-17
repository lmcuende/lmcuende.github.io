(function () {
  'use strict';

  angular.module('NarrowItDownApp', []).
  controller('NarrowItDownController', NarrowItDownController).
  service('MenuSearchService', MenuSearchService). //NOT change*******
  directive('foundItems', FoundItemsDirective).
  constant('ApiResPath', ' https://davids-restaurant.herokuapp.com/menu_items.json');

  function FoundItemsDirective() {
    var ddo = {
      templateUrl : 'loader/itemsloaderindicator.template.html',
      scope : {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'ctrl',
      bindToController: true,
    }
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.getResults = function() {
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

        promise.then( function (response) {
          ctrl.items = response;
          if(ctrl.items.length <= 0) {
            ctrl.errorMessage = "Nothing Found!";
            ctrl.searchTerm = "";
          }
          else {
            ctrl.errorMessage = "";
            ctrl.searchTerm = "";
          }
        })
        .catch( function(error) {
          ctrl.errorMessage = error;
          ctrl.searchTerm = "";
        });
    }

    ctrl.removeItem = function(itemIndex) {
      ctrl.items.splice(itemIndex, 1);
      if(ctrl.items.length <= 0) {
        ctrl.errorMessage = "Nothing Found!"
      }
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiResPath'];
  function MenuSearchService($http, ApiResPath) {
    var service = this;
    var promise;

    service.getMatchedMenuItems = function(searchTerm) { //NOT CHANGE*******

      //if(!promise) {
        promise = $http({
          method: "GET",
          url: (ApiResPath)
        }).then(function(response) {
          //sucess block
          var result = response.data;
          result = result.menu_items;
          var foundedItem = [];

          if (searchTerm) {
            for(var i=0; i<result.length; i++) {
              var desc = result[i].description;
              if(desc.indexOf(searchTerm) !== -1) {
                foundedItem.push(result[i]);
              }
            }
          }
          return foundedItem;
        });
      //}
      return promise;
    }
  }

})();
