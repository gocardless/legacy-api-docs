var url = gocardless.subscription.newUrl({
  amount: '30.00',
  interval_length: '1',
  interval_unit: 'month',
  name: 'Coffee',
  description: 'Fresh roast coffee subscription'
});

res.redirect(url);