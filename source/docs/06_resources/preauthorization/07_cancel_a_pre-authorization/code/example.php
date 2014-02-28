<?
/*
Example request
*/
$pre_auth = GoCardless_PreAuthorization::find('#PREAUTH ID#')->cancel();

print_r($pre_auth);
