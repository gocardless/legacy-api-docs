## Pre-authorization webhook

Example pre-authorization webhook object:

    {
      "payload": {
        "resource_type": "pre_authorization",
        "action": "cancelled",
        "pre_authorizations": [{
          "id": "AKJ398H8KBOOO3",
          "status": "cancelled",
          "uri": "https://gocardless.com/api/v1/pre_authorizations/AKJ398H8KBOOO3"
        }, {
          "id": "AKJ398H8KBOOOA",
          "status": "cancelled",
          "uri": "https://gocardless.com/api/v1/pre_authorizations/AKJ398H8KBOOOA"
        }],
        "signature": "f6b9e6cd8eef30c444da48370e646839c9bb9e1cf10ea16164d5cf93a50231eb"
      }
    }

#### Possible actions

`cancelled`
: This is fired when a pre-authorization is cancelled by a customer. No further bills can be created under this pre-authorization.

`expired`
: This is fired when a pre-authorization reaches its expiry date. No further bills will be automatically created under the pre-authorization.
