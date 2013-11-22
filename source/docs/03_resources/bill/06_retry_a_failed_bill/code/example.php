<?
/*
Example request
*/
$bill = GoCardless_Bill::find('#BILL ID#');

if ($bill->can_be_retried) {
  $bill->retry();
} else {
  throw new Exception("The bill can't be retried.");
}