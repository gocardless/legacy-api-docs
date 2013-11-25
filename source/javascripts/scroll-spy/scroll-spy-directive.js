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

      function findActive(targets, scrollTop) {
        _.some(targets, function(target, i) {
          var next = targets[i + 1];

          // We are inside the current target or at the end (!next)
          if(scrollTop >= target.data().top &&
            (!next || scrollTop < next.data().top)) {
            return activate(targets, target);
          }
        });
      }

      function processScroll(targets) {
        var scroll = getScroll();

        // At the bottom (can have negative scroll)
        if (scroll.top >= scroll.max) {
          return activate(targets, _.last(targets));
        }
        // At the top (can have negative scroll)
        else if (scroll.top <= 0) {
          return activate(targets, _.first(targets));
        }

        findActive(targets, scroll.top);
      }

      function scrollLocationHash() {
        var hasScrolledIntoView;
        try {
          // this will fail if location.hash is not a valid selector
          var target = document.querySelector(location.hash);
          target.scrollIntoView();
          hasScrolledIntoView = true;
        } catch (e) { }
        return hasScrolledIntoView;
      }

      return {
        restrict: 'A',
        controller: 'ScrollSpyController',
        require: 'scrollSpy',
        link: function(scope, elem, attrs, scrollSpy) {
          angular.element(document).ready(function() {
            var hasScrolledIntoView = scrollLocationHash();
            if (!hasScrolledIntoView) {
              processScroll(scrollSpy.getAll());
            }
          });

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
