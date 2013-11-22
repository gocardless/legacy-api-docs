pre_auth = GoCardless::PreAuthorization.find("#PREAUTH ID#")
pre_auth.cancel!