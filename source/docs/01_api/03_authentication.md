# Authentication

To access the API, simply pass an Authorization header containing `bearer` for the merchant (you can also find this in the developer panel):

    Authorization: bearer INSERT_MERCHANT_ACCESS_TOKEN

**The access token will differ between the live and sandbox environments**.

You will also need to pass an `Accept` header (e.g. `application/json`), or append .json or .xml to the URL requested.

Each token is unique to a merchant. If you are managing several merchants with one app, you will need to specify a different token for each request.
