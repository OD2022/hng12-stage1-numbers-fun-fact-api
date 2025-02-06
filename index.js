const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Optimized prime check
function isPrime(number) {
    if (number < 2) return false;
    if (number === 2) return true; // 2 is prime
    if (number % 2 === 0) return false; // Exclude even numbers
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) return false;
    }
    return true;
}

// Optimized perfect number check
// Check if a number is perfect
function isPerfect(number) {
  if (number <= 1) return false;  // 1 is not a perfect number, and perfect numbers must be greater than 1
  let sum = 1; // Start at 1 since it's always a divisor
  for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) {
          sum += i;
          if (i !== number / i) sum += number / i;
      }
  }
  return sum === number; // The number must equal the sum of its divisors
}


// Check if a number is Armstrong
function isArmstrong(number) {
    const num = Math.abs(number);  // Take the absolute value, because we are dealing with digits

    // If the number is a single digit, it's always an Armstrong number
    if (num < 10) {
        return true;
    }

    const digits = num.toString().split('');
    const numLength = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numLength), 0);
    return sum === num;
}

// Function to calculate the digit sum
function digitSum(number) {
  const absNumber = Math.abs(number);  // Use the absolute value of the number
  return absNumber < 10 ? absNumber : absNumber.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// stage 1 endpoint
app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    // Check if the 'number' is a valid integer
    if (!Number.isInteger(parseFloat(number))) {
        return res.status(400).json({
            number: number,
            error: true
        });
    }

    let num = parseInt(number);

    try {
        // Fetching fun fact from Numbers API using the number as it is (no Math.abs())
        const funFactResponse = await axios.get(`http://numbersapi.com/${num}?json`);
        const funFact = funFactResponse.data.text;

        // Mathematical properties of the number
        const properties = [];
        if (isArmstrong(num)) properties.push('armstrong');
        if (num % 2 !== 0) properties.push('odd');
        if (num % 2 === 0) properties.push('even');

        const result = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: properties,
            digit_sum: digitSum(num),  // Use number as it is for digit sum
            fun_fact: funFact
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch fun fact' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
