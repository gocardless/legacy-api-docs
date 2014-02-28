# Response

Your server should validate the HMAC digest by resigning the received parameters (more information under "Signing Requests" in the Connect Guide) and respond with status `HTTP/1.1 200 OK` within 5 seconds. If the API server does not get a 200 OK response within this time, it will retry up to 10 times at ever-increasing time intervals.

If you have time-consuming server-side processes that are triggered by a webhook, e.g. email scripts, please consider processing them asynchronously.

