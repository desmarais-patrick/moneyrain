if (Meteor.isClient) {
  Template.body.helpers({
    transactions: [
      { description: "Grocery", value: -93.66, category: "expense" },
      { description: "Lunch", value: -18.54, category: "expense" },
      { description: "Garage", value: -220.14, category: "expense" },
      { description: "Gift", value: 20, category: "revenue" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
