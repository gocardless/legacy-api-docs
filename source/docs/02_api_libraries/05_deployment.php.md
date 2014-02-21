# Deployment

_Any payments submitted via the live environment will be entered into the banking system._

When you have created your API integration, and finished testing it, you will want to deploy it to use the GoCardless live environment.  There are two steps required to deploy:

1. Set the GoCardless environment to production immediately after including the GoCardless PHP library:

    ```php
    <?php
    include_once 'lib/GoCardless.php';
    
    GoCardless::$environment = 'production';
    ?>
    ```

2. After setting the GoCardless environment, ensure you are using your live developer credentials (you can find your live developer credentials in your developer settings in your live dashboard).

    ```php
    <?php
    // Set config vars
    $account_details = array(
      'app_id'        => 'INSERT_LIVE_APP_ID',
      'app_secret'    => 'INSERT_LIVE_APP_SECRET',
      'merchant_id'   => 'INSERT_LIVE_MERCHANT_ID',
      'access_token'  => 'INSERT_LIVE_ACCESS_TOKEN'
    );
    
    // Initialize GoCardless
    GoCardless::set_account_details($account_details);
    ?>
    ```

You must make these changes on __all pages using the GoCardless PHP library__ (eg. don't forget your resource confirm page). For this reason, we recommend initializing the GoCardless from a central file; see the [your first payment](#your-first-payment) guide for an example on doing this.

If you encounter any issues when deploying, please see our [troubleshooting section](#troubleshooting).
