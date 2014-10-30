gocardless.preAuthorization.get({
  id: '#SUBSCRIPTION_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});