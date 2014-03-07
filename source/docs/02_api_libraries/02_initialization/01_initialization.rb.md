# Initialization

If you are using rails, you should begin by adding GoCardless to your Gemfile. You can also [download the GoCardless Ruby library manually from Github](#installation).

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


### Checking that it works:
To ensure you have initialized the library properly, you should try to load your developer details using the following request:
```ruby
GoCardless::Merchant.find("INSERT_MERCHANT_ID#")
```

You can see all requests under the [resources section](#bill)