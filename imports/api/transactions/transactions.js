import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection("transactions");

// Deny all client-side updates since we will be using methods to manage this collection
Transactions.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
