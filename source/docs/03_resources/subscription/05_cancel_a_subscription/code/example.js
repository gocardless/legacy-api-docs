gocardless.subscription.cancel({
  id: '#SUBSCRIPTION_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});
