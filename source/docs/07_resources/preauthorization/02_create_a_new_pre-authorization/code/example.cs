var request = new PreAuthorizationRequest(MerchantID, MaxAmount, IntervalLength, IntervalUnit);

new ConnectClient().NewPreAuthorizationUrl(request);