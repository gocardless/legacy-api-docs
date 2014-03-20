// Assuming an Express app
app.get('/gocardless_callback', function(req, res) {
  // Check the signature and POST back to GoCardless
  gocardless.confirmResource(req.query, function(err, request, body) {
    if (err) return res.end(401, err);
    res.render('success');
  });
});
