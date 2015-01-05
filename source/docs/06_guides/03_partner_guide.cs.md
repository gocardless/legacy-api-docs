# Partner guide

<p class="intro">Our Partner API allows you to manage multiple merchant accounts.</p>

## Getting started

If you're interested in using our Partner API, [please email us](mailto:help@gocardless.com) for more information.

First, download and install the .NET client library:

#### Install with NuGet:

    NuGet.exe install GoCardless

#### If you're using NuGet from within Visual Studio, simply run:

    Install-Package GoCardless

Alternatively, view [source on Github](https://github.com/gocardless/gocardless-dotnet).

## Using the sandbox

By default, the client will use https://gocardless.com as the base URL. Until you are ready to go live, you'll be using a sandbox account so you need to tell the client library to connect to the correct endpoint (https://sandbox.gocardless.com):

```csharp
GoCardless.Environment = GoCardless.Environments.Sandbox;
```

This will force all requests to use the sandbox rather than the main site. Make sure this line is removed when you go live with GoCardless, as sandbox payments will not be processed.

To get things going, you'll need to first set your `redirect_uri` in your dashboard - to do this, simply login to your account and go to the Developer tab, under More.

## Configuring the client

To use the GoCardless client library, you'll need to provide it with your partner account details.

```csharp
GoCardless.AccountDetails = new AccountDetails {
  AppId =      "DUMMY_APP",
  AppSecret =  "INSERT_APP_SECRET_HERE"
};
```

## Connecting a merchant account

Each `Client` object accesses the API on behalf of one merchant, using an access token that is linked to that merchant.

First of all, the merchant must go through a brief authorization process to generate an access token merchant via the API which you may then store for future use.

Note that an app may have access tokens for many merchant accounts, but you must create a new instance of Client for each merchant when working with the API.

## Merchant account authorization

To authorize an with a partner, the merchant must be redirected to the GoCardless servers, where they will be presented with a page that allows them to link their account with the app, whether they have an existing account or they need to create one for the first time.

The URL that the merchant is sent to contains information about the app, as well as the URL (redirect_uri) that the merchant should be sent back to once they've completed the process.

If you wish, you can also include details about the merchant for pre-population on arrival on our signup pages so the user doesn't have to type them in again. You can see a list of all the different fields [you can pre-fill here](#pre-populating-information).

The .NET client library takes care of most of this - only the `redirect_uri` must be provided:

```csharp
/// The GoCardless .NET library does not currently support all pre-population
/// fields. See the following URL for a list of supported fields:
/// https://github.com/gocardless/gocardless-dotnet/blob/master/GoCardlessSdk/Partners/ManageMerchantRequest.cs

var user = new GoCardlessSdk.Partners.User {
  FirstName = "Tim",
  LastName = "Rogers",
  Email = "help@gocardless.com"
}

var merchant = new GoCardlessSdk.Partners.Merchant {
  Name = "Widgets Ltd",
  User = user
}

GoCardless.Partner.NewMerchantUrl("http://mywebsite.com/cb", merchant)
```

Please note that the scheme, host and port of a provided `redirect_uri` must match the URL set for the account in the Dashboard.

The merchant must be redirected to the generated URL, where they will complete a short process to give the Partner app access to their account. If the merchant hasn't already created a merchant account on GoCardless, they will be given the opportunity to do so.

Once the merchant has authorized the app, they will be redirected back to the URL specified (http://mywebsite.com/cb in the example above). The request will include an `authorization code` as a query string parameter `code`.

### Retrieving the access token


This one-time authorization code may be exchanged for an access token, which may be used to access the merchant's account through the API in future. The same redirect_uri that you used in the previous step must also be provided here.

```csharp
[HttpGet]
  public ActionResult CreateMerchantCallback(string code, string state)
  {
    // exchanges the authorization code for an access token
    var merchantResponse = GoCardless.Partner.ParseCreateMerchantResponse(
                "http://mywebsite.com/cb", code);

    // use ApiClient to make calls on behalf of merchant
    var merchantApiClient = new ApiClient(merchantResponse.AccessToken);

    return RedirectToAction("Success");
  }
```

You should store this access token alongside the merchant's record in your database for future use - you'll need this each time you make a request on the behalf of that user.
