var groceries = angular.module('directives', []);

groceries.directive('ngPopover', function($document) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
        	if (getMessage()) {
                var isActive = false;

        	    // Create popover element
    	    	var popover = document.createElement('div');
    	    	popover.className = "ng-popover";
    	    	popover = document.body.appendChild(popover);

                var showPopover = function() {
    	    		var rect = elem[0].getBoundingClientRect();

        			popover.innerHTML = getMessage();
        			popover.style.display = 'block';
        			popover.style.left = rect.left - popover.offsetWidth + 'px';
        			popover.style.top = rect.top - popover.offsetHeight + 'px';

        			 $document.bind('mousedown', hidePopover);
                     isActive = true;
    	    	};

    	    	var hidePopover = function() {
                    if (isActive) {
                        isActive = false;
        				popover.style.display = 'none';
        				$document.unbind('mousedown', hidePopover);
                    }
    			};

                elem.bind('mouseup', showPopover);
    	    }

            // Get scope variable by '.' path
            function getMessage() {
                var split = attr.ngPopover.split('.');
                var message = scope[split[0]];
                if (split.length > 1) {
                    for (var i = 1; i < split.length; i++) {
                        message = message[split[i]];
                    }
                }
                return message;
            }
        }
    }
});