<h0>Creating Payments</h0>

# Generating payment links

To create a GoCardless payment you will need to send your customer to a GoCardless payment page (to read more about the GoCardless payment flow, please see the [GoCardless anatomy](#gocardless-anatomy) section). 

The link must be generated of a number of elements:

* __A GoCardless environment:__ Currently the options are:
    * For the live environment: `https://gocardless.com`
    * For the sandbox environment: `https://sandbox.gocardless.com`
* __A GoCardless endpoint:__ the endpoint will depend on the [resource type](#gocardless-anatomy) that you would like to create:
    * For one-off bills: `/connect/bills/new?`
    * For subscriptions: `/connect/subscriptions/new?`
    * For pre-authorizations: `/connect/pre_authorizations/new?`
* __A resource parameters array:__ the parameters passed will depend upon the [resource type](#resource-parameters). Any parameters must be URL encoded.
    * An example parameter array for a £10 bill with the name 'my first payment' (before URL encoding): `bill[amount]=10.0&bill[name]=my first payment`
    * An example parameter array for a £10 bill with the name 'my first payment' (after URL encoding): `bill%5Bamount%5D=10.0&bill%5Bname%5D=my%20first%20payment`
* __An optional users array:__ this array should contain any customer details that you would like to see [pre-populated](#pre-populating-information) on the GoCardless payment page.
* __Required parameters:__ these parameters include a `merchant_id`, `client_id`, `timestamp` and `nonce`. To see the required parameters for a resource, see the section for the [resource type](#resource-parameters) that you are trying to create.
* __Signature:__ this is a security parameter generated to ensure that you have permission to setup this resource. Please see the [signing requests](#signing-requests) section for more information.


### <a name="resource-parameters"></a> Parameters for different resource types

The URL for the GoCardless payment page will need to contain a number of parameters that specify details for the new resource that you are attempting to create. To see the required and optional parameters, please see the appropiate section in the resource section:

* [Request parameters for a one-off bill](#create-a-one-off-bill)
* [Request parameters for a subscription](#create-a-subscription)
* [Request parameters for a pre-authorization](#create-a-pre-auth)
