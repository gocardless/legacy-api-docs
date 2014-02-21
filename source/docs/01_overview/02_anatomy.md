# GoCardless Anatomy

### Payment resources
There are three resources that can be set up through GoCardless to take payments: bill, subscription, and pre-authorisation. Please note that subscriptions and pre-authorisations will create bills for each payment under them.

<div class="icon-list">
    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/bill@2x.png" class="icon--bill" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Bill</h5>
            A bill resource represents a payment from a customer's bank account. A bill can exist on its own, or it can be created under a subscription or a pre-authorisation. A bill cannot be altered after its creation, however it can be cancelled.
        </div>
    </div>

    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/subscription@2x.png" class="icon--subscription" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Subscription</h5>
            A subscription is a resource that will automatically create a bill after a defined interval (eg. monthly). The customer will not need to take any further steps to authorise each variable payment. A subscription cannot be altered after its creation.
        </div>
    </div>

    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/mandate@2x.png" class="icon--preauth" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Pre-authorization</h5>
            A pre-authorisation is a resource that enables you to take variable payments. The customer will not need to take any further steps to authorise each variable payment.
        </div>
    </div>
</div>

### Other resources
Other resources in GoCardless that are not directly related to taking payments.

<div class="icon-list">
    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/payout@2x.png" class="icon--payout" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Payout</h5>
            A payout is a payment made from GoCardless to a merchant's bank account that consists of payments collected by the merchant, minus fees taken by GoCardless.
        </div>
    </div>

    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/merchant@2x.png" class="icon--merchant" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Merchant</h5>
            The merchant represents the business or organisation <b>collecting</b> payments from customers. A merchant can collect payments from users in three ways: one-off bills, subscriptions or pre-authorizations.
        </div>
    </div>

    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/user@2x.png" class="icon--user" />
        </div>
        <div class="icon-list__row__definition">
            <h5>User</h5>
            Represents a user that has a bill, subscription or pre-authorization with the merchant.
        </div>
    </div>

    <div class="icon-list__row">
        <div class="icon-list__row__icon">
            <img src="http://developer.gocardless.com.s3.amazonaws.com/images/webhook@2x.png" class="icon--payout" />
        </div>
        <div class="icon-list__row__definition">
            <h5>Webhook</h5>
            <p>A webhook is a <code>HTTP POST</code> request sent from GoCardless to notify your server of changes to a resource (for example, when a bill becomes paid or a subscription is cancelled).</p>

            <p>For example, if a customer cancels their subscription to your membership system, your website could respond by revoking the customer's access a membership only section.</p>
        </div>
    </div>
</div>

## Payment resource creation

The following state diagrams show the entire state of a resource from setup to payout for the three types of payments you can take with GoCardless: one-off bills, subscriptions and pre-authorizations.

### One-off bills

![User payment auth flow](http://developer.gocardless.com.s3.amazonaws.com/images/flow-bill@2x.png)

### Subscriptions

![User payment auth flow](http://developer.gocardless.com.s3.amazonaws.com/images/flow-subscription@2x.png)

### Pre-authorizations

![User payment auth flow](http://developer.gocardless.com.s3.amazonaws.com/images/flow-preauth@2x.png)

## Example payment flow for customers

Your customers will only have to interact with GoCardless at the time of authorising payments. No interaction from customers is needed for future payments to be collected. The following screencaps illustrate a typical payment flow from a customer's point of views.

**Step one** – customer is directed to GoCardless payment page ([view a live example](https://example.gocardless.com))

![Customers first land on the payment page](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-1.png)

<br>

**Step two** – customer completes & confirms their details

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-2.png)

<br>

**Step three** – user is redirected to the merchant's `redirect_uri` OR shown default confirmation

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-4.png)

<br>

**Step four** – GoCardless emails the customer to confirm receipt of payment

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-3.png)

