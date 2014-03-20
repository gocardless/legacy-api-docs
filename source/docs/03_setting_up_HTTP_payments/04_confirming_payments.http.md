
# Confirming payments

Once a payment has been created, the customer will be redirected back to the redirect URI set in your GoCardless [developer panel](https://dashboard.gocardless.com/developer-details/uri-settings) or the redirect URI set in your payment URL. You must then notify GoCardless via a 'POST' request that the customer was successfully returned to your website.

## Returned parameters

The customer will be returned with a number of parameters. To read about the parameters returned on each payment type, please see the following resources:

* [Confirming a one-off bill](#http://0.0.0.0:4567/#confirm-a-new-one-off-bill).
* [Confirming a subscription](#http://0.0.0.0:4567/#confirm-a-new-subscription).
* [Confirming a pre-authorization](#http://0.0.0.0:4567/#confirm-a-new-pre-auth).

## Sending the confirmation

A `POST` should be sent back to GoCardless with the following parameters:

#### Request params

`resource_id`
:     _required_ the id provided in the initial `GET` request

`resource_type`
:     _required_ the resource type provided in the initial `GET` request


## Basic authentication

You must confirm payments using Basic Authentication. This is a header that is constructed using the following method:

1. `App ID` and `App Secret` are combined into a string "AppID:AppSecret" (you can find these values in your developer panel).
2. The resulting string literal is then encoded using the RFC2045-MIME variant of Base64, except not limited to 76 char/line.
3. The authorization method and a space i.e. "Basic " is then put before the encoded string.

For example, if you were to create an authorisation header for the `App ID` 'Aladdin' and `App Secret` 'open sesame', you would generate the following header:

    Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==