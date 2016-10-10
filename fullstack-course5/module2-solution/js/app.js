(function () {
'use strict';
var shoppingList = [
  {
    name: "Cookies",
    quantity: "10 bags"
  },
  {
    name: "Chips",
    quantity: "2 bags"
  },
  {
    name: "Sugary drink",
    quantity: "3 bottles"
  },
  {
    name: "Chocolate",
    quantity: "1 pack"
  },
  {
    name: "Milk",
    quantity: "2 bottles"
  }

];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuyController = this;
  ToBuyController.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
  ToBuyController.buy = function(itemIndex) {
    ShoppingListCheckOffService.putItemToBought(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBoughtController = this;
  AlreadyBoughtController.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var itemsToBuy = shoppingList;
  var boughtItems = [];

service.putItemToBought = function(itemIndex) {
  var puttingItem = itemsToBuy[itemIndex];
  itemsToBuy.splice(itemIndex, 1);
  boughtItems.push(puttingItem);
};

service.getItemsToBuy = function() {
  return itemsToBuy;
};

service.getBoughtItems = function() {
  return boughtItems;
}
}
})();
