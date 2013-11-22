gocardless.bill.get({
  id: '#BILL_ID#'
}, function(err, response, body) {
  console.log(body); // => Object
});
