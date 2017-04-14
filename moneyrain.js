Transactions = new Mongo.Collection("transactions");

if (Meteor.isClient) {
  Template.body.helpers({
    transactions: function () {
      return Transactions.find({});
    }
  });

  Template.transaction.helpers({
    amount: function () {
      var amount = parseFloat(this.value);

      if (isNaN(amount)) {
        console.log("Template.transaction.amount",
          "could not parse this.value as float:", this.value);
        amount = "?";
      } else {
        amount = amount.toFixed(2) + " $";
      }

      return amount;
    }
  });

  Template.body.events({
    "submit .new-transaction": function (event) {
      event.preventDefault(); // prevent page reload.

      // Parse values.
      var description = event.target.description.value;
      var formValue = event.target.amount.value;
      var value = parseFloat(formValue);

      if (isNaN(value)) {
        console.log("Template.events.submit .new-transactions",
          "could not parse 'value' as float:", formValue);
        value = formValue;
      }

      // Add new document.
      Transactions.insert({
        description: description,
        value: value,
        category: value > 0 ? "revenue": "expense",
        createdAt: new Date()
      });

      event.target.reset.click(); // clear form.
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
