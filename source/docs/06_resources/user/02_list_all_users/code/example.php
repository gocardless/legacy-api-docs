<?
/*
Example request
*/
$users = GoCardless_Merchant::find('#MERCHANT ID#')
  ->users();

print_r($users);