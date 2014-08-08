## Create a subscription

A user pays a **fixed amount** to a merchant each fixed interval of time, until an expiry date e.g. £50 every month.

#### Request params

`amount`
:    _required_ amount to collect at each `interval_unit`.

`interval_length`
:    _required_ The number of `interval_unit`s between payments.

`interval_unit`
:    _required_ The unit of measurement for the interval. Can be `day`, `week` or `month`.

`name`
:    Brief description used to identify the payment, displayed to the user alongside the amount. Often useful for an invoice reference.

`description`
:    A more detailed description, which will be displayed to the user.

`user`
:    Allows pre-population of user information - see [pre-populating information](#pre-populating-information)

`start_at`
:    The date the first bill will be created on. If you don't provide a `start_at`, it will result in a bill being created immediately after the subscription is confirmed. Note that it needs to be in the future and be before the  `expires_at` if provided. Should be [ISO8601 format](http://www.w3.org/TR/NOTE-datetime).

`expires_at`
:    Date the subscription expires. Note that subscriptions will expire at 00:00 (UTC) of the expiry date (ie the very start of the day). GoCardless won't create any new bills on the expiration day. Should be [ISO8601 format](http://www.w3.org/TR/NOTE-datetime).

`interval_count`
:    Calculates the `expires_at` date based on the number of payments that you would like to collect from the subscription. Must be a positive integer greater than 0. Also if you specify an `interval_count` and a `expires_at` date, the later takes precedence. For example if the subscription is created on the 14th of February and has an 1 week intervals and an `interval_count` of 2 then the expires_at will be set for the 28th of February. The two payments will be one at creation on the 14th and the other on the 21st.

`setup_fee`
:    A one-off amount to add to the beginning of the subscription. For example, adding a £25.00 setup fee to a £5 per month subscription would mean that the customer is charged £30 at sign up, and then £5 per month.

`redirect_uri`
:    Where the user should be returned to after the authorization process. If it is not provided, the `redirect_uri` registered in the dashboard will be used. The scheme, host and port of a provided `redirect_uri` must match the URL set for the account.

`cancel_uri`
:    Where the user should be returned to if he or she chooses to cancel the connect process before completion. If it is not provided, the `cancel_uri` registered in the developer panel will be used. Note that the scheme, host and port of a provided  `cancel_uri` must match those of the registered one. A `cancel_uri` can only be provided in the request if one is also set on the account.

`state`
:    This allows you to pass a value of your choice through the payment process, receiving it in the redirect page. If present, it will be passed back as a parameter when the user is returned to the merchant's site at the end of an authorization process. If a merchant's site passes in `state="id_9SX5G36"`, it will receive back `state="id_9SX5G36"` when the user returns to the merchant's site. This state is not persisted in the GoCardless database.

#### Returns

Returns a subscription object.
