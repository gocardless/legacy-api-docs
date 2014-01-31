# Filtering

Many of the index resources available via the API can be filtered to cut down the number of objects returned. This will result in much faster API response times.

**e.g. show paid bills from user with `id=29`:**

	https://gocardless.com/api/v1/merchants/INSERT_MERCHANT_ID/bills?user_id=29&paid=true


<table>
  <thead>
    <tr>
      <th>Filter</th>
      <th>Value</th>
      <th>Available on</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>source_id</code></td>
      <td>string</td>
      <td>Bill</td>
      <td>The parent resource of the bill e.g. a subscription or pre-authorization</td>
    </tr>
    <tr>
      <td><code>source_type</code></td>
      <td>string</td>
      <td>Bill</td>
      <td>
        Returns only bills which were created under a specific type of source;
        'subscription', 'pre_authorization' or 'ad_hoc_authorization'
        (ie one-off)
      </td>
    </tr>
    <tr>
      <td><code>subscription_id</code></td>
      <td>string</td>
      <td>Bill</td>
      <td>What is the parent subscription of the bill?</td>
    </tr>
    <tr>
      <td><code>pre_authorization_id</code></td>
      <td>string</td>
      <td>Bill</td>
      <td>What is the parent pre_authorization of the bill?</td>
    </tr>
    <tr>
      <td><code>user_id</code></td>
      <td>string</td>
      <td>Bill, Subscription, Pre_Authorization</td>
      <td>All resources belonging to a single user</td>
    </tr>
    <tr>
      <td><code>before</code></td>
      <td>Datetime</td>
      <td>Bill, Subscription, Pre_Authorization</td>
      <td>Created before a given date. A string representing datetime (must be url-encoded). e.g. "2011-11-17T15:00:23Z"</td>
    </tr>
    <tr>
      <td><code>after</code></td>
      <td>Datetime</td>
      <td>Bill, Subscription, Pre_Authorization,</td>
      <td>Created after a given date. A string representing datetime (must be url-encoded). e.g. "2011-11-17T15:00:23Z"</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td>Bill</td>
      <td>Return only bills with the given status. <a href="#bill-docs">Available statuses</a>.</td>
    </tr>
    <tr>
      <td><code>paid</code></td>
      <td>boolean (true/false)</td>
      <td>Bill</td>
      <td>Return only paid bills. False will include "pending" and "failed"
        bills. True will return "paid" and "withdrawn" bills.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Bill, Subscription, Pre_Authorization</td>
      <td>Requires an exact literal match with the resource name</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td>Bill, Subscription, Pre_Authorization</td>
      <td>Requires an exact literal match with the resource description</td>
    </tr>
  </tbody>
</table>
