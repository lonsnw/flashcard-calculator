console.log('client.js is sourced!');

// establishing as global because i think i might need to use it multiple times
const equationDiv = document.querySelector('#equation');


function addVal(event) {
    event.preventDefault();
    console.log('in addVal function');
    document.getElementById('#numButton')
    equationDiv.innerHTML += `
    `
    
}

let equation = {
    numOne: numOne,
    numTwo: numTwo,
    operator: operator,
    result: result
};
