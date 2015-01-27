'use strict';

angular.module('gcTocNavDirective', [
  'toc-nav/toc-nav-template.html',
  'toc-nav/toc-nav-item-template.html'
]).directive('tocNav', [
    function tocNavDirective() {

      function createAnchor(id, node) {
        var anchor = document.createElement('span');
        anchor.className = 'section-header__anchor';
        anchor.id = id;

        var clickOverlay = document.createElement('a');
        clickOverlay.className = 'section-header__click-overlay';
        clickOverlay.innerHTML = '&infin;';
        clickOverlay.href = "#" + id;

        var titleSpan = document.createElement('span');
        titleSpan.innerHTML = node.innerHTML;

        node.innerHTML = '';
        node.appendChild(clickOverlay);
        node.appendChild(titleSpan);

        angular.element(node).
          wrap('<div class="section-header">').
          parent().prepend(anchor);
      }

      function escapeSelector(selector) {
        return selector
          .replace(/[^a-zA-Z0-9_-]/g, '')
          .replace(/^[\d\-]+/, '');
      }

      var ids = [];
      function makeId(title) {
        var id = escapeSelector(
          title.toLowerCase().replace(/[\s\t\n\v\f]/g, '-')
        );

        if (_.indexOf(ids, id) === -1) {
          ids.push(id);
          return id;
        } else {
          return _.uniqueId(id + '-');
        }
      }

      function query(node, selector) {
        return node.querySelectorAll(selector);
      }

      function Nav(parent, data) {
        this.data = data || {};
        this.parent = parent || this;
        this.children = [];
      }

      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'toc-nav/toc-nav-template.html',
        link: function(scope) {
          var headings = _.toArray(query(document, 'h0, h1, h2, h3'));

          var pages = new Nav();
          var prevLevel = 0;
          var currentPage = pages;

          function buildNav(parent, id, title) {
            var page = new Nav(parent, {
              id: id,
              title: title,
            });
            parent.children.push(page);
            return page;
          }

          headings.forEach(function(heading, index) {
            var title = heading.textContent.trim();
            var id = makeId(title);
            var currentLevel = parseInt(heading.tagName.substr(1), 10);

            // Create anchor element that can be offset above the header
            // - fixing the header being hidden behind the top nav
            createAnchor(id, heading);

            var page;
            if (currentLevel === prevLevel) {
              page = buildNav(currentPage.parent, id, title);
            } else if (currentLevel > prevLevel) {
              page = buildNav(currentPage, id, title);
            } else if (currentLevel < prevLevel) {
              var parent = currentPage.parent;
              // Handle when the currentLevel is more than one step above
              // e.g. going from h3 to h1
              _.times(prevLevel - currentLevel, function() {
                parent = parent.parent;
              });
              page = buildNav(parent, id, title);
            }

            currentPage = page;
            prevLevel = currentLevel;
          });

          scope.page = pages;
        }
      };

    }
  ]);
