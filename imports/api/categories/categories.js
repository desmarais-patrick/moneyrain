import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection("categories");

Categories.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
