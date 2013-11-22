'use strict';

angular.module('gcScrollSpyItemDirective', [
  'gcScrollSpyController',
  'gcSpyFactory'
])
  .directive('scrollSpyItem', [
    'SpyFactory',
    function scrollSpyItemDirective(SpyFactory) {


      return {
        restrict: 'A',
        require: '^scrollSpy',
        link: function(scope, elem, attrs, scrollSpy) {
          var selector = attrs.ngHref || attrs.href;
          var ACTIVE_CLASS = 'is-active';

          var spy = SpyFactory.create(selector,
            function activate($target) {
              elem.addClass(ACTIVE_CLASS);
              $target.addClass(ACTIVE_CLASS);
              scope.$emit('gcScrollSpyItemActive');
            }, function deactivate($target) {
              elem.removeClass(ACTIVE_CLASS);
              $target.removeClass(ACTIVE_CLASS);
              scope.$emit('gcScrollSpyItemInactive');
            });

          if (!spy) { return; }

          scrollSpy.add(spy);
          scope.$on('$destroy', function() {
            scrollSpy.remove(spy);
          });
        }
      };

    }
  ]);
