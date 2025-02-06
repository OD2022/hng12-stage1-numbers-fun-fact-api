const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors()); 


// check if a number is prime
function isPrime(number) {
  // Check if the number is negative or less than 2
  if (number < 2) return false;

  // Check for factors from 2 up to the square root of the number
  for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
  }
  
  return true;
}


// check if a number is perfect
function isPerfect(number) {
    let sum = 0;
    for (let i = 1; i < number; i++) {
        if (number % i === 0) sum += i;
    }
    return sum === number;
}

// check if a number is Armstrong
function isArmstrong(number) {
    const digits = number.toString().split('');
    const numLength = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numLength), 0);
    return sum === number;
}


// function to calculate digit sum
function digitSum(number) {
  if ((number) < 10) {
      return number;
  }
  // Otherwise, calculate the sum of digits
  return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
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

    // Fetching fun fact from Numbers API
    try {
        const response = await axios.get(`http://numbersapi.com/${Math.abs(num)}?json`);
        const funFact = response.data.text;

        // Mathematical properties of the number
        const properties = [];
        if (isArmstrong(Math.abs(num))) properties.push('armstrong');
        if (Math.abs(num) % 2 !== 0) properties.push('odd');
        if (Math.abs(num) % 2  == 0) properties.push('even');

        const result = {
            number: num,
            is_prime: isPrime((num)),
            is_perfect: isPerfect(Math.abs(num)),
            properties: properties,
            digit_sum: digitSum(Math.abs(num)),
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
