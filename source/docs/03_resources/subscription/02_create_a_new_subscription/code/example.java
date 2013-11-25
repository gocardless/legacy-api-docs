Subscription subscription = new Subscription(accountDetails.getMerchantId(), new BigDecimal("15.0"), 1, "month");
connect.newSubscriptionUrl(subscription, (URI) null, (URI) null, null);
