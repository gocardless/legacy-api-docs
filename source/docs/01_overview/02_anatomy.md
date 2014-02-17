# GoCardless Anatomy

## Direct Debit Lifecycle

The lifecycle of a payment through GoCardless is made up of two steps:

- [Resource creation lifecycle](#resource-creation) - you will send your customer to a GoCardless payment page in order to set up a resource ([click here](#resource-types) to see the available resource types).
- [Webhooks lifecycle](#webhook-notify) - a webhook is a message that GoCardless sends to your server to notify you about the change in a resource (eg. a bill is paid, or a subscription is cancelled).

### <a name="resource-creation"></a>Resource Creation
Creating a GoCardless resource ([click here](#resource-types) to see the available resource types):

- Merchant generates a link to a GoCardless payment page.
    - This link will contain parameters that include the resource type (see below) and the details surrounding the payment (eg. amount, duration, name).
    - The link may also contain a 'state' parameter, which will be returned to the merchant unchanged after the user has made a payment. You should use this for your own internal user IDs or order IDs.
- Customer visits the GoCardless payment page using the link provided.
    - GoCardless currently has no facility to display payment pages on the merchant's website.
    - GoCardless does not allow merchants to fill out GoCardless payment pages on behalf of their customers.
- Customer completes the payment pages.
- [OPTION 1] If merchant has specified a "redirect uri" the Customer is redirected back to their website.
    - Merchant must then confirm receipt of customer with a POST request back to GoCardless.  If no confirmation is received, the payment will be cancelled
    - Customer is returned along with a "state" parameter and a "resource id"
    - Merchants can use the "state" parameter to match the customer to the one that left their site earlier
    - Merchants can use the resource ID to identify the resource in subsequent webhooks
- [OPTION 2] If no "redirect uri" is specified the Customer is shown a GoCardless "Thank you" page.
    - No need to confirm the the payments

### <a name="webhook-notify"></a>Notifications of changes to resources (webhooks)
GoCardless will send a HTTP POST request to notify your website of changes to a resource (for example, when a bill becomes paid).

The webhook will contain the ID of the affected resource, along with any relevant changes to the resource. The webhooks that GoCardless send will depend on the resource type ([click here](#available webhooks) to see the available GoCardless webhooks).

Webhooks allow your website to react to changes in a payment status. For example, if a customer cancels their subscription to your membership system, your website could respond to the website by revoking the customer's access to the membership side of your website.


## <a name="resource-types"></a> Resource Types
There are three resources that can be set up through GoCardless: bill, subscription, and pre-authorisation. Please note that subscriptions and pre-authorisations will create bills for each payment under them.

#### [Bill](#bill)
A bill resource represents a payment from a customer's bank account. A bill can exist on its own, or it can be created under a subscription or a pre-authorisation. A bill cannot be altered after its creation, however it can be cancelled.

#### [Subscription](#subscription)
A subscription is a resource that will automatically create a bill after a defined interval (eg. monthly). 

A subscription can be indefinite, or set to end after either a set number of intervals have passed (eg. 12 months), or set to end on a specific end date (eg. 01/11/2015). 

A subscription cannot be altered after its creation; if you will need variable payments, or a pricing change at some point in the future, you should use pre-authorisation.

#### [Pre-Authorisation](#pre-authorization)
A pre-authorisation is a resource that enables you to take variable payments. The customer will not need to take any further steps to authorise each variable payment.

Using a pre-authorisation, you set a maximum amount that you will be able to take in a particular interval. Then you send a [request for a payment](#create-a-bill-under-a-pre-auth) whenever you need a payment taken, this request will create a bill resource. Payment requests can be for any amount, and sent as many times as you like, so long as the maximum amount is not reached for that interval. 

To give an example: you set up a pre-authorisation for a maximum amount of £1000/month, this means that in a monthly period you request a maximum amount of 5 payments of £200, or 9 payments of £100 and 2 payments of £50 (or any other combination that doesn't add up to more than £1000/month).
