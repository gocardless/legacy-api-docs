// Assuming an Express app
app.get('/gocardless_callback', function(req, res) {
  var verified = gocardless.verifySignature(req.query, myAppSecret);
  if (!verified) return res.end(401);

  gocardless.confirmResource({
    resource_id: req.query.resource_id,
    resource_type: req.query.resource_type
  }, function(err, request, body) {
    if (err) res.end('error confirming bill');
    res.render('success');
  });
});
