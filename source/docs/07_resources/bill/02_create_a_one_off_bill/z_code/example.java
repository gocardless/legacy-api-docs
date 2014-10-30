Bill bill = new Bill(accountDetails.getMerchantId(), new BigDecimal("30.00"));
connect.newBillUrl(bill, (URI) null, (URI) null, null);