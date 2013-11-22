gocardless.payout.get({
  id: '#PAYOUT_ID#'
}, function(err, response, body) {
  console.log(body); // => Object
});
