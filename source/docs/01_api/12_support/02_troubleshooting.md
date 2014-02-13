## Troubleshooting

The solutions to most common GoCardless issues can be found by looking through our troubleshooting question and answers. Please look here before attempting to contact GoCardless support with any issues.

### Table of Contents

- [The payment page says 400 error: "Client is invalid"](#client-invalid)
- [The payment page says 400 error: "Signature is invalid"](#signature-invalid)
- [The payment page says 400 error: "Merchant not found with the ID provided"](#merchant-invalid)
- [The payment page says 400 error: "Redirect uri does not match the uri registered in the developer panel"](#redirect-invalid)
- [The payment page begins https://sandbox.gocardless.com but I want to use the live environment](#switch-env)
- [My payments are not getting confirmed](#confirm-failure)
- [My testing bill webhook says amount = £20](#webhook-20)
- [Something else is broken](#exception-handling)


### <a name="client-invalid"></a>The payment page says 400 error: "Client is invalid"
This means that your developer credentials are incorrect. In particular your client ID (also called your app ID). You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly.
1. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.


### <a name="signature-invalid"></a>The payment page says 400 error: "Signature is invalid"
This means that your developer credentials are incorrect. In particular your app secret is incorrect. You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly by copying and pasting them from your developer settings again.
2. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.


### <a name="merchant-invalid"></a>The payment page says 400 error: "Merchant not found with the ID provided"
This means that your developer credentials are incorrect. In particular your merchant ID is incorrect. You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly by copying and pasting them from your developer settings again.
2. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.


### <a name="redirect-invalid"></a>The payment page says 400 error: "Redirect uri does not match the uri registered in the developer panel"
If you are receiving the above error, then the redirect URI in your code does not match the redirect URI that you have entered in your GoCardless developer settings.

Please ensure that the port, scheme, host and domain of the two redirect URIs match each other. If you check the 'enable subdomains' option in your developer settings, then subdomains will be able to differ between the two URIs.

Please be sure to check you have the correct redirect URI in both your sandbox developer settings and your live developer settings.


### <a name="switch-env"></a>The payment page begins https://sandbox.gocardless.com but I want to use the live environment
You have not set your environment to use "production". Please see the deployment guide for instructions on how to tell your application to use the live GoCardless environment.


### <a name="confirm-failure"></a>My payments are not getting confirmed
Firstly, please ensure that you are attempting to confirm your payment on the redirect URL page. Instructions on doing so can be found here: https://developer.gocardless.com/curl/#confirm-a-new-one-off-bill

Secondly, ensure that you have the correct developer credentials and environment set up on your confirmation page. If you are trying to create payments in the live environment, but you are attempting to confirm using sandbox environment or developer credentials, you will run into an error.

If you payments still fail to confirm, please catch the exception that the GoCardless library when running the confirm function. Instructions on catching exceptions in all popular languages can be found under "Something else is broken."


### <a name="webhook-20"></a>My testing bill webhook says amount = £20
All test webhooks are created from a template, so the amount will always equal £20. The resource ID, source ID and status will be set to those given in the webhook tester.

For more information on testing webhooks, please see the [testing webhooks section](/php#testing-webhooks).


### <a name="exception-handling"></a>Something else is broken
All of our libraries will raise exceptions explaining an issue when something goes wrong. If you do not know the root cause of an issue, you should attempt to find this exception. 

Here are the functions that will catch exceptions in the languages that GoCardless supports:

- Ruby: http://rubylearning.com/satishtalim/ruby_exceptions.html
- Python: http://docs.python.org/2/tutorial/errors.html
- PHP: http://www.php.net/manual/en/language.exceptions.php
- Java: http://docs.oracle.com/javase/tutorial/essential/exceptions/handling.html
- .NET: http://msdn.microsoft.com/en-us/library/0yd65esw.aspx
- Node.js: http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling

If you have caught an exception, and you are still not sure what to do, please visit the developer chat or email help@gocardless.com. 
