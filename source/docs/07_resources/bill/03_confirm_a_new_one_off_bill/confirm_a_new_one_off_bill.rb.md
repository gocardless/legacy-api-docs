## Confirm a new one-off bill

### Redirection of customer after GoCardless payment page

When a user has completed the authorization process, the bill will exist in an 'inactive' state. The resource must be confirmed within a short period of time otherwise it will be removed from the database.

The user will be redirected (a GET request) back to the redirect URI specified in the [developer panel](https://dashboard.gocardless.com/developer-details/uri-settings) with the following parameters:

`resource_uri`
:    The URI at which the new resource may be accessed via the API

`resource_id`
:    The unique id of the create resource

`resource_type`
:    The type of resource created. In this case `"bill"`

`signature`
:    A signature of the parameters

`state`
:    The state parameter passed in with the initial request if present

### Completing the process

A `POST` should be sent back to GoCardless with the following parameters:

#### Request params

`resource_id`
:     _required_ the id provided in the initial `GET` request

`resource_type`
:     _required_ the resource type provided in the initial `GET` request

#### Returns

Returns a bill object
