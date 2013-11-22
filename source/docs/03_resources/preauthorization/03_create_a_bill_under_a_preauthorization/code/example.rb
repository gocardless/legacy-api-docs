pre_auth = GoCardless::PreAuthorization.find("0540QD22SKND")
pre_auth.create_bill(
  :name => "150 credits",
  :amount => "15.00",
  :charge_customer_at => "2013-08-27"
)