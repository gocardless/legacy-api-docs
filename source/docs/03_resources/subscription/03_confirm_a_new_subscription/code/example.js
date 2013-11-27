// Assuming an Express app
app.get('/gocardless_callback', function(req, res) {
  gocardless.confirmResource(req.params, function(err, request, body) {
    if (err) return res.end(401, err);
    res.render('success');
  });
});
