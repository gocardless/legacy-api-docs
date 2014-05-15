<?
/*
Example request
*/
$bill = GoCardless_Bill::find('#BILL ID#');

if ($bill->can_be_cancelled) {
  $bill->cancel();
} else {
  throw new Exception("This bill can't be cancelled.");
}