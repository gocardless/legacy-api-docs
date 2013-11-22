## Statuses

`inactive`
:	A pre-authorization that has not been confirmed at the end of the Connect flow. It will be deleted from the database after a few hours.

`active`
:	A valid pre-authorization. The merchant can now create bills under this pre-authorization.

`cancelled`
: Pre-authorization been terminated. No more bills can be created.

`expired`
:	Pre-authorization reached its expiration date. No more bills can be created.