# Request

The API server will send a POST request to the `web_hook_uri` associated with the merchant/app. This can be set in Developer Panel.

The POST request will contain JSON data in the body, providing details of the action completed. The data will contain an HMAC digest signature generated using the merchant's `app secret` - this prevents attackers imitating valid web hooks.

`payload`
:    A hash/dictionary, the top level namespace.

`resource_type`
:    A string: "bill", "pre_authorization", or "subscription".

`action`
:    A string, description of the event that triggered the webhook. Details below.

`objects`
:    An array of hashes/dictionaries of the relevant object, named as the pluralize name of the resource type.

`signature`
:    HMAC digest of the contents of payload, signed with the app secret.

#### Example request

	{
	    "payload": {
	        "resource_type": "bill",
	        "action": "paid",
	        "bills": [
	            {
	                "id": "AKJ398H8KA",
	                "status": "paid",
	                "source_type": "subscription",
	                "source_id": "KKJ398H8K8",
	                "amount": "20.0",
	                "amount_minus_fees": "19.8",
	                "paid_at": "2011-12-01T12:00:00Z",
	                "uri": "https://gocardless.com/api/v1/bills/AKJ398H8KA"
	            },
	            {
	                "id": "AKJ398H8KB",
	                "status": "paid",
	                "source_type": "subscription",
	                "source_id": "8AKJ398H78",
	                "amount": "20.0",
	                "amount_minus_fees": "19.8",
	                "paid_at": "2011-12-09T12:00:00Z",
	                "uri": "https://gocardless.com/api/v1/bills/AKJ398H8KB"
	            }
	        ],
	        "signature": "f6b9e6cd8eef30c444da48370e646839c9bb9e1cf10ea16164d5cf93a50231eb"
	    }
	}

