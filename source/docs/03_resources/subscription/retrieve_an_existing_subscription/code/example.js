gocardless.preAuthorization.get({
  id: '#SUBSCRIPTION_ID#'
}, function(err, response, body) {
  console.log(body); // => Object
});
