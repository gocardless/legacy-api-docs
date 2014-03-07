# Initialization

After [installing the GoCardless Python library](#installation), you will need to initialize the library on each page that you wish to use the library:

```python
import gocardless
gocardless.set_details(app_id="DUMMY_APP",
        app_secret="INSERT_APP_SECRET_HERE",
        access_token="INSERT_MERCHANT_ACCESS_TOKEN",
        merchant_id="INSERT_MERCHANT_ID")
```

You should now be able to make requests to the GoCardless library.

_We have instructions for setting up the GoCardless Python library with Django under the [your first payment](#your-first-payment) section._

### Checking that it works:
To ensure you have initialized the library properly, you should try to load your developer details using the following request:
```python
gocardless.client.merchant()
```

You can see all requests under the [resources section](#bill)