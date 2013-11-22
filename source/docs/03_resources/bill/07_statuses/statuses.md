## Bill statuses

`pending`
:    Waiting for the money to clear from the customer's account.

`paid`
:    Bill has been successfully been debited from the customer's account. It is being held by GoCardless pending a withdrawal to the merchant.

`failed`
:    Bill could not be debited from a customer's account. This usually means that there were insufficient funds in the customer's account.

`cancelled`
:    Bill was cancelled by the merchant or customer before it was submitted to the banks.

`withdrawn`
:    The bill has been paid out to the merchant. Takes up to one business day to reach the merchant's bank account. You can find more details by using the bill's `payout_id` with the [payouts resource](http://).
