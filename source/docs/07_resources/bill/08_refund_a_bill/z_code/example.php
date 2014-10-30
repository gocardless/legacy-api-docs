<?
/*
Example request
*/
$bill = GoCardless_Bill::find('#BILL ID#');

if ($bill->can_be_refunded) {
  $bill->refund();
} else {
  throw new Exception("This bill can't be refunded.");
}