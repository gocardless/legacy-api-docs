# Initialization

You will need to initialize the GoCardless PHP on each page that you would like to use the library.

The first step is to include the library:
```php
include_once 'lib/GoCardless.php';
```

Next you will need to set the development environment that you would like to use. If you do not explicitly state the production environment, then GoCardless will default to the sandbox:
```php
GoCardless::$environment = 'production';
```

Finally you will need to initialize the environment with your developer settings. Please ensure that you use the correct developer settings for the environment that you are using (ie. sandbox and live will have different developer credentials):
```php
<?php
// Set config vars
$account_details = array(
  'app_id'        => 'DUMMY_APP',
  'app_secret'    => 'INSERT_APP_SECRET_HERE',
  'merchant_id'   => 'INSERT_MERCHANT_ID',
  'access_token'  => 'INSERT_MERCHANT_ACCESS_TOKEN'
);

// Initialize GoCardless
GoCardless::set_account_details($account_details);
?>
```

You should now be able to make requests to the GoCardless library.

### Checking that it works:
To ensure you have initialized the library properly, you should try to load your developer details using the following request:
```php
<?php
GoCardless_Merchant::find('INSERT_MERCHANT_ID');
?>
```

You can see all requests under the [resources section](php#bill)