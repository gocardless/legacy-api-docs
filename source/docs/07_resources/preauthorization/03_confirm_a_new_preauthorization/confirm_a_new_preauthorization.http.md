## Confirm a new pre-auth

When a user has completed the authorization process, the pre-authorization will exist in an 'inactive' state. The resource must be confirmed within a short period of time otherwise it will be removed from the database.

The user will be redirected (a GET request) back to the URI specified with the following parameters:

The user will be redirected (a GET request) back to the redirect URI specified in the [developer panel](https://dashboard.gocardless.com/developer-details/uri-settings) with the following parameters:

`resource_uri`
:    The URI at which the new resource may be accessed via the API

`resource_id`
:    The unique id of the create resource

`resource_type`
:    The type of resource created. In this case `"pre_authorization"`

`signature`
:    A signature of the parameters

`state`
:    The state parameter passed in with the initial request if present

### Checking the signature

Important - the signature is generated according to the [signature guide](#signing-requests) (also using the merchant's app secret). It should be verified to check that the request has not been tampered with, i.e. - you   should re-sign the other 4 params (3 if state is not used) and check that the signature matches the one provided. If it does not match, the request has been tampered with and should be rejected.

### Completing the process

A `POST` should be sent back to GoCardless. You will need to send a [Basic Authentication](#basic-authentication) authorization header. The request must be sent with the following parameters:

#### Request params

`resource_id`
:     _required_ the id provided in the initial `GET` request

`resource_type`
:     _required_ the resource type provided in the initial `GET` request

