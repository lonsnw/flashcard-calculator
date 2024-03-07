console.log('client.js is sourced!');

// establishing as global because i think i might need to use it multiple times
const equationDiv = document.querySelector('#equation');
let equationArray = [];

// function to put the numbers entered using buttons onto the DOM
// reference: https://www.quora.com/How-do-you-pass-a-button-value-to-a-JavaScript-function
// function addVal(buttonValue) {
//     event.preventDefault();
//     console.log('in addVal function');
//     let operator = buttonValue;
//     console.log(operator);
// }

// function submitEquation(event) {
//     event.preventDefault();
//     console.log('in submitEquation');
//     let numOne = document.querySelector('#firstNum').value;
//     let numTwo = document.querySelector('#secondNum').value;
//     console.log('inputs', numOne, numTwo);
// }

// console.log('inputs', numOne, operator, numTwo);


// function to put the numbers entered using buttons onto the DOM
// reference: https://www.quora.com/How-do-you-pass-a-button-value-to-a-JavaScript-function
function addVal(buttonValue) {
    event.preventDefault();
    console.log('in addVal function');
    // removing print to DOM because i'll do this with GET/POST
    // equationDiv.innerHTML += `
    // ${buttonValue}`;
    equationArray.push(buttonValue);
    console.log(equationArray);
}

// function to join the array of entered numbers and then split 
// into two numerals on either side of the operator
function submitEquation(event) {
    event.preventDefault();
    let equationString = equationArray.join('');
    console.log(equationString);
    // using regex to designate multiple delineators
    // reference: https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript 
    // reference: https://javascript.plainenglish.io/regular-expressions-operators-dbc98efaf6a9 
    let equateValues = equationString.split(/\D/);
    let equateNoValue = equationString.split(/\d/);
    // i imagine there is a better way to do this but boy did i not find it
    // reference: https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript 
    let equateOperator = equateNoValue.filter(n => n);
    console.log('logging split', equateValues, equateOperator);
    // assigning variable names to pass numbers into the object
    let numOne = +equateValues[0];
    let numTwo = +equateValues[1];
    let operator = equateOperator[0];
    console.log(numOne, operator, numTwo);
    // packaging for server
    let equation = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operator,
    };
    axios.post('/calculations', equation).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

