## Reacting to webhooks

Now we're receiving webhooks we want to react to them. In this section we'll walk through an example where we disable a user's account if they cancel their subscription with us. You can see full details of all the webhooks you might want to respond to in our [Curl documentation](/curl/#webhooks).

### Responding to cancelled subscriptions

The information in the webhook is in JSON format, with a dictionary called `payload` as the top level namespace. We've already accessed the `payload` dictionary once, in order to validate the webhook. Now we'll write some logic to identify cancelled subscriptions and respond to them.

Here I'll assume you have a field on each of your users for their GoCardless ID, and another for whether or not they're active.

```python
# In gc_app/views.py, adjust the post method we created within
# the GCWebhook class

def post(self, request, *args, **kwargs):
  json_data = simplejson.loads(request.raw_post_data)
  if gocardless.client.validate_webhook(json_data['payload']):
    data = json_data['payload']
    if data['resource_type'] == 'subscription' and data['action'] == 'cancelled':
      for subscription in data['subscriptions']:
        # Lookup the subscription using subscription['resource_id']
        # Perform logic to cancel the subscription
        # Any time-consuming jobs should be performed asynchronously
        logger.debug("Subscription {0} cancelled".format(subscription['resource_id']))
    return http.HttpResponse(status=200)
  return http.HttpResponse(status=403)
```

And that's it! You're now responding when GoCardless sends you a cancelled subscription event, and you've tested your response!
