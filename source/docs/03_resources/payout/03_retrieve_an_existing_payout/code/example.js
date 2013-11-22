gocardless.payout.get({
  id: '#PAYOUT_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});
