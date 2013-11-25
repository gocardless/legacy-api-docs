'use strict';

angular.module('gcOnClickAnchor', [])
  .directive('onClickAnchor', [
    function onClickAnchorDirective() {

      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {

          elem.on('click', function() {
            if (location.hash) {
              attrs.$set('href', attrs.href + location.hash);
            }
          });

        }
      };

    }
  ]);
