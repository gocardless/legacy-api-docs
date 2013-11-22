gocardless.bill.create({
  pre_authorization_id: '#PRE_AUTH_ID#',
  amount: '15.00',
  name: '150 credits',
  charge_customer_at: '2013-08-27'
}, function(err, response, body) {
  console.log(body); // => Object
});
