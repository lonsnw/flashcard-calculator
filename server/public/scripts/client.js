console.log('client.js is sourced!');

// establishing as global because i think i might need to use it multiple times
const equationDiv = document.querySelector('#equation');

// reference: https://www.quora.com/How-do-you-pass-a-button-value-to-a-JavaScript-function
function addVal(buttonValue) {
    event.preventDefault();
    console.log('in addVal function');
    equationDiv.innerHTML += `
    ${buttonValue}`;
}

// let equation = {
//     numOne: numOne,
//     numTwo: numTwo,
//     operator: operator,
//     result: result
// };
