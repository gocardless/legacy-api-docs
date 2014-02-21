# GoCardless Anatomy

### <a name="resource-types"></a> Payment resources
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

### <a name="resource-types"></a> Other resources
Other queryable resources in GoCardless that are not directly related to taking payments.

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
</div>


## <a name="resource-creation"></a>Resource Creation
Creating a GoCardless resource ([click here](#resource-types) to see the available resource types):

![User payment auth flow](http://developer.gocardless.com.s3.amazonaws.com/images/user-auth-flow@2x.png)

## Example user flow

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, culpa, doloribus autem vero dolore ipsa maxime assumenda illo nobis iure provident enim velit blanditiis suscipit officia repudiandae deleniti reiciendis vel.

**Step one** – customer is directed to GoCardless payment page

![Customers first land on the payment page](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-1.png)

----

**Step two** – customer completes & confirms their details

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-2.png)

----

**Step three** – user is redirected to the merchant's `redirect_uri` OR shown default confirmation

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-4.png)

----

**Step four** – GoCardless emails the customer to confirm receipt of payment

![The customer confirms their details](http://developer.gocardless.com.s3.amazonaws.com/images/user-flow-3.png)


### <a name="webhook-notify"></a>Notifications of changes to resources (webhooks)
GoCardless will send a HTTP POST request to notify your website of changes to a resource (for example, when a bill becomes paid).

The webhook will contain the ID of the affected resource, along with any relevant changes to the resource. The webhooks that GoCardless send will depend on the resource type ([click here](#available webhooks) to see the available GoCardless webhooks).

Webhooks allow your website to react to changes in a payment status. For example, if a customer cancels their subscription to your membership system, your website could respond to the website by revoking the customer's access to the membership side of your website.

