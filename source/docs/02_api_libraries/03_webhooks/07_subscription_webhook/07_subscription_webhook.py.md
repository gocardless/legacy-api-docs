## Subscription webhook

Example subscription webhook object:

```json
{
  "payload": {
    "resource_type": "subscription",
    "action": "cancelled",
    "subscriptions": [{
      "id": "AKJ398H8KBO122A",
      "status": "cancelled",
      "uri": "https://gocardless.com/api/v1/subscriptions/AKJ398H8KBO122A"
    },{
      "id": "BBJ398H8KBO122A",
      "status": "cancelled",
      "uri": "https://gocardless.com/api/v1/subscriptions/BBJ398H8KBO122A"
    }],
    "signature": "f6b9e6cd8eef30c444da48370e646839c9bb9e1cf10ea16164d5cf93a50231eb"
  }
}
```


### Possible actions

`cancelled`
:    This is fired when a subscription is cancelled by a customer. No further bills will be created under the subscription.

`expired`
:    This is fired when a subscription reaches its expiry date. No further bills will be created under the subscription.
