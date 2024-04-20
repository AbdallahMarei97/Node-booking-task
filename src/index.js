const express = require("express");
const app = express();
const port = 3000;

const { calculatePrices } = require('./calculatePrices');
const { availableDatesTestCase1, availableDatesTestCase2 } = require('./data/availableDates');

console.log(calculatePrices('2022-01-01', '2022-01-15', availableDatesTestCase1))
console.log(calculatePrices('2022-01-01', '2022-01-13', availableDatesTestCase2))

// end date is greater than any available date
console.log(calculatePrices('2022-01-13', '2022-01-20', availableDatesTestCase1))
// out of range
console.log(calculatePrices('2022-02-01', '2022-03-13', availableDatesTestCase2))
// start and end date are reversed
console.log(calculatePrices('2022-02-01', '2022-01-13', availableDatesTestCase2))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});