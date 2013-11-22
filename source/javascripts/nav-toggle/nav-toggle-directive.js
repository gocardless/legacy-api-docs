'use strict';

angular.module('gcNavToggleDirective', [])
  .directive('navToggle', [
    function navToggleDirective() {

      var OPEN_CLASS = 'is-open';

      return {
        restrict: 'A',
        link: function(scope, elem) {
          scope.$on('gcScrollSpyItemActive', function() {
            elem.addClass(OPEN_CLASS);
          });

          scope.$on('gcScrollSpyItemInactive', function() {
            elem.removeClass(OPEN_CLASS);
          });
        }
      };

    }
  ]);
