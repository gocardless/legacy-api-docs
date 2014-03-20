var billRequest = new GoCardlessSdk.Connect.BillRequest("your merchant id", 10);
new GoCardlessSdk.Connect.ConnectClient().NewBillUrl(billRequest);