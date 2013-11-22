<?
/*
Example request
*/
$subscriptions = GoCardless_Merchant::find("#INSERT MERCHANT ID#")
  ->subscriptions();

print_r($subscriptions);
