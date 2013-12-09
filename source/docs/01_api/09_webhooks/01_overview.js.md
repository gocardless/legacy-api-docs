# Webhooks

To alert you of any changes in the status of your resources, GoCardless provides webhooks. These are POST requests to your server that are sent as soon as a resource changes status. The body of the request contains details of the change.

One useful example is notification of when a bill has been paid.

We'll walk though:

* Setting up your site to receive webhooks from GoCardless

To receive web hooks, your server must have a publically accessible IP address. If you're testing locally, to do this you'll either need to forward port 80 on your router, or you could use a tool like localtunnel or UltraHook to create a tunnel.
