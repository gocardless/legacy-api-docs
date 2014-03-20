## Retrieve an existing pre-auth

#### Request params

`id`
:    _required_ id of pre-authorization to retrieve

#### Returns

Returns a pre-authorization object

`next_interval_start` indicates when the next interval starts for the pre-authorization. If there will be no next interval because the pre-authorization expires then we will return a `null` value.
