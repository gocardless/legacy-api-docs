# Changelog

This page serves as a record of changes to the GoCardless API. Any major updates will also be announced to developers via email.

### November 22nd, 2013

Adds a `cancelled` status to bills & webhooks. Previously, when a payment was cancelled by a merchant or customer, the status given would be `failed`. This update means that, in this scenario, the new `cancelled` status will be shown.

### August 23rd, 2013

Adds a `charge_customer_at` attribute to choose on what date a payment will be debited from the customer's account when creating a bill against a pre-authorization.

### June 28th, 2013

Adds a retried web hook for when a bill is resubmitted to the banks after having previously failed.

### May 20th, 2013

Added a `is_setup_fee` attribute to each bill, allowing you to determine whether a bill was created as an initial charge on a subscription or pre-authorization using the setup_fee parameter.

### May 15th, 2013

Added Payouts API.
Adds a payout_id to each bill and allows viewing of individual payouts via `/api/v1/payouts/:id` and payouts for a specific merchant via `/api/v1/merchants/:id/payouts`.

Added pagination support.
Adds support for pagination when querying resources using the `per_page` and `page` parameters, as well as useful headers.

### Apr 17, 2013

Added `retry` method to Bill object which allows a failed payment to be resubmitted by making a `POST` request to  `/api/v1/bills/:id/retry`.

### Nov 30, 2012

Added `hide_variable_amount` attribute to Merchant resource in API, signifying whether a merchant has turned on the option in their Settings.

### Aug 10, 2012

Added optional setup fees for subscriptions and pre-authorizations. See the Connect Guide.

### Jan 30, 2012

Added the ability to cancel subscriptions and pre-authorisations via the API. For more information, see the API Guide.
