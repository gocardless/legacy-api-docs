## Receiving webhooks

In this section we'll walk through creating a path on your site to receive webhooks, telling GoCardless to send webhooks to that address, and testing you've done both successfully.

### Creating a path to receive webhooks

First, we'll add a path to your website that will receive webhooks. This is done just like any other path that processes POST requests.

We're going to be using Django for this tutorial. To set up the path for webhooks we add a new route and a new action to its associated controller:

```python
# In your project's urls.py file add a new url
from gc_app.views import GCWebhook

urlpatterns = patterns('',
  ...
  url(r'^gocardless/webhook/$', GCWebhook.as_view(), name='gc_webhook'),
  )
```

```python
# In gc_app/views.py add a new (class-based) view. This tutorial
# assumes you've already imported and initiated the GoCardless client
# library (see the tutorial on creating your first bill if you haven't)
from django.views.generic import View
from django import http
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.utils import simplejson

class GCWebhook(View):
  """
  Validate webhooks from GoCardless and process them
  """
  @method_decorator(csrf_exempt)
  def dispatch(self, *args, **kwargs):
    return super(GCWebhook, self).dispatch(*args, **kwargs)

  def post(self, request, *args, **kwargs):
    json_data = simplejson.loads(request.raw_post_data)
    if gocardless.client.validate_webhook(json_data['payload']):
      return http.HttpResponse(status=200)
    return http.HttpResponse(status=403)
```

We haven't added any real logic to our webhook receiver yet, but you'll have noticed it's already doing some work.

* It checks whether each webhook is valid, using the Python client library
* It responds with a `200` OK header when the request is valid

Both of the above are important: checking webhooks ensures they came from GoCardless, and responding with a `200 OK` tells GoCardless not to resend the webhook (which could otherwise cause duplicate updates to your system).

### Instructing GoCardless where to send webhooks

Now we need to tell GoCardless to send webhooks to the path we just created. This is done in the 'Webhook URI' field of your developer dashboard. If your site is already hosted somewhere you can just enter `http://[yourwebsite.com]/gocardless/webhook` as your Webhook URI.

If on the other hand you're running your site locally there's an extra step, described below.

To use a localhost address as our Webhook URI we need to make your localhost address publicly accessible. Fortunately there's an extremely easy way to do this courtesy of localtunnel. In a new console window:

    $ gem install localtunnel
    $ localtunnel -k ~/.ssh/id_rsa.pub 3000

You should see something like the below:

    Port 3000 is now publicly accessible from
    http://8bv2.localtunnel.com...

Now (as long as we keep this terminal window open) we have a public URL that links to our localhost. We can use that to create a Webhook URI to enter on your developer dashboard. For this tutorial we'd enter:

    http://8bv2.localtunnel.com/gocardless/webhooks

(but note that we'll need to update this address every time we close the localtunnel connection).

### Testing webhooks

To test that we're receiving webhooks successfully we'll use the GoCardless webhook tester. This is an incredibly useful feature that lets you send test webhooks from GoCardless, rather than waiting for an actual event in your GoCardless account.

In the 'Test webhooks' section of your developer dashboard check that the 'Webhook URL' field is as set up in the previous section, select an object type, and click 'Fire webhook'. Navigating to the 'Response' section of the results modal, the first line should be a `200 OK` response.

Congratulations! You're now receiving webhooks from GoCardless.
