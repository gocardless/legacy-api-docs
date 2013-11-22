<?
/*
Example request
*/
$subscription = GoCardless_Subscription::find('#SUBSCRIPTION ID#')->cancel()

print_($subscription);
