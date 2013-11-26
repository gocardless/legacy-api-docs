## Receiving webhooks

In this section we'll walk through creating a path on your site to receive webhooks, telling GoCardless to send webhooks to that address, and testing you've done both successfully.

### Creating a path to receive webhooks

```php
<?
$webhook = file_get_contents('php://input');
$webhook_array = json_decode($webhook, true);
$webhook_valid = GoCardless::validate_webhook($webhook_array['payload']);

if ($webhook_valid == TRUE) {

  // Send a success header
  header('HTTP/1.1 200 OK');

} else {

  header('HTTP/1.1 403 Invalid signature');

}
```

We haven't added any real logic to our webhook receiver yet, but you'll have noticed it's already doing some work.

* It checks whether each webhook is valid, using the PHP client library
* It responds with a `200` OK header when the request is valid

Both of the above are important: checking webhooks ensures they came from GoCardless, and responding with a `200 OK` tells GoCardless not to resend the webhook (which could otherwise cause duplicate updates to your system).

### Instructing GoCardless where to send webhooks

Now we need to tell GoCardless to send webhooks to the path we just created. This is done in the 'Webhook URI' field of your developer dashboard. If your site is already hosted somewhere you can just enter `http://[yourwebsite.com]/gocardless/webhook` as your Webhook URI.

If on the other hand you're running your site locally, GoCardless will have no way to send your site webhooks (as it's not public). Therefore you must host your site somewhere to test webhooks.

### Testing webhooks

To test that we're receiving webhooks successfully we'll use the GoCardless webhook tester. This is an incredibly useful feature that lets you send test webhooks from GoCardless, rather than waiting for an actual event in your GoCardless account.

In the 'Test webhooks' section of your developer dashboard check that the 'Webhook URL' field is as set up in the previous section, select an object type, and click 'Fire webhook'. Navigating to the 'Response' section of the results modal, the first line should be a `200 OK` response.

Congratulations! You're now receiving webhooks from GoCardless.
