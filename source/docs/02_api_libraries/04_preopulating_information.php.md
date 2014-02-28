# Pre-populating information

## Currency information

If your account has been set up to accept international payments (see [gocardless.com/europe](https://gocardless.com/europe), you will be able to supply a currency for your payment.

To set the currency, please provide it inside of the payment details when creating a payment link:

```php
<?php
$subscription_details = array(
  'amount'           => '10.00',
  'interval_length'  => 1,
  'interval_unit'    => 'month',
  'currency'         => 'EUR'
);
?>
```

The `currency` parameter can be one of the following:

* `EUR`: € Euro
* `GBP`: £ British Pound Sterling (default)


## Billing information

When redirecting users to payment pages, you have the option to provide a `user` object to pre-populate the user's payment form on GoCardless. This can dramatically increase conversion of your users to paying customers.  

The `user` object should be provided inside of the payment details when creating a payment link:


```php
<?
$subscription_details = array(
  'amount'           => '10.00',
  'interval_length'  => 1,
  'interval_unit'    => 'month',
  'user'             => array(
    'first_name'       => 'John',
    'last_name'        => 'Doe',
    'company_name'     => 'John Doe Gymnasium',
    'billing_address1' => '123 Fake Street',
    'billing_address2' => 'District Ville',
    'billing_town'     => 'Dream City',
    'billing_postcode' => 'AB1 2CD',
    'country_code'     => 'GB'
  )
);
?>
```

For EUR payments **`[user]country_code`** can be one of the following:

* `AT`: Austria
* `BE`: Belgium
* `FR`: France
* `DE`: Germany
* `IE`: Ireland
* `NL`: Netherlands
