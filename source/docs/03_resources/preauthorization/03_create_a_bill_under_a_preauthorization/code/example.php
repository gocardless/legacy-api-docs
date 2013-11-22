<?
/*
Example request
*/
$pre_auth = GoCardless_PreAuthorization::find('0540QD22SKND');

$bill_details = array(
  'name'    => '150 credits',
  'amount'  => '15.00',
  'charge_customer_at'  => '2013-08-27'
);

$bill = $pre_auth->create_bill($bill_details);