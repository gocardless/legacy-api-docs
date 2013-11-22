## Retrieve an existing subscription

#### Arguments

`id`
:    _required_ id of subscription to retrieve

#### Returns

Returns a subscription object.


`next_interval_start` indicates when does the next interval starts. If there will be no next interval because the subscription expires then we will return a `null` value.
