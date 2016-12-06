//This is a self executing anonymous function,The first set of parenthesis 
//contains the expressions to be executed, and second set of parenthesis will
//execute those expressions, anonymous functions has the following features:
//1.can hide its variable from its parent namespace
//2.the variable inside it cannot be accessed at all from outside the //function
(function() {
    //this means we cannot use any undefined variable inside this function
  "use strict";

    // Shortcut to get elements
    //This function get the html element and store it to a variable named el
  var el = function(element) {
      
      //call the charAt()function and check if its first element is ID or not 
      // If yes that means  the function's argumentis an ID...
    if (element.charAt(0) === "#") {
        
        //if ID passed  the querySelector() will return the first element
      return document.querySelector(element); // ... returns single element
    }

      //if there was no ID passed, querySelector() will returns list of 
      //nodes in this element
    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  // Variables
//get the element where ID is viewer and store it to the variable 'viewer'
  var viewer = el("#viewer"), // Calculator screen where result is displayed
      //Get the element where ID is equals and store it to 'equals'
    equals = el("#equals"), // Equal button
      //get the elements where the class name is 'num' and store it to 'nums'
    nums = el(".num"), // List of numbers
      //get the element where the class name is 'ops' and store it to 'ops'
    ops = el(".ops"), // List of operators
      
    theNum = "", // store current number to this variable
    oldNum = "", // store the old number to this variable
    resultNum, // store the result to this variable
    operator; // store the operators to this variable

  // When: Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) { // If a result was displayed, reset number
        
        //when the number clicked get the value of this number according to 
        //its attribute:data-num, by calling getAttribute() function
        //and assign it to theNum: current number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
        // Otherwise, add the new number  to previous number:theNum (this is a string!)
      theNum += this.getAttribute("data-num");
    }

      //replace the html content of an element with the ID of 'viewer' with the current number
    viewer.innerHTML = theNum; // 

  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = theNum; // assign current number to oldNumber
    theNum = ""; //current number will have no value
      
      //when operator is clicked,get the value of this operator according to its attribute by calling getAttribute()function
      //and assign it to 'operator'
    operator = this.getAttribute("data-ops");

    //reset the value of data-result attribute of equals button
    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divide":
        resultNum = oldNum / theNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "You broke it!";
      } else { // If result is infinity, set off by dividing by zero
        resultNum = "Oops!";
          //if someone divided by zero, find the element with the ID of 
          //#calculator and add class:broken to this element
        el('#calculator').classList.add("broken"); // Break calculator
          //find the element with ID of #reset and add class:show to this element
        el('#reset').classList.add("show"); // And show reset button
      }
    }

    // replace the content of an html element with the ID of 'viewer' with result
    viewer.innerHTML = resultNum;
      
      //set dataresult attribute to equals button, and dataresult attribute has the value of resultNum
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum; //assign the result to current number

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = ""; //set old number has no value
    theNum = "";//set current number has no value
      //replace html content of element with the ID of 'viewer'  with '0'
    viewer.innerHTML = "0";
      //set data-result attribute to equals button, the data-result attribute 
      //has the value of resultNum
    equals.setAttribute("data-result", resultNum);
  };

  /* The click events */

  // Add click event to numbers
    //loop through array-list of numbers 
  for (var i = 0, l = nums.length; i < l; i++) {
      //assign setNum when the number is clicked
    nums[i].onclick = setNum;
  }

  // Add click event to operators
    //loop through array-list of operators
  for (var i = 0, l = ops.length; i < l; i++) {
      //assign moveNum when the number is clicked
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
    //assign displayNum when the equals button is clicked
  equals.onclick = displayNum;

  // Add click event to clear button
    //assign clearAll when the cleat button is clicked
  el("#clear").onclick = clearAll;

  // Add click event to reset button
    //when reset button is clicked call the window.location to redirect browser to new page and assign it to current page
  el("#reset").onclick = function() {
    window.location = window.location;
  };

}());