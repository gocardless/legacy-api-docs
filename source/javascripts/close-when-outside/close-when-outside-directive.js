'use strict';

angular.module('gcCloseWhenOutside', [])
  .directive('closeWhenOutside', [
    '$parse',
    function closeWhenOutsideDirective($parse) {

      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          var node = elem[0];

          var closeWhenOutside = $parse(attrs.closeWhenOutside);

          function onClick(event) {
            var isOutside = !node.contains(event.target);
            var isActive = closeWhenOutside(scope);
            if (isActive && isOutside) {
              closeWhenOutside.assign(scope, !isActive);
              scope.$digest();
            }
          }

          // capture click event
          document.addEventListener('click', onClick, true);

          scope.$on('$destroy', function() {
            document.removeEventListener('click', onClick, true);
          });
        }
      };

    }
  ]);
