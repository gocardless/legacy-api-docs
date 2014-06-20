## Reacting to webhooks

Now we're receiving webhooks we want to react to them. In this section we'll walk through an example where we disable a user's account if they cancel their subscription with us. You can see full details of all the webhooks you might want to respond to in our [HTTP documentation](/http/#webhooks).

### Responding to cancelled subscriptions

The information in the webhook is in JSON format, with a dictionary called `payload` as the top level namespace. We've already accessed the `payload` dictionary once, in order to validate the webhook. Now we'll write some logic to identify cancelled subscriptions and respond to them.

Here I'll assume you have a field on each of your users for their GoCardless ID, and another for whether or not they're active.

```ruby
# In app/controllers/gocardless.rb, adjust the webhook action we created

def webhook
  if GoCardless.webhook_valid?(params[:payload])
    data = params[:payload]
    if data[:resource_type] == "subscription" && data[:action] == "cancelled"
      data[:subscriptions].each do |subscription|
        # Lookup the subscription using subscription[:resource_id]
        # Perform logic to cancel the subscription
        # Any time-consuming jobs should be performed asynchronously
        Rails.log "Subscription #{subscription[:resource_id]} cancelled!"
      end
    end
    render :text => "true", :status => 200
  else
    render :text => "false", :status => 403
  end
end
```

And that's it! You're now responding when GoCardless sends you a cancelled subscription event, and you've tested your response!
