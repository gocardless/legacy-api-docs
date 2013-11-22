<?
/*
Example request
*/
$payouts = GoCardless_Merchant::find('#MERCHANT ID#')
  ->payouts();

print_r($payouts);