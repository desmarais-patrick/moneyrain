Transactions = new Mongo.Collection("transactions");

if (Meteor.isClient) {
  Template.body.helpers({
    transactions: function () {
      return Transactions.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
