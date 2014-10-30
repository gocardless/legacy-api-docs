gocardless.preAuthorization.get({
  id: '#PRE_AUTH_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});