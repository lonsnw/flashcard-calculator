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
            <div class="flashcard">
                <div class="problem"><p>${calc.numOne}</p>
                <p>${calc.operator} ${calc.numTwo}</p>
                <hr>
                <h4>${calc.result.toFixed(4)}</h4>
            </div>`
        };
        let lastCalcDiv = document.querySelector('#recentResult');
        // add latest calc to this
        lastCalcDiv.innerHTML = `
        <div class="flashcard">
            <div class="problem"><p>${calcsFromServer[calcsFromServer.length-1].numOne}</p>
            <p>${calcsFromServer[calcsFromServer.length-1].operator} ${calcsFromServer[calcsFromServer.length-1].numTwo}</p>
            <hr>
            <h4>${(calcsFromServer[calcsFromServer.length-1].result).toFixed(4)}</h4>
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
    axios.post('/calculations', equation).then((response) => {
        console.log(response);
        // adding function for displaying previous calculations
        getCalcs();
    }).catch((error) => {
        console.log(error);
    });
}

function ce(event) {
    event.preventDefault();
    equationArray = [];
    console.log(equationArray);
    seeNums();
}
