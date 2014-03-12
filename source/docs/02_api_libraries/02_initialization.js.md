# Initialization

You will need to initialize the GoCardless Node.JS library on each page that you would like to use the library.

Once you have [installed](#installation) the library via npm, you will need to configure it within the app:

```js
var gcConfig = {
  appId: 'DUMMY_APP',
  appSecret: 'INSERT_APP_SECRET_HERE',
  token: 'INSERT_MERCHANT_ACCESS_TOKEN',
  merchantId: 'INSERT_MERCHANT_ID'
};
var gocardless = require('gocardless')(gcConfig);
```

You should now be able to make requests to the GoCardless library.

### Sandbox mode
You can use GoCardless in sandbox mode by adding a `sandbox` key to the initialization options:

```js
var gcConfig = {
  sandbox: true,
  appId: 'DUMMY_APP',
  appSecret: 'INSERT_APP_SECRET_HERE',
  token: 'INSERT_MERCHANT_ACCESS_TOKEN',
  merchantId: 'INSERT_MERCHANT_ID'
};
var gocardless = require('gocardless')(gcConfig);
```


### Checking that it works:
To ensure you have initialized the library properly, you should try to load your merchant details using the following request:
```js
gocardless.merchant.getSelf(function(err, response, body) {
  JSON.parse(body); // => Object
});
```

You can see all requests under the [resources section](#bill)
