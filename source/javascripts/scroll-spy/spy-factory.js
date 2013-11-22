'use strict';

angular.module('gcSpyFactory', [])
  .factory('SpyFactory', [
    function SpyFactoryCreate() {

      function $find(node, selector) {
        return angular.element(node.querySelector(selector));
      }

      var replaceState = (function replaceState() {
        if (!('replaceState' in history)) {
          return _.noop;
        } else {
          return function(url) {
            return history.replaceState(null, null, url);
          };
        }
      })();

      var throttledReplaceState = _.throttle(function(url) {
        replaceState(url);
      }, 200, {
        trailing: true
      });

      function SpyFactory(selector, activateCb, deactivateCb) {
        this.__$target__ = $find(document, selector);
        if (! this.__$target__.length) { return; }
        this.__selector__ = selector;
        this.__cbs__ = [activateCb, deactivateCb];
      }

      _.extend(SpyFactory.prototype, {
        activate: function activate() {
          if (this.__active__) { return false; }

          throttledReplaceState(this.__selector__);
          this.__cbs__[0](this.__$target__);
          this.__active__ = true;
          return true;
        },
        deactivate: function deactivate() {
          if (!this.__active__) { return false; }

          this.__cbs__[1](this.__$target__);
          this.__active__ = false;
          return true;
        },
        data: function data() {
          return this.__data__ || this.reload();
        },
        reload: function reload() {
          var box = this.__$target__[0].getBoundingClientRect();
          return this.__data__ = {
            top: box.top + window.pageYOffset
          };
        }
      });

      return {
        create: function create(selector, activateCb, deactivateCb) {
          return new SpyFactory(selector, activateCb, deactivateCb);
        }
      };

    }
  ]);
