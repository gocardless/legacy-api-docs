<h0>Using the REST API</h0>

# API endpoints

To use the GoCardless API to query data, you will need to send a request to the correct endpoint. Request endpoints should depend on whether you wish to query the live or sandbox environment:

* __Sandbox__: `https://sandbox.gocardless.com`
* __Live__: `https://gocardless.com`

To see all the available GoCardless endpoints, please see the [resources section](#bill).

_Please note:_ the GoCardless API does not allow you to set up a GoCardless payment, instead you will need to send your customers a [link to a GoCardless payment page](#generating-payment-links).
