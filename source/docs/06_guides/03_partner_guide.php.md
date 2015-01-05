# Partner guide

<p class="intro">Our Partner API allows you to manage multiple merchant accounts.</p>

## Partner account setup

If you're interested in using our Partner API, [please email us](mailto:help@gocardless.com) for more information.

Once you have used the API to create merchant(s), see the [resources section](https://developer.gocardless.com/#bill) for more information about how to create new bills and subscriptions for these merchants.

First, download and install the PHP client library:

#### Install from source:

    git clone git@github.com:gocardless/gocardless-php.git

#### or install from tarball:

    curl -L https://github.com/downloads/gocardless/gocardless-php/gocardless-php-v0.4.1.tgz | tar xzv

Alternatively, view [source on Github](https://github.com/gocardless/gocardless-php).

## Using the sandbox

By default, the client will use https://gocardless.com as the base URL. Until you are ready to go live, you'll be using a sandbox account so you need to tell the client library to connect to the correct endpoint (https://sandbox.gocardless.com):

```php
<?
GoCardless::$environment = 'sandbox';
```

This will force all requests to use the sandbox rather than the main site. Make sure this line is removed when you go live with GoCardless, as sandbox payments will not be processed.

To get things going, you'll need to first set your `redirect_uri` in your dashboard - to do this, simply login to your account and go to the Developer tab, under More.

## Configuring the client

To use the GoCardless client library, you'll need to provide it with your partner account details.

```php
<?
$account_details = array(
  'app_id'        => 'DUMMY_APP',
  'app_secret'    => 'INSERT_APP_SECRET_HERE'
);

$gocardless_client = new GoCardless_Client($account_details);
```

## Connecting a merchant account

Each `Client` object accesses the API on behalf of one merchant, using an access token that is linked to that merchant.

First of all, the merchant must go through a brief authorization process to generate an access token merchant via the API which you may then store for future use.

Note that an app may have access tokens for many merchant accounts, but you must create a new instance of Client for each merchant when working with the API.

## Merchant account authorization

To authorize an with a partner, the merchant must be redirected to the GoCardless servers, where they will be presented with a page that allows them to link their account with the app, whether they have an existing account or they need to create one for the first time.

The URL that the merchant is sent to contains information about the app, as well as the URL (redirect_uri) that the merchant should be sent back to once they've completed the process.

If you wish, you can also include details about the merchant for pre-population on arrival on our signup pages so the user doesn't have to type them in again. You can see a list of all the different fields [you can pre-fill here](#pre-populating-information).

The PHP client library takes care of most of this - only the `redirect_uri` must be provided:

```php
<?
$authorize_url_options = array(
  'redirect_uri' => 'http://mywebsite.com/cb',
  'merchant' => array(
    'name' => 'Widgets Ltd',
    'user' => array(
      'email' => 'accounts@widgets.ltd.uk'
    )
  )
);

$authorize_url = $gocardless_client->authorize_url($authorize_url_options);
```

Please note that the scheme, host and port of a provided `redirect_uri` must match the URL set for the account in the Dashboard.

The merchant must be redirected to the generated URL, where they will complete a short process to give the Partner app access to their account. If the merchant hasn't already created a merchant account on GoCardless, they will be given the opportunity to do so.

Once the merchant has authorized the app, they will be redirected back to the URL specified (http://mywebsite.com/cb in the example above). The request will include an `authorization code` as a query string parameter `code`.

```php
<?
$code = $_GET['code'];
```

### Retrieving the access token


This one-time authorization code may be exchanged for an access token, which may be used to access the merchant's account through the API in future. The same redirect_uri that you used in the previous step must also be provided here.

```php
<?
$params = array(
  'client_id'     => 'DUMMY_APP',
  'code'          => $_GET['code'],
  'redirect_uri'  => 'http://mywebsite.com/cb',
  'grant_type'    => 'authorization_code'
);

// Fetching token returns merchant_id and access_token
$token = $gocardless_client->fetch_access_token($params); # => "1XDQGieUjN1+S8YdXALGZOvtJqNhVQcAPfXqOCxl7Q9jYu8OZirM0J3ZHNdua8DM"
```

You should store this access token alongside the merchant's record in your database for future use - you'll need this each time you make a request on the behalf of that user.

To check whether your client is correctly configured, call the `merchant` method - this should successfully return a  `Merchant` object.

```php
<?
$merchant = $gocardless_client->merchant();
```
