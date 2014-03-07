#
# A pre-authorization for up to £100.00 every month
#

GoCardless.new_pre_authorization_url(
  :amount => "100.00",
  :name => "Stock Photos",
  :interval_unit => "month",
  :interval_length => 1
)