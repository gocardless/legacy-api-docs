<?
/*
List all bills
*/
$bills = GoCardless_Merchant::find("#INSERT MERCHANT ID#")
  ->bills();

print_r($bills);

/*
List all bills with status paid
*/
$bills = GoCardless_Merchant::find("#INSERT MERCHANT ID#")
  ->bills(
    array('status' => 'paid')
  );

print_r($bills);