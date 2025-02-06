# API Documentation

## Overview
This project allows users to submit a number and receive a classification with its mathematical properties, digit sum, and a fun fact.

---

## Base URL

The base URL for the API is:

http://localhost:3000/api/classify-number


### CORS Support

This API supports Cross-Origin Resource Sharing (CORS) to allow requests from various domains.

---
# API Documentation

#### Request Headers:
- `Content-Type`: `application/json`
- `Accept`: `application/json`

###Endpoints:

1. /api/classify-number
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
git clone https://github.com/OD2022/hngx-stage1-numbers-fun-fact-api.git
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