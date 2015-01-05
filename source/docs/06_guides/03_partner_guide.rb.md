# Partner guide

<p class="intro">Our Partner API allows you to manage multiple merchant accounts.</p>

## Example partner integration

We have an example partner integration built in Sinatra that is [available on GitHub](https://github.com/gocardless/gocardless-partner-example-ruby). You will need to have a partner account to use this example integration.

## Partner account setup

If you're interested in using our Partner API, [please email us](mailto:help@gocardless.com) for more information.

Once you have used the API to create merchant(s), see the [resources section](https://developer.gocardless.com/#bill) for more information about how to create new bills and subscriptions for these merchants.

First, download and install the Ruby client library:

#### Add to your gemfile:

```ruby
gem install gocardless
```

Alternatively, view [source on Github](https://github.com/gocardless/gocardless-ruby).

## Using the sandbox

By default, the client will use https://gocardless.com as the base URL. Until you are ready to go live, you'll be using a sandbox account so you need to tell the client library to connect to the correct endpoint (https://sandbox.gocardless.com):

```ruby
GoCardless.environment = :sandbox
```

This will force all requests to use the sandbox rather than the main site. Make sure this line is removed when you go live with GoCardless, as sandbox payments will not be processed.

To get things going, you'll need to first set your `redirect_uri` in your dashboard - to do this, simply login to your account and go to the Developer tab, under More.

## Configuring the client

To use the GoCardless client library, you'll need to provide it with your partner account details.

```ruby
client = GoCardless::Client.new(
  :app_id     => 'DUMMY_APP',
  :app_secret => 'INSERT_APP_SECRET_HERE',
)
```

## Connecting a merchant account

Each `Client` object accesses the API on behalf of one merchant, using an access token that is linked to that merchant.

First of all, the merchant must go through a brief authorization process to generate an access token merchant via the API which you may then store for future use.

Note that an app may have access tokens for many merchant accounts, but you must create a new instance of Client for each merchant when working with the API.

## Merchant account authorization

To authorize an with a partner, the merchant must be redirected to the GoCardless servers, where they will be presented with a page that allows them to link their account with the app, whether they have an existing account or they need to create one for the first time.

The URL that the merchant is sent to contains information about the app, as well as the URL (redirect_uri) that the merchant should be sent back to once they've completed the process.

If you wish, you can also include details about the merchant for pre-population on arrival on our signup pages so the user doesn't have to type them in again. You can see a list of all the different fields [you can pre-fill here](#pre-populating-information).

The Ruby client library takes care of most of this - only the `redirect_uri` must be provided:

```ruby
merchant_details = {
  :name => "Widgets Ltd",
  :user => {
    :email => "accounts@widgets.ltd.uk"
  }
}

client.new_merchant_url(
  :redirect_uri => 'http://mywebsite.com/cb'
  :merchant => merchant_details
)
```

Please note that the scheme, host and port of a provided `redirect_uri` must match the URL set for the account in the Dashboard.

The merchant must be redirected to the generated URL, where they will complete a short process to give the Partner app access to their account. If the merchant hasn't already created a merchant account on GoCardless, they will be given the opportunity to do so.

Once the merchant has authorized the app, they will be redirected back to the URL specified (http://mywebsite.com/cb in the example above). The request will include an `authorization code` as a query string parameter `code`.

```ruby
auth_code = params[:code]
```

### Retrieving the access token


This one-time authorization code may be exchanged for an access token, which may be used to access the merchant's account through the API in future. The same redirect_uri that you used in the previous step must also be provided here.

```ruby
client.fetch_access_token(auth_code, :redirect_uri => 'http://mywebsite.com/cb')
client.access_token  # => "IpxtbxtoIPIr7ecXYZJiLGqDDi/iFwZQVjgYkG8a6e5mNnLq7rlpWq9k9Ei0kGOB manage_merchant:12"
```

You should store this access token alongside the merchant's record in your database for future use - you'll need this each time you make a request on the behalf of that user.

To check whether your client is correctly configured, call the `merchant` method - this should successfully return a  `Merchant` object.

```ruby
client.merchant  # => <GoCardless::Merchant ...>
```
