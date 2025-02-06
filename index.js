const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors()); 


const Email = 'io.emma.addy@gmail.com';
const githubUrl = 'https://github.com/OD2022/hng_stage0';


// check if a number is prime
function isPrime(number) {
    if (number <= 1) return false;
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
    return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}



// stage 1 endpoint
app.get('/api/classify-number', async (req, res) => {
  const { number } = req.query;

  if (!Number.isInteger(parseFloat(number)) || parseInt(number) < 0) {
      return res.status(400).json({
          number: "alphabet",
          error: true
      });
  }
  
  const num = parseInt(number);

    // Fetching fun fact from Numbers API
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        const funFact = response.data.text;

        // Mathematical properties of the number
        const properties = [];
        if (isArmstrong(num)) properties.push('armstrong');
        if (num % 2 !== 0) properties.push('odd');
        if (num % 2  == 0) properties.push('even');

        const result = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch fun fact' });
    }
});



app.get('/stage0', (req, res) => {
  try {

    const currentTime = new Date().toISOString();

    const response = {
      email: Email,
      current_datetime: currentTime,
      github_url: githubUrl
    };


    res.status(200).json(response);
  } catch (error) {
    console.error('Error occurred while processing the request:', error);
    
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.'
    });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
