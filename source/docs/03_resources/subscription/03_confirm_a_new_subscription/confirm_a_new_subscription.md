## Confirm a new subscription

When a user has completed the authorization process, the subscription will exist in an 'inactive' state. The resource must be confirmed within a short period of time otherwise it will be removed from the database.

The user will be redirected (a GET request) back to the URI specified with the following parameters:

`resource_uri`
: The URI at which the new resource may be accessed via the API

`resource_id`
: The unique id of the create resource

`resource_type`
: The type of create resource. Accepts: bill, subscription or pre_authorizationsignatureA signature of the parametersstateThe state parameter passed in with the initial request if present

`signature`
: A signature of the parameters

`state`
: The state parameter passed in with the initial request if present

TODO:
- Add info about checking the signature
- Add info about POSTing the correct params back to GoCardless
