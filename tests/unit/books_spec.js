(function () {
  'use strict';

  describe('Testing Books...', function () {
    var $httpBackend, get_books;

    beforeEach(module('gdgmadrid.books'));
    
    beforeEach(inject(['$injector', function ($injector) {
      $httpBackend = $injector.get('$httpBackend');

      get_books = $injector.get('gdgmadrid.library.GetBooks');
    }]));
    
    it('Get Books...', function () {
      var books;

      $httpBackend.when('GET', '/books.json').respond([{
        ref: '0001',
        name: 'El Principito',
        author: 'Antoine de Saint-Exupéry'
      }]);
      get_books().then(function (books) {
        expect(books.length).toBe(1);
      });
    });
  });
}());