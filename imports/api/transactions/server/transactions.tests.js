import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { createCategoryDoc } from '../../categories/server/categories.tests.js';

import '../methods.js';
import './publications.js';
import { Categories } from '../../categories/categories.js';
import { Transactions } from '../transactions.js';

describe('Transactions', () => {
  describe('methods', () => {
    describe('transactions.addNew', () => {
      let doc;
      let docAddedID;
      beforeEach(() => {
        doc = createTransactionDoc('expense', 'Gum & chips', 5.05);
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

  describe('publications', () => {
    describe('transactions.all', () => {
      let collector;
      beforeEach(() => {
        collector = new PublicationCollector({userId: Random.id()});
      });
      it('can publish empty transactions', (done) => {
        collector.collect('transactions.all', (collections) => {
          assert.equal(collections['transactions'].length, 0);
          done();
        });
      });

      describe('when some transactions and categories', () => {
        beforeEach(() => {
          Categories.insert(createCategoryDoc('Groceries'));
          Categories.insert(createCategoryDoc('Gifts'));
          Categories.insert(createCategoryDoc('Insurance'));

          Transactions.insert(
            createTransactionDoc('expense', 'Gum & chips', 5.05));
          Transactions.insert(createTransactionDoc('income', 'Payday', 550));
        });
        it('can publish transactions and related', (done) => {
          collector.collect('transactions.all', (collections) => {
            assert.equal(collections['categories'].length, 3);
            assert.equal(collections['transactions'].length, 2);
            done();
          });
        });
        afterEach(() => {
          Transactions.remove({});
          Categories.remove({});
        });
      });
    });
  });
});

// helpers

export const createTransactionDoc = function(category, description, value) {
  check(category, String);
  check(description, String);
  check(value, Number);

  return {
    category,
    description,
    value,
  };
};
