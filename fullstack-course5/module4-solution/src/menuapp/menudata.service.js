(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$http', 'urlData']
function MenuDataService($q, $http, urlData) {
  var service = this;

  service.getAllCategories = function () {
    var deferred = $q.defer();
    var promise = $http({
      method: "GET",
      url: (urlData + 'categories.json')
    });
    promise.then(function (response){
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();
    var promise = $http({
      method: "GET",
      url: (urlData + 'menu_items.json'),
      params: {
        category: categoryShortName
      }
    });
    promise.then(function (response){
      deferred.resolve({
        menuItems: response.data.menu_items,
        name: response.data.category.name
      });
    });
    return deferred.promise;
  };


};

})();
