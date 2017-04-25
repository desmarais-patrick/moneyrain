import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import '../methods.js';
import { Categories } from '../categories.js';

describe('Categories', () => {

  describe('collection', () => {
    it('exists', () => {
      Categories.find({}, {});
    });
  });

  describe('methods', () => {
    describe('categories.addNew', () => {
      let doc;
      let docAddedID;
      beforeEach(() => {
        doc = {
          name: 'Grocery',
        };
      });
      it('can add new category', () => {
        const addNew = Meteor.server.method_handlers['categories.addNew'];
        docAddedID = addNew.apply(addNew, [doc]);
        assert.equal(Categories.find().count(), 1);
      });
      afterEach(() => {
        Categories.remove(docAddedID);
      });
    });
  });
});
