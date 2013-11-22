## Create a new subscription

A user pays a **fixed amount** to a merchant each fixed interval of time, until an expiry date e.g. £50 every month.

#### Arguments

`amount`
:	_required_ amount to collect at each `interval_unit`.

`interval_length`
:	_required_ The number of `interval_unit`s between payments.

`interval_unit`
: _required_ The unit of measurement for the interval. Can be `day`, `week` or `month`.

`name`
: Brief description used to identify the payment, displayed to the user alongside the amount. Often useful for an invoice reference.

`description`
:	A more detailed description, which will be displayed to the user.

`start_at`
:	The date the first bill will be created on. If you don't provide a `start_at`, it will result in a bill being created immediately after the subscription is confirmed. Note that it needs to be in the future and be before the  `expires_at` if provided. Should be [ISO8601 format](http://www.w3.org/TR/NOTE-datetime).

`expires_at`
:	Date the subscription expires. Note that subscriptions will expire at 00:00 of the expiry date (ie the very start of the day). GoCardless won't create any new bills on the expiration day. Should be [ISO8601 format](http://www.w3.org/TR/NOTE-datetime).

`interval_count`
:	Calculates the `expires_at` date based on the number of payments that you would like to collect from the subscription. Must be a positive integer greater than 0. Also if you specify an `interval_count` and a `expires_at` date, the later takes codecedence. For example if the subscription is created on the 14th of February and has an 1 week intervals and an `interval_count` of 2 then the expires_at will be set for the 28th of February. The two payments will be one at creation on the 14th and the other on the 21st.

`setup_fee`
:	A one-off amount to add to the beginning of the subscription. For example, adding a £25.00 setup fee to a £5 per month subscription would mean that the customer is charged £30 at sign up, and then £5 per month.

#### Returns

Returns a subscription object.
