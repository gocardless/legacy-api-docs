## Retrieve an existing subscription

#### Request params

`id`
:    _required_ id of subscription to retrieve

#### Response

Returns a subscription object.


`next_interval_start` indicates when does the next interval starts. If there will be no next interval because the subscription expires then we will return a `null` value.
