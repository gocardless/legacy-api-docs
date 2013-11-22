'use strict';

angular.module('gcScrollSpyDirective', [
  'gcScrollSpyController',
  'gcScrollSpyItemDirective'
])
  .directive('scrollSpy', [
    function scrollSpyDirective() {

      var win = window;
      var doc = win.document;
      var html = doc.documentElement;
      var body = doc.body;

      function getScroll() {
        var scrollTop = win.pageYOffset;
        var scrollHeight = body.scrollHeight;
        var bodyHeight = html.clientHeight;
        var maxScroll = scrollHeight - bodyHeight;

        return {
          top: scrollTop,
          max: maxScroll
        };
      }

      function activate(targets, target) {
        var toDeactivate = _.without(targets, target);
        _.invoke(toDeactivate, 'deactivate');
        return target.activate();
      }

      function processScroll(targets) {
        if (!targets.length) { return; }

        var scroll = getScroll();
        var scrollTop = scroll.top;
        var maxScroll = scroll.max;

        // At the bottom (can have negative scroll)
        if (scrollTop >= maxScroll) {
          return activate(targets, _.last(targets));
        }

        // At the top (can have negative scroll)
        if (win.pageYOffset <= 0) {
          return activate(targets, _.first(targets));
        }

        _.some(targets, function(target, i) {
          var targetTop = target.data().top;
          var next = targets[i + 1];
          var nextTop = next && next.data().top;

          // We are inside the current target or at the end (!next)
          var isInsideTarget = scrollTop >= targetTop &&
            (!next || scrollTop < nextTop);

          if (isInsideTarget) { return activate(targets, target); }
        });
      }

      return {
        restrict: 'A',
        controller: 'ScrollSpyController',
        require: 'scrollSpy',
        link: function(scope, elem, attrs, scrollSpy) {

          setTimeout(function() {
            processScroll(scrollSpy.getAll());
          }, 0);

          var lazyScroll = _.debounce(function() {
            processScroll(scrollSpy.getAll());
          }, 17);

          var lazyResize = _.throttle(function() {
            _.invoke(scrollSpy.getAll(), 'reload');
          }, 200, {
            trailing: true
          });

          window.addEventListener('scroll', lazyScroll);
          window.addEventListener('resize', lazyResize);

          scope.$on('$destroy', function() {
            window.removeEventListner('scroll', lazyScroll);
            window.removeEventListner('resize', lazyResize);
          });
        }

      };

    }
  ]);
