## Create a one-off bill

A user pays a one-off amount to the merchant. The user should be redirected to the url and will be asked for authorisation.

If the user has an existing active pre-authorization, you may wish to [create a bill under a pre-authorization](#create-a-bill-under-a-pre-auth)

#### Request params

`amount`
:    _required_ the amount of the bill.

`merchant_id`
:    _required_ your merchant ID.

`name`
:    Brief description used to identify the payment, displayed to the user alongside the amount. Often useful for an invoice reference.

`description`
:    A more verbose description, which will be displayed to the user.

`user`
:    Allows pre-population of user information - see [pre-populating information](#pre-populating-information)

`redirect_uri`
:    Where the user should be returned to after the authorization process. If it is not provided, the `redirect_uri` registered in the dashboard will be used. The scheme, host and port of a provided `redirect_uri` must match the URL set for the account.

`cancel_uri`
:    Where the user should be returned to if he or she chooses to cancel the connect process before completion. If it is not provided, the `cancel_uri` registered in the developer panel will be used. Note that the scheme, host and port of a provided  `cancel_uri` must match those of the registered one. A `cancel_uri` can only be provided in the request if one is also set on the account.

`state`
:    This allows you to pass a value of your choice through the payment process, receiving it in the redirect page. If present, it will be passed back as a parameter when the user is returned to the merchant's site at the end of an authorization process. If a merchant's site passes in `state="id_9SX5G36"`, it will receive back `state="id_9SX5G36"` when the user returns to the merchant's site. This state is not persisted in the GoCardless database.

#### Returns

Returns a link to a one-off payment mandate.

#### Confirmation

Once the user has given authorization for one of these resources to be created, it will exist in an 'inactive' state. The user will be redirected (a GET request) back to the URI specified.

You must [confirm the resource](#confirm-a-new-one-off-bill) otherwise it will be removed within a short period of time.
