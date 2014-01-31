# Prepopulating information

When redirecting users to payment pages, you have the option to provide a `user` object to prepopulate the user's payment form on GoCardless. This can dramatically increase conversion of your users to paying customers.

    {
      "subscription": {
        "amount":"50.00",
        "name": "Gold membership",
        "merchant_id": "MERCHANT_ID",
        "interval_length": 1,
        "interval_unit": "month",
        "user": {
          "first_name": "Alasdair",
          "last_name": "Monk",
          "company_name": "GoCardless Ltd",
          "email": "alasdair@gocardless.com",
          "billing_address1": "22-25 Finsbury Square",
          "billing_address2": "Royal London House",
          "billing_town": "London",
          "billing_postcode": "E84DQ"
        }
      },
      authentication etc (see "Authentication")
    }

You may provide the following information:

* `first_name`
* `last_name`
* `email`
* `company_name`
* `billing_address1`
* `billing_address2`
* `billing_town`
* `billing_postcode`
