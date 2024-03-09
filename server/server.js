const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('GET request made to /calculations');
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {
  console.log('POST request made for /calculations');
  console.log(req.body);
  function doMath(numOne, numTwo, operator) {
    if(operator === '+'){
      result = numOne + numTwo
    }
    else if(operator === '-'){
      result = numOne - numTwo
    }
    else if(operator === '*'){
      result = numOne * numTwo
    }
    else if(operator === '/'){
      result = numOne / numTwo
    }
    // adding parseFloat to see if that helps with the errors from the auto-test.
    return parseFloat(result)
  }
  doMath(req.body.numOne, req.body.numTwo, req.body.operator);
  console.log(result);
  // add result to the object
  let equation = {
    numOne: req.body.numOne,
    numTwo: req.body.numTwo, 
    operator: req.body.operator,
    result: result
  };
  // add the object to the calculations array
  calculations.push(equation);
  console.log(calculations);
  res.sendStatus(201);
})

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
