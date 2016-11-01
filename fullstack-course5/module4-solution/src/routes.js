(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    // Home page
    .state('home', {
      url         : '/',
      templateUrl : 'src/menuapp/templates/home.template.html'
    })

    // Premade list page
    .state('categories', {
      url          : '/categories',
      templateUrl  : 'src/menuapp/templates/main-categories.template.html',
      controller   : 'CategoriesController as categories',
      resolve      : {
                        menuCategories : ['MenuDataService', function (MenuDataService) {
                          return MenuDataService.getAllCategories();
                        }]
                      }
    })

  
    .state('items', {
      url          : '/items/{category}',
      templateUrl  : 'src/menuapp/templates/main-items.template.html',
      controller   : "ItemsController as menuItems",
      resolve      : {
                        categoryItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                          return MenuDataService.getItemsForCategory($stateParams.category);
                        }]
                      }
    });
}

})();
