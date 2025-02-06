# API Documentation

## Overview

This API exposes a simple endpoint that returns basic information including an email, timestamp, and GitHub URL. The endpoint is intended to be used to retrieve some metadata about the system. This documentation outlines the API, available endpoints, expected request and response formats, and the API's functionality.

---

## Base URL

The base URL for the API is:

http://localhost:3000

yaml
Copy

### CORS Support

This API supports Cross-Origin Resource Sharing (CORS) to allow requests from various domains.

---
# API Documentation

## Endpoints

### 1. `/stage0`

#### Method: `GET`

The `/stage0` endpoint returns information such as an email, a timestamp of the request, and a GitHub URL.

#### Request URL:
GET /stage0

markdown
Copy

#### Request Headers:
- `Content-Type`: `application/json`
- `Accept`: `application/json`

#### Request Parameters:
- No request parameters are required for this endpoint.

#### Example Request:
```http
GET http://localhost:3000/stage0
Success Response (200 OK):
If the request is successful, the API will respond with the following JSON structure:

json
Copy
{
  "email": "myemail@gmail.com",
  "current_datetime": "2025-01-30T15:00:00.000Z",
  "github_url": "https://github.com/OD2022/hng_stage0"
}
email: The contact email address for the system.
current_datetime: The time the request was processed, in ISO 8601 format.
github_url: The URL to the associated GitHub repository.
Error Response (500 Internal Server Error):
In case of an error, the API will respond with a 500 status and an error message in the following structure:

json
Copy
{
  "error": "Internal Server Error",
  "message": "An error occurred while processing the request."
}

2. /api/classify-number
This endpoint allows users to submit a number and receive a classification with its mathematical properties, digit sum, and a fun fact.

Method: GET
Request URL:
typescript
Copy
GET /api/classify-number?number=<number>
Query Parameters:
number (required): The number to classify.
Example Request:
http
Copy
GET http://localhost:3000/api/classify-number?number=371
Example Response (200 OK):
json
Copy
{
  "number": 371,
  "is_prime": true,
  "is_perfect": false,
  "properties": ["armstrong", "odd", "prime"],
  "digit_sum": 11,
  "fun_fact": "371 is a Narcissistic number."
}
Error Responses:
400 Bad Request (Invalid number):

json
Copy
{
  "number": "abc",
  "error": true
}
500 Internal Server Error (Unable to fetch fun fact):

json
Copy
{
  "error": "Unable to fetch fun fact"
}
Features:
Prime Check: Whether the number is prime.
Perfect Check: Whether the number is a perfect number.
Armstrong Check: Whether the number is an Armstrong (Narcissistic) number.
Odd Check: Whether the number is odd.
Digit Sum: The sum of the digits of the number.
Fun Fact: A fun fact about the number fetched from the Numbers API.
Setup & Running the Server
Prerequisites:
Ensure you have the following installed:

Node.js (v14 or higher)
npm (Node Package Manager)
Steps to Run:
Clone the repository:

bash
Copy
git clone https://github.com/OD2022/myrepo.git
Navigate into the project directory:

bash
Copy
cd myrepo
Install the required dependencies:

bash
Copy
npm install
Start the server:

bash
Copy
npm start
The server will start on the default port 3000. You can change the port by setting the PORT environment variable:

bash
Copy
PORT=5000 npm start
Access the API in your browser or via tools like Postman or curl by sending a GET request to:

bash
Copy
http://localhost:3000
Conclusion
For more information or to hire Node.js developers, visit: https://hng.tech/hire/nodejs-developers