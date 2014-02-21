<?
$payment_details = array(
  'amount'          => '10.00',
  'interval_length' => 1,
  'interval_unit'   => 'month'
);

$subscription_url = GoCardless::new_subscription_url($payment_details);
echo $subscription_url;