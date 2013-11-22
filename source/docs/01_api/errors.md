# Errors

You may encounter the following response codes. Any unsuccessful response codes will contain more information to help you identify the cause of the problem.

`200`
:	The request has succeeded.

`201`
:	The request has been fulfilled and resulted in a new resource being created. The newly create resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field.

`400`
:	The request could not be understood by the server, usually due to malformed syntax. The response body will contain more details in the form of an array.

`401`
:	Unauthorized. The client has not provided a valid Authentication HTTP header.

`403`
:	Forbidden. The client has provided a valid Authentication header, but it does not have permission to access this resource.

`404`
:	Not Found. The requested resource was not found. The response body will explain which resource was not found.

`412`
:	Precondition Failed. Certain unmet conditions must be fulfilled before the request to be processed e.g. timestamp is too old. More details in response body.

`418`
:	I'm a teapot. The webserver cannot respond as it is temporarily a teapot.

`422`
:	Unprocessable Entity. Could not process a POST request because the request is invalid. The response body will contain more details in the form of an array.

`500`
:	Internal Server Error. The server encountered an error while processing your request and failed. Please report this to the GoCardless support team.