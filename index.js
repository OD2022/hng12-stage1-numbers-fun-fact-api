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
    if (number === 2) return true; // Early return for 2
    if (number % 2 === 0) return false; // Even numbers other than 2 are not prime
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
        if (number % i === 0) return false;
    }
    return true;
}

// Optimized perfect number check
function isPerfect(number) {
    let sum = 1; // 1 is always a divisor
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            sum += i;
            if (i !== number / i) sum += number / i; // Avoid adding square roots twice
        }
    }
    return sum === number && number !== 1; // Avoid perfect number 1
}

// Optimized Armstrong number check
function isArmstrong(number) {
    const digits = number.toString().split('');
    const numLength = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numLength), 0);
    return sum === number;
}

// Optimized digit sum calculation
function digitSum(number) {
  return number < 10 ? number : number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;
  
    // Validate input
    const num = parseInt(number);
    if (!Number.isInteger(num)) {
        return res.status(400).json({ number, error: true });
    }

    // Fetching fun fact from Numbers API
    try {
        const funFactPromise = axios.get(`http://numbersapi.com/${Math.abs(num)}?json`);

        // Run mathematical checks in parallel
        const [funFactResponse] = await Promise.all([funFactPromise]);

        const funFact = funFactResponse.data.text;
        const properties = [];

        // Check properties in parallel
        const primeCheck = isPrime(Math.abs(num));
        const perfectCheck = isPerfect(Math.abs(num));
        const armstrongCheck = isArmstrong(Math.abs(num));
        const digitSumValue = digitSum(Math.abs(num));

        if (armstrongCheck) properties.push('armstrong');
        if (Math.abs(num) % 2 !== 0) properties.push('odd');
        if (Math.abs(num) % 2 === 0) properties.push('even');

        const result = {
            number: num,
            is_prime: primeCheck,
            is_perfect: perfectCheck,
            properties: properties,
            digit_sum: digitSumValue,
            fun_fact: funFact
        };

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching fun fact:', error);
        res.status(500).json({ error: 'Unable to fetch fun fact' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
