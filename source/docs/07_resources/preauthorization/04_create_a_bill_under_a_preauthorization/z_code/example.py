pre_auth = gocardless.client.pre_authorization('0540QD22SKND')
pre_auth.create_bill(15, name="150 Credits",
  charge_customer_at="2013-08-27")