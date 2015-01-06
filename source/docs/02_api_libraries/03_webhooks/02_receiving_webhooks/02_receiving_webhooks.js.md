## Receiving webhooks

In this section we'll walk through creating a path on your site to receive webhooks, telling GoCardless to send webhooks to that address, and testing you've done both successfully.

### Creating a path to receive webhooks

First, we'll add a path to your website that will receive webhooks. This is done just like any other path that processes POST requests.

We're going to be using Express for this tutorial. To set up the path for webhooks we add a new route handler:

```js
// Assuming an Express server
app.post('/gocardless_webhook', function(req, res) {
  if (!gocardless.webhookValid(req.body)) return res.send(403);

  // Do anything which you need to do, e.g. update your database
  // It's better to make this asynchronous as GoCardless needs a
  // 200 response within 5 seconds

  res.send(200);
});
```

We haven't added any real logic to our webhook receiver yet, but you'll have noticed it's already doing some work.

* It checks whether each webhook is valid, using the Node.js client library
* It responds with a `200` OK header when the request is valid

Both of the above are important: checking webhooks ensures they came from GoCardless, and responding with a `200 OK` tells GoCardless not to resend the webhook (which could otherwise cause duplicate updates to your system).

### Instructing GoCardless where to send webhooks

Now we need to tell GoCardless to send webhooks to the path we just created. This is done in the 'Webhook URI' field of your developer dashboard. If your site is already hosted somewhere you can just enter `http://[yourwebsite.com]/gocardless/webhook` as your Webhook URI.

If on the other hand you're running your site locally there's an extra step, described below.

To use a localhost address as our Webhook URI we need to make your localhost address publicly accessible. Fortunately there's an extremely easy way to do this courtesy of localtunnel. In a new console window:

    $ gem install localtunnel
    $ localtunnel -k ~/.ssh/id_rsa.pub 3000

You should see something like the below:

    Port 3000 is now publicly accessible from
    http://8bv2.localtunnel.com...

Now (as long as we keep this terminal window open) we have a public URL that links to our localhost. We can use that to create a Webhook URI to enter on your developer dashboard. For this tutorial we'd enter:

    http://8bv2.localtunnel.com/gocardless/webhooks

(but note that we'll need to update this address every time we close the localtunnel connection).