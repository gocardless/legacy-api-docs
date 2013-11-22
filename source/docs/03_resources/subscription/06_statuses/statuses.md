## Statuses

`inactive`
:	A subscription that has not been confirmed at the end of the Connect flow. It will be deleted from the database after a few hours.

`active`
:	A subscription that has not yet expired or been cancelled. Bills will automatically be created by GoCardless according to the `interval` (e.g. monthly).

`cancelled`
:	A subscription that has been terminated by the customer or merchant. No more bills will be created.

`expired`
:	A subscription that has reached its expiration date. No more bills will be created.