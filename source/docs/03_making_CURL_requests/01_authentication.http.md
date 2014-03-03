<h0>Making CURL Requests</h0>

# Authentication

## Creating payments

When you send a customer to a GoCardless payment page in order to create a payment, the customer should be sent with a a number of required parameters ([see creating a bill](/#create-a-one-off-bill), [creating a subscription](/#create-a-subscription) or [creating a pre-auth](/#create-a-pre-auth)), and a valid [signature](/#signing-requests).

## Confirming payments

You must confirm payments using Basic Authentication. This is constructed using the following method:

1. `App ID` and `App Secret` are combined into a string "AppID:AppSecret" (you can find these values in your developer panel).
2. The resulting string literal is then encoded using the RFC2045-MIME variant of Base64, except not limited to 76 char/line.
3. The authorization method and a space i.e. "Basic " is then put before the encoded string.

For example, if you were to create an authorisation header for the `App ID` 'Aladdin' and `App Secret` 'open sesame', you would generate the following header:

    Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

## Requesting data

To access the API, simply pass an Authorization header containing `bearer` for the merchant (you can also find this in the developer panel):

    Authorization: bearer INSERT_MERCHANT_ACCESS_TOKEN

**The access token will differ between the live and sandbox environments**.

You will also need to pass an `Accept` header (e.g. `application/json`), or append .json or .xml to the URL requested.

Each token is unique to a merchant. If you are managing several merchants with one app, you will need to specify a different token for each request.
