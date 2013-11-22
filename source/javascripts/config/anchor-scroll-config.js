'use strict';

// $anchorScroll depends on $location, disable scrolling so we never call it
angular.module('gcAnchorScrollConfig', [])
  .config([
    '$anchorScrollProvider',
    function anchorScrollConfig($anchorScrollProvider) {

      $anchorScrollProvider.disableAutoScrolling();

    }
  ]);
