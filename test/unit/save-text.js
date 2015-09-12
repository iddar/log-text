const expect = require('chai').expect;

const db = require('../../database/memory');
const logText = require('../../core/save-text')({dbInstance: db});

describe('LongText', function() {
  'use strict';
  const testText = 'Disfrutando el dia en #gdl con @lacanijalagartija #nochedefiesta';

  it('Save item', function (done) {
    logText.saveText(testText, function (error, saveText) {
      if (error) return done(error);
      expect(saveText.text).to.be.equal(testText);
      expect(saveText.tags).to.have.length(2);
      done();
    });
  });

  it('Get tags', function (done) {
    logText.saveText(testText, function (error, saveText) {
      if (error) return done(error);
      expect(saveText.tags).to.have.length(2);
      done();
    });
  });

  it('Get mentions', function (done) {
    logText.saveText(testText, function (error, saveText) {
      if (error) return done(error);
      expect(saveText.mentions).to.have.length(1);
      done();
    });
  });

});
