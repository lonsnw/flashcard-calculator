# FLASHCARD CALCULATOR

## Description

_Duration: 2 Week Sprint_

This is an application that allows the user to input an equation that is then calculated and saved as a flashcard.  

The app performs all calculations on the server and stores equations and their results on the server until the server is refreshed or the user clicks the "Clear history" button.  This calculator can perform simple addition, subtraction, multiplication, and division with two constants/numbers.  It is not capable of performing calculations with negative numbers but is capable of returning a result that is negative.  It returns results accurate to one decimal.

Users can view the equation as they click buttons in the field above the buttons but below the most recent equation card.  They can clear the current equation using the "C" button.

If users do not enter all of the necessary parts of an equation, they will be shown an alert and asked to try again.

This app is not currently deployed.

## Screen Shot

Calculator before use:
<br />
<image src=server/public/images/calc-at-start.png width=80%>
<br />
Calculator after adding several equations:
<br />
<image src=server/public/images/calc-with-cards.png width=80%>
<br />
Calculator after using the "C" button:
<br />
<image src=server/public/images/calc-after-clear.png width=80%>
<br />
Calculator after submitting an incomplete equation:
<br />
<image src=server/public/images/calc-and-alert.png width=80%>
<br />

### Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

The application has been tested and run on a local machine using the browser. It may be deployed in the future but currently is only available locally.

1. Clone down a version of the repository
2. Open in your editor of choice and run an `npm install`
3. Run `npm start` in your terminal
4. Navigate to `http://localhost:5000/` in your preferred browser

## Usage
I'm a math student who wants to memorize specific calculations.  I'd like a tool that allows me to enter these calculations and then saves them as flashcards.

1. Enter calculations into the calculator.
2. Click "=" to submit each equation, return a result, and create a new flashcard.
3. Clear all flashcards using "Clear history" when ready to begin again with another set of flashcards.

## Built With

- HTML
- CSS
- Javascript
- Node

## Support
If you have suggestions or issues, please contact me.