Transactions = new Mongo.Collection("transactions");

if (Meteor.isClient) {
  Template.body.helpers({
    transactions: function () {
      return Transactions.find({});
    }
  });

  Template.transaction.helpers({
    amount: function () {
      var amount;
      try {
        amount = parseFloat(this.value);
        amount = amount.toFixed(2) + " $";
      } catch (e) {
        console.log("Template.transaction.amount",
          "could not parse this.value as float:", this.value, e);
        amount = "?";
      }
      return amount;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
