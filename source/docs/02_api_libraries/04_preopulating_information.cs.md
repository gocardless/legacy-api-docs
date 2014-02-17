# Pre-populating information

When redirecting users to payment pages, you have the option to provide a `user` object to pre-populate the user's payment form on GoCardless. This can dramatically increase conversion of your users to paying customers.

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
      },
      authentication etc (see "Authentication")
    }

You may provide the following information:

* `currency`
* `[user]first_name`
* `[user]last_name`
* `[user]email`
* `[user]company_name`
* `[user]billing_address1`
* `[user]billing_address2`
* `[user]billing_town`
* `[user]billing_postcode`
* `[user]country_code` (defaults to `GB`)

**`currency`** can be one of the following:

* `EUR`: € Euro
* `GBP`: £ British Pound Sterling (default)

For EUR payments **`[user]country_code`** can be one of the following:

* `AT`: Austria
* `BE`: Belgium
* `FR`: France
* `DE`: Germany
* `IE`: Ireland
* `NL`: Netherlands
