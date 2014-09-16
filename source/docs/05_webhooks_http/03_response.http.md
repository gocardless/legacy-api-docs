# Response

Your server should validate the HMAC digest by resigning the contents of the payload object, not including the container payload itself, and respond with status `HTTP/1.1 200 OK` within 5 seconds.

For more information about generating a signature see [Signing Requests](#signing-requests) in the Connect Guide. The GoCardless [client libraries](official-libraries) each handle signing requests; if you are building an integration without a client library, check their source code for a reference implementation.

If the API server does not get a 200 OK response within 5 seconds, it will retry up to 10 times at ever-increasing time intervals. If you have time-consuming server-side processes that are triggered by a webhook please consider processing them asynchronously.

In the request above, the object to sign is:

  {
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
      ]
  }
