# Webhooks

## Bill webhook

Example bill webhook object:

    {
      "payload": {
          "resource_type": "bill",
          "action": "paid",
          "bills": [
              {
                  "id": "AKJ398H8KA",
                  "status": "paid",
                  "source_type": "subscription",
                  "source_id": "KKJ398H8K8",
                  "amount": "20.0",
                  "amount_minus_fees": "19.8",
                  "paid_at": "2011-12-01T12:00:00Z",
                  "uri": "https://gocardless.com/api/v1/bills/AKJ398H8KA"
              },
              {
                  "id": "AKJ398H8KB",
                  "status": "paid",
                  "source_type": "subscription",
                  "source_id": "8AKJ398H78",
                  "amount": "20.0",
                  "amount_minus_fees": "19.8",
                  "paid_at": "2011-12-09T12:00:00Z",
                  "uri": "https://gocardless.com/api/v1/bills/AKJ398H8KB"
              }
          ],
          "signature": "f6b9e6cd8eef30c444da48370e646839c9bb9e1cf10ea16164d5cf93a50231eb"
      }
    }

### Possible actions

`created`
:    This is fired when a bill is created automatically under a subscription, e.g. for a monthly subscription, you will receive this webhook once per month. The bill will be `pending` for several days until it is `paid` or has `failed`.

`paid`
:    This is fired when a bill has successfully been debited from a customer's account. It can take up to 5 business days after bill creation if it's the first bill taken from a customer. The cash will be held by GoCardless for the duration of the Merchant's holding period, after which it will be `withdrawn` (i.e. paid out) directly into the Merchant's registered bank account.

`withdrawn`
:    This is fired when a bill that is being held by GoCardless on behalf of a Merchant is withdrawn (i.e. paid out) into the Merchant's bank account. Money should appear in the accoun no later than 1 business day after the webhook is fired.

`failed`
:    This is fired when a bill could not be debited from a customer's account. This is usually because insufficient funds are available. By default, GoCardless will not attempt to take the payment again.

`refunded`
:    This is fired when a bill is refunded by you (through the API or the dashboards) or by GoCardless, usually at your or your customer's request.

`chargedback`
:    This is fired when a customer contacts their bank and has them reverse the payment under the Direct Debit Guarantee.

`retried`
:    This is fired when a bill is submitted to the bank again after having previously been failed, either at your request or the customer's. The bill's status will be "pending", and you should receive a "paid" or "failed" web hook within 3 business days.

If the bill was created under a subscription or a pre-authorization, the `source_id` and `source_type` arguments will enable you to identify the "parent" resource (ie. the "source" of the bill).

The `id` arguments refer to the `id` of the each individual bill object.
