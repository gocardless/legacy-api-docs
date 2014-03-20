<?
/*
Example request
*/
$payment_details = array(
  'max_amount'      => '100.00',
  'interval_length' => 1,
  'interval_unit'   => 'month',
  'user'    => array(
    'first_name'    => 'Alasdair',
    'last_name'     => 'Monk',
    'email'         => 'alasdair.monk@gmail.com'
  )
);

$pre_auth_url = GoCardless::new_pre_authorization_url($payment_details);
echo $pre_auth_url;
