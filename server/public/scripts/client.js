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

// i’ve trued a bunch of versions of this and get nothing
// tried using document.querySelector and it would pull code instead of the values or just nothing
// function rerun(event) {
//     // assign variables to existing problem
//     let numOne = event.target.document.querySelector('#numOne').innerText;
//     let numTwo = document.querySelector('#numTwo').innerText;
//     let operator = document.querySelector('#operator').value;
//     console.log(numOne, operator, numTwo);
// }
// tried using jQuery and was told that $ is not recognized
// function rerun() {
//     // assign variables to existing problem
//     let numOne = $(this).attr(‘numOne’);
//     let numTwo = $(this).attr(‘numTwo’);
//     let operator = $(this).attr(‘operator’);
//     console.log(numOne, operator, numTwo);
// }
// tried this mess below and just nothing on this one
// function rerun(event) {
//     // assign variables to existing problem
//     let target = event.target;
//     if (target.matches(‘#numOne’)) {
//         let numOne = target.innerHTML;
//     }
//     else if (target.matches(‘#numTwo’)) {
//         let numTwo = target.innerHTML;
//     }
//     else if (target.matches(‘#operator’)) {
//         let operator = target.innerHTML;
//     }
//     return numOne, operator, numTwo;
//     console.log(numOne, operator, numTwo);
// }

function clearHistory(event) {
    axios.delete('/calculations').then((response) => {
        console.log('Deleted calculation history');
    }).catch((error) => {
        console.error(error);
    });
}
