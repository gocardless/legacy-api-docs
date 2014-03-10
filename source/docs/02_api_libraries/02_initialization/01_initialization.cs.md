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
To ensure you have initialized the library properly, you should try to load your merchant details using the following request:
```csharp
var client = new ApiClient("your access token");
client.GetMerchant("merchant id");
```

You can see all requests under the [resources section](#bill)
