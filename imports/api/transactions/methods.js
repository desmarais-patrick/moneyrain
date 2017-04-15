import { Meteor } from 'meteor/meteor';

import { Transactions } from './transactions.js';

Meteor.methods({
  'transactions.addNew'({description, amount, category}) {
    Transactions.insert({description, amount, category, createdAt: new Date()});
  },
});
