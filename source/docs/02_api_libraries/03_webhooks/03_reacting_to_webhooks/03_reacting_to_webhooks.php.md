## Reacting to webhooks

Now we're receiving webhooks we want to react to them. In this section we'll walk through an example where we disable a user's account if they cancel their subscription with us. You can see full details of all the webhooks you might want to respond to in our [HTTP documentation](/http/#webhooks).

### Responding to cancelled subscriptions

The information in the webhook is in JSON format, with a dictionary called `payload` as the top level namespace. We've already accessed the `payload` dictionary once, in order to validate the webhook. Now we'll write some logic to identify cancelled subscriptions and respond to them.

Here I'll assume you have a field on each of your users for their GoCardless ID, and another for whether or not they're active.

```php
<?
$webhook = file_get_contents('php://input');
$webhook_array = json_decode($webhook, true);
$webhook_valid = GoCardless::validate_webhook($webhook_array['payload']);

if ($webhook_valid == TRUE) {

  $data = $webhook_array['payload'];

  if ($data['resource_type'] == 'subscription' && $data['action'] == 'cancelled') {

    foreach ($data['subscriptions'] as $subscription) {

      // Logic to cancel the subscription in your system goes here

      // You can use $subscription['resource_id'] to look up the subscription
      // in the GoCardless API if required

    }

  }

  // Send a success header
  header('HTTP/1.1 200 OK');

} else {

  header('HTTP/1.1 403 Invalid signature');

}
```

And that's it! You're now responding when GoCardless sends you a cancelled subscription event, and you've tested your response!

### Further reading

You can take a look at this [example of a webhook logger](https://github.com/gocardless/gocardless-legacy-php/blob/master/examples/webhooks.php), included as part of the PHP library.
