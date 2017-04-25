import { Template } from 'meteor/templating';

import { Categories } from '../../api/categories/categories';
import { Transactions } from '../../api/transactions/transactions';

import './transactions-show.html';

Template.Transactions_show.onCreated(function transactionsShowOnCreated() {
  this.autorun(() => {
    this.subscribe('transactions.all');
  });
});

Template.Transactions_show.helpers({
  categories: function () {
    return Categories.find({});
  },
  transactions: function () {
    return Transactions.find({});
  },
});

Template.Transaction.helpers({
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

Template.Transactions_show.events({
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
    Meteor.call('transactions.addNew', {
      description: description,
      value: value,
      category: value > 0 ? "revenue": "expense"
    });

    event.target.reset.click(); // clear form.
  }
});
