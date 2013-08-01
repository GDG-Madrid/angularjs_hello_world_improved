window.gdgmadrid = {};

(function ($, angular, gdgmadrid) {
  'use strict';

  gdgmadrid.library = angular.module('gdgmadrid.library', [
    'gdgmadrid.books'
  ]);

  gdgmadrid.library.config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      // Ajax friendly
      // https://developers.google.com/webmasters/ajax-crawling/docs/getting-started
      // $locationProvider.hashPrefix('!');

      // Or
      $locationProvider.html5Mode(true);

      // Define inner routes
      $routeProvider.otherwise({
        template: '<div class="alert alert-info"><h1>En construcción...</h1></div>'
      }).when('/books/', {
        templateUrl: '/partials/books_list.html',
        controller: 'gdgmadrid.library.BookListCtrl'
      }).when('/books/:ref/', {
        templateUrl: '/partials/book_form.html',
        controller: 'gdgmadrid.library.BookFormCtrl'
      });
    }]);

  gdgmadrid.library.directive('gdgNav', [
    function () {
      return {
        link: function (scope, elm) {
          var ul = elm;
          ul.bind('click', function navClick (e) {
            var a = e.target,
              li = $(a).parent();
            ul.children('li').removeClass('active');
            li.addClass('active');
          });
        }
      };
    }]);

  gdgmadrid.library.filter('titleize', [
    function () {
      return function (input) {
        return input.titleize();
      }
    }]);

  gdgmadrid.library.filter('localize', [
    function () {
      return function (input) {
        // TODO: translate input...
        return input;
      };
    }]);
} (window.jQuery, window.angular, window.gdgmadrid));