# Calculator Checklist #

 * POST request sending calculation to server
    * sends as object
    * POST on server side does the math, obtains result, and sends status 201
 * GET request in `#resultHistory` 
    * create objects with the following keys: 
        * `numOne`
        * `numTwo`
        * `operator`
        * `result`
        * _note:_ all numbers except the operator, which is a string
    * display all previous calculations
    * update when a new calculation is made
 * GET request in `#recentResult`
    * display most recent result
    * update when new calculation is made

 * Base mode: uses two fields
 * Stretch: uses buttons for numbers
 * Update styling

