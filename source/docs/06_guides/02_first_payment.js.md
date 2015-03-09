# Your first payment

This lightning fast, super simple tutorial will help you create your first bill in less than 5 minutes.

We'll walk though:

* [Setting up GoCardless and installing the Node.js library](#setting-up-gocardless)
* [Creating a payment request](#creating-a-payment-request)
* [Confirming the payment](#confirming-a-payment)

By the end of the tutorial (in five minutes' time) we'll have added a link on your site that signs the customer up to pay you £10 a month.

Of course, you can do much more with GoCardless than what's shown in this simple tutorial. See the API and Node.js client library reference documentation for more details.

## Setting up GoCardless

First things first, you need to sign up for a GoCardless merchant account, or sign in if you already have one. When you view this page while signed in to your GoCardless account the code in this tutorial will be customised with your account details, so you'll be able to copy and paste the code snippets straight into your application.

Once you've signed up, we'll install the GoCardless Node.js client library, which makes interacting with the GoCardless API simple. For this demo we’re going to use [Express](http://expressjs.com/), so we'll install the library via npm and save it to our package.json.

```bash
$ npm install --save gocardless
```

Now we're ready to configure the GoCardless client within the app.

```js
var gcConfig = {
  appId: 'DUMMY_APP',
  appSecret: 'INSERT_APP_SECRET_HERE',
  token: 'INSERT_MERCHANT_ACCESS_TOKEN',
  merchantId: 'INSERT_MERCHANT_ID'
};
var gocardless = require('gocardless')(gcConfig);
```

## Creating a payment request

To start the billing process you need to redirect your user to the GoCardless checkout page, encoding details of the payment request in the URL. The GoCardless library will take care of this for you - you just need to supply a few details

First we need a form for creating new subscriptions. We'll also collect customers' email addresses on this page, and pre-populate the GoCardless payment pages with that information:

```html
<!-- in views/index.html (you'll need to create this file) -->
<form action="/subscribe">
  <label for="email">Enter your email to subscribe</label>
  <input type="email" name="email" id="email">
  <button>Submit</button>
</form>
<% end %>
```

```js
// In app.js
app.get('/', function(req, res) {
  res.render('index');
});
```

Next, we need to handle the post request sent from the form submission. This is where we send the user to the GoCardless checkout pages, and we'll use the Node.js library to do the heavy lifting of creating the payment URL. Since the customer has already given us their email address we'll also pre-populate the email field of the checkout form.

```js
// In app.js
app.post('/subscriptions', function(req, res) {
  // Everyone gets charged £10
  var url = gocardless.subscription.newUrl({
    amount: '10',
    interval_unit: 'month',
    name: 'Premium subscription',
    // Set the user email from the submitted value
    user: {
      email: req.body.email
    }
  });
  res.redirect(url);
});
```

When the customer submits the form they'll be redirected to the GoCardless payment pages to enter their bank details and create a new subscription.

## Confirming a payment

You'll want your customer to be returned to your website once they've completed the payment. We'll walk through it below. Note, however, that this step isn't necessary when creating payments: by default we'll confirm the payment and show your customers a payment complete page.

Set the 'Redirect URI' in your developer dashboard to `http://[yourdomain]/gocardless/confirm`.

Next, add the confirm URL handler:

```js
// In app.js
app.get('/gocardless_callback', function(req, res) {
  // Check the signature and POST back to GoCardless
  gocardless.confirmResource(req.query, function(err, request, body) {
    if (err) return res.end(401, err);
    res.render('success');
  });
});
```

Note that the route shown above is doing a lot of work behind the scenes. It confirms the safe receipt of the payment details with a quick message back to the GoCardless server - it's only at this point that the payment is created. The Node.js client library takes care of all of the heavy lifting here.

That's it! Your app is now set up to take subscription payments! Take a moment to test it out (don't forget to log out of your GoCardless merchant account before testing). Your customers can now easily subscribe to pay you £10 every month, via direct debit.
