## Create a new one-off bill

A user pays a one-off amount to the merchant. The user should be redirected to the url and will be asked for authorisation.

If the user has an existing active preauthorization, you may wish to [create a bill under a pre-authorization]()

#### Request params

`bill[amount]`
:    _required_ the amount of the bill.

`bill[merchant_id]`
:    _required_ your merchant ID.

`bill[name]`
:    Brief description used to identify the payment, displayed to the user alongside the amount. Often useful for an invoice reference.

`bill[description]`
:    A more verbose description, which will be displayed to the user.

`bill[user]`
:    Allows prepopulation of user information - see [prepopulating information]()

`signature`
:    _required_ Generated from the request prams according to the [signature guide]()

`nonce`
:    _required_ A random string to ensure the uniqueness of each request. This prevents multiple customers using the same link to access the payments process. The nonce is stored for a period of 3 hours, after which it may be re-used. We recommend a random base64-encoded string, but any non-nil value may be used.

`client_id`
:    _required_ Your app's identifier/app ID

`timestamp`
:    _required_ UTC date and time in ISO 8601 format, e.g. `2011-01-01T12:00:00Z`. The request must hit our server within 3 hours of this timestamp, otherwise it will be rejected.

`redirect_uri`
:    Where the user should be returned to after the authorization process. If it is not provided, the `redirect_uri` registered in the dashboard will be used. The scheme, host and port of a provided `redirect_uri` must match the URL set for the account.

`cancel_uri`
:    Where the user should be returned to if he or she chooses to cancel the connect process before completion. If it is not provided, the `cancel_uri` registered in the developer panel will be used. Note that the scheme, host and port of a provided  `cancel_uri` must match those of the registered one. A `cancel_uri` can only be provided in the request if one is also set on the account.

`state`
:    This allows you to pass a value of your choice through the payment process, receiving it in the redirect page. If present, it will be passed back as a parameter when the user is returned to the merchant's site at the end of an authorization process. If a merchant's site passes in state="id_9SX5G36", it will receive back state="id_9SX5G36" when the user returns to the merchant's site. This state is not persisted in the GoCardless database.


#### Confirmation

Once the user has given authorization for one of these resources to be created, it will exist in an 'inactive' state. The user will be redirected (a GET request) back to the URI specified.

You must [verify the resource]() otherwise it will be removed within a short period of time.
