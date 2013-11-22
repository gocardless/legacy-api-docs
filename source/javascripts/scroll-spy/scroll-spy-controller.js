'use strict';

angular.module('gcScrollSpyController', [])
  .controller('ScrollSpyController', [
    function ScrollSpyController() {

      var spies = [];

      this.add = function add(spy) {
        spies.push(spy);
      };

      this.remove = function remove(spy) {
        var idx = spies.indexOf(spy);
        if (idx > -1) { spies.splice(idx, 1); }
      };

      this.getAll = function getAll() {
        return _.sortBy(spies, function(spy) {
          return spy.data().top;
        });
      };
    }
  ]);
