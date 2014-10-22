# Pre-populating information

## Currency information

If your account has been set up to accept international payments (see [gocardless.com/europe](https://gocardless.com/europe), you will be able to supply a currency for your payment.

To set the currency, please provide it inside of the payment details when creating a payment link:

```
{
  "subscription": {
    "amount":"50.00",
    "name": "Gold membership",
    "merchant_id": "MERCHANT_ID",
    "interval_length": 1,
    "interval_unit": "month",
    "currency": "EUR"
  }
}
```

The `currency` parameter can be one of the following:

* `EUR`: € Euro
* `GBP`: £ British Pound Sterling (default)


## Billing information

When redirecting users to payment pages, you have the option to provide a `user` object to pre-populate the user's payment form on GoCardless. This can dramatically increase conversion of your users to paying customers.

The `user` object should be provided inside of the payment details when creating a payment link:


```
{
  "subscription": {
    "amount":"50.00",
    "name": "Gold membership",
    "merchant_id": "MERCHANT_ID",
    "interval_length": 1,
    "interval_unit": "month",
    "currency": "GBP",
    "user": {
      "first_name": "Alasdair",
      "last_name": "Monk",
      "company_name": "GoCardless Ltd",
      "email": "alasdair@gocardless.com",
      "billing_address1": "22-25 Finsbury Square",
      "billing_address2": "Royal London House",
      "billing_town": "London",
      "billing_postcode": "E84DQ",
      "country_code": "GB"
    }
  }
}
```

For EUR payments **`[user]country_code`** can be one of the following:

* `AT`: Austria
* `BE`: Belgium
* `CY`: Cyprus
* `EE`: Estonia
* `FI`: Finland
* `FR`: France
* `DE`: Germany
* `GR`: Greece
* `IE`: Ireland
* `IT`: Italy
* `LV`: Latvia
* `LU`: Luxembourg
* `MT`: Malta
* `MC`: Monaco
* `NL`: Netherlands
* `PT`: Portugal
* `SM`: San Marino
* `SK`: Slovakia
* `SI`: Slovenia
* `ES`: Spain
