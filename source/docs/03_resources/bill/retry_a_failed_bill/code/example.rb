bill = GoCardless::Bill.find("#BILL ID#")
bill.retry!