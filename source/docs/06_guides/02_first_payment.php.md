# Your first payment

This lightning fast, super simple tutorial will help you create your first bill in less than 5 minutes.

We'll walk though:

* [Setting up GoCardless and installing the PHP library](#setting-up-gocardless)
* [Creating a payment request](#creating-a-payment-request)
* [Confirming the payment](#confirming-a-payment)

By the end of the tutorial (in five minutes' time) we'll have added a link on your site that signs the customer up to pay you £10 a month.

Of course, you can do much more with GoCardless than what's shown in this simple tutorial. See the API and PHP client library reference documentation for more details.

## Setting up GoCardless

First things first, you need to sign up for a GoCardless merchant account, or sign in if you already have one. When you view this page while signed in to your GoCardless account the code in this tutorial will be customised with your account details, so you'll be able to copy and paste the code snippets straight into your application.

Once you've signed up, we'll install the GoCardless PHP client library, which makes interacting with the GoCardless API simple.

You can download the PHP client library from Github. Then you need to copy the `/lib` folder into your code.

Now we're ready to configure the GoCardless client within your app. The best way to do this is to create a central configuration file which you will include each time you wish to use the GoCardless PHP library. You can find your developer credentials in the developer panels of your live and sandbox dashboard.

```php
// gocardless-init.php

<?
// Include the GoCardless PHP library
include_once 'lib/GoCardless.php';

// Uncomment this and change your keys over to go live - but make
// sure you test in sandbox first!
//GoCardless::$environment = 'production';

if (GoCardless::$environment == 'production') {
    // Set your live environment developer credentials
    $account_details = array(
      'app_id'        => 'INSERT_LIVE_APP_ID',
      'app_secret'    => 'INSERT_LIVE_APP_SECRET',
      'merchant_id'   => 'INSERT_LIVE_MERCHANT_ID',
      'access_token'  => 'INSERT_LIVE_MERCHANT_ACCESS_TOKEN'
    );
}
else {
    // Set your sandbox environment developer credentials
    $account_details = array(
      'app_id'        => 'INSERT_SANDBOX_APP_ID',
      'app_secret'    => 'INSERT_SANDBOX_APP_SECRET',
      'merchant_id'   => 'INSERT_SANDBOX_MERCHANT_ID',
      'access_token'  => 'INSERT_SANDBOX_MERCHANT_ACCESS_TOKEN'
    );
}

// Initialize GoCardless
GoCardless::set_account_details($account_details);
?>
```

## Creating a payment Request

To start the billing process you need to redirect your user to the GoCardless checkout page, encoding details of the payment request in the URL. The GoCardless library will take care of this for you - you just need to supply a few details

The PHP client library does all the heavy lifting of generating the payment URL for you. All you need to do is enter details of the payment you're setting up:

```php
// payment.php

<?
// Include our GoCardless library initialization file
include_once 'gocardless-init.php';

$subscription_details = array(
  'amount'           => '10.00',
  'interval_length'  => 1,
  'interval_unit'    => 'month'
);

// Generate the url
$subscription_url = GoCardless::new_subscription_url($subscription_details);

// Display the link
echo '<a href="'.$subscription_url.'">New subscription</a>';

?>
```

When the customer clicks the link generated they'll be redirected to the GoCardless payment pages to enter their bank details and create a new subscription.

## Confirming a payment

You'll want your customer to be returned to your website once they've completed the payment. We'll walk through it below. Note, however, that this step isn't necessary when creating payments: by default we'll confirm the payment and show your customers a payment complete page.

Set the 'Redirect URI' in your developer dashboard to `http://[yourdomain]/thankyou.php`.

Now in `thankyou.php`, add the following:

```php
// thankyou.php

<?
// Include our GoCardless library initialization file
include_once 'gocardless-init.php';

// Required confirm variables
$confirm_params = array(
  'resource_id'    => $_GET['resource_id'],
  'resource_type'  => $_GET['resource_type'],
  'resource_uri'   => $_GET['resource_uri'],
  'signature'      => $_GET['signature']
);

// State is optional
if (isset($_GET['state'])) {
  $confirm_params['state'] = $_GET['state'];
}

$confirmed_resource = GoCardless::confirm_resource($confirm_params);

?>
```

Some users experience an "Unknown Error" exception at this point due to an issue with how their PHP's Curl library connects to HTTPS-secured servers. If this happens to you in your testing environment, try uncommenting line 93 of the Request.php file. You shouldn't do this in production for security reasons.

That's it! Your app is now set up to take subscription payments! Take a moment to test it out (don't forget to log out of your GoCardless merchant account before testing). Your customers can now easily subscribe to pay you £10 every month, via direct debit.
