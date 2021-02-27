# Tinkerd-API

### Dependencies
#### Express `npm i express`
- framwork that sits on top of the raw http server module provided by Node.js and adds extra functionality, like routing and middleware support, and a simpler API.
- used to write server side logic in JS
    
#### Body Parser `npm i body-parser`
- Was apart of early verisons of Express but now you need to install the middleware module called body-parser
- Handles HTTP POST request in Express, extracts the entire body portion of an incoming request stream and exposes it on req.body (parses the JSON string and URL encoded data submitted using HTTP POST request)

#### Cors(Cross-Origin Resource Sharing) `npm i cors`
- XMLHttpRequest and fetch follows the same-origin policy so, JavaScript can only make calls to URLs that live on the same origin as the location where the script is running
- Enables scripts running on a browser client to interact with resources from a different origin
- Adds special headers to the request that can be used to determine that a request supports cors
- Web browsers can use these headers to determine whether or not an XMLHttpRequest call should continue or fail
- The primary header that determines who can access a resource is Access-Control-Allow-Origin. This header specifies which origins can access the resource
    - to allow access from any origin, you can set this header as `Access-Control-Allow-Origin: *`
    - to narrow it down to a specific origin: `Access-Control-Allow-Origin: https://example.com`
- Cors request Types(the browser determines which type is used)

**Simple** Request requirements: 
- GET, POST, or HEAD methods are used
- CORS safe-listed header is used
- using the Content-Type header, only the following values are allowed: application/x-www-form-urlencoded, multipart/form-data, or text/plain
- No event listeners are registered on any XMLHttpRequestUpload object
- No ReadableStream object is used in the request\
- The request is allowed to continue as normal if it meets these criteria, and the Access-Control-Allow-Origin header is checked when the response is returned.

**Preflight** Request [Example](assets/preflightexample.png) :
- If a request does not meet the criteria for a simple request, the browser will instead make an automatic preflight request using the OPTIONS method
- is used to determine the exact CORS capabilities of the server, which is in turn used to determine whether or not the intended CORS protocol is understood. If the result of the OPTIONS call dictates that the request cannot be made, the actual request to the server will not be executed.
- The preflight request sets the mode as OPTIONS and sets a couple of headers to describe the actual request that is to follow:
    - Access-Control-Request-Method: The intended method of the request (e.g., GET or POST)
    - Access-Control-Request-Headers: An indication of the custom headers that will be sent with the request
    - Origin: The usual origin header that contains the script's current origin

### Nodemon `npm i --save-dev nodemon`
- Add start script to the scripts int the package.json file`"start": "node server.js"`

