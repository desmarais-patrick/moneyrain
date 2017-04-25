import { Meteor } from 'meteor/meteor';

import { Transactions } from '../transactions.js';
import { Categories } from '../../categories/categories.js';

Meteor.publish('transactions.all', function () {
  return [
    Transactions.find({}),
    Categories.find({})
  ];
});
