## Refund a bill

A bill can be refunded if its `can_be_refunded` attribute is `true`, and it has a `status` of `paid` or `withdrawn`.

**This operation is irreversible**.

This endpoint will only be available if refunds have been enabled on your merchant account. You can contact help@gocardless.com to request that we enable this for you.

#### Request params

`id`
:    _required_ id of bill to refund