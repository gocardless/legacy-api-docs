## Create a bill under a pre-auth

Create a bill via the API under an existing pre-authorization.

The pre-authorization must have not yet expired, and the new bill must be within the pre-authorization `max_amount`.

Pre-authorizations that you've created with the API can only be charged this way, and not via the Dashboard or another partner app.

#### Request params

`amount`
:    _required_ amount to charge customer (e.g. "10.00")

`pre_authorization_id`
:    _required_ id of pre-authorization to charge bill under.

`name`
:    name of the bill. This will be shown to the customer.

`description`
:    further description of the bill.

`charge_customer_at`
:    should be in the format `YYYY-MM-DD`. Attribute to choose when a payment will leave the customer's account.

#### Response

Returns a bill object.
