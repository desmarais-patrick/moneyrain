import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import { Categories } from './categories.js';

if (Meteor.isServer) {
  describe('Transactions', () => {
    describe('collection', () => {
      it('exists', () => {
        Categories.find({}, {});
      });
    });
  });
}
