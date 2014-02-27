
var groceries = angular.module('GroceryList', ['directives']);

groceries.controller('groceryCtrl', function($scope, $http) {
  var GroceryList = new Firebase('https://zackargyle.firebaseIO.com/GroceryList');
  var itemElem = document.getElementById('add-item');

	$scope.groceries = [];

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
    if ($scope.newItem.title !== '') {
      if ($scope.newItem.hasOwnProperty('id')) {
        console.log('good');
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

  $scope.remove = function(item) {

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
    elem.style.marginLeft = (window.innerWidth - elem.offsetWidth) / 2 + 'px';
  }
}());
window.onresize();