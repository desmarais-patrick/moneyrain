import { Meteor } from 'meteor/meteor';

import { Categories } from '../../api/categories/categories.js';
import { Transactions } from '../../api/transactions/transactions.js';

Meteor.startup(() => {
  if (Transactions.find().count() === 0) {
    // No transactions at start.
  }

  if (Categories.find().count() === 0) {
    Categories.insert({name: 'Groceries'});
    Categories.insert({name: 'Gifts'});
    Categories.insert({name: 'Rent'});
  }
});
