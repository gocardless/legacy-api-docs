gocardless.bill.get({
  id: '#BILL_ID#'
}, function(err, response, body) {
  JSON.parse(body); // => Object
});