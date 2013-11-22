gocardless.subscription.cancel({
  id: '#SUBSCRIPTION_ID#'
}, function(err, response, body) {
  console.log(body); // => Object
});
