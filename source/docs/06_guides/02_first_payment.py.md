# Your first payment

Looking to get a feel for how easy it is to develop with the GoCardless API?

This lightning fast, super simple tutorial will help you create your first bill in less than 5 minutes.

We'll walk though:

* [Setting up GoCardless and installing the PHP library](#setting-up-gocardless)
* [Creating a payment request](#creating-a-payment-request)
* [Confirming the payment](#confirming-a-payment)

Of course, you can do much more with GoCardless than what's shown in this simple tutorial. See the API and Python client library reference documentation for more details.

## Setting up GoCardless

First things first, you need to sign up for a GoCardless merchant account, or sign in if you already have one. When you view this page while signed in to your GoCardless account the code in this tutorial will be customised with your account details, so you'll be able to copy and paste the code snippets straight into your application.

Once you've signed up, we'll install the GoCardless Python client library, which makes interacting with the GoCardless API simple. We'll use pip install for this, but you can also download the Python client library from github. In console type the below (without the $):

    $ pip install gocardless

Now we're ready to configure the GoCardless client within your app. For this demo we’re going to use Django and for simplicity I'll assume you've created a new app called gc_app within your project. We'll then do the setup in the views.py file of this app. (If you're following along, don't forget to add gc_app to your list of installed apps.)

```python
# At the top of gc_app/views.py
import gocardless
gocardless.set_details(app_id="DUMMY_APP",
        app_secret="INSERT_APP_SECRET_HERE",
        access_token="INSERT_MERCHANT_ACCESS_TOKEN",
        merchant_id="INSERT_MERCHANT_ID")
```

## Creating a Payment Request

To start the billing process you need to redirect your user to the GoCardless checkout page, encoding details of the payment request in the URL. The GoCardless library will take care of this for you - you just need to supply a few details

First we need a form for creating new subscriptions. We'll also collect customers' email addresses on this page, and pre-populate the GoCardless payment pages with that information:

```python
# In your project's urls.py file add a new url
from django.views.generic import TemplateView

urlpatterns = patterns('',
  ...
  url(r'^gocardless/$', TemplateView.as_view(
                        template_name='gc_app/index.html'), name='gc_home'),
  )
```

```html
<!-- In gc_app/templates/gc_app/index.html
     (you'll need to create this file) -->
<!DOCTYPE html>
<html>
<head>
  <title>Signup via GoCardless</title>
</head>
<body>
  <h2>Signup up via GoCardless!</h2>
  <form action ="{#% url gc_submit %#}" method='POST'>
    {#% csrf_token %#}
    <h3>Enter your email to subscribe</h3>
    <input type="text" name="email">
    <input type="submit">
  </form>
</body>
</html>
```

Next, we need to handle the post request sent from the form submission. This is where we send the user to the GoCardless checkout pages, and we'll use the Python library to do the heavy lifting of creating the payment URL. Since the customer has already given us their email address we'll also pre-populate the email field of the checkout form.

```python
# In your project's urls.py file add a new url
from gc_app.views import SubmitGC

urlpatterns = patterns('',
  ...
  url(r'^gocardless/submit/$', SubmitGC.as_view(), name='gc_submit'),
  )
# In gc_app/views.py add a new (class-based) view
from django.views.generic import RedirectView

class SubmitGC(RedirectView):
  """
  Redirect customer to GoCardless payment pages
  """
  def get_redirect_url(self, **kwargs):
    url = gocardless.client.new_subscription_url(
              amount=10,
              interval_length=1,
              interval_unit="month",
              name="Premium Subscription",
              description="A premium subscription for my site",
              user={'email': self.request.POST['email']})
    return url

  """
  Use get logic for post requests (Django 1.3 support)
  """
  def post(self, request, *args, **kwargs):
    return self.get(request, *args, **kwargs)
```

Now when the customer submits the form they'll be redirected to the GoCardless payment pages to enter their bank details and create a new subscription.

## Confirming a Payment

You'll want your customer to be returned to your website once they've completed the payment. We'll walk through it below. Note, however, that this step isn't necessary when creating payments: by default we'll confirm the payment and show your customers a payment complete page.

Set the 'Redirect URI' in your developer dashboard to `http://[yourdomain]/gocardless/confirm/`.

Next, we need to add our confirm URL to urls.py, and add a view for it:

```python
# In your project's urls.py file add a new url
from gc_app.views import ConfirmGC

urlpatterns = patterns('',
  ...
  url(r'^gocardless/confirm/$', ConfirmGC.as_view(
                  template_name = "gc_app/success.html"), name='gc_success'),
  )
# In gc_app/views.py add a new (class-based) view
from django.views.generic import TemplateView

class ConfirmGC(TemplateView):
  """
  Confirms payment creation
  """
  def dispatch(self, request, *args, **kwargs):
    # Patch the Django dispatch method to confirm successful receipt of the
    # payment details before doing anything else
    gocardless.client.confirm_resource(request.GET)
    return super(ConfirmGC, self).dispatch(request, *args, **kwargs)
```

Note that the view above has some work to do. It confirms the safe receipt of the payment details, and it's only at this point that the payment is created. The Python client library takes care of all of the heavy lifting here.

Finally we need to add a success template:

```html
<!-- In gc_app/templates/gc_app/success.html
     (you'll need to create this file) -->
<!DOCTYPE html>
<html>
<head>
  <title>Signup via GoCardless</title>
</head>
<body>
  <h2>New subscription created!</h2>
</body>
</html>
```

That's it! Your app is now set up to take subscription payments! Take a moment to test it out (don't forget to log out of your GoCardless merchant account before testing). Your customers can now easily subscribe to pay you £10 every month, via direct debit.

A sample project, which implements all the payment types, along with Webhooks [is available on Github](https://github.com/gocardless/sample-django-app.git).
