if (!window.gdgmadrid) {
  window.gdgmadrid = {};
}

(function ($, angular, gdgmadrid) {
  'use strict';

  gdgmadrid.books = angular.module('gdgmadrid.books', []);

  gdgmadrid.books.factory('gdgmadrid.library.GetBooks', [
    '$http',
    function ($http) {
      return function () {
        var http_opts = {
          url: '/books.json',
          method: 'GET',
          cache: true  // it rules!
        };

        return $http(http_opts).then(function (data) {
          return data.data;
        });
      };
    }]);

  gdgmadrid.books.controller('gdgmadrid.library.BookListCtrl', [
    '$scope',
    'gdgmadrid.library.GetBooks',
    function (scope, get_books) {
      scope.books = [];
      get_books().then(function (books) {
        scope.books = books;
      });
    }]);

  gdgmadrid.books.factory('gdgmadrid.library.GetBook', [
    '$http',
    'gdgmadrid.library.GetBooks',
    function ($http, get_books) {
      return function (ref) {
        return get_books().then(function (books) {
          var the_book = books.find(function (book) {
            return ref === book.ref;
          });
          return the_book;
        });
      };
    }]);

  gdgmadrid.books.controller('gdgmadrid.library.BookFormCtrl', [
    '$scope',
    '$routeParams',
    'gdgmadrid.library.GetBook',
    function (scope, $routeParams, get_book) {
      scope.book = {};
      get_book($routeParams.ref).then(function (book) {
        scope.book = book;
      });
    }]);
} (window.jQuery, window.angular, window.gdgmadrid));
