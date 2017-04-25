import { Meteor } from 'meteor/meteor';

import { Categories } from '../categories.js';

Meteor.publish('categories.all', function () {
  return Categories.find({});
});
