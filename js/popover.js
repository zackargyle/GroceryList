var groceries = angular.module('directives', []);

groceries.directive('ngPopover', function($document) {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
    	var note = scope.item.note;

    	if (note) {
	    	var popover = document.createElement('div');
	    	popover.className = "ng-popover";
	    	popover.innerHTML = note;

	    	elem.bind('mouseup', function() {
    			var rect   = elem[0].getBoundingClientRect();

    			popover.style.display = 'block';
    			popover.style.left = rect.left - popover.offsetWidth + 'px';
    			popover.style.top = rect.top - popover.offsetHeight + 'px';

    			$document.bind('mousedown', hidePopover);
	    	});

	    	popover = document.body.appendChild(popover);

	    	function hidePopover() {
					popover.style.display = 'none';
					$document.unbind('mousedown', hidePopover);
				};
	    }
		}
  }
});