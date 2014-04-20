
var groceries = angular.module('GroceryList', ['directives']);

groceries.controller('groceryCtrl', function($scope) {
  $scope.test = "Hello";
  var base_url = 'https://zackargyle.firebaseIO.com/GroceryList';
  var GroceryList = new Firebase(base_url);
  var itemElem = document.getElementById('add-item');

	$scope.groceries = [];

  // Listener for new grocery items
  GroceryList.on('child_added', function(snap) {
    var item = snap.val();
    item.id = snap.name();
    $scope.groceries.push(item);

    // Apply digest cycle if necessary
    if(!$scope.$$phase) {
      $scope.$apply();
    }
  });

  $scope.addItem = function() {
    // Cannot add empty item
    if ($scope.newItem.title !== '') {
      // Update or Add?
      if ($scope.newItem.hasOwnProperty('$$hashKey')) {
        // Remove hashkey from item
        var item = angular.copy($scope.newItem);
        delete item.$$hashKey;
        // Update corresponding item by id
        var GroceryItem = new Firebase(base_url + '/' + item.id);
        GroceryItem.update(item);
      } else {
        GroceryList.push($scope.newItem);
      }

      resetFields();
      itemElem.style.border = '2px solid hsl(210, 30%, 60%)';
    } else {
      // Red to indicate empty field
      itemElem.style.border = '2px solid hsl(0, 70%, 60%)';
    }
  };

  $scope.edit = function(item) {
    if (item) {
      $scope.newItem = item;
    } else {
      resetFields();
    }
  };

  $scope.remove = function(item, index) {
    var GroceryItem = new Firebase(base_url + '/' + item.id);
    GroceryItem.remove(function(error) {
      if (!error) {
        $scope.groceries.splice(index,1);
        $scope.$apply();
      }
    });
  };

  $scope.noteVisibility = function(note) {
    if (note) {
      return {opacity: 1};
    } else {
      return {opacity: .2};
    }
  }

  function resetFields() {
    $scope.newItem = {
      title: '',
      quantity: '',
      author: 'Zack',
      state: 'NEW',
      note: ''
    }
  };
  resetFields();

});

// Return closure to avoid finding container each time
window.onresize = (function() {
  var elem = document.getElementById('grocery-container');
  return function() {
    var left = (window.innerWidth - elem.offsetWidth) / 2;
    left = left > 0 ? left : 0;
    elem.style.marginLeft = left + 'px';
  }
}());
window.onresize();