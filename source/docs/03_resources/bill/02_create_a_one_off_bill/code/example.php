<?
/*
Example request
*/
$payment_details = array(
  'amount'  => '30.00',
  'name'    => 'Example payment'
);

$bill_url = GoCardless::new_bill_url($payment_details);
echo $bill_url; // Link to set up one off bill