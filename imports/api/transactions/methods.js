import { Meteor } from 'meteor/meteor';

import { Transactions } from './transactions.js';

Meteor.methods({
  'transactions.addNew'({description, value, category}) {
    Transactions.insert({description, value, category, createdAt: new Date()});
  },
});
