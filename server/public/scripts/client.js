console.log('client.js is sourced!');

// establishing as global because i think i might need to use it multiple times
const equationDiv = document.querySelector('#equation');
const seeNumDiv = document.querySelector('#equation');
let equationArray = [];

// function to print to the DOM as you click
function seeNums() {
    seeNumDiv.innerHTML = `
    ${equationArray.join('')}`;
}

// function to record the numbers entered using buttons
// reference: https://www.quora.com/How-do-you-pass-a-button-value-to-a-JavaScript-function
function addVal(buttonValue) {
    event.preventDefault();
    console.log('in addVal function');
    equationArray.push(buttonValue);
    console.log(equationArray);
    seeNums();
}

// function to get all of my calculations for the history
function getCalcs() {
    axios.get('/calculations').then((response) => {
        console.log(response);
        let calcsFromServer = response.data;
        console.log('calcs from server:', calcsFromServer);
        let calcsDiv = document.querySelector('#resultHistory');
        // clear out the div before we start looping to avoid duplicates
        calcsDiv.innerHTML = '';
        for(let calc of calcsFromServer) {
            calcsDiv.innerHTML += `
            <div class="flashcard" onClick="rerun(event)">
                <div class="problem"><p id="numOne">${calc.numOne}</p>
                <p id="operator" style="margin:0;display:inline;float:left">${calc.operator}</p> <p id="numTwo" style="margin:0;display:inline;float:right">${calc.numTwo}</p>
                <br /><hr><h4>${calc.result.toFixed(1)}</h4>
            </div>`
        };
        let lastCalcDiv = document.querySelector('#recentResult');
        // add latest calc to this
        lastCalcDiv.innerHTML = `
        <div class="flashcard">
            <div class="problem"><p>${calcsFromServer[calcsFromServer.length-1].numOne}</p>
            <p id="operator" style="margin:0;display:inline;float:left">${calcsFromServer[calcsFromServer.length-1].operator}</p> <p id="numTwo" style="margin:0;display:inline;float:right"> ${calcsFromServer[calcsFromServer.length-1].numTwo}</p>
            <br /><hr><h4>${(calcsFromServer[calcsFromServer.length-1].result).toFixed(1)}</h4>
        </div>`;
    }).catch((error) => {
        console.log(error);
    })
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
    // an issue with this is that negative numbers throw everything out the window
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
    // reset equation to clear before typing next equation
    equationArray = [];
    // i'm using equateValues[i] here because using numOne and numTwo misses instances where
    // a null value (aka empty entry) is force converted to 0 by the +
    if(equateValues[0] === '' || equateValues[1] === '' || equateOperator[0] === undefined) {
        alert('Your equation is incomplete! Please try again.')
    }   
    else {
        axios.post('/calculations', equation).then((response) => {
            console.log(response);
            // adding function for displaying previous calculations
            getCalcs();
        }).catch((error) => {
            console.log(error);
        });
    };
}

function ce(event) {
    event.preventDefault();
    equationArray = [];
    console.log(equationArray);
    seeNums();
}

// i can't get this to call for the right card/pull actual values instead of code.
// function rerun(event) {
//     // assign variables to existing problem
//     let numOne = document.querySelector('#numOne').value;
//     let numTwo = document.querySelector('#numTwo').value;
//     let operator = document.querySelector('#operator').value;
//     console.log(numOne, operator, numTwo);
// }
