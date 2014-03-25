var request = new SubscriptionRequest(MerchantID, MaxAmount, IntervalLength, IntervalUnit);

new ConnectClient().NewSubscriptionUrl(request);
