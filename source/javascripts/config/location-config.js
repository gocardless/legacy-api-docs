'use strict';

// the location service fucks with anchor hash urls
// we currently don't need it at all so nulling the whole thing
angular.module('gcLocationConfig', [])
  .value('$location', null);
