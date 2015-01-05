# Partner guide

<p class="intro">Our Partner API allows you to manage multiple merchant accounts.</p>

## Partner account setup

If you're interested in using our Partner API, [please email us](mailto:help@gocardless.com) for more information.

Once you have used the API to create merchant(s), see the [resources section](https://developer.gocardless.com/#bill) for more information about how to create new bills and subscriptions for these merchants.

Before you can use the Partner API, you'll need to have set a `redirect_uri` on your Dashboard's Developer tab.

## Creating multiple merchants

The authorization process roughly follows the OAuth 2.0 protocol. To make API requests on behalf of a merchant account, an access token is required. The process of obtaining an access token is described below.

During the process, the user will be prompted to give the referring app permission to manage an existing merchant account, or alternatively to create a new merchant account.

## Request

To start the process the user should be redirected to the authorization URL (`https://gocardless.com/oauth/authorize`) with the following parameters passed in the URL:

`client_id`
:    your app identifier

`redirect_uri`
:    the URI to redirect the user to once the authorization process has been completed. Please note that the scheme, host and port of a provided `redirect_uri` must match the URL set for the account

`scope`
:    this should be set to `manage_merchant`

`response_type`
:    this should be set to `code`

You may also include a `state` argument which is passed back at the end of the process. This may be useful in identifying the user on return from GoCardless.

You may also include a `merchant` object which will be used to pre-populate fields for the user during the connect flow. See the final section on pre-populating information.

The resulting request will look like this:

    https://gocardless.com/oauth/authorize?client_id=XXX&amp;redirect_uri=http%3A%2F%2Fexample.com%2F&amp;cb&amp;response_type=code&amp;scope=manage_merchant

The user will be shown a page confirming that they would like to link a merchant account to your app. They can also create their account at this stage.

## Response

If the user approves the request, they will be redirected to the `redirect_uri` provided in the request with an authorization `code` passed in the URL:

    {
     "code": "",
    }

The state variable will also be returned in the URL if it was provided in the original request.

## Exchange authorization code for access token

The authorization code needs to be exchanged for an access token before you can make authenticated API requests. To perform the exchange, you need to send a POST request to the access token endpoint: `https://gocardless.com/oauth/access_token`.

This request should be authenticated by passing the app identifier and app secret via HTTP Basic Authorization. The request should be made with the following parameters:

`client_id`
:    your app identifier

`code`
:    the authorization code received above

`redirect_uri`
:    this must match the original URI exactly

`grant_type`
:    this should be set to `authorization_code`

If the request is successful then the response will look like this:

```json
{
  "access_token": "MvYX0i6snRh3gevXWbE5a56blveHqPLpLFjfOuZoWusd5AewvXuhcMU/1PXfPoc6",
  "token_type": "bearer",
  "scope": "manage_merchant:VSXU7HPAY7OZN6"
}
```

The ID following the colon within `scope` is the ID of the merchant account (`VSXU7HPAY7OZN6` in this case) that the user linked to the app. This should be used in future API requests to identify the merchant.

Authenticated API requests can now be made by setting the Authorization header to:

    bearer MvYX0i6snRh3gevXWbE5a56blveHqPLpLFjfOuZoWusd5AewvXuhcMU/1PXfPoc6

## Pre-populating information

You can provide certain information in the initial request to enable GoCardless to pre-populate registration fields for your user. This is highly encouraged, as it increases user conversion.

You may provide the following information:

```json
{
  "merchant": {
    "user": {
      "email": "roy@roysburgeremporium.com",
      "first_name": "Roy",
      "last_name": "Roy"
    },
    "name": "Dr Roy",
    "phone_number": "07500000000",
    "description": "Burgers and mash",
    "merchant_type": "business",
    "company_name": "Roy's Burger Emporium",
    "company_registration": "0112358132134",
    "bank_reference": "ROYSBURGERS"
  }
}
```

The variable `merchant['merchant_type']` can be set to one of the following values:

```json
'business' | 'charity' | 'individual'
```
