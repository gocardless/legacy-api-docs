<?
/*
Example request
*/
$preauths = GoCardless_Merchant::find($account_details['merchant_id'])
  ->pre_authorizations();

print_r($preauths);