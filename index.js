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
function isPerfect(number) {
    let sum = 1; // Start at 1 since it's always a divisor
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            sum += i;
            if (i !== number / i) sum += number / i;
        }
    }
    return sum === number && number !== 1; // 1 is not a perfect number
}

// Armstrong check remains the same
function isArmstrong(number) {
    const digits = number.toString().split('');
    const numLength = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), numLength), 0);
    return sum === number;
}

function digitSum(number) {
    return number < 10 ? number : number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
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

    let num = Math.abs(parseInt(number));

    try {
        // Fetching fun fact from Numbers API asynchronously
        const funFactResponse = await axios.get(`http://numbersapi.com/${num}?json`);
        const funFact = funFactResponse.data.text;

        // Mathematical properties of the number
        const properties = [];
        if (isArmstrong(number)) properties.push('armstrong');
        if (number % 2 !== 0) properties.push('odd');
        if (number % 2 === 0) properties.push('even');

        const result = {
            number: number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties: properties,
            digit_sum: digitSum(num),
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
