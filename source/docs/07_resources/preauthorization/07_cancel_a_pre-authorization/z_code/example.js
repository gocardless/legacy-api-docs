gocardless.preAuthorization.cancel({
  id: '#PRE_AUTH_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});