# Pagination

Pagination may optionally be enabled for endpoints that return multiple records. It is strongly advised that pagination is used when a large number of records need be be retrieved; in the future this may be enforced.

There are two parameters that control pagination: `page`, which specifies the page number to retrieve, and `per_page`, which indicates how many records each page should contain. To enable pagination, simply include either of these query string parameters in a request.

**e.g. show page 2 of all a merchant's bills:**

	https://gocardless.com/api/v1/merchants/INSERT_MERCHANT_ID/bills?page=2&per_page=20

If pagination is enabled, but `page` is not provided, it will default to 1 (the first page). `per_page` defaults to 100.

Paginated responses include extra headers, `Link` and  `X-Pagination`, which indicate the total number of records and pages, and link to neighbouring pages.

	HTTP/1.1 200 OK
	Link: <https://gocardless.com/api/v1/merchants/XYZ/bills?page=2&per_page=10>; rel="next",
	     <https://gocardless.com/api/v1/merchants/XYZ/bills?page=2&per_page=10>; rel="last"
	X-Pagination: {"records":15,"pages":2,"links":{"next":2,"last":2}}
	Content-Type: application/json; charset=utf-8
	Connection: close
	Server: nginx
