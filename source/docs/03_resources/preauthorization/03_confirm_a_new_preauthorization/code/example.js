app.get('/gocardless_callback', function(req, res) {
  if (!gocardless.verifySignature(req.params, myAppSecret)) return res.end(403);

  gocardless.confirmResource({
    resource_id: req.params.resource_id,
    resource_type: req.params.resource_type
  }, function(err, request, body) {
    // Handle error or retry
    console.log(body);
  });

  res.end(200);
});
