var request = new SubscriptionRequest("merchant id", 15m, 1, "month");
new ConnectClient().NewSubscriptionUrl(request);
