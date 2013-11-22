var url = gocardless.bill.newUrl({
  amount: '10.00',
  name: 'Coffee',
  description: 'One bag of single origin coffee'
});

res.redirect(url);
