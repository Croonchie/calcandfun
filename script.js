// Function: basicCalculator
// This function performs basic arithmetic operations (add, subtract, multiply, divide).
// It takes three parameters: two numbers and a string indicating the operation.

function basicCalculator(num1, num2, operation) {
  // Check which operation the user wants to perform
  if (operation === "add") {
      return num1 + num2; // Addition
  } else if (operation === "subtract") {
      return num1 - num2; // Subtraction
  } else if (operation === "multiply") {
      return num1 * num2; // Multiplication
  } else if (operation === "divide") {
      // Handle division by zero case
      if (num2 === 0) {
          return "DIVISION BY ZERO ERROR"; // Return error message in uppercase
      }
      return num1 / num2; // Division
  } else {
      return "Invalid operation"; // If the operation is not recognized
  }
}

// Testing the function with different cases
console.log(basicCalculator(10, 5, "add"));       // Expected output: 15
console.log(basicCalculator(10, 5, "subtract"));  // Expected output: 5
console.log(basicCalculator(10, 5, "multiply"));  // Expected output: 50
console.log(basicCalculator(10, 0, "divide"));    // Expected output: "DIVISION BY ZERO ERROR"
console.log(basicCalculator(10, 5, "divide"));    // Expected output: 2
console.log(basicCalculator(10, 5, "modulus"));   // Expected output: "Invalid operation"
