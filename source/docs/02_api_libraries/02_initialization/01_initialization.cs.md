# Initialization

Once you have [installed](#installation) the library via NuGet, you will need to set your `environment` to _sandbox_ or _production_:

```csharp
GoCardless.Environment = GoCardless.Environments.Sandbox
```

Next you will need to configure the library with your developer credentials:

```csharp
GoCardless.AccountDetails = new AccountDetails {
  AppId = 		"INSERT_APP_ID_HERE",
  AppSecret = 	"INSERT_APP_SECRET_HERE",
  Token = 		"INSERT_MERCHANT_ACCESS_TOKEN manage_merchant:INSERT_MERCHANT_ID"
};
```

You should now be able to make requests to the GoCardless library.

### Checking that it works:
To ensure you have initialized the library properly, you can try to generate a subscription payment link like so:
```csharp
var request = new SubscriptionRequest(MerchantID, Amount, IntervalLength, IntervalUnit);

new ConnectClient().NewSubscriptionUrl(request);
```

Take a look at the [subscription section](#section) for more details on the parameters you can use.

You can see all requests under the [resources section](#bill).
