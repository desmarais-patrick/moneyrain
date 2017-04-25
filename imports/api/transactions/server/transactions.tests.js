import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import '../methods.js';
import { Transactions } from '../transactions.js';

describe('Transactions', () => {
  describe('methods', () => {
    describe('transactions.addNew', () => {
      let doc;
      let docAddedID;
      beforeEach(() => {
        doc = {
          category: 'expense',
          description: 'Gum & chips',
          value: 5.05,
        };
      });
      it('can add new transaction', () => {
        const addNew = Meteor.server.method_handlers['transactions.addNew'];
        const invocation = {};
        docAddedID = addNew.apply(addNew, [doc]);
        assert.equal(Transactions.find().count(), 1);
      });
      afterEach(() => {
        Transactions.remove(docAddedID);
      })
    });
  });
});
