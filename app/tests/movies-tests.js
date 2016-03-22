'use strict';

describe('movies module', function() {

    beforeEach(module('myApp.movies'));

    it('tests unit test', function(){
        expect(true).toBeTruthy();
        expect(123).toBeGreaterThan(122);
    })

});