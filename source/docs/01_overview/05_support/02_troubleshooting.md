## Troubleshooting

- [The payment page says 400 error: "Client is invalid"](#client-invalid)
- [The payment page says 400 error: "Signature is invalid"](#signature-invalid)
- [The payment page says 400 error: "Merchant not found with the ID provided"](#merchant-invalid)
- [The payment page says 400 error: "Redirect uri does not match the uri registered in the developer panel"](#redirect-invalid)
- [The payment page says 400 error: "Timestamp has expired"](#timestamp-expired)
- [The payment page begins https://sandbox.gocardless.com but I want to use the live environment](#switch-env)
- [My payments are not getting confirmed](#confirm-failure)
- [My testing bill webhook says amount = £20](#webhook-20)
- [Something else is broken](#exception-handling)


### <a name="client-invalid"></a>The payment page says 400 error: "Client is invalid"
The developer credentials you entered are incorrect; in particular your client ID (also called your app ID) is incorrect. You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly.
2. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.


### <a name="signature-invalid"></a>The payment page says 400 error: "Signature is invalid"
Assuming that you're using a client library, the developer credentials you entered are incorrect; in particular your app secret is incorrect. You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly by copying and pasting them from your developer settings again.
2. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.

If you're not using a client library, the above error may also be caused by a failure to sign your request correctly. You should review the way you [sign requests](#signing-requests), and in particular, that you are [normalizing the parameters](#normalizing-the-parameters) in your requests before signing them.

### <a name="merchant-invalid"></a>The payment page says 400 error: "Merchant not found with the ID provided"
The developer credentials you entered are incorrect; in particular your merchant ID is incorrect. You should take two steps to remedy this:

1. Ensure that you have entered your developer credentials correctly by copying and pasting them from your developer settings again.
2. Ensure that you are using your developer credentials in the correct environment. If your requests begin https://sandbox.gocardless.com you should be using your sandbox developer credentials. If your requests begin https://gocardless.com you should be using your live developer credentials.


### <a name="redirect-invalid"></a>The payment page says 400 error: "Redirect uri does not match the uri registered in the developer panel"
The redirect URI in your code does not match the redirect URI in your GoCardless developer settings.

Please ensure that the port, scheme, host and domain of the two redirect URIs match. If you wish to vary the subdomains of your redirect URIs, check the 'enable subdomains' option in your developer settings.

Please be sure you have the correct redirect URI in both your sandbox and live developer settings.


### <a name="timestamp-expired"></a>The payment page says 400 error: "Timestamp has expired"
The payment links that you generate are valid for 3 hours for security reasons - this message indicates that it has been longer than 3 hours since the link was generated.

You should generate payment links as required - if you need to email a link to a customer that might not click it until after 3 hours, it should be to a page on your site that generates a payment link and forwards the customer as appropriate.


### <a name="switch-env"></a>The payment page begins https://sandbox.gocardless.com but I want to use the live environment
You have not set your environment to use "production".


### <a name="confirm-failure"></a>My payments are not getting confirmed
Firstly, please ensure that you are attempting to confirm your payment on the redirect URL page (more details [here](#confirm-a-new-one-off-bill)).

Secondly, ensure that you have the correct developer credentials and environment set up on your confirmation page. If you are trying to create payments in the live environment, but you are attempting to confirm using sandbox environment or developer credentials, you will run into an error.

If you payments still fail to confirm, try catching the exception thrown by the GoCardless library when running the confirm function. More details [here](#exception-handling).


### <a name="webhook-20"></a>My testing bill webhook says amount = £20
All test webhooks are created from a template, so the amount will always equal £20. The resource ID, source ID and status will be set to those given in the webhook tester.

For more information on testing webhooks, please see the [testing webhooks section](#testing-webhooks).


### <a name="exception-handling"></a>Something else is broken
All our libraries will raise exceptions explaining an issue when something goes wrong. If you don't know the root cause of an issue, you should attempt to catch this exception.

Here are the functions that will catch exceptions in the languages that GoCardless supports:

- Ruby: http://rubylearning.com/satishtalim/ruby_exceptions.html
- Python: http://docs.python.org/2/tutorial/errors.html
- PHP: http://www.php.net/manual/en/language.exceptions.php
- Java: http://docs.oracle.com/javase/tutorial/essential/exceptions/handling.html
- .NET: http://msdn.microsoft.com/en-us/library/0yd65esw.aspx
- Node.js: http://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
