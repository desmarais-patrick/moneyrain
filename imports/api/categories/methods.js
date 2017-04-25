import { Meteor } from 'meteor/meteor';

import { Categories } from './categories.js';

Meteor.methods({
  'categories.addNew'({name}) {
    return Categories.insert({name});
  },
});
