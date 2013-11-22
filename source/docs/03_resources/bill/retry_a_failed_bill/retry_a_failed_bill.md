## Retry a failed bill

If a bill fails, its `status` will change to `failed`. At this point it can be retried if the `can_be_retried` attribute is  `true`.

**This operation is irreversible**.

If a bill is retried, GoCardless will attempt to collect it again. You will receive a web hook confirming this. Eventually, the `status` will become `paid` or `failed` and you will receive appropriate web hooks.

#### Arguments

`id`
:	_required_ id of bill to retry

#### Returns

Returns a bill object