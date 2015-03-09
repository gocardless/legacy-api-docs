# Your first payment

This lightning fast, super simple tutorial will help you create your first bill in less than 5 minutes.

We'll walk though:

* [Setting up GoCardless and installing the Ruby library](#setting-up-gocardless)
* [Creating a payment request](#creating-a-payment-request)
* [Confirming the payment](#confirming-a-payment)

By the end of the tutorial (in five minutes' time) we'll have added a link on your site that signs the customer up to pay you £10 a month.

Of course, you can do much more with GoCardless than what's shown in this simple tutorial. See the API and Ruby client library reference documentation for more details.

## Setting up GoCardless

First things first, you need to sign up for a GoCardless merchant account, or sign in if you already have one. When you view this page while signed in to your GoCardless account the code in this tutorial will be customised with your account details, so you'll be able to copy and paste the code snippets straight into your application.

Once you've signed up, we'll install the GoCardless Ruby client library, which makes interacting with the GoCardless API simple. For this demo we’re going to use Rails, so we'll add GoCardless to our Gemfile. You can also download the GoCardless Ruby library manually from Github.

```ruby
# In Gemfile
gem 'gocardless'
```

Now we're ready to configure the GoCardless client within your app. The best way to do this is by creating a new initializer:

```ruby
# In config/initializers/gocardless.rb
# (you'll need to create this file)

GoCardless.account_details = {
  :app_id      => 'DUMMY_APP',
  :app_secret  => 'INSERT_APP_SECRET_HERE',
  :token       => 'INSERT_MERCHANT_ACCESS_TOKEN',
  :merchant_id => 'INSERT_MERCHANT_ID'
}
```

Since we're adding a new initializer here, you'll need to restart your rails server after adding the above file. When you restart you'll also be asked to run bundle install, as we've added a new gem.

## Creating a payment request

To start the billing process you need to redirect your user to the GoCardless checkout page, encoding details of the payment request in the URL. The GoCardless library will take care of this for you - you just need to supply a few details

First we need a form for creating new subscriptions. We'll also collect customers' email addresses on this page, and pre-populate the GoCardless payment pages with that information:

```ruby
# In config/routes.rb add a new route
get "gocardless/index"
# In app/controllers/gocardless_controller.rb
# (you'll need to create this file)

class GocardlessController < ApplicationController
  def index
  end
end
```

```html
<!-- In app/views/gocardless/index.html.erb
     (you'll need to create this file) -->
<h2>Signup up via GoCardless!</h2>

<% form_tag "/gocardless/submit" %>
  <h3>Enter your email to subscribe</h3>
  <input type="text" name="email">
  <input type="submit">
<% end %>
```

Next, we need to handle the post request sent from the form submission. This is where we send the user to the GoCardless checkout pages, and we'll use the Ruby library to do the heavy lifting of creating the payment URL. Since the customer has already given us their email address we'll also pre-populate the email field of the checkout form.

```ruby
# In config/routes.rb add a new route
post "gocardless/submit"
# In app/controllers/gocardless_controller.rb, within GocardlessController

def submit
  # We'll be billing everyone £10 per month in this example
  url_params = {
    :amount          => 10,
    :interval_unit   => "month",
    :interval_length => 1,
    :name            => "Premium Subscription",
    # Set the user email from the submitted value
    :user => {
      :email => params["email"]
    }
  }
  url = GoCardless.new_subscription_url(url_params)
  redirect_to url
end
```

When the customer submits the form they'll be redirected to the GoCardless payment pages to enter their bank details and create a new subscription.

## Confirming a payment

You'll want your customer to be returned to your website once they've completed the payment. We'll walk through it below. Note, however, that this step isn't necessary when creating payments: by default we'll confirm the payment and show your customers a payment complete page.

Set the 'Redirect URI' in your developer dashboard to `http://[yourdomain]/gocardless/confirm`.

Next, add the confirm URL to routes.rb, and add a controller action for it:

```ruby
# In config/routes.rb add a new route
get "gocardless/confirm"
# In app/controllers/gocardless_controller.rb, within GocardlessController

# Implement the confirm action
def confirm
  GoCardless.confirm_resource params
  render "gocardless/success"
rescue GoCardless::ApiError => e
  render :text => "Could not confirm new subscription. Details: #{e}"
end
```

Note that the controller action above is doing a lot of work behind the scenes. It confirms the safe receipt of the payment details with a quick message back to the GoCardless server - it's only at this point that the payment is created. The Ruby client library takes care of all of the heavy lifting here.

Finally we need to add a success view:

```html
<!-- In app/views/gocardless/success.html.erb
     (you'll need to create this file) -->

<h2>New subscription created!</h2>
```

That's it! Your app is now set up to take subscription payments! Take a moment to test it out (don't forget to log out of your GoCardless merchant account before testing). Your customers can now easily subscribe to pay you £10 every month, via direct debit.

A sample project, which implements all the payment types, along with Webhooks is available on Github.
