# Payment timings

Merchants can use our API to check when and what their next payout fromGoCardless will be. The attributes `next_payout_date` and `next_payout_amount` on the merchant resource detail this.

`balance`, also on the merchant resource, details the entire outstanding balance held on behalf of a merchant, regardless of the holding period. `balance` will always be greater than or equal to the `next_payout_amount`.

Payments you take with GoCardless are paid out to your chosen bank account after 7 working days. [View full details here](https://gocardless.com/using_timing).