var request = new SubscriptionRequest(MerchantID, Amount, IntervalLength, IntervalUnit);

new ConnectClient().NewSubscriptionUrl(request);
