## Create a pre-auth

A user agrees to allow the merchant to create bills up to a pre-defined amount every pre-defined interval of time, until an expiry date e.g., up to £10 per week until 1 January 2015.

Pre-authorizations you make via the API can currently only be charged through the API. This means that you can't request payments from the Dashboard or through another partner app, for example.

Note that a pre-authorization allows the Merchant to bill the User in future without asking for explicit permission each time

#### Request params

`pre_authorization [max_amount]`
:    _required_ the maximum amount that can be collected within one of the specified intervals.

`pre_authorization [interval_length]`
:    _required_ The number of `interval_unit`s that make up the interval.

`pre_authorization [interval_unit]`
:    _required_ The unit of measurement for the interval. Can be `day`, `week` or `month`.

`pre_authorization [expires_at]`
:    Date the pre-authorization expires. Note that pre-authorization will be expired just after midnight of the `expires_at` date. Should be [ISO8601 format](http://www.w3.org/TR/NOTE-datetime).

`pre_authorization [name]`
:    brief description used to identify the pre-authorization, displayed to the user alongside the amount. Often useful for an "invoice reference".

`pre_authorization [description]`
:    A more detailed description, which will be displayed to the user.

`pre_authorization [user]`
:    Allows prepopulation of user information - see [prepopulating information](#prepopulating-information)

`pre_authorization [interval_count]`
:	Calculates the `expires_at` date based on the number of payment intervals that you would like the resource to have. Must be a positive integer greater than 0. Also if you specify an `interval_count` and a `expires_at` date, the later takes precedence. For example if the pre-authorization is created on the 15th of February and has a 1 day interval and an  `interval_count` of 2 then the `expires_at` will be set for the 17th of February. The two intervals will be from the 15th to the 16th and from the 16th to the 17th.

`pre_authorization [setup_fee]`
:    A one-off amount to add to the beginning of the subscription. For example, adding a £25.00 setup fee to a £5 per month subscription would mean that the customer is charged £30 at sign up, and then £5 per month.

`pre_authorization [calendar_intervals]`
:    Boolean describing whether the `interval` attribute should be aligned with calendar weeks or months, default: `false`.

`signature`
:    _required_ Generated from the request prams according to the [signature guide](#signing-requests)

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
:    This allows you to pass a value of your choice through the payment process, receiving it in the redirect page. If present, it will be passed back as a parameter when the user is returned to the merchant's site at the end of an authorization process. If a merchant's site passes in `state="id_9SX5G36"`, it will receive back `state="id_9SX5G36"` when the user returns to the merchant's site. This state is not persisted in the GoCardless database.

**Calendar interval examples:**

	calendar_intervals: true
	interval_length: 1
	interval_unit: month
	Resource created: 15th January

The first interval will be from the 15th-31st January. The second interval will begin on the 1st of February and last for one month. Subsequent intervals will begin on the first of the month and last a calendar month.

	calendar_intervals: true
	interval_length: 1
	interval_unit: week
	Resource created: Wednesday

The first interval will run Wednesday - Sunday. The second interval will start on the following Monday and last a week. Subsequent intervals will be from Monday to Sunday.

If a pre-authorization is created at the beginning of a normal calendar interval (ie. Monday for a weekly interval or the first of the month for a monthly interval) then the first interval will run from that day until the end of that particular calendar interval.

If a pre-authorization is created with an `interval_length` greater than 1 then the second interval will commence at the start of the next typical calendar interval.

	calendar_intervals: true
	interval_length: 2
	interval_unit: month
	Resource created: 15th March

The first interval will run from 15-31st March. The second interval willcommence on the 1st April and last two months. Subsequent intervals will last two months.

#### Returns

Returns a pre-authorization object

### Variable payments

We also support payments using pre-authorizations which are more like traditional Direct Debit that you might be used to.

With this option enabled, when setting up a pre-authorization the customer will not be shown the maximum amount, but rather they will authorise for "Direct Debit payments". This provides great flexibility to take payments as you need.

To take advantage of this, simply **enable the "Variable payments" option in the "Settings" tab** of your dashboard and then set up a pre-authorization as usual. You should specify a maximum amount higher than you ever expect to bill your customer.
