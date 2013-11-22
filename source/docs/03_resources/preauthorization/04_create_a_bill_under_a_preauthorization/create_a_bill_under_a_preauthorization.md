## Create a bill under a pre-auth

Create a bill via the API under an existing pre-authorization.

The pre-authorization must have not yet expired, and the new bill must be within the pre-authorization `max_amount`.

Pre-authorizations that you've created with the API can only be charged this way, and not via the Dashboard or another partner app.

#### Arguments

`amount`
:	_required_ amount to charge customer (e.g. "10.00")

`pre_authorization_id`
:	_required_ id of pre-authorization to charge bill under

`name`
:	name of the bill that will be shown to customer on the payment page

`description`
:	further description of the bill that will be shown to customer on the payment page

`charge_customer_at`
:	should be in the format `YYYY-MM-DD`. Attribute to choose when a payment will leave the customer's account

#### Returns

Returns a bill object.
