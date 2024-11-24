// import React, { useEffect, useState } from "react";
// import * as math from "mathjs";
// import './calc.css'
// // import Draggable from "react-draggable";
// // import "./Calculator.css";
// // import '../../components/UG/navbar.css'
// // import { FaMinus } from "react-icons/fa";
// // import { FaXmark } from "react-icons/fa6";
// // import { FaArrowLeftLong } from "react-icons/fa6";
// // import { FaRegWindowMaximize } from "react-icons/fa";
// const ScientificCalculator = ({ onClose }) => {
//   const[isDivPresent,setIsDivPresent]=useState(false)
//   const [arrayForIntResults, setArrayForIntResults] = useState([]);
//   const [isEqualsToClicked, setIsEqualsToClicked] = useState(false);
//   const [isYroot, setIsYroot] = useState(false);
//   const [resFromBR, setResFromBR] = useState([])
//   const operatorPrecedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 }; 
//   const [isHPO, setIsHPO] = useState(false)
//   const [isExpBtn, setIsExpBtn] = useState(false);
//   const [isError, setIsError] = useState(false)
//   const [isLastInputE, setIsLastInputE] = useState(false)
//   const [isLastInputPI, setIsLastInputPI] = useState(false)
//   const [input, setInput] = useState("");
//   const [showM, setShowM] = useState(false)
//   const [isNested, setIsNested] = useState(false)
//   const [result, setResult] = useState("0");
//   const [historyArray, setHistoryArray] = useState([]);
//   const [mode, setMode] = useState("Deg");
//   const [memory, setMemory] = useState(0);
//   const [showHelp, setShowHelp] = useState(false)
//   const [isMod, setIsMod] = useState(false)
//   const [islogXY, setIsLogXY] = useState(false)
//   const [isOpenParenthesis, setIsOpenParenthesis] = useState(false);
//   const [resultForIntermediateCalculations, setResultForIntermediateCalculations] = useState("")
//   const [intermediateResultsStack, setIntermediateResultsStack] = useState([]);
//   // const [intermediateExpression, setIntermediateExpression] = useState(""); 
  
// //   function updateIntermediateArray(inputExpression, operator, result) {
// //     setArrayForIntResults(prevArray => {
// //         // Create a new calculation object
// //         const newCalculation = {
// //             input: inputExpression,
// //             operator: operator,
// //             output: result,
// //             precedence: operatorPrecedence[operator]
// //         };

// //         // Append it to the array
// //         return [...prevArray, newCalculation];
// //     });
// // }



//   const handleMemoryRecall = () => {
//     if (isError) {
//       return
//     }
//     const operators = ['+', '-', '/', '*'];
//     const lastChar = input.charAt(input.length - 1);
//     console.log(lastChar, "This is the last charrrrrrr ")
//     if (operators.includes(lastChar)) {
//       console.log(`The last character is ${lastChar}and is included in the array`);
//       setInput(prev => prev + memory.toString());
//     }
//     else {
//       // if (memory !== null)
//       setInput(memory.toString());
//       console.log("The input value being set issssssssss..........", input);
//     }
//     console.log(memory, "This is the memory that is stored in the memory variable");
//   }

//   const handleMemoryClear = () => {
//     if (isError) {
//       return
//     }
//     setMemory(0)
//     setShowM(false)
//     console.log("The memory is set to 0 again", memory);
//     console.log(memory)
//   }
//   useEffect(() => {
//     console.log('Memory:', memory);
//     console.log('Result:', result);
//   }, [memory, result]);

//   useEffect(() => {
//     console.log('Result:', result);
//   }, [result]);

  

// const updateResultAndHistory = () => {
//   // Directly store the input and result in the history array
//   setArrayForIntResults(prevArray => [
//     ...prevArray,
//     { input: input, resultForExp: resultForIntermediateCalculations }
//   ]);
// };

// useEffect(() => {
//   updateResultAndHistory();
//   console.log(arrayForIntResults);  
// }, [resultForIntermediateCalculations]);

// useEffect(()=>{
// console.log("The array for prev exp is",arrayForIntResults)
// },[arrayForIntResults])



//   // const handleMemoryStore = (event) => {
//   //   // setMemory(event.target.value);
//   //   setShowM(true)
//   //   try {
//   //     const evaluatedResult = math.evaluate(input);
//   //     console.log(evaluatedResult, "This is the evaluated result", result, "Thos os the value that we need to set for the memoru variable")
//   //     console.log(result, "result tat should be displaued pon the input type")
//   //     setResult(evaluatedResult);
//   //     setMemory(evaluatedResult)
//   //   } catch (error) {
//   //     setResult('Error');
//   //   }
//   // }
//   useEffect(() => {
//     console.log(input, "aaaaaaafter ")
//   }, [input]);


//   const handleMemoryStore = (event) => {
//     if (isError) {
//       return
//     }
//     setShowM(true);
//     try {
//       if (input.trim() === '') {
//         setResult('Error: No input provided');
//         return; // Exit the function early
//       }

//       // Regular expression to match the last complete number in the input
//       const lastNumberMatch = input.match(/-?\d+(\.\d+)?(?=[+\-*/]|$)/);

//       // If no valid number is found, set error
//       if (!lastNumberMatch) {
//         setResult('Error: No valid number found');
//         return; // Exit if no valid number is found
//       }

//       // Get the last complete number
//       const lastNumber = parseFloat(lastNumberMatch[0]);
//       console.log(lastNumber, "This is the last number found in the input");

//       // Check for incomplete expressions by ensuring the last character is not an operator
//       const lastChar = input.trim().slice(-1);

//       if (['+', '-', '*', '/'].includes(lastChar)) {
//         // If the expression ends with an operator, extract the number before it
//         const inputWithoutLastChar = input.trim().slice(0, -1); // Remove the last character (operator)
//         const previousNumberMatch = inputWithoutLastChar.match(/-?\d+(\.\d+)?$/); // Match the last complete number in the updated string

//         if (previousNumberMatch) {
//           const previousNumber = parseFloat(previousNumberMatch[0]);
//           setMemory(previousNumber);
//         } else {
//           setResult('Error: No valid number found before operator');
//           return; // Exit if no valid number is found before the operator
//         }
//       } else {
//         // If the input is complete, store the last evaluated result in memory
//         const evaluatedResult = math.evaluate(input);
//         console.log(evaluatedResult, "This is the evaluated result");

//         // Set the result and memory using the last complete number
//         // setResult(evaluatedResult);
//         setMemory(evaluatedResult); // Store the last complete number in memory
//       }
//     } catch (error) {
//       setResult('Error');
//       console.error("Error while evaluating input:", error);
//     }
//   }




//   const isOperatorAtEnd = (expression) => {
//     // Check if the expression ends with an operator
//     const operators = ["+", "-", "*", "/", "%"];
//     return operators.includes(expression.slice(-1));
//   };
//   const handleExpButtonClick = (value) => {
//     if (input.includes("e+") && isExpBtn) {
//       console.log("This included e+");
//       const lastEPlusIndex = input.lastIndexOf("e+");
//       // Ensure there's a number before 'e+'
//       if (lastEPlusIndex > 0) {
//         // Extract the base and exponent parts
//         const base = input.substring(0, lastEPlusIndex);
//         let exponent = input.substring(lastEPlusIndex + 2); // Skip 'e+'

//         // Update the exponent by appending the new value
//         exponent = exponent ? exponent + value : value; // Handle cases where exponent is empty
//         console.log(`Base: ${base}, Exponent: ${exponent}`);

//         // Reconstruct the input with updated exponent
//         setInput(`${base}e+${exponent}`);
//       } else {
//         console.log("Invalid position for e+ in the expression.");
//       }
//     } else {
//       // Handle other cases or just set the input as before
//       let var1 = input === "" ? 0 : input;
//       setInput(`${var1}e+0`); // Example default if e+ is not present
//     }
//   };


//   const handleButtonClick = (value) => {
//     if (isError) {
//       return;
//     }
//     const hasOperator = /[\+\-\*\/]/.test(input);
//     const lastChar = input.charAt(input.length - 1);
//     if (value === "π") {
//       setIsLastInputPI(true);
//       const piOpInfo = extractDetails(input);
//       const { previousExpression, lastOperator } = piOpInfo;
//       if (lastOperator) {
//         setInput(`${previousExpression}${lastOperator}${Math.PI}`)
//         return;
//       }
//       if (!hasOperator) {
//         setInput(Math.PI.toString())
//       }
//       else {
//         setInput(input + Math.PI);
//       }
//     }
//     else if (value === "e") {
//       setIsLastInputE(true)
//       const opInfo = extractDetails(input);
//       const { previousExpression, lastOperator, lastNumber } = opInfo;
//       console.log(input, "this is input");
//       console.log("previousExpression,lastOperator,lastNumber", previousExpression, lastOperator, lastNumber);
//       if (lastOperator) {
//         console.log("yes there is lasst number and it is", lastNumber);
//         setInput(`${previousExpression}${lastOperator}${Math.E}`)
//         console.log(`${previousExpression}${lastOperator}${Math.E}`);
//         return;
//       }
//       else {
//         console.log("there s no lastnumber");
//         setInput(`${Math.E}`)
//       }
//       if (!hasOperator) {
//         console.log("do not have any operastor")
//         setInput(math.e.toString())
//       }
//       else {
//         console.log("complete else block");
//         setInput(input + Math.E);
//       }
//     }
//     //  **************************NEWWWWWWWWWWWWWWW*****************************
//     else if (value === "(") {
//       // const lastChar = input.charAt(input.length - 1);
//       if (lastChar === "" || "+-*/(".includes(lastChar) || ["sin", "cos", "tan"].some(func => input.endsWith(func)) || /\d$/.test(lastChar)) {
//         // setInput(input + "(");
//         setIsOpenParenthesis(true);
//       } else {
//         console.log("Invalid placement of opening parenthesis");
//       }
//     }
//     else if (value === ")") {
//       const lastChar = input.charAt(input.length - 1);
//       const openCount = (input.match(/\(/g) || []).length;
//       const closeCount = (input.match(/\)/g) || []).length;

//       if (lastChar !== "(" && lastChar !== "" && !["+", "-", "*", "/"].includes(lastChar) && openCount > closeCount) {
//         setInput(input + ")");
//         setIsOpenParenthesis(true);
//       } else {
//         console.log("Invalid placement of closing parenthesis or no matching opening parenthesis");
//       }
//     }
//     // ******************************NEWWWWWWWWWWWWWWWWWWWW*********************************
//     else if (value === "+") {
//       const lastChar = input.charAt(input.length - 1);
//       const openCount = (input.match(/\(/g) || []).length;
//       const closeCount = (input.match(/\)/g) || []).length;

//       if (lastChar !== "" && !"+-*/(".includes(lastChar) && openCount > closeCount) {
//         setInput(input + "+");
//       } else {
//         console.log("Invalid placement of operator");
//       }
//     }
//     // else if(input.includes("e+") && isExpBtn){
//     //   // console.log("This ncluded e+ and redirecting to vhandleExpButtonClick function");
//     //       console.log("e+ is included here");
//     //       const parts=input.split("e+");
//     //       console.log(parts,"splittinggggggg")
//     //       const base=parts[0];
//     //       let exponent=parts[1]
//     //       exponent+=value;
//     //       exponent = parseInt(exponent, 10);
//     //       console.log(parts[0],parts[1],exponent);
//     //       setInput(`${base}e+${exponent}`)
//     // }
//     // ============for multiple digits=================

//     if (input.includes("e+") && isExpBtn) {
//       console.log("e+ is included here");
//       // Find the last occurrence of 'e+'
//       const lastEIndex = input.lastIndexOf("e+");
//       if (lastEIndex !== -1) {
//         // Split input at last 'e+'
//         const base = input.slice(0, lastEIndex); // Everything before e+
//         let exponentPart = input.slice(lastEIndex + 2); // Everything after e+

//         // Remove leading zero if it exists
//         exponentPart = exponentPart.replace(/^0+/, ''); // Remove leading zeros

//         // Append the new value to the exponent part
//         exponentPart += value; // Simply append the new value

//         // Combine base and updated exponent part
//         const newInput = `${base}e+${exponentPart}`;
//         console.log(`New input after appending: ${newInput}`); // Log the new input for verification
//         setInput(newInput); // Update the input state
//       }
//     }



//     else if (input.includes("^")) {
//       console.log("^ is included");
//       setInput(`${input}${value}`)
//     }
//     // else if(input.includes("yroot")){
//     //   console.log("yroot is included ");
//     //   const yRootParts=input.split("yroot");
//     //   console.log(yRootParts,"YYYYYYYYYYYYYYYYRRRRRRRRRRPPPPPPPPP");
//     //   const base=yRootParts[0];
//     //   let exponent=yRootParts[1];
//     //   exponent+=value;
//     //   exponent=parseInt(exponent,10);
//     //   console.log(base,exponent,"base and exponentt");
//     //   setInput(`${base}yroot${exponent}`);
//     // }
//     //   else if (input.includes("yroot")) {
//     //     console.log("yroot is included");

//     //     // Split the input to get parts before and after yroot
//     //     const yRootParts = input.split("yroot");
//     //     console.log(yRootParts, "YYYYYYYYYYYYYYYYRRRRRRRRRRPPPPPPPPP");

//     //     const base = yRootParts[0].trim(); // Get the base value
//     //     let exponent = yRootParts[1].trim(); // Get the exponent part

//     //     // Check if exponent exists and append the new value
//     //     if (exponent) {
//     //         exponent += value; // Append the new value to the exponent
//     //     } else {
//     //         exponent = value; // If no exponent exists, set it to the new value
//     //     }

//     //     // Convert exponent to a number if needed
//     //     const exponentNumber = parseInt(exponent, 10);

//     //     // Check if the base and exponent are valid numbers
//     //     if (isNaN(exponentNumber)) {
//     //         console.error("Invalid exponent value");
//     //         setResult("Error: Invalid exponent");
//     //         return;
//     //     }

//     //     console.log(base, exponentNumber, "base and exponent");

//     //     // Update the input string to include the new base and exponent
//     //     setInput(`${base}yroot${exponentNumber}`);
//     // }
//     else if (input.includes("yroot")) {
//       console.log("yroot is included");

//       // Find the last occurrence of 'yroot'
//       const lastYRootIndex = input.lastIndexOf("yroot");

//       if (lastYRootIndex !== -1) {
//         // Split input at last 'yroot'
//         const base = input.slice(0, lastYRootIndex); // Everything before yroot
//         let exponentPart = input.slice(lastYRootIndex + 5); // Everything after yroot (5 characters for "yroot")

//         // Remove leading zeros if it exists
//         exponentPart = exponentPart.replace(/^0+/, ''); // Remove leading zeros

//         // Append the new value to the exponent part
//         exponentPart += value; // Simply append the new value

//         // Combine base and updated exponent part
//         const newInput = `${base}yroot${exponentPart}`;
//         console.log(`New input after appending: ${newInput}`); // Log the new input for verification
//         setInput(newInput); // Update the input state
//       }
//     }

//     // For any other value (numbers, operators, etc.)
//     else {
//       const lastOpInfoForE = extractDetails(input)
//       const { previousExpression, lastOperator, lastNumber } = lastOpInfoForE
//       if (isLastInputE) {
//         console.log(lastOpInfoForE, "lastOpInfoForE");
//         if (lastOperator) {
//           console.log("there is lastopereator and it is", lastOperator);
//           console.log(`${previousExpression}${lastOperator}${value}`);
//           console.log(previousExpression, lastOperator, lastNumber, "previousExpression,lastOperator, lastNumber");
//           setInput(`${previousExpression}${lastOperator}${value}`);
//         }
//         else {
//           console.log("Entered into the lastop info with op null");
//           setInput(value)
//         }
//       }
//       else if (isLastInputPI) {
//         console.log("the last input is pi value");
//         if (lastOperator) {
//           console.log("There is operator in the is lastinput pi input");
//           setInput(`${previousExpression}${lastOperator}${value}`);
//         }
//         else {
//           console.log("entered nto a block where there is last op is null");
//           setInput(value)
//           return
//         }
//       }
//       else {
//         // setInput(input + value);
//         setInput(prev => `${prev}${value}`)
//         console.log("thia is the modified ele block");
//         setIsLastInputE(false);
//       }
//     }
//   };



//   const handleClear = () => {
//     setInput("");
//     setResult("0")
//     setResultForIntermediateCalculations(0)
//     setOperatorStack([])
//     setPrevExpV("")
//     setPrevResultV(null)
//     setRFlag(false)
//     setIsEqualsToClicked(false)
//     setIsError(false)
//     setHistoryArray([])
//     setIsLastInputE(false)
//     setIsLastInputPI(false)
//     setIsLogXY(false)
//     setIsExpBtn(false)
//     setIsYroot(false)
//     setIsHPO(false)
//     setResFromBR([])
//     setArrayForIntResults([])
//     setIsDivPresent(false)
//   };
  
//   // const handleBackspace = () => {
//   //   if(isError){
//   //     return
//   //   }
//   //   const inputString = input ? input.toString() : "";
//   //   const updatedInput = inputString.slice(0, -1);
//   //   setInput(updatedInput);
//   //   console.log(input, "This is the input after clicking backspace")
//   // }
//   const handleBackspace = () => {
//     if (isError) {
//       return;
//     }

//     const inputString = input ? input.toString() : "";

//     // Check if the last character is an operator
//     if (inputString.length === 0 || ['+', '-', '*', '/', ')'].includes(inputString[inputString.length - 1])) {
//       return; // Return if the last character is an operator or input is empty
//     }

//     // Remove the last character (which must be a digit)
//     const updatedInput = inputString.slice(0, -1);
//     setInput(updatedInput);
//     console.log(input, "This is the input after clicking backspace");
//   }

//   const handleSqrt = () => {
//     if (isError) {
//       return
//     }
//     try {
//       // const evaluatedValue = math.evaluate(input); 
//       // if (evaluatedValue < 0) {
//       //     setResult("Error: Negative input for square root");
//       //     return;
//       // }
//       // const sqrtResult = Math.sqrt(evaluatedValue);
//       // const expression = `sqrt(${input})`;
//       // setInput(expression); 
//       // setResult(sqrtResult); 
//       const sqrtOpInfo = extractDetails(input);
//       console.log(sqrtOpInfo, "This is the sqrt op info  ");;
//       if (sqrtOpInfo) {
//         const { previousExpression, lastOperator, lastNumber } = sqrtOpInfo;
//         console.log(previousExpression, lastOperator, lastNumber);
//         if (lastOperator === null) {
//           const sqrtAloneExp = Math.sqrt(input);
//           console.log("Tjhs is the nput and sqrtAloneExp is /", input, sqrtAloneExp);;
//           setInput(`sqrt(${input})`)
//           setResult(sqrtAloneExp);
//           return
//         }
//         else {
//           setInput(`${previousExpression}${lastOperator}sqrt(${lastNumber})`)
//           const lastNSqrtRes = Math.sqrt(lastNumber);
//           console.log(lastNSqrtRes);
//           setResult(lastNSqrtRes);
//           return
//         }
//       }
//       else {
//         console.log("There is no op info");
//         console.log(sqrtOpInfo)
//       }

//     } catch (error) {
//       console.error("Error in handleSqrt:", error);
//       setResult("Error: Invalid input");
//     }
//   };
//   const handleModeChange = (event) => {
//     setMode(event.target.value);
//   };

//   const handleNestedTrigFunction = (fun, currentInput) => {
//     console.log(fun, currentInput, result, "this is the function, currentInput that is being sent");
//     const updatedInput = `${fun}(${currentInput})`;

//     setInput(updatedInput);

//     const parsedResult = parseFloat(result);

//     if (isNaN(parsedResult)) {
//       console.error("Parsed result is NaN. Please check the result state.");
//       return;
//     }
//     console.log(parsedResult, "parsedResult");
//     console.log(fun, "this is fun value");
//     const asinRadians = Math[fun](parsedResult);
//     console.log(asinRadians);
//     const finalCurrentModeAns = mode === 'Deg' ? asinRadians * (180 / Math.PI) : asinRadians
//     setResult(finalCurrentModeAns)
//     return;
//   };
//   const extractNumberFromInput = (input) => {
//     // Use a regular expression to match the pattern "(number"
//     const regex = /\(([-+]?\d*\.?\d+)/; // Matches an opening parenthesis followed by a number
//     const match = input.match(regex); // Attempt to match the input against the regex

//     if (match && match[1]) {
//       // If there's a match, return the captured group (the number)
//       return parseFloat(match[1]); // Convert the extracted string to a number
//     }

//     return null; // Return null if no valid number is found
//   };
//   const extractNumberAndParenthesis = (input) => {
//     // Use a regular expression to match the pattern "(number"
//     const regex = /\(([-+]?\d*\.?\d+)/; // Matches an opening parenthesis followed by a number
//     const match = input.match(regex); // Attempt to match the input against the regex

//     // If there's a match, return an object with the captured number and the parenthesis
//     if (match && match[1]) {
//       return {
//         number: parseFloat(match[1]), // Extracted number
//         parenthesis: '(' // Indicating the opening parenthesis is present
//       };
//     }

//     // Return null if no valid number is found
//     return null;
//   };
//   function splitInput(input) {   
//   const openParenthesis = input.charAt(0);
//   // Get the first character
//   const number = input.slice(1);
//   // Get the rest of the string as the number
//   return [openParenthesis, number];
// }
//   const
//     handleTrigFunction = (func) => {
//       if (isError) {
//         return;
//       }
//       try {
//         let angle;
//         if (mode === "Deg") {
//           angle = Math.PI / 180 * parseFloat(input);
//           console.log(angle, "this is the angle in deg for which we r calculating");
//         }
//         else {
//           angle = parseFloat(input);
//           console.log(angle, "This is the angel in rad");
//         }
//         switch (func) {

//           case "sin":
//             try {
//               console.log("Intermediate variable in case sin function", resultForIntermediateCalculations)
//               const sinCalculatedValue = Math.sin(mode === 'Deg' ? input * (Math.PI / 180) : input);
//               const calculatedResult = Math.sin(sinCalculatedValue)
//               console.log(angle, "This is the angle");
//               console.log(calculatedResult, input, "Sine,angleeeeeeeeee value");
//               setInput(calculatedResult);
//               const sinLastOpInfo = extractDetails(input);
//               if (sinLastOpInfo) {
//                 const { previousExpression, lastOperator, lastNumber } = sinLastOpInfo;
//                 console.log(previousExpression, lastOperator, lastNumber);
//                 if (lastOperator === null) {
//                   const sinAloneExpResult = Math.sin(mode === 'Deg' ? input * (Math.PI / 180) : input);
//                   console.log(sinAloneExpResult);
//                   setInput(`sin(${input})`)
//                   setResult(sinAloneExpResult)
//                   return;
//                 }
//                 setInput(`${previousExpression}${lastOperator}sin(${lastNumber})`)
//                 const sinResult = Math.sin(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//                 console.log(sinResult, "sinResultsinResult");
//                 setResult(sinResult);
//               }
//               // for nested functions
//               else if (
//                 input.includes("asin") ||
//                 input.includes("acos") ||
//                 input.includes("atan") ||
//                 input.includes("sin") ||
//                 input.includes("cos") ||
//                 input.includes("tan")
//               ) {
//                 handleNestedTrigFunction("sin", input)
//                 setIsNested(true);
//                 return;
//               }
//               else {
//                 const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//                 setInput(`sin(${input})`);
//                 setResult(Math.sin(angleToUse));
//               }
//             } catch (error) {
//               console.log("Error happened", error)
//               setResult("Error in sin")
//             }
//             break;
//           case "cos":
//             const cosCalculatedValue = Math.cos(mode === 'Deg' ? input * (Math.PI / 180) : input);
//             console.log(cosCalculatedValue)
//             const calculatedResultCos = Math.cos(cosCalculatedValue)
//             console.log(angle, "This is the angle");
//             console.log(calculatedResultCos, input, "coSine,angleeeeeeeeee value");
//             setInput(calculatedResultCos)
//             const cosLastOpInfo = extractDetails(input);
//             if (cosLastOpInfo) {
//               const { previousExpression, lastOperator, lastNumber } = cosLastOpInfo;
//               if (lastOperator === null) {
//                 const cosResult = Math.cos(mode === 'Deg' ? input * (Math.PI / 180) : input);
//                 console.log(cosResult, "cosResultsinResult");
//                 setInput(`cos(${input})`)
//                 setResult(cosResult)
//                 return
//               }
//               console.log(previousExpression, lastOperator, lastNumber);
//               setInput(`${previousExpression}${lastOperator}cos(${lastNumber})`)
//               const cosResult = Math.cos(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//               console.log(cosResult, "sinResultsinResult");
//               setResult(cosResult);
//             }
//             //  if (cosOpResult) {
//             //    const { operator, numberAfterOperator, numberBeforeOperator } = cosOpResult;
//             //    setInput(`${numberBeforeOperator}${operator}cos(${numberAfterOperator})`);
//             //    const sinResult = Math.cos(mode === 'Deg' ? numberAfterOperator * (Math.PI / 180) : numberAfterOperator);
//             //    console.log(sinResult, "sinResultsinResult");
//             //    setResult(sinResult);
//             //  }
//             else if (
//               input.includes("asin") ||
//               input.includes("acos") ||
//               input.includes("atan") ||
//               input.includes("sin") ||
//               input.includes("cos") ||
//               input.includes("tan")
//             ) {
//               handleNestedTrigFunction("cos", input)
//               setIsNested(true);
//               return;
//             } else {
//               const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//               setInput(`cos(${input})`);
//               setResult(Math.cos(angleToUse));
//             }
//             break;
//           case "tan":
//             // Extract the current mode angle
//             console.log("Intermediate variable in case of tan function", resultForIntermediateCalculations);
//             const tanCurrentModeAngle = Math.tan(mode === 'Deg' ? input * (Math.PI / 180) : input);
//             console.log(tanCurrentModeAngle);
//             const calculatedResultTan = Math.tan(tanCurrentModeAngle);
//             console.log(angle, "This is the angle");
//             console.log(calculatedResultTan, input, "Tangent value of the angle");
//             // Check if the input is an expression with operators
//             const tanLastOpResult = extractDetails(input)
//             if (tanLastOpResult) {
//               const { previousExpression, lastOperator, lastNumber } = tanLastOpResult;
//               console.log(previousExpression, lastNumber, lastOperator);
//               if (lastOperator === null) {
//                 const tanAloneExpResult = Math.tan(mode === 'Deg' ? input * (Math.PI / 180) : input);
//                 console.log(tanAloneExpResult);
//                 setInput(`tan(${input})`)
//                 setResult(tanAloneExpResult)
//                 return;
//               }
//               setInput(`${previousExpression}${lastOperator}tan(${lastNumber})`)
//               const tanResult = Math.tan(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//               console.log(tanResult, "tanResultsinResult");
//               setResult(tanResult);
//             }

//             else if (
//               input.includes("asin") ||
//               input.includes("acos") ||
//               input.includes("atan") ||
//               input.includes("sin") ||
//               input.includes("cos") ||
//               input.includes("tan")
//             ) {
//               handleNestedTrigFunction("tan", input)
//               setIsNested(true);
//               return;
//             }
//             else {
//               const degrees = input;
//               // Check if tan is undefined at 90°, 270°, etc. in degrees mode
//               if (mode === 'Deg' && (degrees % 180 === 90)) {
//                 console.log("Tangent is undefined at", degrees, "degrees.");
//                 setResult("undefined");
//                 setInput(`tan(${input})`);
//               } else {
//                 const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//                 const tanResult = Math.tan(angleToUse);
//                 console.log(angleToUse, "This is the angle in radians for which we are calculating");
//                 console.log(tanResult, "Tangent value of the angle");
//                 // Update the input display to show tan(input)
//                 setInput(`tan(${input})`);
//                 // Set the result to the calculated tangent value
//                 setResult(tanResult);
//               }
//             }
//             break;
 
//           // ******************************************************************************
//           // ******************************************************************************
//           // case "sin":
//           //   const sinCalculatedValue = Math.sin(mode === 'Deg' ? input * (Math.PI / 180) : input);
//           //   const calculatedResult = Math.sin(sinCalculatedValue)
//           //   setInput(calculatedResult);
//           //   const sinLastOpInfo = extractDetails(input);
//           //   if (sinLastOpInfo) {
//           //     console.log("Entered into extract Details block")
//           //     const { previousExpression, lastOperator, lastNumber } = sinLastOpInfo;
//           //     console.log(previousExpression, lastNumber, lastOperator)
//           //     // if (lastOperator === null) {
//           //     //           const {number,parenthesis} = extractNumberAndParenthesis(input);
//           //     //           setInput(`${parenthesis}sin(${number})`);
//           //     //           console.log(number,parenthesis,"vvvvvvvvvvvvvv")
//           //     //           const sinAloneExpResult = Math.sin(mode === 'Deg' ? number * (Math.PI / 180) : number);
//           //     //           console.log(sinAloneExpResult);
//           //     //           // setInput(`sin(${input})`)
 
//           //     //           setResult(sinAloneExpResult)
//           //     //           return;
//           //     //         }
//           //     //         else{
 
//           //     //         }
//           //     if (lastNumber !== null) {
//           //       // Apply angle conversion based on mode (Deg or Rad)
//           //       const angleToUse = mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber;
//           //       const sinResult = Math.sin(angleToUse);
 
//           //       // Construct the sine input expression
//           //       const sineInput = `sin(${lastNumber})`;
//           //       setResult(sinResult )
//           //       console.log("Current input:", input);
 
//           //       // If there's no previous expression, just set the sine input and result
//           //       if (!sinLastOpInfo) {
//           //         setInput(sineInput);
//           //         setResult(sinResult); // Set result
//           //       } else {
//           //         // Handle previous expression and operator if present
//           //         const { previousExpression, lastOperator } = sinLastOpInfo;
 
//           //         let updatedExpression;
//           //         if (previousExpression.endsWith('(')) {
//           //           // If the previous expression ends with '(', just append sine input
//           //           updatedExpression = `${previousExpression}${sineInput}`;
//           //         } else {
//           //           // If the previous expression ends with a number, add the sine function around it
//           //           const strippedExpression = previousExpression.replace(/([\d.]+)$/, '');
//           //           console.log("strippedExpression", strippedExpression)
//           //           updatedExpression = `${strippedExpression}${lastOperator || ''}${sineInput}`;
//           //           console.log("updatedExpression", updatedExpression)
//           //           setInput(updatedExpression)
//           //           return
//           //         }
 
//           //         setInput(updatedExpression); // Update expression with sine
//           //         setResult(sinResult); // Update result
//           //       }
//           //     } else {
//           //       console.log("No valid last number found in input");
//           //     }
//           //     if (lastOperator !== null) {
 
//           //       setInput(`${previousExpression}${lastOperator}sin(${lastNumber})`)
//           //       // asdf
//           //       const sinResult = Math.sin(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//           //       console.log(sinResult, "sinResultsinResult");
//           //       setResult(sinResult);
//           //     }
//           //     else if (lastOperator === null) {
//           //       console.log("lastOperator is null");
//           //       if (input.includes("(")) {
//           //         const {openParenthesis,number}=splitInput(input);
//           //         if(openParenthesis){
//           //           setInput(`${openParenthesis}sin(${number})`)
//           //           // asdf
//           //         }
//           //         setInput(`sin(${input})`)
//           //         // asdf
//           //       }
//           //     }
 
//           //   }
//           //   // for nested functions
//           //   else if (
//           //     input.includes("asin") ||
//           //     input.includes("acos") ||
//           //     input.includes("atan") ||
//           //     input.includes("sin") ||
//           //     input.includes("cos") ||
//           //     input.includes("tan")
//           //   ) {
//           //     handleNestedTrigFunction("sin", input)
//           //     setIsNested(true);
//           //     return;
//           //   }
//           //   else {
//           //     const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//           //     setInput(`sin(${input})`);
//           //     setResult(Math.sin(angleToUse));
//           //   }
 
//           //   break;
 
         
//           // // ******************************************************************************
//           // // ******************************************************************************
//           // case "cos":
//           //   const cosCalculatedValue = Math.cos(mode === 'Deg' ? input * (Math.PI / 180) : input);
//           //   console.log(cosCalculatedValue)
//           //   const calculatedResultCos = Math.cos(cosCalculatedValue)
//           //   console.log(angle, "This is the angle");
//           //   console.log(calculatedResultCos, input, "coSine,angleeeeeeeeee value");
//           //   setInput(calculatedResultCos)
//           //   const cosLastOpInfo = extractDetails(input);
//           //   if (cosLastOpInfo) {
//           //     const { previousExpression, lastOperator, lastNumber } = cosLastOpInfo;
//           //     // if (lastOperator === null) {
//           //     //   const {number,parenthesis} = extractNumberAndParenthesis(input);
//           //     //   setInput(`${parenthesis}cos(${number})`);
//           //     //   const sinAloneExpResult = Math.cos(mode === 'Deg' ? number * (Math.PI / 180) : number);
//           //     //   console.log(sinAloneExpResult);
//           //     //   // setInput(`sin(${input})`)
 
//           //     //   setResult(sinAloneExpResult)
//           //     //   return;
//           //     // }
//           //     if (lastNumber !== null) {
//           //       // Apply angle conversion based on mode (Deg or Rad)
//           //       const angleToUse = mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber;
//           //       const cosResult = Math.cos(angleToUse);
 
//           //       // Construct the sine input expression
//           //       const cosInput = `cos(${lastNumber})`;
//           //       setResult(cosResult )
//           //       console.log("Current input:", input);
 
//           //       // If there's no previous expression, just set the sine input and result
//           //       if (!cosLastOpInfo) {
//           //         setInput(cosInput); // Set expression
//           //         setResult(cosResult); // Set result
//           //       } else {
//           //         // Handle previous expression and operator if present
//           //         const { previousExpression, lastOperator } = cosLastOpInfo;
 
//           //         let updatedExpression;
//           //         if (previousExpression.endsWith('(')) {
//           //           // If the previous expression ends with '(', just append sine input
//           //           updatedExpression = `${previousExpression}${cosInput}`;
//           //         } else {
//           //           // If the previous expression ends with a number, add the sine function around it
//           //           const strippedExpression = previousExpression.replace(/([\d.]+)$/, '');
//           //           updatedExpression = `${strippedExpression}${lastOperator || ''}${cosInput}`;
//           //           setInput(updatedExpression)
//           //           return
//           //         }
 
//           //         setInput(updatedExpression); // Update expression with sine
//           //         setResult(cosResult); // Update result
//           //       }
//           //     } else {
//           //       console.log("No valid last number found in input");
//           //     }
 
//           //     if (lastOperator !== null) {
 
//           //       setInput(`${previousExpression}${lastOperator}cos(${lastNumber})`)
 
//           //       const cosResult = Math.cos(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//           //       console.log(cosResult, "cosResultsinResult");
//           //       setResult(cosResult);
//           //     }
//           //     else if (lastOperator === null) {
//           //       console.log("lastOperator is null");
//           //       if (input.includes("(")) {
//           //         const {openParenthesis,number}=splitInput(input);
//           //         if(openParenthesis){
//           //           setInput(`${openParenthesis}cos(${number})`)
//           //         }
//           //         setInput(`cos(${input})`)
//           //       }
//           //     }
 
//           //   }
//           //   else if (
//           //     input.includes("asin") ||
//           //     input.includes("acos") ||
//           //     input.includes("atan") ||
//           //     input.includes("sin") ||
//           //     input.includes("cos") ||
//           //     input.includes("tan")
//           //   ) {
//           //     handleNestedTrigFunction("cos", input)
//           //     setIsNested(true);
//           //     return;
//           //   } else {
//           //     const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//           //     setInput(`cos(${input})`);
//           //     setResult(Math.cos(angleToUse));
//           //   }
//           //   break;
         
//           // // ******************************************************************
//           // // ******************************************************************
 
 
//           // case "tan":
//           //   // Extract the current mode angle
//           //   console.log("Intermediate variable in case of tan function", resultForIntermediateCalculations);
//           //   const tanCurrentModeAngle = Math.tan(mode === 'Deg' ? input * (Math.PI / 180) : input);
//           //   console.log(tanCurrentModeAngle);
//           //   const calculatedResultTan = Math.tan(tanCurrentModeAngle);
//           //   console.log(angle, "This is the angle");
//           //   console.log(calculatedResultTan, input, "Tangent value of the angle");
//           //   // Check if the input is an expression with operators
//           //   const tanLastOpInfo = extractDetails(input)
//           //   if (tanLastOpInfo) {
//           //     const { previousExpression, lastOperator, lastNumber } = tanLastOpInfo;
//           //     console.log(previousExpression, lastNumber, lastOperator);
//           //     // if (lastOperator === null) {
//           //     //   const {number,parenthesis} = extractNumberAndParenthesis(input);
//           //     //   setInput(`${parenthesis}tan(${number})`);
//           //     //   const sinAloneExpResult = Math.tan(mode === 'Deg' ? number * (Math.PI / 180) : number);
//           //     //   console.log(sinAloneExpResult);
//           //     //   // setInput(`sin(${input})`)
 
//           //     //   setResult(sinAloneExpResult)
//           //     //   return;
//           //     // }
//           //     if (lastNumber !== null) {
//           //       // Apply angle conversion based on mode (Deg or Rad)
//           //       const angleToUse = mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber;
//           //       const tanResult = Math.tan(angleToUse);
 
//           //       // Construct the sine input expression
//           //       const tanInput = `tan(${lastNumber})`;
//           //       setResult(tanResult )
//           //       console.log("Current input:", input);
 
//           //       // If there's no previous expression, just set the sine input and result
//           //       if (!tanLastOpInfo) {
//           //         setInput(tanInput); // Set expression
//           //         setResult(tanResult); // Set result
//           //       } else {
//           //         // Handle previous expression and operator if present
//           //         const { previousExpression, lastOperator } = tanLastOpInfo;
 
//           //         let updatedExpression;
//           //         if (previousExpression.endsWith('(')) {
//           //           // If the previous expression ends with '(', just append sine input
//           //           updatedExpression = `${previousExpression}${tanInput}`;
//           //         } else {
//           //           // If the previous expression ends with a number, add the sine function around it
//           //           const strippedExpression = previousExpression.replace(/([\d.]+)$/, '');
//           //           updatedExpression = `${strippedExpression}${lastOperator || ''}${tanInput}`;
//           //           setInput(updatedExpression)
//           //           return
//           //         }
 
//           //         setInput(updatedExpression); // Update expression with sine
//           //         setResult(tanResult); // Update result
//           //       }
//           //     } else {
//           //       console.log("No valid last number found in input");
//           //     }
//           //     if (lastOperator !== null) {
 
//           //       setInput(`${previousExpression}${lastOperator}tan(${lastNumber})`)
 
//           //       const tanResult = Math.tan(mode === 'Deg' ? lastNumber * (Math.PI / 180) : lastNumber);
//           //       console.log(tanResult, "tanResultsinResult");
//           //       setResult(tanResult);
//           //     }
//           //     else if (lastOperator === null) {
//           //       console.log("lastOperator is null");
//           //       if (input.includes("(")) {
//           //         const {openParenthesis,number}=splitInput(input);
//           //         if(openParenthesis){
//           //           setInput(`${openParenthesis}tan(${number})`)
//           //         }
//           //         setInput(`tan(${input})`)
//           //       }
//           //     }
 
//           //   }
 
//           //   else if (
//           //     input.includes("asin") ||
//           //     input.includes("acos") ||
//           //     input.includes("atan") ||
//           //     input.includes("sin") ||
//           //     input.includes("cos") ||
//           //     input.includes("tan")
//           //   ) {
//           //     handleNestedTrigFunction("tan", input)
//           //     setIsNested(true);
//           //     return;
//           //   }
//           //   else {
//           //     const degrees = input;
//           //     // Check if tan is undefined at 90°, 270°, etc. in degrees mode
//           //     if (mode === 'Deg' && (degrees % 180 === 90)) {
//           //       console.log("Tangent is undefined at", degrees, "degrees.");
//           //       setResult("undefined");
//           //       setInput(`tan(${input})`);
//           //     } else {
//           //       const angleToUse = mode === 'Deg' ? input * (Math.PI / 180) : input;
//           //       const tanResult = Math.tan(angleToUse);
//           //       console.log(angleToUse, "This is the angle in radians for which we are calculating");
//           //       console.log(tanResult, "Tangent value of the angle");
//           //       // Update the input display to show tan(input)
//           //       setInput(`tan(${input})`);
//           //       // Set the result to the calculated tangent value
//           //       setResult(tanResult);
//           //     }
//           //   }
//           //   break;
          
          
//             case "asin":
//             try {
//               const numericInput = parseFloat(input);
//               console.log("resultForIntermediateCalculations in asin case function", resultForIntermediateCalculations);
//               const asinLastOpInfo = extractDetailsLastExp(input);
//               console.log(asinLastOpInfo, "asinLasiInfoooo")
//               if (asinLastOpInfo) {
//                 console.log("Inside asinLastOpInfo function");
//                 const { previousExpression, lastOperator, lastExpression } = asinLastOpInfo;
//                 console.log(previousExpression, lastOperator, lastExpression);
//                 if (lastOperator === null) {
//                   console.log("entered into lastOperator===null block")
//                   if (input > 1 || input < -1) {
//                     console.log("input>1 &&input<-1")
//                     console.log(input)
//                     setInput(`asin(${input})`)
//                     setIsError(true)
//                     setResult("Math Error")
//                     return;
//                   }
//                   // const asinAloneResult=Math.asin(mode==='Deg'?numericInput*(Math.PI/180):numericInput);
//                   const asinAloneResult = mode === 'Deg' ? Math.asin(numericInput) * (180 / Math.PI) : Math.asin(numericInput);
//                   console.log(input);
//                   console.log(asinAloneResult);
//                   setInput(`asin(${input})`)
//                   setResult(asinAloneResult)
//                   return;
//                 }
//                 setInput(`${previousExpression}${lastOperator}asin(${lastExpression})`)
//                 const asinResult = mode === 'Deg' ? Math.asin(lastExpression) * (180 / Math.PI) : Math.asin(lastExpression)
//                 console.log(asinResult, "asinresult for expression");
//                 setResult(asinResult)
//                 return;
//               }
//               //   else if (
//               //    input.includes("asin") ||
//               //    input.includes("acos") ||
//               //    input.includes("atan") ||
//               //    input.includes("sin") ||
//               //    input.includes("cos") ||
//               //    input.includes("tan")
//               //  ){
//               //    setIsNested(true);
//               //    handleNestedTrigFunction("asin",input)
//               //    return;
//               //   }

//             } catch (error) {
//               setResult("Error");
//               // asdf
//               console.log("Math error in asin function");
//             }
//             break;

//           case "acos":
//             try {
//               const numericInput = parseFloat(input);
//               console.log("resultForIntermediateCalculations in acos case function", resultForIntermediateCalculations);
//               const acosLastOpInfo = extractDetailsLastExp(input);
//               console.log(acosLastOpInfo, "acosLastOpInfo")
//               if (acosLastOpInfo) {
//                 console.log("Inside acosLastOpInfo function");
//                 const { previousExpression, lastOperator, lastExpression } = acosLastOpInfo;
//                 console.log(previousExpression, lastOperator, lastExpression);
//                 if (lastOperator === null) {
//                   console.log("entered into lastOperator===null block")
//                   if (input > 1 || input < -1) {
//                     console.log("input>1 &&input<-1")
//                     console.log(input)
//                     setInput(`acos(${input})`)
//                     setIsError(true)
//                     setResult("Math Error")
//                     return;
//                   }
//                   // const asinAloneResult=Math.asin(mode==='Deg'?numericInput*(Math.PI/180):numericInput);
//                   const acosAloneResult = mode === 'Deg' ? Math.acos(numericInput) * (180 / Math.PI) : Math.acos(numericInput);
//                   console.log(input);
//                   console.log(acosAloneResult);
//                   setInput(`acos(${input})`)
//                   setResult(acosAloneResult)
//                   return;
//                 }
//                 setInput(`${previousExpression}${lastOperator}acos(${lastExpression})`)
//                 const acosResult = mode === 'Deg' ? Math.acos(lastExpression) * (180 / Math.PI) : Math.acos(lastExpression)
//                 console.log(acosResult, "acccissssssssesult for expression");
//                 setResult(acosResult)
//                 return;
//               }
//             } catch (error) {
//               console.log("error while acos function");
//               setIsError(true);
//               setResult("NaN")
//             }
//             break;
//           case "atan":
//             console.log("resultForIntermediateCalculations in atan case function", resultForIntermediateCalculations);
//             const atanLastOpInfo = extractDetailsLastExp(input);
//             console.log(atanLastOpInfo, "atanLastOpInfo")

//             if (atanLastOpInfo) {
//               console.log("Inside atanLastOpInfo function");
//               const { previousExpression, lastOperator, lastExpression } = atanLastOpInfo;
//               console.log(previousExpression, lastOperator, lastExpression);
//               const numericInput = parseFloat(lastExpression);
//               if (lastOperator === null) {
//                 console.log("entered into lastOperator===null block")
//                 // if(input>1 || input<-1 ){
//                 //   console.log("input>1 &&input<-1")
//                 //   console.log(input)
//                 //   setInput(`atan(${input})`)
//                 //   setIsError(true)
//                 //   setResult("Math Error")
//                 //   return;
//                 // }
//                 // const asinAloneResult=Math.asin(mode==='Deg'?numericInput*(Math.PI/180):numericInput);
//                 console.log(lastExpression)
//                 const atanAloneResult = mode === 'Deg' ? Math.atan(numericInput) * (180 / Math.PI) : Math.atan(numericInput);
//                 console.log(input);
//                 console.log(atanAloneResult);
//                 setInput(`atan(${input})`)
//                 setResult(atanAloneResult)
//                 return;
//               }
//               setInput(`${previousExpression}${lastOperator}atan(${lastExpression})`)
//               const atanResult = mode === 'Deg' ? Math.atan(numericInput) * (180 / Math.PI) : Math.atan(numericInput)
//               console.log(atanResult, "asinresult for expression");
//               setResult(atanResult)
//               return;
//             }
//             break;

//           case "sinh":
//             try {
//               console.log("Mode:", mode);
//               const sinhOpForLastExpOpInfo = extractDetails(input)
//               console.log(sinhOpForLastExpOpInfo, "sinopfor last ex[");
//               if (sinhOpForLastExpOpInfo) {
//                 console.log("the last exp block is true");
//                 const { previousExpression, lastOperator, lastNumber } = sinhOpForLastExpOpInfo;
//                 console.log(previousExpression, lastOperator, lastNumber);
//                 if (lastOperator === null) {
//                   console.log(lastOperator, "lastOperator lastOperator");
//                   console.log(lastNumber, "lastNumber lastNumber");
//                   const lastNumberFloat = parseFloat(lastNumber);
//                   console.log("last number in lastOperator===null", lastNumberFloat);
//                   console.log("this is alone expression");
//                   const sinhAloneExp = Math.sinh(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
//                   console.log(sinhAloneExp, "sinh alone expression to be set to result value");
//                   setInput(prev => `sinh(${lastNumber})`);
//                   setResult(sinhAloneExp);
//                   return
//                 }
//                 else {
//                   console.log(lastNumber, "lastNumber lastNumber");
//                   const lastNumberFloat = parseFloat(lastNumber);
//                   console.log("this is the first val in input expression and input is", input);
//                   const sinhResult = Math.sinh(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
//                   setInput(`${previousExpression}${lastOperator}sinh(${lastNumber})`);
//                   console.log(sinhResult, "result obtained");
//                   setResult(sinhResult)
//                   return
//                 }
//               }
//               else {
//                 console.log("the last exp block is faaaaalse");
//               }

//             } catch (error) {
//               console.log("Error happened in sinh function");
//               setResult("Error");
//               setIsError(true)
//             }
//             break;

//           case "cosh":
//             try {
//               const coshOpForLastExpOpInfo = extractDetails(input);
//               console.log(coshOpForLastExpOpInfo, "coshOpForLastExpOpInfo");
//               if (coshOpForLastExpOpInfo) {
//                 console.log("the last exp block is true");
//                 const { previousExpression, lastOperator, lastNumber } = coshOpForLastExpOpInfo;
//                 console.log(previousExpression, lastOperator, lastNumber);
//                 const lastNumberFloat = parseFloat(lastNumber);
//                 if (lastOperator === null) {
//                   console.log(lastOperator, "This is the last operator");
//                   const cosAloneExp = Math.cosh(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
//                   console.log(cosAloneExp, "cosAloneExp");
//                   setInput(`cosh(${lastNumber})`);
//                   setResult(cosAloneExp);
//                 }
//                 else {
//                   console.log("lastnumber", lastNumber);
//                   const coshResult = Math.cosh(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
//                   setInput(`${previousExpression}${lastOperator}cosh(${lastNumber})`);
//                   console.log(coshResult);
//                   setResult(coshResult)
//                   return
//                 }
//               }
//               else {
//                 console.log("the last exp block is faaaaalse");
//               }
//             } catch (error) {
//               setResult("Error")
//               setIsError(true)
//             }
//             break;
//           case "tanh":
//             try {
//               const tanhOpForLastExpInfo = extractDetails(input);
//               console.log(tanhOpForLastExpInfo);
//               if (tanhOpForLastExpInfo) {
//                 console.log("The last exp block is true");
//                 const { previousExpression, lastOperator, lastNumber } = tanhOpForLastExpInfo;
//                 const parseFloatLastNum = parseFloat(lastNumber);
//                 if (lastOperator === null) {
//                   console.log("this is alone exp");
//                   const tanAloneExp = Math.tanh(mode === 'Deg' ? parseFloatLastNum * (Math.PI / 180) : parseFloatLastNum);
//                   console.log(tanAloneExp, "tanAloneExpression");
//                   setInput(`tanh(${lastNumber})`);
//                   setResult(tanAloneExp)
//                 }
//                 else {
//                   console.log("lastNumber", lastNumber);
//                   const tanhResult = Math.tanh(mode === 'Deg' ? parseFloatLastNum * (Math.PI / 180) : parseFloatLastNum);
//                   setResult(tanhResult)
//                   setInput(`${previousExpression}${lastOperator}tanh(${lastNumber})`);
//                   return
//                 }
//               }
//             } catch (error) {
//               setResult("Error")
//               setIsError(true)
//             }
//             break;
//           // ******************************************************************************************************

//           case "asinh":
//             try {
//               const asinhOpForLastExpInfo = extractDetails(input);
//               console.log(asinhOpForLastExpInfo);
//               if (asinhOpForLastExpInfo) {
//                 console.log("The last exp block is true");
//                 const { previousExpression, lastOperator, lastNumber } = asinhOpForLastExpInfo;
//                 const parseFloatLastNum = parseFloat(lastNumber);
//                 if (lastOperator === null) {
//                   console.log("This is the alone exp");
//                   const asinhAloneResult = Math.asinh(parseFloatLastNum);
//                   setInput(`asinh(${lastNumber})`);
//                   setResult(asinhAloneResult)
//                   return
//                 }
//                 else {
//                   setInput(`${previousExpression}${lastOperator}asinh(${lastNumber})`);
//                   const asinhExpResult = Math.asinh(parseFloatLastNum);
//                   setResult(asinhExpResult)
//                   return;
//                 }
//               }
//             } catch (error) {
//               setResult("Error");
//               console.log("Error in asinh function");
//               setIsError(true)
//             }

//             break;
//           case "acosh":
//             try {
//               const acoshOpForLastExpInfo = extractDetails(input)
//               console.log(acoshOpForLastExpInfo, "acoshOpForLastExpInfo");
//               if (acoshOpForLastExpInfo) {
//                 const { previousExpression, lastOperator, lastNumber } = acoshOpForLastExpInfo;
//                 const parseFloatLastNum = parseFloat(lastNumber);
//                 if (lastOperator === null) {
//                   console.log("This is the alone exp");
//                   const acoshAloneResult = Math.acosh(parseFloatLastNum);
//                   setInput(`acosh(${lastNumber})`);
//                   setResult(acoshAloneResult)
//                   return
//                 }
//                 else {
//                   setInput(`${previousExpression}${lastOperator}acosh(${lastNumber})`);
//                   const acosExpResult = Math.acosh(parseFloatLastNum);
//                   setResult(acosExpResult)
//                   return;
//                 }
//               }
//             } catch (error) {
//               console.log("error happened in acosh function");
//               setResult("Error")
//               setIsError(true)
//             }
//             break;

//           case "atanh":
//             try {
//               const atanhOpForLastExpInfo = extractDetails(input);
//               if (atanhOpForLastExpInfo) {
//                 console.log("The last exp block is true");
//                 const { previousExpression, lastOperator, lastNumber } = atanhOpForLastExpInfo;
//                 const parseFloatLastNum = parseFloat(lastNumber);
//                 if (parseFloatLastNum > -1 && parseFloatLastNum < 1) {
//                   if (lastOperator === null) {
//                     console.log("This is the alone exp");
//                     const atanhAloneResult = Math.atanh(parseFloatLastNum);
//                     setInput(`atanh(${lastNumber})`);
//                     setResult(atanhAloneResult)
//                     return
//                   }
//                   else {
//                     setInput(`${previousExpression}${lastOperator}atanh(${lastNumber})`);
//                     const atanhExpResult = Math.atanh(parseFloatLastNum);
//                     setResult(atanhExpResult)
//                     return;
//                   }
//                 }
//                 else {
//                   console.log("input is out of rangee");
//                   setResult("NaN");
//                   if (lastOperator === null) {
//                     setInput(`atanh(${input})`)
//                   }
//                   else {
//                     setInput(`${previousExpression}${lastOperator}atanh(${lastNumber})`);
//                   }
//                   setIsError(true)
//                   return;
//                 }
//               }
//             } catch (error) {
//               console.log("Error in atanh block");
//               setResult("NaN");
//               setIsError(true)
//               return
//             }
//             break;
//           // *****************************************************************
//           default:
//             break;
//         }

//       } catch (error) {
//         setResult("Error");
//         setIsError(true)
//       }
//     };

//   const extractOperatorInfo = (input) => {
//     const hasOperator = /[\+\-\*\/]/.test(input);
//     if (hasOperator) {
//       const operatorMatch = input.match(/([\d\.]+)\s*([\+\-\*\/])\s*([\d\.]+)/);
//       if (operatorMatch) {
//         let numberBeforeOperator = operatorMatch[1].trim();
//         const operator = operatorMatch[2].trim();
//         const numberAfterOperator = operatorMatch[3].trim();
//         // if (isOpenParenthesis) {
//         //   numberBeforeOperator += "("; // Append '(' to numberBeforeOperator
//         // }
//         return { hasOperator, numberBeforeOperator, operator, numberAfterOperator };
//       }
//     }
//     return null;
//   };




//   //   const handleArcTrigFunctionForOperator = (inputTrigStr, mode, trigOp) => {
//   //     const arcTrigMatch = inputTrigStr.match(new RegExp(`${trigOp}\\(([^)]+)\\)`));
//   //     console.log(mode, inputTrigStr, trigOp);
//   //     console.log(arcTrigMatch, "This is the arc trig match");

//   //     if (arcTrigMatch) {
//   //         console.log(arcTrigMatch, "inside the arcTrigMatch");
//   //         const arcTrigValue = parseFloat(arcTrigMatch[1]);
//   //         console.log(arcTrigMatch[1], arcTrigMatch[0], "This is the arc trig Value");

//   //         // Check if the value is in the range [-1, 1]
//   //         if (arcTrigValue < -1 || arcTrigValue > 1) {
//   //             console.error("Input for arcsine is out of range [-1, 1].");
//   //             setResult(NaN); // Or set a specific error message
//   //             return;
//   //         }

//   //         // Calculate the arcsine in radians
//   //         const evaluatedArcTrig = Math[trigOp](arcTrigValue);

//   //         // Convert to degrees if needed
//   //         const resultInDegrees = mode === 'Deg' ? evaluatedArcTrig * (180 / Math.PI) : evaluatedArcTrig;

//   //         const newInput = inputTrigStr.replace(arcTrigMatch[0], resultInDegrees);
//   //         const evaluatedResult = math.evaluate(newInput);

//   //         // Update the input and result
//   //         setInput(evaluatedResult.toString());
//   //         setResult(evaluatedResult);
//   //         console.log(evaluatedResult, "result is being set");
//   //     } else {
//   //         console.error("No valid arcsine match found in the input.");
//   //     }
//   // };







//   const handleLogFunction = (func) => {
//     if (isError) {
//       console.log("Is error in handleLog function");
//       return
//     }
//     let calculatedLogValue;
//     let inputOrResult = input || result;
//     try {
//       // Calculate log based on the input
//       switch (func) {
//         case "log":
//           try {

//             const logOpInfo = extractDetails(input);
//             console.log(logOpInfo);
//             const { previousExpression, lastOperator, lastNumber } = logOpInfo;
//             if (logOpInfo) {
//               if (lastOperator !== null) {
//                 setInput(`${previousExpression}${lastOperator}log(${lastNumber})`);
//                 const logResult = math.log10(lastNumber);
//                 console.log(logResult);
//                 setResult(logResult);
//                 return
//               }
//               else {
//                 console.log("the operator is null here");
//                 setInput(`log(${input})`);
//                 const logAloneExpRes = math.log10(input);
//                 console.log(logAloneExpRes);
//                 setResult(logAloneExpRes);
//               }
//             }
//           } catch (error) {
//             setResult("Error")
//             setIsError(true)
//           }
//           break;
//         // log2asdf
//         case "log2":
//           const log2OpInfo = extractDetails(input);
//           console.log(log2OpInfo);
//           if (log2OpInfo) {
//             console.log("Ths is the block in which there is some prev exp in the input");
//             const { previousExpression, lastOperator, lastNumber } = log2OpInfo;
//             if (lastOperator !== null) {
//               setInput(`${previousExpression}${lastOperator}logXbase2(${lastNumber})`);
//               // console.log()
//               const log2ExpResult = math.log2(lastNumber);
//               // console.log(log2ExpResult);
//               setResult(log2ExpResult);
//               return
//             }
//             else {
//               console.log("the operator is nll here");
//               setInput(`logXbase2(${input})`);
//               const log2Result = math.log2(input);
//               setResult(log2Result)
//             }
//           }
//           else {
//             console.log("the operator is nll here total else nlockkkkkkkkkkk");
//             // setInput(`logXbase2(${input})`);
//             // const log2Result=math.log2(input);
//             // setResult(log2Result)
//           }

//           break;
//         case "loge":
//           console.log(input, "This is the input");
//           console.log("This is in the ln function, the input is", input);
//           if (input.trim().startsWith('-')) {
//             console.log("Negative number detected");
//             const negativeNumber = input.trim().substring(1);
//             console.log("Negative number is", negativeNumber);
//             setInput(`0-ln(${negativeNumber})`)
//             const calculatedNegLnVal = math.log(math.evaluate(negativeNumber))
//             setResult(calculatedNegLnVal)
//             return;
//           }
//           const logeOpInfo = extractDetails(input);
//           console.log(logeOpInfo);
//           const { previousExpression, lastOperator, lastNumber } = logeOpInfo;
//           if (lastOperator === null) {
//             setInput(`ln(${lastNumber})`);
//             const logResult = Math.log(lastNumber);
//             setResult(logResult);
//             console.log(logResult);
//           }
//           else {
//             console.log("There is no prev exp");
//             setInput(`${previousExpression}${lastOperator}ln(${lastNumber})`);
//             const logResult = Math.log(lastNumber);
//             setResult(logResult)
//             return;
//           }
//           // calculatedLogValue = math.log(math.evaluate(inputOrResult));
//           // setResult(calculatedLogValue);

//           // hasOperator = /[\+\-\*\/]/.test(inputOrResult);
//           // operatorMatch = inputOrResult.match(/([\d\.]+)\s*([\+\-\*\/])\s*([\d\.]+)/);
//           // if (hasOperator) {
//           //   const operator = operatorMatch[2].trim();
//           //   console.log(operator, "Te operator issss");
//           //   const numberBeforeOperator = operatorMatch[1].trim();
//           //   console.log(numberBeforeOperator, "numberBeforeOperatornumberBeforeOperator")
//           //   console.log("Operators found in the input.");
//           //   const numberAfterOperator = operatorMatch[3].trim();
//           //   console.log(numberAfterOperator, "this is the number after operator");
//           //   setInput(`${numberBeforeOperator}${operator}ln(${numberAfterOperator})`)
//           //   const lnInputValue = math.log(numberAfterOperator);
//           //   setResult(lnInputValue);
//           // } else {
//           //   console.log("No operators found. Proceeding with ln only.");
//           //   const evaluatedValue = math.evaluate(inputOrResult);
//           //   calculatedLogValue = math.log(evaluatedValue);
//           //   setResult(calculatedLogValue);
//           //   setInput(`ln(${inputOrResult})`)
//           // }
//           break;
//         case "logxy":
//           const [x, y] = inputOrResult.split(",").map(val => math.evaluate(val.trim()));
//           if (x <= 0 || x === 1 || y <= 0) throw new Error("Base must be > 0 and not 1, and argument must be > 0.");
//           calculatedLogValue = math.log(y) / math.log(x);
//           setResult(calculatedLogValue);
//           setInput(calculatedLogValue);
//           break;
//         default:
//           return;
//       }
//     } catch (error) {
//       setResult("Error");
//       console.error("Error occurred:", error);
//     }
//   };

//   // this is used while evaluating
//   // in this we also added logic for knowing the operator


//   const evaluateLogXYExpression = (input) => {
//     // Regular expression to find 'logxBasey'
//     const logRegex = /(\d+)\s*logxBasey\s*(\d+)/;
//     const match = input.match(logRegex);

//     if (match) {
//       const valueX = parseFloat(match[1].trim());
//       console.log(valueX, "value exxxxxxxxxx")
//       const valueY = parseFloat(match[2].trim());
//       console.log(valueY, "value yyyyyyyy  ")

//       // Validate the values
//       if (!isNaN(valueX) && !isNaN(valueY) && valueY !== 1 && valueY > 0) {
//         const logValue = Math.log(valueX) / Math.log(valueY); // Compute log base y of x
//         console.log("logxBasey result:", logValue);

//         // Replace 'logxBasey' with its computed value in the expression
//         const newInput = input.replace(logRegex, logValue.toString());
//         return newInput; // Return the updated input
//       }
//     }

//     return null; // Return null if no valid log expression found
//   };


//   // const extractDetails = (input) => {
//   //   // Regular expression to find the last operator
//   //   const operatorRegex = /[\+\-\*\/](?=\d)/g;  // Match +, -, *, / followed by a digit

//   //   // Regular expression to find all numbers
//   //   const numberRegex = /(\d+(\.\d+)?)/g; // Match integers and decimals

//   //   // Find all numbers in the input
//   //   const numbers = input.match(numberRegex);
//   //   const lastNumber = numbers ? numbers[numbers.length - 1] : null; // Last number (decimal)

//   //   // Find the last operator in the expression
//   //   const operators = input.match(operatorRegex);
//   //   const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

//   //   // Get the previous expression by removing the last number and last operator
//   //   let previousExpression = input;
//   //   if (lastOperator && lastNumber) {
//   //     const lastOperatorIndex = input.lastIndexOf(lastOperator);
//   //     previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
//   //   }

//   //   return {
//   //     previousExpression,
//   //     lastOperator,
//   //     lastNumber,  // Use 'lastNumber' instead of 'lastDecimal'
//   //   };
//   // };

//   // Example usage:

//   const extractDetails = (input) => {
//     // Regular expression to find all operators
//     const operatorRegex = /[\+\-\*\/]/g;  // Match +, -, *, /

//     // Regular expression to find all numbers
//     const numberRegex = /(\d+(\.\d+)?)/g; // Match integers and decimals

//     // Find all numbers in the input
//     const numbers = input.match(numberRegex);
//     const lastNumber = numbers ? numbers[numbers.length - 1] : null; // Last number (decimal)

//     // Find the last operator in the expression
//     const operators = input.match(operatorRegex);
//     const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

//     // Get the previous expression by removing the last number and operator
//     let previousExpression = input;
//     if (lastOperator && lastNumber) {
//       const lastOperatorIndex = input.lastIndexOf(lastOperator);
//       const lastNumberIndex = input.lastIndexOf(lastNumber);
//       previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
//     }

//     return {
//       previousExpression,
//       lastOperator,
//       lastNumber,  // Correct last number
//     };
//   };

//   const extractLastExpDetailsForLogxbasey = (input) => {
//     // Regex to find all operators (+, -, *, /)
//     const operatorRegex = /[\+\-\*\/]/g;

//     // Find all operators in the input
//     const operators = input.match(operatorRegex);
//     const lastOperatorForLxBy = operators ? operators[operators.length - 1] : null;

//     // If there is no operator, return the entire input as the last expression
//     if (!lastOperatorForLxBy) {
//       return {
//         lastExpressionForLxBy: input.trim(),
//         previousExpressionForLxBy: null,
//         lastOperatorForLxBy: null,
//       };
//     }

//     // Get the index of the last operator
//     const lastOperatorIndex = input.lastIndexOf(lastOperatorForLxBy);

//     // The expression after the last operator
//     const lastExpressionForLxBy = input.slice(lastOperatorIndex + 1).trim();

//     // Get the previous expression by removing the last operator and everything after it
//     const previousExpressionForLxBy = input.slice(0, lastOperatorIndex).trim();

//     return {
//       previousExpressionForLxBy,
//       lastOperatorForLxBy,
//       lastExpressionForLxBy,
//     };
//   };
//   // main imp function if rFlag is trueeeeeee
//   const extractDetailsLastExp = (input) => {
//     // Regular expression to find all operators
//     const operatorRegex = /[\+\-\*\/]/g;

//     // Regular expression to find all expressions (numbers or functions like sin(3), cos(3))
//     const expressionRegex = /(?:sin|cos|tan|log|sqrt|sinh|cosh|tanh|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot)?\(?\d+(\.\d+)?\)?/g;
//     const expressions = input.match(expressionRegex);
//     const lastExpression = expressions ? expressions[expressions.length - 1] : null; // Last expression

//     // Find the last operator in the expression
//     const operators = input.match(operatorRegex);
//     const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

//     // Get the previous expression by removing the last expression and operator
//     let previousExpression = input;
//     if (lastOperator && lastExpression) {
//       const lastOperatorIndex = input.lastIndexOf(lastOperator);
//       // const lastExpressionIndex = input.lastIndexOf(lastExpression);
//       previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
//     }

//     return {
//       previousExpression,
//       lastOperator,
//       lastExpression,  // Correct last expression
//     };
//   };
//   useEffect(() => {
//     console.log(intermediateResultsStack, " intermediateResultsStack"
//     );
//   }, [setIntermediateResultsStack, intermediateResultsStack])


//   const [rFlag, setRFlag] = useState(false)
//   useEffect(() => {
//     console.log(rFlag, "rflag value")
//   }, [rFlag])
//   useEffect(() => {
//     console.log(isExpBtn, "isExpBtn value")
//   }, [isExpBtn])


//   const extractLastEPlusNumbers = (input) => {
//     // Regex to match all occurrences of a number in e+ notation
//     const regex = /(\d+(\.\d+)?)e\+(\d+(\.\d+)?)/g;

//     // Find all matches of the regex in the input
//     const matches = [...input.matchAll(regex)];

//     // Check if we found any matches
//     if (matches.length > 0) {
//       // Get the last match (the last e+ found)
//       const lastMatch = matches[matches.length - 1];

//       // Extract the base and exponent from the last match
//       const base = parseFloat(lastMatch[1]);  // Base number before e+
//       const exponent = parseFloat(lastMatch[3]); // Exponent number after e+

//       console.log(`Base: ${base}, Exponent: ${exponent}`); // Debugging output
//       return { base, exponent };
//     } else {
//       console.log("No e+ numbers found in the input.");
//       return null; // Return null if no match found
//     }
//   };

//   const calculateReciprocal = (value) => {
//     if (value === 0) {
//       return "Infinity"; // Handle division by zero
//     }
//     return 1 / value;
//   };

//   // const handleInputForXpY = (value) => {
//   //   if (input.includes("^")) {
//   //     // Split the input string at the last occurrence of ^
//   //     const parts = input.split("^");
//   //     if (parts.length > 1) {
//   //       // Get the base (the last number before ^)
//   //       const baseString = parts[parts.length - 2];
//   //       const exponentString = parts[parts.length - 1];
//   //       // Convert to numbers
//   //       const base = parseFloat(baseString.trim());
//   //       const exponent = parseFloat(exponentString.trim());

//   //       // Check if both base and exponent are valid numbers
//   //       if (!isNaN(base) && !isNaN(exponent)) {
//   //         // Calculate the power
//   //         const resultOfXpY = Math.pow(base, exponent);

//   //         // Create new input without the power operation and append the result
//   //         // const newInput = parts.slice(0, -1).join("^") + result;

//   //         // Update the input state
//   //         // setInput(newInput);
//   //         console.log(`The result of ${base}^${exponent} = ${resultOfXpY}`);
//   //         setResult(resultOfXpY)
//   //       } else {
//   //         console.error("Invalid base or exponent input");
//   //       }
//   //     }
//   //   } else {
//   //     // Handle other cases, e.g., appending value
//   //     setInput(`${input}${value}`);
//   //   }
//   // };

//   // const handleInputForXpY = (value) => {
//   //   const expressionRegex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g;
//   //   let updatedValue = value;
//   //   let match;

//   //   while ((match = expressionRegex.exec(value)) !== null) {
//   //     const base = parseFloat(match[1]);
//   //     const exponent = parseFloat(match[3]);

//   //     if (!isNaN(base) && !isNaN(exponent)) {
//   //       const resultOfXpY = Math.pow(base, exponent);
//   //       console.log(`The result of ${base}^${exponent} = ${resultOfXpY}`);

//   //       // Store the evaluated result in state
//   //       setEvalValForxPy(resultOfXpY);

//   //       // Replace in the updated value
//   //       updatedValue = updatedValue.replace(match[0], resultOfXpY);
//   //       expressionRegex.lastIndex = 0; // Reset for new matches
//   //     }
//   //   }
//   //   // Update the input state
//   //   setInput(updatedValue);
//   //   return updatedValue;
//   // };

//   // const handleInputForXpY = (value) => {
//   //   const expressionRegex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g; // Regex to match base ^ exponent
//   //   let updatedValue = value;
//   //   let match;

//   //   // Initialize a variable to track whether replacements were made
//   //   let hasReplacement = true;

//   //   // Keep running until no replacements are made
//   //   while (hasReplacement) {
//   //     hasReplacement = false; // Reset the flag for this iteration
//   //     match = expressionRegex.exec(updatedValue); // Execute regex on updatedValue

//   //     if (match) {
//   //       const base = parseFloat(match[1]);
//   //       const exponent = parseFloat(match[3]);

//   //       if (!isNaN(base) && !isNaN(exponent)) {
//   //         const resultOfXpY = Math.pow(base, exponent);
//   //         console.log(`The result of ${base}^${exponent} = ${resultOfXpY}`);

//   //         // Store the evaluated result in state
//   //         setEvalValForxPy(resultOfXpY);

//   //         // Replace the matched expression with the result
//   //         updatedValue = updatedValue.replace(match[0], resultOfXpY);
//   //         hasReplacement = true; // Set flag to true to continue looping
//   //         expressionRegex.lastIndex = 0; // Reset the regex last index
//   //       }
//   //     }
//   //   }

//   //   // Update the input state with the fully evaluated value
//   //   // setInput(updatedValue);
//   //   return updatedValue; 
//   // };

//   const handleInputForXpY = (value) => {
//     const expressionRegex = /(\d+(\.\d+)?)\s*\^\s*(\d+(\.\d+)?)/g; // Regex to match base ^ exponent
//     let updatedValue = value;
//     let match;

//     // Initialize variable to hold the final result
//     let finalResult = null;

//     // Initialize a variable to track whether replacements were made
//     let hasReplacement = true;

//     // Keep running until no replacements are made
//     while (hasReplacement) {
//       hasReplacement = false; // Reset the flag for this iteration
//       match = expressionRegex.exec(updatedValue); // Execute regex on updatedValue

//       if (match) {
//         const base = parseFloat(match[1]);
//         const exponent = parseFloat(match[3]);

//         if (!isNaN(base) && !isNaN(exponent)) {
//           const resultOfXpY = Math.pow(base, exponent);
//           console.log(`The result of ${base}^${exponent} = ${resultOfXpY}`);
//           // Store the evaluated result in state if necessary
//           // Replace the matched expression with the result in the updated value
//           updatedValue = updatedValue.replace(match[0], resultOfXpY);
//           finalResult = resultOfXpY; // Update finalResult with the most recent calculation
//           hasReplacement = true; // Set flag to true to continue looping
//           expressionRegex.lastIndex = 0; // Reset the regex last index
//         }
//       }
//     }

//     // Return the final evaluated value
//     return finalResult;
//   };
//   // function extractLastYRootNumbers(input) {
//   //   // Find the last occurrence of 'yroot'
//   //   const lastYRootIndex = input.lastIndexOf("yroot");

//   //   // If 'yroot' is not found, return empty strings
//   //   if (lastYRootIndex === -1) {
//   //       return {
//   //           base: '',
//   //           exponent: ''
//   //       };
//   //   }

//   //   // Get the part of the string before 'yroot' as the base
//   //   const base = input.slice(0, lastYRootIndex).trim();

//   //   // Get the part of the string after 'yroot' as the exponent
//   //   let exponentPart = input.slice(lastYRootIndex + 5).trim(); // 5 is the length of "yroot"

//   //   // Check if there's a number after 'yroot'
//   //   if (exponentPart === '') {
//   //       // If there's no exponent, we can return a default value or an error
//   //       exponentPart = '1'; // Default exponent if none is specified
//   //   }

//   //   // Return the base and exponent as an object
//   //   return {
//   //       base: base,
//   //       exponent: exponentPart
//   //   };
//   // }
//   // function extractLastYRootNumbers(input) {
//   //   // Find the last occurrence of 'yroot'
//   //   const lastYRootIndex = input.lastIndexOf("yroot");

//   //   // If 'yroot' is not found, return empty strings
//   //   if (lastYRootIndex === -1) {
//   //       return {
//   //           base: '',
//   //           exponent: ''
//   //       };
//   //   }

//   //   // Get the part of the string after 'yroot' as the exponent
//   //   let exponentPart = input.slice(lastYRootIndex + 5).trim(); // 5 is the length of "yroot"

//   //   // Check if there's a number after 'yroot'
//   //   if (exponentPart === '') {
//   //       // If there's no exponent, we can return a default value or an error
//   //       exponentPart = '1'; // Default exponent if none is specified
//   //   }

//   //   // Get the part of the string before 'yroot' as the base
//   //   const basePart = input.slice(0, lastYRootIndex).trim();

//   //   // Extract the last number from the base part
//   //   const lastNumberMatch = basePart.match(/(\d+)\s*$/); // Match the last number

//   //   if (lastNumberMatch) {
//   //       const base = lastNumberMatch[1]; // Last number found
//   //       const remainingBase = basePart.slice(0, basePart.lastIndexOf(base)).trim(); // Remaining base part

//   //       // Return the base (including any preceding non-numeric part) and exponent
//   //       return {
//   //           base: remainingBase ? `${remainingBase}${base}` : base, // Combine base parts if necessary
//   //           exponent: exponentPart
//   //       };
//   //   } else {
//   //       // No valid base number found
//   //       return {
//   //           base: '',
//   //           exponent: exponentPart
//   //       };
//   //   }
//   // }

//   function extractLastYRootNumbers(input) {
//     // Find the last occurrence of 'yroot'
//     const lastYRootIndex = input.lastIndexOf("yroot");

//     // If 'yroot' is not found, return empty strings
//     if (lastYRootIndex === -1) {
//       return {
//         base: '',
//         exponent: ''
//       };
//     }

//     // Get the part of the string after 'yroot' as the exponent
//     let exponentPart = input.slice(lastYRootIndex + 5).trim(); // 5 is the length of "yroot"

//     // If there's no exponent specified after 'yroot', default it to '1'
//     if (exponentPart === '') {
//       exponentPart = '1';
//     }

//     // Get the part of the string before 'yroot' as the potential base
//     const basePart = input.slice(0, lastYRootIndex).trim();

//     // Match the last number preceding 'yroot' as the base
//     const baseMatch = basePart.match(/(\d+)(?!.*\d)/); // Match the last occurrence of a number

//     // If a number is found, extract it as the base; otherwise, return empty strings
//     if (baseMatch) {
//       const base = baseMatch[1]; // The last number before 'yroot' found as the base

//       // Extract the remaining part of the input expression (excluding the yroot base)
//       const remainingBase = basePart.slice(0, basePart.lastIndexOf(base)).trim();

//       return {
//         base: base,       // Just the last number before 'yroot'
//         exponent: exponentPart,
//         remainingExpression: remainingBase // This part contains the rest of the expression
//       };
//     } else {
//       return {
//         base: '',
//         exponent: exponentPart
//       };
//     }
//   }

//   function extractDetailsLastExpForxPy(input) {
//     // Trim the input to remove any leading or trailing whitespace
//     input = input.trim();

//     // Regex to match the last expression which may include exponentiation
//     const expressionMatch = input.match(/([^\+\-\*\/]+)([\+\-\*\/]?)$/);

//     if (expressionMatch) {
//       const lastExpression = expressionMatch[1].trim(); // This is the part before the last operator
//       const lastOperatorForxPy = expressionMatch[2]; // This is the last operator, could be empty

//       return {
//         lastExpression,
//         lastOperatorForxPy
//       };
//     }

//     // If no match found, return empty strings
//     return {
//       lastExpression: '',
//       lastOperator: ''
//     };
//   }


//   //  ==============BODMAS ==================


//   // function evaluateHighPriorityExpression(input) {
//   //   // Define a regex to match the highest priority operators
//   //   const operatorRegex = /(\*|\/)/g; // Global flag for operators

//   //   // Find the last occurrence of any high-priority operator
//   //   const operators = [...input.matchAll(operatorRegex)];
//   //   if (operators.length === 0) {
//   //       return null; // No high-priority operators found
//   //   }

//   //   // Get the last operator match
//   //   const lastOperatorMatch = operators[operators.length - 1];
//   //   const lastOperatorIndex = lastOperatorMatch.index;

//   //   // Extract the expression before and after the last operator
//   //   const beforeLastOperator = input.slice(0, lastOperatorIndex).trim();
//   //   const afterLastOperator = input.slice(lastOperatorIndex + 1).trim();

//   //   // Use regex to find the last function call (like cos(20)) before the operator
//   //   const lastFunctionRegex = /(\w+\(\d+(\.\d+)?\))/g; // Matches functions like sin(20), cos(20) - with global flag
//   //   const functions = [...beforeLastOperator.matchAll(lastFunctionRegex)];

//   //   const lastFunction = functions.length > 0 ? functions[functions.length - 1][0] : null;
//   //   console.log("Last Function:", lastFunction, "Last Operator:", lastOperatorMatch[0], "After Last Operator:", afterLastOperator);

//   //   // Find the last operator before the highest priority operator
//   //   const precedingOperatorRegex = /(\+|\-)(?=[^*\/]*$)/; // Matches + or - before the last high-priority operator (no global flag needed)
//   //   const precedingOperatorMatch = beforeLastOperator.match(precedingOperatorRegex);
//   //   const precedingOperator = precedingOperatorMatch ? precedingOperatorMatch[0] : null;

//   //   // Find the last number before the highest priority operator
//   //   const lastNumberRegex = /(\d+(\.\d+)?)(?=\s*(\*|\/|\+|\-)?\s*$)/g; // Matches the last number before any operator - with global flag
//   //   const numbers = [...beforeLastOperator.matchAll(lastNumberRegex)];
//   //   const lastNumberFromHPO = numbers.length > 0 ? numbers[numbers.length - 1][0] : null;

//   //   return {
//   //       lastFunction,
//   //       precedingOperator,
//   //       operatorForHPO: lastOperatorMatch[0],
//   //       operand: afterLastOperator,
//   //       lastNumberFromHPO // Add lastNumber to the return object
//   //   };
//   // }

//   // function evaluateHighPriorityExpression(input) {
//   //   // Define a regex to match the highest priority operators (*, /)
//   //   const operatorRegex = /(\*|\/)/g; // Global flag for operators

//   //   // Find the last occurrence of any high-priority operator
//   //   const operators = [...input.matchAll(operatorRegex)];
//   //   if (operators.length === 0) {
//   //     return null; // No high-priority operators found
//   //   }

//   //   // Get the last operator match
//   //   const lastOperatorMatch = operators[operators.length - 1];
//   //   const lastOperatorIndex = lastOperatorMatch.index;

//   //   // Extract the expression before and after the last operator
//   //   const beforeLastOperator = input.slice(0, lastOperatorIndex).trim();
//   //   const afterLastOperator = input.slice(lastOperatorIndex + 1).trim();

//   //   // Find the last function call (like cos(20)) before the operator
//   //   const lastFunctionRegex = /(\d+(\.\d+)?)(?=\s*(\*|\/|\+|\-)?\s*$)/g; // Matches numbers like 28, 3.14, etc.
//   //   const numbers = [...beforeLastOperator.matchAll(lastFunctionRegex)];

//   //   const lastFunction = numbers.length > 0 ? numbers[numbers.length - 1][0] : null;

//   //   // Find the last operator before the highest priority operator
//   //   const precedingOperatorRegex = /(\+|\-)(?=[^*\/]*$)/; // Matches + or - before the last high-priority operator
//   //   const precedingOperatorMatch = beforeLastOperator.match(precedingOperatorRegex);
//   //   const precedingOperator = precedingOperatorMatch ? precedingOperatorMatch[0] : null;

//   //   // The operand is the part after the operator (it could be a trig function or number)
//   //   const operand = afterLastOperator.trim(); // This captures tan(2), cos(5), or any number

//   //   return {
//   //     lastFunction,      // The number before the operator (e.g., 28)
//   //     precedingOperator, // The operator before the last high-priority operator (e.g., +)
//   //     operatorForHPO: lastOperatorMatch[0], // The high-priority operator (* or /)
//   //     operand,           // The operand after the operator (e.g., tan(2), 3, etc.)
//   //   };
//   // }


//   function evaluateHighPriorityExpression(input) {
//     // Define a regex to match the highest priority operators (*, /)
//     const operatorRegex = /(\*|\/)/g; // Global flag for operators

//     // Find the last occurrence of any high-priority operator
//     const operators = [...input.matchAll(operatorRegex)];
//     if (operators.length === 0) {
//       return null; // No high-priority operators found
//     }

//     // Get the last operator match
//     const lastOperatorMatch = operators[operators.length - 1];
//     const lastOperatorIndex = lastOperatorMatch.index;

//     // Extract the expression before and after the last operator
//     const beforeLastOperator = input.slice(0, lastOperatorIndex).trim();
//     const afterLastOperator = input.slice(lastOperatorIndex + 1).trim();

//     // Find the last function call (like cos(20)) or number before the operator
//     const lastFunctionRegex = /(\d+(\.\d+)?|\w+\(\d+(\.\d+)?\))/g; // Matches both numbers and functions (like tan(2))
//     const functionsAndNumbers = [...beforeLastOperator.matchAll(lastFunctionRegex)];

//     const lastFunction = functionsAndNumbers.length > 0 ? functionsAndNumbers[functionsAndNumbers.length - 1][0] : null;

//     // Find the operator before the highest priority operator (e.g., + or -)
//     const precedingOperatorRegex = /(\+|\-)(?=[^*\/]*$)/; // Matches + or - before the last high-priority operator
//     const precedingOperatorMatch = beforeLastOperator.match(precedingOperatorRegex);
//     const precedingOperator = precedingOperatorMatch ? precedingOperatorMatch[0] : null;

//     // The operand is the part after the operator (it could be a trig function or number)
//     const operand = afterLastOperator.trim(); // This captures tan(2), cos(5), or any number

//     return {
//       lastFunction,      // The number or function before the operator (e.g., 28 or tan(2))
//       precedingOperator, // The operator before the last high-priority operator (e.g., +)
//       operatorForHPO: lastOperatorMatch[0], // The high-priority operator (* or /)
//       operand,           // The operand after the operator (e.g., tan(2))
//     };
//   }


//   const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
//   function convertTrigFunctions(expression) {
//     setRFlag(true)
//     if (mode === "Deg") {
//       // Use regex to find and replace sin, cos, tan in degrees
//       return expression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, arg) => {
//         const radians = degreesToRadians(parseFloat(arg)); // Convert to radians
//         return `${func}(${radians})`; // Replace with radians
//       });
//     }
//     return expression; // No conversion needed for radians
//   }

//   useEffect(() => {
//     console.log(resFromBR, "resFromBR")
//   }, [resFromBR])



//   // Effect to monitor input and remove redundant operators at the end
//   useEffect(() => {
//     // Check if the input ends with two operators
//     const operators = ["+", "-", "*", "/", "^"];
//     const lastChar = input.charAt(input.length - 1);
//     const secondLastChar = input.charAt(input.length - 2);
    
//     // If two operators are at the end, remove the last one
//     if (operators.includes(lastChar) && operators.includes(secondLastChar)) {
//       setInput(prevInput => prevInput.slice(0, -1));
//     }
//   }, [input]); //

//   const getPrecedingOperators = (expression, currentOperator) => {
//     // Remove spaces and split by non-numeric characters (operators)
//     const operators = expression.split(/(\+|\-|\*|\/)/).filter(Boolean); 
    
//     let precedingOperators = [];
    
//     for (let i = operators.length - 1; i >= 0; i--) {
//       // If we encounter the current operator
//       if (operators[i] === currentOperator) {
//         if (precedingOperators.length >= 2) {
//           return precedingOperators.slice(0, 2);  // Return the last 2 operators
//         }
//       } else {
//         precedingOperators.push(operators[i]);
//       }
//     }
    
//     return precedingOperators.slice(0, 2);  // Return the last 2 if available
//   };
  
  
//   const handleOperator = (operator) => {
//     if (isError) {
//       return;
//     }
//     if (isOperatorAtEnd(input)) {
//       setInput(input.slice(0, -1) + operator);
//       console.log(`Replaced last operator with: ${operator}`);
//       return;
//     }
//     if (isEqualsToClicked) {
//       setInput(`${result}${operator}`);
//       console.log("entered into isEqualsToClicked and returning")
//       resetEqualsFlag();
//       // important line 
//       setResultForIntermediateCalculations(result)
//       return;
//     }
//     if(isDivPresent){
//       setInput(prev=>`${prev}${operator}`)
//       console.log("div is present in the input");
//       const expressions=extractLastFunctionBeforeOperator(input);;
//       console.log(expressions,"these are the expressions");
//       setIsDivPresent(false)
//       return

//     }
//     const highPriorityOperators = ["^", "*", "/"];
//     // if(operator==='/'){
//     //   console.log("the operator is /");
//     //   setInput(prev=>`${prev}${operator}`)
//     //   return
//     // }
//     //======for two consecutive mul operators======
//     if (isHPO) {
//       const { lastFunction, operatorForHPO, operand, precedingOperator, lastNumberFromHPO } = evaluateHighPriorityExpression(input);
//       console.log("pppprrrrrrreeeeeeeccc", precedingOperator, lastNumberFromHPO)
//       console.log(lastFunction, operatorForHPO, operand, "bbbbbbbbbbbbbbbbbbb")
//       //  1. evaluate the expression  
//       if (lastFunction && operatorForHPO && operand) {
//         let newExp = `${lastFunction}${operatorForHPO}${operand}`;
//         // the evaluation of 3.sin(20) is done here
//         newExp = convertTrigFunctions(newExp);
//         console.log(newExp, "This is what iam evalating in hpo");
//         const newHPOAns = math.evaluate(newExp);
//         console.log(newHPOAns)
//         setResult(newHPOAns)
//         setResFromBR(prev => [...prev, newHPOAns])
//         if (!input.endsWith(operator)) {
//           console.log("Condition passed: Operator will be appended");
//           setInput(prev => {
//             const newInput = `${prev}${operator}`;
//             console.log("input after appending:", newInput);
//             return newInput;
//           });
//         }
//         console.log("Rrrrrrrrrrrrrv", resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           console.log("preceeding operator", precedingOperator)
//           if (precedingOperator !== '*' && precedingOperator !== '/' && precedingOperator !== null) {

//             console.log("There is int ca;l");
//             console.log(input, "this is input")
//             const additionalExp = `${resultForIntermediateCalculations}${precedingOperator}${newHPOAns}`;
//             console.log(additionalExp, "additional exp  ")
//             const ansWithPreceedingOp = math.evaluate(additionalExp)
//             console.log(ansWithPreceedingOp);
//             setResult(ansWithPreceedingOp)
//             setResultForIntermediateCalculations(ansWithPreceedingOp)
//             setIsHPO(false);
//             console.log("returning from resuFromInter")
//             return
//           }
//           else if (precedingOperator === '+' || precedingOperator === '-') {
//             console.log("Handling '+' or '-' with BODMAS precedence");
//             const precedingTwoOp=getPrecedingOperators(input);
//             console.log(precedingTwoOp,"two preceding operators for the bodmas rule");

            
//             setIsHPO(false);
//             return;
//           }
//           else {
//             console.log("can to   if (precedingOperator !== '*' && precedingOperator !== '/') { else block")
//           }
//         }
//         else {
//           console.log("this is the else block");
//           setResultForIntermediateCalculations(newHPOAns);
//           setIsHPO(false);
//           console.log("returning from else block of hpo");
//           return
//         }
//       }
//       else if (operatorForHPO && lastNumberFromHPO) {
//         console.log(lastNumberFromHPO, operatorForHPO, operand);
//         // 2*cos(5)
//         console.log("this is the expression of type where lastNumberFromHPO is present");
//         return;

//       }
//       else {
//         console.log("Unable to evaluate expression: missing components", { lastFunction, operatorForHPO, operand });
//         setIsError(true)
//         setResult("Error")
//         return
//       }
//     }

//     if (highPriorityOperators.includes(operator)) {
//       // If there's already some input (meaning we've already evaluated some part of the expression)
//       // 2 consecutive operators
//       console.log("came into highest priority op function block");
//       if (input && highPriorityOperators.some(op => input.includes(op))) {
//         console.log("Previous operator was high-priority. Evaluating the expression with prevResult operator newOperand.");
//         const { lastFunction, operatorForHPO, operand, precedingOperator, lastNumberFromHPO } = evaluateHighPriorityExpression(input);
//         console.log("Extracted components: ", lastFunction, operatorForHPO, operand, precedingOperator, lastNumberFromHPO);

//         // Rebuild the expression as prevResult operator newOperand
//         if (lastFunction && operatorForHPO && operand) {
//           console.log("if the previous operator is *, it means there was some evaluated ans for sure   ");
//           console.log(resultForIntermediateCalculations, "This is the res for intermediate ans");

//           const toRadians = (deg) => deg * (Math.PI / 180);
//           if (resultForIntermediateCalculations) {
//             let newExpWithInt = `${resultForIntermediateCalculations}${operatorForHPO}${operand}`;
//             console.log(newExpWithInt, "This is the newExp with int");
//             console.log(input, "this is input  ");
//             newExpWithInt = newExpWithInt.replace(/(\d+\.?\d*)\s*(sin|cos|tan)\((\d+\.?\d*)\)/g, (match, num, fn, angle) => {
//               // Convert angle to radians
//               const angleInRadians = toRadians(Number(angle));
//               return `${num}${fn}(${angleInRadians})`; // Replace with radians
//             })
//           }
//           else {
//             let newExp = `${lastFunction}${operatorForHPO}${operand}`;
//             newExp = convertTrigFunctions(newExp);  // Convert trigonometric functions if needed
//             console.log("Evaluating expression: ", newExp);

//             // Evaluate the expression using math library
//             const newHPOAns = math.evaluate(newExp);
//             console.log("Result of HPO evaluation: ", newHPOAns);

//             // Update the result and history
//             setResult(newHPOAns);  // Update result
//             setResFromBR(prev => [...prev, newHPOAns]);  // Store in history
//             setIsHPO(false);  // Reset HPO flag after evaluation
//             return;
//           }

//         }
//       } else {
//         // If no previous high-priority operator exists, just append the operator and continue
//         setIsHPO(true);
//         if (!input.endsWith(operator)) {
//           console.log("Condition passed: Operator will be appended");
//           setInput(prev => {
//             const newInput = `${prev}${operator}`;
//             console.log("input after appending:", newInput);
//             return newInput;
//           });
//         } else {
//           console.log("Condition failed: Operator already present at the end of input.");
//         }

//         return;
//       }
//     }

//     if (operator === '*' && input && !input.endsWith(operator)) {
//       // Perform evaluation on the full expression when `*` is pressed repeatedly
//       let expression = input;
//       // Enure the expression evaluates correctly with the operator and operand chain
//       expression = convertTrigFunctions(expression);  // Convert trig functions like sin(), cos(), etc.
//       const result = math.evaluate(expression);
//       // Update result
//       setResult(result);
//       setResFromBR(prev => [...prev, result]);  // Save to result history
//       // Update the input with the new operator and value
//       console.log("input is", input, "appending operator", operator);
//       if (!input.endsWith(operator)) {
//         console.log("Condition passed: Operator will be appended");
//         setInput(prev => {
//           const newInput = `${prev}${operator}`;
//           console.log("input after appending:", newInput);
//           return newInput;
//         });
//       } else {
//         console.log("Condition failed: Operator already present at the end of input.");
//       }
//       setIsHPO(true);
//       console.log("final statement for hpo");
//       return;
//     }


//     // start from thissss
//     if (isExpBtn) {
//       console.log(isEqualsToClicked, "eeeeeeeeeeeee")
//       console.log("previously exp button was clicked");
//       if (rFlag === false) {
//         const evaluateForExpBtn = math.evaluate(input)
//         setInput(prev => `${prev}${operator}`)
//         console.log("the res for inter mediate var is ", resultForIntermediateCalculations);
//         console.log("Evaluated ans is,", evaluateForExpBtn);
//         setResult(evaluateForExpBtn);
//         setResultForIntermediateCalculations(evaluateForExpBtn)
//         setRFlag(true)
//         setIsExpBtn(false)
//         return;
//       }
//       else {
//         console.log("rflag is true which means there was some already previous expression and result", resultForIntermediateCalculations);
//         setIsExpBtn(false)
//         console.log(input, "this is the input i need to evalute");
//         setInput(prev => `${prev}${operator}`)
//         const opInfo = extractDetails(input)
//         const { lastOperator } = opInfo;
//         const resultFromFunction = extractLastEPlusNumbers(input);
//         console.log(resultFromFunction);
//         const { base, exponent } = resultFromFunction;
//         console.log(base, exponent);
//         const ansToBeEvaluated = `${base}e+${exponent}`;
//         console.log(ansToBeEvaluated, "this is the exp i am evaluating ");
//         const ans = math.evaluate(ansToBeEvaluated);
//         console.log(ans);
//         console.log(resultForIntermediateCalculations);
//         const ansWithprevValue = `${resultForIntermediateCalculations}${lastOperator}${ans}`;
//         const finalAnswer = math.evaluate(ansWithprevValue)
//         console.log(finalAnswer, "finalAnswer");
//         setResult(finalAnswer);
//         setResultForIntermediateCalculations(finalAnswer)
//         return;
//       }

//     }
//     if (isYroot) {
//       console.log(isYroot, "this is the value of isyroot");
//       console.log(isEqualsToClicked, "eeeeeeeeeeeee")
//       console.log("previously y root button was clicked");
//       if (rFlag === false) {
//         // rFlag is false which means the expression do not have the preResult
//         // the exp may be 3yroot2+

//         console.log("the res for inter mediate var is ", resultForIntermediateCalculations);
//         try {
//           // =====custom Evaluation start==========
//           // Use regex to extract values for yroot
//           const yRootMatch = input.match(/(\d+)yroot(\d+)/);
//           console.log("yRootMatch result:", yRootMatch);
//           if (yRootMatch) {
//             const numberValue = parseFloat(yRootMatch[1].trim());
//             const yValue = parseFloat(yRootMatch[2].trim());

//             if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//               console.error("Invalid values for y-root");
//               setResult("Error");
//               return;
//             }
//             // Calculate the y-th root
//             const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//             const finalEvalRes = resultForIntermediateCalculations;
//             console.log(evaluatedYthRoot, "result of y-th root evaluation");
//             // =======custom evaluation end=======
//             setInput(prev => `${prev}${operator}`)
//             const { lastOperator } = extractDetails(input)
//             console.log(lastOperator, "this is the lastoperato");
//             // if there is resultForIntVar is present
//             if (resultForIntermediateCalculations) {
//               // if the last expression includes yrootx then have to perform 
//               console.log("there is some res for int calc");
//               const newExp = `${resultForIntermediateCalculations}${lastOperator}${evaluatedYthRoot}`
//               console.log(`newExp which we are evaluating`, newExp);
//               const ansFromExp = math.evaluate(newExp);
//               console.log(ansFromExp);
//               setResult(ansFromExp)
//               setResultForIntermediateCalculations(ansFromExp)
//               return
//             }
//             // else block
//             // else{
//             // }

//             // setResult(evaluatedYthRoot); 
//             // setRFlag(true);
//             // setResultForIntermediateCalculations(evaluatedYthRoot)
//             // setIsYroot(false)
//             // return;
//           } else {
//             console.error("yroot format not recognized.");
//             setResult("Error: Invalid yroot format");
//             setIsError(true);
//             setIsYroot(false)

//           }
//         } catch (error) {
//           setResult("Error");
//           setIsError(true);
//           setIsYroot(false)
//           console.error("Error evaluating y-th root expression:", error);
//         }
//         // here we need to do it manually 
//         setRFlag(true)
//         setIsYroot(false)
//         return;
//       }
//       // this means there was previously evaluated answer for this
//       // the exp may be "22+sin(20)+3yroot7"
//       else {
//         // rFlag is true, meaning there's a previous expression
//         console.log("rFlag is true which means there was some already previous expression and result", resultForIntermediateCalculations);
//         setIsYroot(false);
//         console.log(input, "this is the input I need to evaluate");
//         setInput(prev => `${prev}${operator}`);
//         // 1. extracting last yrootx's base and exp 
//         // 2. have to find out answer for those base, exp 
//         // 3. then calculate with the resFIVAns+lastOperator+evaluated answer from yrootx
//         // 4.  
//         try {
//           // Extract base and exponent for yroot
//           const resultFromFunction = extractLastYRootNumbers(input);
//           console.log(resultFromFunction, "this is the result for last y root  ");
//           const { base, exponent } = resultFromFunction;
//           console.log(base, exponent);

//           // Validate the base and exponent
//           const numberValue = parseFloat(base);
//           const yValue = parseFloat(exponent);

//           if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//             console.error("Invalid values for y-root in else block");
//             setResult("Error");
//             return;
//           }
//           // Calculate the y-th root
//           const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//           console.log(evaluatedYthRoot, "result of y-th root evaluation for else block");
//           const opInfo = extractDetails(input)
//           const { lastOperator } = opInfo;
//           // Combine the previous result with the new one
//           const ansWithPrevValue = `${resultForIntermediateCalculations}${lastOperator}${evaluatedYthRoot}`;
//           const finalAnswer = math.evaluate(ansWithPrevValue);
//           console.log(finalAnswer, "finalAnswer");
//           // Update state with the final result
//           setResult(finalAnswer);
//           setResultForIntermediateCalculations(finalAnswer);
//           return;
//         } catch (error) {
//           setResult("Error");
//           setIsError(true);
//           console.error("Error evaluating y-th root expression in else block:", error);
//         }
//       }
//     }


//     if (input.includes("ln") && rFlag === false) {
//       console.log("this means ln do not have prev val")
//       console.log("this is the ln vlaue");
//       console.log("resssssss", resultForIntermediateCalculations);
//       const opInfo = extractDetails(input);
//       console.log(opInfo);
//       const { lastNumber, lastOperator, previousExpression } = opInfo;
//       console.log(lastNumber, lastOperator, previousExpression, "lastNumber,lastOperator,previousExpression");

//       if (resultForIntermediateCalculations) {
//         console.log("there is some intermediate value");
//         const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`
//         console.log(newExp, "newExp");
//         const newExpAnswer = math.evaluate(newExp);
//         console.log(newExpAnswer, "neewExpAnswerrrrr ");
//         setResultForIntermediateCalculations(newExpAnswer);
//         setResult(newExpAnswer)
//         setInput(prev => `${prev}${operator}`);
//         setRFlag(true);
//         return;
//       }
//       else {
//         console.log("result nopeeeee");
//       }
//       setInput(prev => `${prev}${operator}`);
//       console.log(isEqualsToClicked, "is equals to clickeed");
//       setResultForIntermediateCalculations(result)
//       setRFlag(true)
//       return;
//     }
//     if (input.includes("cuberoot") && rFlag === false) {
//       const opInfo = extractDetails(input);
//       setRFlag(true)
//       console.log(opInfo);
//       const { lastOperator } = opInfo;
//       console.log("In cuberoot false block");
//       console.log("rrrrrr", resultForIntermediateCalculations);
//       setInput(prev => `${prev}${operator}`)
//       if (resultForIntermediateCalculations) {
//         console.log("In the block of res where resul does esxist");
//         const newExpForCbrt = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newExpForCbrt, "newwwwwwwwwww");
//         const newExpAns = math.evaluate(newExpForCbrt);
//         setResultForIntermediateCalculations(newExpAns);
//         setResult(newExpAns);
//         return
//       }
//       else {
//         console.log("came into else ");
//         setResultForIntermediateCalculations(result)
//         return;
//       }
//       // return
//     }
//     // this is using expression 
//     if (input.includes("reciproc") && rFlag === false) {
//       console.log("rFlag is false");
//       console.log("In sqrt functin of rFlag false", rFlag);
//       setRFlag(true);
//       const opInfo = extractDetails(input);
//       const { lastOperator } = opInfo;
//       setInput(prev => `${prev}${operator}`)
//       console.log("rrrrrrrrrrr", resultForIntermediateCalculations);
//       if (resultForIntermediateCalculations) {
//         console.log("In the block of res where result does exist");
//         const newExpForReciproc = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newExpForReciproc, "newwwwwwwwwww");
//         const newReciprocAns = math.evaluate(newExpForReciproc);
//         setResultForIntermediateCalculations(newReciprocAns);
//         setResult(newReciprocAns);
//         return
//       }
//       else {
//         console.log("came into else ");
//         setResultForIntermediateCalculations(result)
//         return;
//       }

//     }
//     if (input.includes("cube") && rFlag === false) {
//       console.log("cube function and rflag is false");
//       setRFlag(true)
//       // const opInfo=extractDetails(input);
//       // const{lastOperator}=opInfo;
//       console.log(resultForIntermediateCalculations, "rrrrrrrr")
//       if (resultForIntermediateCalculations) {
//         console.log(resultForIntermediateCalculations, "rrrrrr");
//         const newExpForCube = `cc`;
//         // abcd
//         console.log(newExpForCube, "newExpForCube this is the exp to evaluate");
//         const newExpAns = math.evaluate(newExpForCube);
//         console.log(newExpAns);
//         setResult(newExpAns)
//         setInput(prev => `${prev}${operator}`)
//         setResultForIntermediateCalculations(newExpAns);

//         return;
//       }
//       else {
//         console.log("there is no resultForIntermediateCalculations");
//         setInput(prev => `${prev}${operator}`)
//         setResultForIntermediateCalculations(result)
//         return
//       }
//       // return;
//     }
//     if (input.includes("sqrt") && rFlag === false) {
//       console.log("In sqrt functin of rFlag false", rFlag);
//       setRFlag(true);
//       const opInfo = extractDetails(input);
//       const { lastOperator } = opInfo;
//       setInput(prev => `${prev}${operator}`)
//       console.log("rrrrrrrrrrr", resultForIntermediateCalculations);
//       if (resultForIntermediateCalculations) {
//         console.log("In the block of res where result does exist");
//         const newExpForsqrt = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newExpForsqrt, "newwwwwwwwwww");
//         const newSqrtAns = math.evaluate(newExpForsqrt);
//         setResultForIntermediateCalculations(newSqrtAns);
//         setResult(newSqrtAns);
//         return
//       }
//       else {
//         console.log("came into else ");
//         setResultForIntermediateCalculations(result)
//         return;
//       }
//     }

//     //   if(["*", "/", "%"].includes(operator)){
//     //     const lastResult= historyArray.length?historyArray[historyArray.length-1].result:null;
//     //     console.log(lastResult,"lastResult I think this is  gonna work ");
//     //     console.log("higher priority operator is included now i need to use history array");
//     //     // 1. i need to take the prev answer from history array
//     //     // 2. detect the operator before last operand upon clicking "*", "/", "%" 
//     //     // 3. and then evaluate the prevAnswer, operator before last operand, hpv operator, last operand upon clicking any operator next 
//     //     // return;
//     //     const lastOperandMatch =input.match(/(\d+\.?\d*|\.\d+)$/);
//     //     const lastOperand=lastOperandMatch ?lastOperandMatch[0] : null;
//     //     console.log(lastOperand,"we  need to get this for the operand before hpv ")
//     //     if (["*", "/", "%"].includes(operator)) {
//     //       // If there is a last result and a last operand, proceed
//     //       if (lastResult !== null && lastOperand !== null) {
//     //         // Get the last operator from the input
//     //         const operatorMatch = input.match(/[-+*/%]$/); // This will match the last operator
//     //         const lastOperator = operatorMatch ? operatorMatch[0] : null;

//     //         if (lastOperator) {
//     //           // Construct the expression to evaluate
//     //           const expressionToEvaluate = `${lastResult} ${lastOperator} ${lastOperand}`;
//     //           console.log(`Evaluating: ${expressionToEvaluate}`);

//     //           // Use a math library to evaluate the expression
//     //           const intermediateResult = math.evaluate(expressionToEvaluate);
//     //           console.log(`Intermediate result: ${intermediateResult}`);

//     //           // Update state and history
//     //           setResult(intermediateResult); // Update result
//     //           setHistoryArray([...historyArray, { result: intermediateResult, operator }]); // Update history

//     //           // Prepare input for next operation
//     //           setInput(`${intermediateResult} ${operator}`); // Set the next input to the new expression
//     //           return;
//     //         }

//     //       }}
//     //       setInput(prev=>`${prev}${operator}`)
//     // return;
//     //   }
//     // First check if the input ends with an operator using isOperatorAtEnd
//     if (typeof input !== "string") {
//       console.error("Input is not a string:", input);
//       return;
//     }

//     if (isNested) {
//       setInput(result + operator);
//       console.log(result, "this is the result ");
//       setIsNested(false)
//       return;
//     }

//     if (input.includes("log2") && rFlag === false) {
//       console.log("log2 is included in the input");
//       // numberBeforeOp , operator, result
//       //  ihave to setInV to = numberBeforeOp${operator}${result}
//       return;
//     }
//     // for handling islogXy which means logxBasey with rFlag===false
//     if (islogXY && rFlag === false) {
//       console.log("Handling logxBasey");
//       // Call the function to evaluate the log expression
//       const updatedInput = evaluateLogXYExpression(input);
//       if (updatedInput !== null) {
//         // If valid log expression was found, evaluate the entire expression
//         try {
//           const result = math.evaluate(updatedInput);
//           setResult(result);
//           setResultForIntermediateCalculations(result)
//           // setInput(result.toString()+operator);
//           setInput(prev => `${prev}${operator}`)
//         } catch (error) {
//           setResult("Error");
//         }
//       } else {
//         setResult("Error");
//       }
//       setIsLogXY(false);
//       setRFlag(true);
//       return;
//     }

//     //****************************************************************** */
//     //****************************************************************** */


//     // if (input.includes("yroot") && rFlag===false) {
//     //   console.log("Handling y-th root expression in evaluation");
//     //   try {
//     //     const yRootMatch = input.match(/(\d+)yroot(\d+)/);
//     //     if (yRootMatch) {
//     //       const numberValue = parseFloat(yRootMatch[1].trim());
//     //       const yValue = parseFloat(yRootMatch[2].trim());

//     //       if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//     //         console.error("Invalid values for y-root: numberValue =", numberValue, ", yValue =", yValue);
//     //         setResult("Error");
//     //         return;
//     //       }
//     //       console.log(numberValue, "numberValue for evaluation");
//     //       console.log(yValue, "yValue for evaluation");
//     //       const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//     //       console.log(evaluatedYthRoot, "result of y-th root evaluation");
//     //       // Use a variable to hold the last evaluated result
//     //       let finalResult = result !== undefined ? parseFloat(result) : 0; // Ensure it's a number

//     //       switch (operator) {
//     //         case '+':
//     //           finalResult += evaluatedYthRoot;
//     //           break;
//     //         case '-':
//     //           finalResult -= evaluatedYthRoot;
//     //           break;
//     //         case '*':
//     //           finalResult *= evaluatedYthRoot;
//     //           break;
//     //         case '/':
//     //           if (evaluatedYthRoot !== 0) {
//     //             finalResult /= evaluatedYthRoot;
//     //           } else {
//     //             console.error("Division by zero.");
//     //             setResult("Error: Division by zero");
//     //             return;
//     //           }
//     //           break;
//     //         default:
//     //           console.error("Unknown operator:", operator);
//     //           setResult("Error: Unknown operator");
//     //           return;
//     //       }

//     //       console.log(finalResult, "final result after applying operator");

//     //       // Update the result and input
//     //       setInput(prev=>`${prev}${operator}`)
//     //       setResult(finalResult);
//     //      setRFlag(true)
//     //       return;
//     //     } else {
//     //       console.error("yroot format not recognized.");
//     //       setResult("Error: Invalid yroot format");
//     //       setIsError(true);
//     //     }
//     //   } catch (error) {
//     //     setResult("Error"); 
//     //     setIsError(true);
//     //     console.error("Error evaluating y-th root expression:", error);
//     //   }
//     // }

//     // i think this block is not being reached;
//     if (input.includes("yroot") && rFlag === false) {
//       console.log("Handling y-th root expression in evaluation");

//       try {
//         // Use regex to extract values for yroot
//         const yRootMatch = input.match(/(\d+)yroot(\d+)/);
//         console.log("yRootMatch result:", yRootMatch);
//         if (yRootMatch) {
//           const numberValue = parseFloat(yRootMatch[1].trim());
//           const yValue = parseFloat(yRootMatch[2].trim());

//           if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//             console.error("Invalid values for y-root");
//             setResult("Error");
//             return;
//           }

//           // Calculate the y-th root
//           const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//           console.log(evaluatedYthRoot, "result of y-th root evaluation");

//           // // Update the input by appending the operator and the evaluated result
//           // const updatedInput = `${input.replace(/(\d+)yroot(\d+)/, evaluatedYthRoot)}${operator}`;
//           // console.log("Updated input after evaluation and operator:", updatedInput);
//           // 
//           // Set the state with the new input
//           // setInput(updatedInput);
//           setInput(prev => `${prev}${operator}`)
//           setResult(evaluatedYthRoot);
//           setRFlag(true); // Update the flag to indicate a result has been processed
//           return;
//         } else {
//           console.error("yroot format not recognized.");
//           setResult("Error: Invalid yroot format");
//           setIsError(true);
//         }
//       } catch (error) {
//         setResult("Error");
//         setIsError(true);
//         console.error("Error evaluating y-th root expression:", error);
//       }
//     }

//     //****************************************************************** */
//     //****************************************************************** */

//     if (input.includes("^") && rFlag === false) {
//       setInput(prev => `${prev}${operator}`)
//       setRFlag(true)
//       const toExtractLastOpoforxPy = extractDetailsLastExp(input);
//       const { lastOperator } = toExtractLastOpoforxPy;
//       console.log("^ is included in the input");
//       const ansFromXpY = handleInputForXpY(input);
//       const lastOperatorMatch = input.match(/[+\-*/]$/);
//       const lastOperatorForMatch = lastOperatorMatch ? lastOperatorMatch[0] : "";
//       console.log(lastOperatorForMatch, "lastOperatorForMatch");
//       console.log(ansFromXpY);
//       if (resultForIntermediateCalculations) {
//         console.log("there is some intermediate val", resultForIntermediateCalculations);
//         console.log(ansFromXpY, "this is the returned answer from the seperate function of xPy");
//         const newExpToEval = `${resultForIntermediateCalculations}${lastOperator}${ansFromXpY}`;
//         console.log(newExpToEval, "I think this is the new exp to evaluate ");
//         const evaluatedAns = math.evaluate(newExpToEval);
//         console.log(evaluatedAns, "This is the new eval ans");
//         setResult(evaluatedAns);
//         setResultForIntermediateCalculations(evaluatedAns);
//         return;
//       }
//       else {
//         console.log("There is no int val");
//         const evalVal = math.evaluate(input);
//         console.log(evalVal, "this is the evaluated value where there is no input value");
//         setResult(evalVal)
//         setResultForIntermediateCalculations(evalVal);
//       }
//       return;
//     }
//     if (input.includes("^") && rFlag === true) {
//       setInput(prev => `${prev}${operator}`)
//       const { lastExpression, lastOperatorForxPy } = extractDetailsLastExpForxPy(input);
//       console.log(lastExpression, lastOperatorForxPy);
//       const lastExpMatch = lastExpression.match(/(\d+)\^(\d+)$/);
//       const toExtractLastOpoforxPy = extractDetailsLastExp(input);
//       const { lastOperator } = toExtractLastOpoforxPy;
//       if (lastExpMatch) {
//         console.log("last exp is mastcheeeed");
//         console.log("This is the Result ", result);
//         console.log("^ is included in the input last exp and rFlag is true", rFlag);
//         // setRFlag(true)
//         const lastOperatorMatch = input.match(/[+\-*/]$/);
//         const lastOperatorForMatch = lastOperatorMatch ? lastOperatorMatch[0] : "";
//         console.log(lastOperatorForMatch, "lastOperatorForMatch");
//         console.log("^ is included in the input");
//         const ansFromXpY = handleInputForXpY(input);
//         console.log(ansFromXpY);
//         if (resultForIntermediateCalculations) {
//           console.log("there is some intermediate val", resultForIntermediateCalculations);
//           console.log(ansFromXpY, "this is the returned answer from the seperate function of xPy");
//           const newExpToEval = `${resultForIntermediateCalculations}${lastOperator}${ansFromXpY}`;
//           console.log(newExpToEval, "I think this is the new exp to evaluate ");
//           const evaluatedAns = math.evaluate(newExpToEval);
//           console.log(evaluatedAns, "This is the new eval ans ");
//           setResult(evaluatedAns);
//           setResultForIntermediateCalculations(evaluatedAns);
//           return;
//         }
//         else {
//           console.log("There is no int val");
//           setResultForIntermediateCalculations(result);
//         }

//         return
//       }
//       else {
//         console.log("there is no exp mathc ");
//         console.log("in the last expression there is no ^ is present")
//         // the exp is like: 2^6+5+
//         console.log("last lastExpression", lastExpression, "lastOperatorForxPy", lastOperatorForxPy);
//         const newExpForCap = `${resultForIntermediateCalculations}${lastOperator}${lastExpression}`;
//         console.log(newExpForCap, "this is the exp we are evaluating");
//         const finalAns = math.evaluate(newExpForCap);
//         console.log(finalAns, "this is the final answer");
//         setResult(finalAns);
//         setResultForIntermediateCalculations(finalAns);
//       }

//       return;
//     }


//     if (input.includes("logXbase2") && rFlag === false) {
//       console.log("logXbase2 is included")
//       console.log("Rrrrrrrr", resultForIntermediateCalculations);
//       setInput(prev => `${prev}${operator}`)
//       setRFlag(true)
//       const toExtractLastOpofl2 = extractDetailsLastExp(input);
//       const { lastOperator } = toExtractLastOpofl2;
//       if (resultForIntermediateCalculations) {
//         console.log("There is some intermediate calculation and entered into this block");
//         const newExpl2 = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newExpl2);
//         const finalExpl2Ans = math.evaluate(newExpl2);
//         console.log(finalExpl2Ans);
//         setResult(finalExpl2Ans)
//         setResultForIntermediateCalculations(finalExpl2Ans)
//       }
//       else {
//         console.log("There is no intermediate ans found");
//         setResultForIntermediateCalculations(result)

//       }

//       return;
//     }

//     const inputStr = String(input || "")
//     // ***************************************Arc HyperBolic functions***************************************************
//     if ((inputStr.includes("asinh") || inputStr.includes("acosh") || inputStr.includes("atanh")) && rFlag === false) {
//       console.log("in arc sinh function and rflag is false");
//       // handleHyperbolicFunction(inputStr, operator, "asinh");
//       console.log("Processing arc sinh value");
//       setInput(prev => `${prev}${operator}`);
//       console.log(inputStr, mode, "These are inputStr,mode");
//       if (resultForIntermediateCalculations) {
//         console.log("this is asin funciton case has resultForIntermediateCalculations");
//         const toExtractLastOp = extractDetailsLastExp(inputStr);
//         const { lastOperator } = toExtractLastOp;
//         console.log(lastOperator, "last operator from the toExtractLastop")
//         const intermediateExpression = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(intermediateExpression, "intermediateExpression");
//         const resultOfIE = math.evaluate(intermediateExpression);
//         console.log(resultOfIE);
//         setResult(resultOfIE);
//         setResultForIntermediateCalculations(resultOfIE)
//         setRFlag(true)
//         return;
//       }
//       else {
//         console.log("Came into asin function else resultForIntermediateCalculations block");
//         setResultForIntermediateCalculations(result)
//         setRFlag(true)
//         return;
//       }
//     }


//     // ***************************************End of Arc HyperBolic functions****************************************************

//     // ********************************HyperbolicFunctions***********************************


//     if ((inputStr.includes("sinh") || inputStr.includes("cosh") || inputStr.includes("tanh")) && rFlag === false) {
//       console.log("in sinh handleOperator function")
//       // handleHyperbolicFunction(inputStr, operator, "sinh");
//       console.log("Processing sin hyperbolic function in handle operator ");
//       setInput(prev => `${prev}${operator}`);
//       console.log(input, mode, "these are inputStr,mode");
//       console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//       if (resultForIntermediateCalculations) {
//         console.log("there is some resultForIntermediateCalculations and it is ", resultForIntermediateCalculations);
//         const toExtractLastOpofHy = extractDetailsLastExp(inputStr);
//         const { lastOperator } = toExtractLastOpofHy;
//         console.log(lastOperator, "This is the lastOperator");
//         const intermediateExpForHy = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(intermediateExpForHy, "intermediateExpForHy");
//         const resultOfHy = math.evaluate(intermediateExpForHy);
//         console.log(resultOfHy);
//         setResult(resultOfHy);
//         setResultForIntermediateCalculations(resultOfHy);
//         setRFlag(true);
//         return;
//       }
//       else {
//         console.log("Ther is no resultForIntermediateCalculations", resultForIntermediateCalculations)
//         // setResult(`${result}`)
//         setResultForIntermediateCalculations(result);
//         setRFlag(true)
//         return;
//       }
//     }

//     // *******************************Trignometric functions************************************
//     // asdf asin fun 
//     if ((inputStr.includes("asin") || inputStr.includes("acos") || inputStr.includes("atan")) && rFlag === false) {
//       console.log("Processing arcsine function in handle operator ");
//       // handleArcTrigFunctionForOperator(inputStr, mode, "asin");
//       // setInput(prev=>prev+operator);
//       setInput(prev => `${prev}${operator}`)
//       console.log(inputStr, mode, "These are inputStr,mode");
//       console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//       if (resultForIntermediateCalculations) {
//         console.log("this asin function case has rresultForIntermediateCalculations");
//         const toExtractLastOp = extractDetailsLastExp(inputStr)
//         const { lastOperator } = toExtractLastOp;
//         console.log(lastOperator, "last operator from the toExtractLastop")
//         const intermediateExpression = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(intermediateExpression, "intermediateExpression");
//         const resultOfIE = math.evaluate(intermediateExpression);
//         console.log(resultOfIE);
//         setResult(resultOfIE);
//         setResultForIntermediateCalculations(resultOfIE)
//         setRFlag(true)
//         return;
//       }
//       else {
//         console.log("Came into asin function else resultForIntermediateCalculations block");
//         setResultForIntermediateCalculations(result)
//         setRFlag(true)
//         return;
//       }
//     }
//     else {
//       console.log("came into rflag===false block");
//     }
//     if (inputStr.includes("factorial") && rFlag === false) {
//       console.log("In handle operator of factorial function and rFlag is fasle ")
//       setRFlag(true)
//       setInput(prev => `${prev}${operator}`)
//       console.log("setResultForIntermediateCalculations", resultForIntermediateCalculations);
//       if (resultForIntermediateCalculations > 0) {
//         console.log("there is some resultForIntermediateCalculations");
//         const toExtractLastOpOfFact = extractDetailsLastExp(inputStr);
//         console.log(toExtractLastOpOfFact, "toExtractLastOpOfFact");
//         const { lastOperator } = toExtractLastOpOfFact;
//         const intermediateExpForFact = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log("intermediateExpForFact", intermediateExpForFact);
//         const resultofIE = math.evaluate(intermediateExpForFact);
//         console.log(resultofIE, "resultofIE");
//         setResult(resultofIE);
//         setResultForIntermediateCalculations(resultofIE);
//         setRFlag(true);
//         return
//       }
//       else {
//         console.log("Came to factorial else resultforInECal");
//         setResultForIntermediateCalculations(result);
//         setRFlag(true)
//         return
//       }

//     }
//     // asdf
//     // case-1 rFlag is true means it has already evaluated
//     // asdf
//     if (rFlag === true && operator!=='/') {
//       console.log("r flag is included here");
//       console.log("returning from flag included one");
//       console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//       //imp asdf for operator extraction if the rflag is true;
//       const lastOpInfo = extractDetailsLastExp(input);
//       console.log("globally set kar diya");
//       console.log(lastOpInfo, "this is last operastor information");
//       const { previousExpression, lastOperator, lastExpression } = lastOpInfo;
//       console.log(previousExpression, lastOperator, lastExpression);
//       console.log(input, "this i sth e input for the evaluation of fact lets see");
//       // if last expression includes sin, i need to make the intermediate exp to 
//       // case-1.1 if factorial is included 
//       if (lastExpression.includes("factorial")) {
//         console.log("resultForIntermediateCalculations", resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           // the expression was may be sin(3)+ fact(3) or 2+fact(4)
//           console.log("the expression was may be sin(3)+or 2+fact(4)");
//           const interMediateExpForFact = `${resultForIntermediateCalculations}${lastOperator}${result}`
//           console.log(interMediateExpForFact, "interMediateExpForFact");
//           const factFinalResult = math.evaluate(interMediateExpForFact)
//           setResultForIntermediateCalculations(factFinalResult)
//           setResult(factFinalResult);
//           setInput(prev => `${prev}${operator}`)
//           const newResult = factFinalResult; // Store the new result in a variable
//           setResultForIntermediateCalculations(newResult);
//           setResult(newResult);
//           return
//           // setResultForIntermediateCalculations(factFinalResult);
//         }
//         else {
//           console.log("The epxression may be factorial(3)+ something");
//           setInput(prev => `${prev}${operator}`);
//           console.log("This is what we are setting to setResultForIntermediateCalculations", result);
//           console.log("this is resultForIntermediateCalculations", resultForIntermediateCalculations)
//           const interMediateExpForFact = `${resultForIntermediateCalculations}${lastOperator}${result}`
//           console.log(interMediateExpForFact, "interMediateExpForFact");
//           const factFinalResult = math.evaluate(interMediateExpForFact)
//           setResult(factFinalResult);
//           setResultForIntermediateCalculations(factFinalResult);
//         }
//       }
//       // if(lastExpression.includes("yroot")){
//       //   console.log("we are in yroot block");
//       //   return;
//       // }
//       if (lastExpression.includes("reciproc")) {
//         console.log("in reciproc function");
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in cal", resultForIntermediateCalculations);
//           console.log("rresssss", resultForIntermediateCalculations);
//           setInput(prev => `${prev}${operator}`);
//           if (resultForIntermediateCalculations) {
//             console.log("in res for in block", resultForIntermediateCalculations);
//             const newExpForReciproc = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//             const newReciprocRes = math.evaluate(newExpForReciproc);
//             console.log(newReciprocRes);
//             setResult(newReciprocRes);
//             setResultForIntermediateCalculations(newReciprocRes);
//             return
//           }
//         }
//         else {
//           console.log("this is the else statement");
//         }
//         return;
//       }
//       if (lastExpression.includes("powTen")) {
//         console.log("in powTen function");
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in cal", resultForIntermediateCalculations);
//           console.log("rresssss", resultForIntermediateCalculations);
//           setInput(prev => `${prev}${operator}`);
//           if (resultForIntermediateCalculations) {
//             console.log("in res for in block", resultForIntermediateCalculations);
//             const newExpForpowten = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//             const newPowTenRes = math.evaluate(newExpForpowten);
//             console.log(newPowTenRes);
//             setResult(newPowTenRes);
//             setResultForIntermediateCalculations(newPowTenRes);
//             return
//           }
//         }
//         else {
//           console.log("this is the else statement");

//         }
//         return;
//       }
//       if (lastExpression.includes("powe")) {
//         console.log("powe function is included");
//         setInput(prev => `${prev}${operator}`)
//         console.log("rrressssssssssssssssssssssss", resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           console.log("there is some intermediate result value")
//           const intExp = `${resultForIntermediateCalculations}${lastOperator}${result}`
//           console.log(intExp, "to be evaluated ");
//           const answerForIE = math.evaluate(intExp);
//           console.log(answerForIE);
//           setResult(answerForIE)
//           setResultForIntermediateCalculations(answerForIE);
//           // setInput(prev=>`${prev}${operator}`)
//           return
//         } else {
//           console.log("ther is no inter result value");
//           console.log(resultForIntermediateCalculations, "rrrrr");
//           return
//         }
//       }
//       if (lastExpression.includes("cuberoot")) {
//         console.log("cuberoot is included");
//         setInput(prev => `${prev}${operator}`);
//         if (resultForIntermediateCalculations) {
//           console.log('there is ssome resfintcalc');
//           const newCbrtExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newCbrtExp);
//           const newCbrtAns = math.evaluate(newCbrtExp);
//           console.log(newCbrtAns);
//           setResult(newCbrtAns);
//           setResultForIntermediateCalculations(newCbrtAns);
//           return
//         }
//         else {
//           console.log("there is no res for int cal");
//         }

//         return
//       }
//       if (lastExpression.includes("cube")) {
//         console.log("cube is included and rFlag is true");
//         if (resultForIntermediateCalculations) {
//           console.log("in block where there is res for int calc");
//           console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations")
//           const newCubeExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newCubeExp, "Evaluating ");
//           const ansForNewExp = math.evaluate(newCubeExp);
//           setInput(prev => `${prev}${operator}`)
//           console.log(ansForNewExp);
//           setResult(ansForNewExp);
//           setResultForIntermediateCalculations(ansForNewExp);
//           return;
//         }
//         else {
//           console.log("there is no ressssult for int cal");

//         }
//         return
//       }
//       if (lastExpression.includes("sqrt")) {
//         console.log("enterd into sqrttt function");
//         console.log("rresssss", resultForIntermediateCalculations);
//         setInput(prev => `${prev}${operator}`);
//         // it means the exp may be sin(2)+sqr(4)
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in block", resultForIntermediateCalculations);
//           const newExpForSqr = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExpForSqr, "New exp for sqr");
//           const newSqrRes = math.evaluate(newExpForSqr);
//           console.log(newSqrRes);
//           setResult(newSqrRes);
//           setResultForIntermediateCalculations(newSqrRes);
//           return
//         }
//         // it means the exp may be sqr(4)
//         else {
//           console.log("in the else of resfor in block");
//         }
//         return;
//       }
//       if (lastExpression.includes("sqr")) {
//         console.log("enterd into sqr function");
//         console.log("rresssss", resultForIntermediateCalculations);
//         setInput(prev => `${prev}${operator}`);
//         // it means the exp may be sin(2)+sqr(4)
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in block", resultForIntermediateCalculations);
//           const newExpForSqr = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExpForSqr, "New exp for sqr");
//           const newSqrRes = math.evaluate(newExpForSqr);
//           console.log(newSqrRes);
//           setResult(newSqrRes);
//           setResultForIntermediateCalculations(newSqrRes);
//           return
//         }
//         // it means the exp may be sqr(4)
//         else {
//           console.log("in the else of resfor in block");
//         }
//         return;
//       }
//       if (lastExpression.includes("reciproc")) {
//         console.log("enterd into sqr function");
//         console.log("rresssss", resultForIntermediateCalculations);
//         setInput(prev => `${prev}${operator}`);
//         // it means the exp may be sin(2)+sqr(4)
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in block", resultForIntermediateCalculations);
//           const newExpForSqr = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExpForSqr, "New exp for sqr");
//           const newSqrRes = math.evaluate(newExpForSqr);
//           console.log(newSqrRes);
//           setResult(newSqrRes);
//           setResultForIntermediateCalculations(newSqrRes);
//           return
//         }
//         // it means the exp may be sqr(4)
//         else {
//           console.log("in the else of resfor in block");
//         }
//         return;
//       }
//       else if (lastExpression.includes("logxBasey")) {
//         const lxByOpDetails = extractLastExpDetailsForLogxbasey(inputStr)
//         const { previousExpressionForLxBy, lastOperatorForLxBy, lastExpressionForLxBy } = lxByOpDetails;
//         console.log(previousExpressionForLxBy, lastOperatorForLxBy, lastExpressionForLxBy, "previousExpressionForLxBy,lastOperatorForLxBy,lastExpressionForLxBy");
//         console.log("This expression includes logXBaseY");
//         console.log(lastExpressionForLxBy, "lastExpression we are sending for the evaluateLogxy exp")
//         const extractForLogxBasey = evaluateLogXYExpression(lastExpressionForLxBy);
//         console.log(extractForLogxBasey, "extractForLogxBasey answer");
//         console.log(`${resultForIntermediateCalculations}${lastOperator}${extractForLogxBasey}`)
//         const expForIntCalcOfLogxBasey = `${resultForIntermediateCalculations}${lastOperator}${extractForLogxBasey}`;
//         const answerForLogxBasey = math.evaluate(expForIntCalcOfLogxBasey);
//         console.log(answerForLogxBasey, "answerForLogxBasey");
//         setInput(prev => `${prev}${operator}`)
//         console.log("resultFrom Int value", resultForIntermediateCalculations);
//         setResult(answerForLogxBasey);
//         setResultForIntermediateCalculations(answerForLogxBasey);
//         setIsLogXY(false)
//         return;
//       }
//       if (lastExpression.includes("logXbase2")) {
//         console.log("logXbase2 expression is included and rFlag is", rFlag);
//         setInput(prev => `${prev}${operator}`);
//         if (resultForIntermediateCalculations) {
//           console.log("in res for in blck", resultForIntermediateCalculations);
//           const newExpForLxB2 = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const newAnsForLxB2 = math.evaluate(newExpForLxB2);
//           console.log(newAnsForLxB2);
//           setResult(newAnsForLxB2);
//           setResultForIntermediateCalculations(newAnsForLxB2)
//           return
//         }
//         else {
//           console.log("there ")
//           return
//         }
//       }
//       if (lastExpression.includes("log")) {
//         console.log("In last expression, log is involved");
//         setInput(prev => `${prev}${operator}`)
//         if (resultForIntermediateCalculations) {
//           console.log(resultForIntermediateCalculations);
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log("newexo", newExp);
//           const newResAns = math.evaluate(newExp);
//           console.log(newResAns);
//           setResult(newResAns);
//           setResultForIntermediateCalculations(newResAns)
//           return;
//         }
//         else {
//           console.log("else block of resultForInt mediate ans")
//         }
//         return;
//       }

//       // case-1.2 means it is already evaluated and it contains trig functions such as 25+sin(3)+3+....+sin(4)
//       if (/^(sin|cos|tan)/.test(lastExpression) && isDivPresent===false) {
//         // asin can be added here as intermediate will have some value
//         console.log("in last epxression sin is included");
//         setInput(prev => `${prev}${operator}`)
//         setPrevExpV(`${resultForIntermediateCalculations}${lastOperator}${result}`)
//         console.log(`${resultForIntermediateCalculations}${lastOperator}${result}`);
//         const middleExp = `${resultForIntermediateCalculations}${lastOperator}${result}`
//         const middleExpEval = math.evaluate(middleExp);
//         console.log(middleExpEval);
//         setResult(middleExpEval);
//         setResultForIntermediateCalculations(middleExpEval)
//         console.log("Setting middle expression result to the answer for future evaluation");
//         return;
//       }
//       // i think this block is not executed becuase sinh is being captured at starting block
//       else if (/^(sinh|cosh|tanh)/.test(lastExpression)) {
//         console.log("in this block sinh is included");
//         return
//       }
//       //  else if(lastExpression.includes("logxBasey")){
//       //   const lxByOpDetails=extractLastExpDetailsForLogxbasey(inputStr)
//       //   const{previousExpressionForLxBy,lastOperatorForLxBy,lastExpressionForLxBy}=lxByOpDetails;
//       //   console.log(previousExpressionForLxBy,lastOperatorForLxBy,lastExpressionForLxBy,"previousExpressionForLxBy,lastOperatorForLxBy,lastExpressionForLxBy");
//       //   console.log("This expression includes logXBaseY");
//       //   console.log(lastExpressionForLxBy,"lastExpression we are sending for the evaluateLogxy exp")
//       //   const extractForLogxBasey=evaluateLogXYExpression(lastExpressionForLxBy);

//       //   console.log(extractForLogxBasey,"extractForLogxBasey answer");
//       //   console.log(`${resultForIntermediateCalculations}${lastOperator}${extractForLogxBasey}`)
//       //   const expForIntCalcOfLogxBasey=`${resultForIntermediateCalculations}${lastOperator}${extractForLogxBasey}`;
//       //   const answerForLogxBasey=math.evaluate(expForIntCalcOfLogxBasey);
//       //   console.log(answerForLogxBasey,"answerForLogxBasey");
//       //   setInput(prev=>`${prev}${operator}`)
//       //   console.log("resultFrom Int value", resultForIntermediateCalculations);
//       //   setResult(answerForLogxBasey);
//       //   setResultForIntermediateCalculations(answerForLogxBasey);
//       //   setIsLogXY(false)
//       //   return;
//       //  }
//       // case 1.3- the expression is, 25+sin(41)+.....+3(digit at last)
//       else {
//         if (lastExpression.includes("factorial")) {
//           setResultForIntermediateCalculations(result);
//           setInput(prev => `${prev}${operator}`)
//           console.log("factorial", input)
//           return;
//         }
//         // else if(lastExpression.includes("e+")){
//         //   console.log("came into e+ expression");
//         // }
//         else if (lastExpression.includes("ln")) {
//           console.log("ln is the last expression");
//           setInput(prev => `${prev}${operator}`);
//           console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//           const lnToBeEvaluated = `${resultForIntermediateCalculations}${lastOperator}${result}`
//           console.log(lnToBeEvaluated, "lnToBeEvaluated");
//           const evaluatedAns = math.evaluate(lnToBeEvaluated);
//           console.log(evaluatedAns, "evaluatedAns");
//           setResultForIntermediateCalculations(evaluatedAns)
//           setResult(evaluatedAns)
//           return;
//         }
//         else{
//           console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//           const justNumberEvaluation = `${resultForIntermediateCalculations}${lastOperator}${lastExpression}`;
//           console.log(justNumberEvaluation, "justNumberEvaluation");
//           setInput(prev => `${prev}${operator}`)
//           const numberEvalResult = math.evaluate(justNumberEvaluation)
//           setResult(numberEvalResult);
//           setResultForIntermediateCalculations(numberEvalResult);
//         }
       
//       }

//       return;
//     }
//     // case-2 rFlag is false and input contains trig functions it means the exp is sin(23)+

//     if ((inputStr.includes("sin") || inputStr.includes("cos") || inputStr.includes("tan"))
//       && rFlag === false
//     ) {
//       const toExtractLastOp = extractDetailsLastExp(inputStr);
//       const { lastOperator } = toExtractLastOp;
//       // if it has the expression exactly  25+sin(3)
//       if (resultForIntermediateCalculations > 0) {
//         console.log("there is some intermediate value in sin includes function  ");
//         // i need to findout last operator and then evaluate it 
//         console.log(toExtractLastOp);
//         const iExpToEvaluate = `${resultForIntermediateCalculations} ${lastOperator} ${result}`;
//         console.log(iExpToEvaluate, "this is the expression i am evaluating")
//         const resultIExp = math.evaluate(iExpToEvaluate);
//         console.log(resultIExp);
//         setResult(resultIExp)
//         // setInput(prev=>prev+operator)
//         setInput(`${input}${operator}`)
//         setResultForIntermediateCalculations(resultIExp)
//         setRFlag(true)
//         return;
//       }
//       //  if the expression exactly sin(32)+34  or sin(2)*2
//       else {
//         console.log("came into sin cos, tan included function")
//         console.log("after adding operator", resultForIntermediateCalculations)
//         setInput(prev => `${prev}${operator}`);

//         setResultForIntermediateCalculations(result)
//         setRFlag(true)
//         return;
//       }
//     }


//     // ***************************End of Trignometric functions**********************************************

//     if (inputStr.includes("ln") && rFlag === false) {
//       console.log("Yes this expression included ln herrreeeeeee");
//       console.log(inputStr, "this is the input strig");
//       setInput(`${result}${operator}`);
//       try {
//         // Use regex to find the ln(...) pattern
//         const lnMatch = inputStr.match(/ln\(([^)]+)\)/);
//         if (lnMatch) {
//           const lnValue = lnMatch[1];
//           console.log(lnValue, "lnValue");
//           const evaluatedLn = Math.log(lnValue);
//           const newInput = inputStr.replace(lnMatch[0], evaluatedLn);
//           const evaluatedResult = math.evaluate(newInput);
//           setInput(evaluatedResult.toString() + operator);
//           setResult(evaluatedResult);
//           console.log(result, "result is being set");
//         }
//       } catch (error) {
//         setResult("Error");
//         console.error("Error evaluating ln expression:", error);
//       }
//       return;
//     }
//     if (inputStr.includes("log") && rFlag === false) {
//       console.log("Yes this expression included logg in the input");
//       console.log(inputStr, "this is the input strig");
//       // setInput(`${result}${operator}`);
//       setInput(prev => `${prev}${operator}`)
//       const logOpInfo = extractDetails(input)
//       const { lastOperator } = logOpInfo;
//       if (resultForIntermediateCalculations) {
//         console.log("in result block");
//         const newLogExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newLogExp);
//         const newLogExpAns = math.evaluate(newLogExp);
//         console.log(newLogExpAns);
//         setResult(newLogExpAns);
//         setResultForIntermediateCalculations(newLogExpAns);
//         setRFlag(true)
//         return;
//       }
//       else {
//         console.log("in else block");
//         console.log("there is no intRV");
//         console.log("rrrr", resultForIntermediateCalculations);
//         setResultForIntermediateCalculations(result)
//         setRFlag(true)
//         return
//       }
//       // try {
//       //   // Use regex to find the ln(...) pattern
//       //   const lnMatch = inputStr.match(/log\(([^)]+)\)/);
//       //   if (lnMatch) {
//       //     const lnValue = lnMatch[1];
//       //     console.log(lnValue, "lnValue");
//       //     const evaluatedLn = Math.log10(lnValue);
//       //     const newInput = inputStr.replace(lnMatch[0], evaluatedLn);
//       //     const evaluatedResult = math.evaluate(newInput);
//       //     setInput(evaluatedResult.toString() + operator);
//       //     setResult(evaluatedResult);
//       //     console.log(result, "result is being set");
//       //   }
//       // } catch (error) {
//       //   setResult("Error");
//       //   console.error("Error evaluating ln expression:", error);
//       // }

//       // return;
//     }
//     if (inputStr.includes("powe") && rFlag === false) {
//       console.log("powe is included");
//       console.log("rflag isssss:", rFlag)
//       console.log(resultForIntermediateCalculations, "ressssssssss");

//       const poweMatch = inputStr.match(/powe\(([^)]+)\)/);
//       console.log(poweMatch, "This is the powerMatch");
//       if (poweMatch) {
//         const lnValue = poweMatch[1];
//         console.log(lnValue, "lnValue");
//         const evaluatedLn = Math.exp(lnValue);
//         const newInput = inputStr.replace(poweMatch[0], evaluatedLn);
//         const evaluatedResult = math.evaluate(newInput);
//         // setInput(evaluatedResult.toString()+operator);
//         setInput(prev => `${prev}${operator}`);
//         setResult(evaluatedResult);
//         console.log(result, "result is being set");
//         setResultForIntermediateCalculations(evaluatedResult)
//         setRFlag(true)
//         return;
//       }
//       // setInput(result);
//     }
//     if (inputStr.includes("powTen") && rFlag === false) {
//       setInput(prev => `${prev}${operator}`)
//       setRFlag(true)
//       console.log("powTen included in inputString in handleOperator function");
//       if (input.includes("ln")) {
//         console.log(input, "this is the input");
//         console.log("ln is included in the input vvvvvvvvvvvvvvv");
//       }
//       try {
//         const poweMatch = inputStr.match(/powTen\(([^)]+)\)/);
//         if (poweMatch) {
//           const poweValue = poweMatch[1];
//           console.log(poweValue, "poweValue for evaluation");
//           const evaluatedLn = Math.pow(10, poweValue);
//           const newInput = input.replace(poweMatch[0], evaluatedLn);
//           const evaluatedResult = math.evaluate(newInput);
//           setResult(evaluatedResult);
//           console.log(evaluatedResult, "result of ln evaluation");
//           setResultForIntermediateCalculations(evaluatedResult)
//           return;
//         }
//       } catch (error) {
//         setResult("Error");
//         console.error("Error evaluating ln expression:", error);
//         return;
//       }
//     }
//     if (inputStr.includes("sqr") && rFlag === false) {
//       console.log("SQR included", rFlag, "rflag value  ");
//       const sqrOpInfo = extractDetails(input)
//       console.log(sqrOpInfo);
//       const { lastOperator } = sqrOpInfo
//       setInput(prev => `${prev}${operator}`)
//       console.log("rrrrrrrrr", resultForIntermediateCalculations);
//       if (resultForIntermediateCalculations) {
//         console.log(resultForIntermediateCalculations, " inside of resultFINV block");
//         const newSqrExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newSqrExp, "newSqrExp");
//         const ansForExp = math.evaluate(newSqrExp);
//         console.log(ansForExp, "ansForExp");
//         setResult(ansForExp);;
//         setResultForIntermediateCalculations(ansForExp);
//         setRFlag(true)
//         return
//       }
//       else {
//         console.log("there is no intRV");
//         console.log("rrrr", resultForIntermediateCalculations);
//         setResultForIntermediateCalculations(result)
//         setRFlag(true)

//       }
//       return;
//     }


//     if (input.includes("mod")) {
//       console.log("input includes mod");
//       console.log(isMod, "the value of isMod");
//       try {
//         const preprocessedInput = input
//           .replace(/mod/g, "%")
//           .replace(/(\d+)%(\d+)/g, "$1 % $2");
//         // Log the preprocessed input for debugging
//         console.log("Preprocessed Input:", preprocessedInput);
//         // Evaluate the modified expression
//         const evalResult = math.evaluate(preprocessedInput);
//         setResult(evalResult);
//         setInput(evalResult.toString() + operator);
//       } catch (error) {
//         setResult("Error");
//         console.error("Error evaluating input:", error);
//         return;
//       }
//     }
//     else if (input && operator!=='/') {
//       console.log(input, "this is the input that is being evaluated in if(input) block ");
//       console.log(input, "This is the inputttt")
//       const evaluatedResult = math.evaluate(input);
//       console.log(input,"this is the input we are evaluating");
//       console.log("Entered into input else statement");
//       setHistoryArray(prev => [...prev, { result: evaluatedResult, operator }])
//       if (!input.endsWith(operator)) {
//         setInput(prev => `${prev}${operator}`)
//       }

//       setResult(evaluatedResult);
//       setResultForIntermediateCalculations(evaluatedResult)
//       return;
//     }
//     // ragi
//     else if(input &&operator==='/'){
//       console.log("entered into input &&operator==='/' ")
//       console.log("in this result fro intermediate val is ",resultForIntermediateCalculations);
//       setInput(prev=>`${prev}${operator}`);
     
//       setIsDivPresent(true);
      
//     }
  
    
//     else {
//       if (!input.endsWith(operator)) {
//         setInput(prev => `${prev}${operator}`)
//       }
//       console.log("Entered into completee else block")
//     }

//   };

//   const [operatorStack, setOperatorStack] = useState([]);
//   const [prevExpV, setPrevExpV] = useState("");
//   const [prevResultV, setPrevResultV] = useState(null)
//   useEffect(() => {
//     console.log(prevExpV, prevResultV, "prevResultV   prevExpV      prevExpV");
//   }, [prevExpV, prevResultV])
//   useEffect(() => {
//     console.log("History array is ", historyArray);
//   }, [historyArray])


//   function extractUpToPrecedingOperator(expression) {
//     // Regular expression to capture the portion of the expression up to the '/' operator
//     // This regex will match any number before the '/' and include the function call (like sin, cos)
//     const regex = /([^/]+(?=\/))/g; 
    
//     // Use the regex to extract the parts before each '/'
//     const matches = [...expression.matchAll(regex)];
  
//     return matches.map(match => match[0]);
//   }
// c

//   const evaluateStack = () => {
//     if (operatorStack.length >= 3) {
//       const firstValue = operatorStack[operatorStack.length - 3]; // 1st number
//       const operator = operatorStack[operatorStack.length - 2];   // Operator
//       const secondValue = operatorStack[operatorStack.length - 1]; // 2nd number

//       // Evaluate the expression using math.js
//       const expression = `${firstValue} ${operator} ${secondValue}`;
//       const evaluatedResult = math.evaluate(expression);

//       // Update the operator stack by replacing the last three elements with the result
//       setOperatorStack((prevStack) => [
//         ...prevStack.slice(0, prevStack.length - 3), // Remove the last three
//         evaluatedResult, // Push the result
//       ]);

//       // Update the result state
//       setResult(evaluatedResult);
//     }
//   };


//   useEffect(() => {
//     console.log("operator stack in useeffect", operatorStack);
//   }, [operatorStack])

//   useEffect(() => {
//     console.log(isEqualsToClicked)
//   }, [isEqualsToClicked])

//   const resetEqualsFlag = () => {
//     setIsEqualsToClicked(false);
//   };

//   const handleEvaluate = () => {
//     if (isError) {
//       return;
//     }
//     if ((resultForIntermediateCalculations === "Math Error") || (resultForIntermediateCalculations === "NaN") || (resultForIntermediateCalculations === "Error")) {
//       return;
//     }
//     const isOpAtEndAtHE = isOperatorAtEnd(input)
//     if (isOpAtEndAtHE) {
//       console.log("yes there is an operator at the end");
//       console.log("returning from is OperatorAtEnd");
//       console.log("see whether there is result from intermediate value", resultForIntermediateCalculations);
//       if (resultForIntermediateCalculations) {
//         console.log("entered into block and there is resultForIntermediateCalculations");
//         setInput(prev => `${prev}${result}`);
//         const toGetOperator = extractDetailsLastExp(input);
//         console.log(toGetOperator, "operator details");
//         const { lastOperator } = toGetOperator;
//         const newIntermediateValueForOAE = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(newIntermediateValueForOAE, "newIntermediateValueForOAE");
//         const ansForExpOAE = math.evaluate(newIntermediateValueForOAE);
//         console.log(ansForExpOAE, "ansForExpOAE answer after evaluating");
//         setResultForIntermediateCalculations(ansForExpOAE);
//         setResult(ansForExpOAE);
//         setIsEqualsToClicked(true)
//         return;
//       }
//       else {
//         setInput(prev => `${prev}${result}`)
//         const expWithOpAtEnd = `${input}${result}`;
//         console.log(expWithOpAtEnd, "expWithOpAtEnd")
//         const finalResultWithOpAtEnd = math.evaluate(expWithOpAtEnd);
//         console.log(finalResultWithOpAtEnd, "finalResultWithOpAtEnd");
//         setResult(finalResultWithOpAtEnd);
//         setIsEqualsToClicked(true)
//         return;
//       }
//     }


//     if (islogXY) {
//       const inputStr = input.toString();
//       console.log("isLogXy is enabled");
//       console.log(rFlag, 'this is rFlag');
//       setIsEqualsToClicked(true)
//       if (rFlag) {
//         console.log("rFlag is true block");
//         // const firstEvalExp=extractLastExpDetailsForLogxbasey(input)
//         // console.log(firstEvalExp,"answer from the funtion");
//         const expEval = extractLastExpDetailsForLogxbasey(inputStr);
//         console.log(expEval, "expEval");
//         const { previousExpressionForLxBy, lastOperatorForLxBy, lastExpressionForLxBy } = expEval
//         const ansForLogXBy = evaluateLogXYExpression(lastExpressionForLxBy);
//         console.log(ansForLogXBy, "ansForLogXBy")
//         const expToBeEvaluated = `${resultForIntermediateCalculations}${lastOperatorForLxBy}${ansForLogXBy}`;
//         console.log(expToBeEvaluated);
//         const finalAnsExpLxBy = math.evaluate(expToBeEvaluated);
//         console.log(finalAnsExpLxBy, "finalAnsExpLxBy");
//         setResult(finalAnsExpLxBy);
//         setResultForIntermediateCalculations(finalAnsExpLxBy);
//         return;

//       }
//       else {
//         console.log("rFlag is false block");
//         const firstEvalExp = evaluateLogXYExpression(inputStr)
//         console.log(firstEvalExp, "answer from the funtion");
//         const evalAns = math.evaluate(firstEvalExp);
//         setResult(evalAns);

//       }
//       return;
//     }

//     if (isEqualsToClicked) {
//       console.log("already evaluated");
//       setResultForIntermediateCalculations(result);
//       return;
//     }

//     if (input.includes("^") && rFlag === false) {
//       setIsEqualsToClicked(true)
//       setRFlag(true)
//       // Extract the last operator and check for `^`
//       const lastOperatorMatch = input.match(/[+\-*/]$/);
//       const lastOperatorForMatch = lastOperatorMatch ? lastOperatorMatch[0] : "";
//       console.log(lastOperatorForMatch, "lastOperatorForMatch");
//       // if there is ^  at the last operatormatch it means there is ^ in last one so we need to evaluate it 

//       console.log("^ is included in the input");
//       const toExtractLastOpoforxPy = extractDetailsLastExp(input);
//       const { lastOperator } = toExtractLastOpoforxPy;
//       console.log("^ is included in the input");
//       const ansFromXpY = handleInputForXpY(input);
//       console.log(ansFromXpY);
//       if (resultForIntermediateCalculations) {
//         console.log("there is some intermediate val", resultForIntermediateCalculations);
//         console.log(ansFromXpY, "this is the returned answer from the seperate function of xPy");
//         const newExpToEval = `${resultForIntermediateCalculations}${lastOperator}${ansFromXpY}`;
//         console.log(newExpToEval, "I think this is the new exp to evaluate ");
//         const evaluatedAns = math.evaluate(newExpToEval);
//         console.log(evaluatedAns, "This is the new eval ans ");
//         setResult(evaluatedAns);
//         setResultForIntermediateCalculations(evaluatedAns);
//         return;
//       }
//       else {
//         console.log("There is no int val");
//         const aloneExpAns = math.evaluate(input)
//         console.log("for the input", input, "ans is", aloneExpAns);
//         setResult(aloneExpAns)
//         setResultForIntermediateCalculations(aloneExpAns);
//       }
//       return;
//     }

//     // if(input.includes("^") && rFlag===true){
//     //   console.log("^ is included in the input last exp and rFlag is true",rFlag);
//     //   const lastOperatorMatch = input.match(/[+\-*/]$/);
//     //   const lastOperatorForMatch = lastOperatorMatch ? lastOperatorMatch[0] : "";
//     //   console.log(lastOperatorForMatch,"lastOperatorForMatch");
//     //   const toExtractLastOpoforxPy=extractDetailsLastExp(input);
//     //   const{lastOperator}=toExtractLastOpoforxPy;
//     //   console.log("^ is included in the input");
//     //   const ansFromXpY=handleInputForXpY(input);
//     //   console.log(ansFromXpY);
//     //   if(resultForIntermediateCalculations){
//     //     console.log("there is some intermediate val",resultForIntermediateCalculations);
//     //     console.log(ansFromXpY,"this is the returned answer from the seperate function of xPy");
//     //     const newExpToEval=`${resultForIntermediateCalculations}${lastOperator}${ansFromXpY}`;
//     //     console.log(newExpToEval,"I think this is the new exp to evaluate ");
//     //     const evaluatedAns=math.evaluate(newExpToEval);
//     //     console.log(evaluatedAns,"This is the new eval ans ");
//     //     setResult(evaluatedAns);
//     //     setResultForIntermediateCalculations(evaluatedAns);
//     //     return;
//     //   }
//     //   else{
//     //     console.log("There is no int val");
//     //     setResultForIntermediateCalculations(result);
//     //   }
//     //   return;
//     // }
//     if (input.includes("^") && rFlag === true) {
//       // setInput(prev=>`${prev}${operator}`)
//       setIsEqualsToClicked(true)
//       const { lastExpression, lastOperatorForxPy } = extractDetailsLastExpForxPy(input);
//       console.log(lastExpression, lastOperatorForxPy);
//       const lastExpMatch = lastExpression.match(/(\d+)\^(\d+)$/);
//       const toExtractLastOpoforxPy = extractDetailsLastExp(input);
//       const { lastOperator } = toExtractLastOpoforxPy;
//       if (lastExpMatch) {
//         console.log("last exp is mastcheeeed");
//         console.log("This is the Result ", result);
//         console.log("^ is included in the input last exp and rFlag is true", rFlag);
//         // setRFlag(true)
//         const lastOperatorMatch = input.match(/[+\-*/]$/);
//         const lastOperatorForMatch = lastOperatorMatch ? lastOperatorMatch[0] : "";
//         console.log(lastOperatorForMatch, "lastOperatorForMatch");

//         console.log("^ is included in the input");
//         const ansFromXpY = handleInputForXpY(input);
//         console.log(ansFromXpY);
//         if (resultForIntermediateCalculations) {
//           console.log("there is some intermediate val", resultForIntermediateCalculations);
//           console.log(ansFromXpY, "this is the returned answer from the seperate function of xPy");
//           const newExpToEval = `${resultForIntermediateCalculations}${lastOperator}${ansFromXpY}`;
//           console.log(newExpToEval, "I think this is the new exp to evaluate ");
//           const evaluatedAns = math.evaluate(newExpToEval);
//           console.log(evaluatedAns, "This is the new eval ans ");
//           setResult(evaluatedAns);
//           setResultForIntermediateCalculations(evaluatedAns);
//           return;
//         }
//         else {
//           console.log("There is no int val");
//           setResultForIntermediateCalculations(result);
//         }

//         return
//       }
//       else {
//         console.log("there is no exp mathc ");
//         console.log("in the last expression there is no ^ is present")
//         // the exp is like: 2^6+5+
//         console.log("last lastExpression", lastExpression, "lastOperatorForxPy", lastOperatorForxPy);
//         const newExpForCap = `${resultForIntermediateCalculations}${lastOperator}${lastExpression}`;
//         console.log(newExpForCap, "this is the exp we are evaluating");
//         const finalAns = math.evaluate(newExpForCap);
//         console.log(finalAns, "this is the final answer");
//         setResult(finalAns);
//         setResultForIntermediateCalculations(finalAns);
//       }

//       return;
//     }
//     if (isExpBtn) {
//       console.log("previously exp button was clicked");
//       console.log("is equals to clicked or nt", isEqualsToClicked)
//       if (rFlag === false) {
//         const evaluateForExpBtn = math.evaluate(input)
//         console.log("the res for inter mediate var is ", resultForIntermediateCalculations);
//         console.log("Evaluated ans is,", evaluateForExpBtn);
//         setResult(evaluateForExpBtn);
//         setResultForIntermediateCalculations(evaluateForExpBtn)
//         setRFlag(true)
//         setIsExpBtn(false)
//         setIsEqualsToClicked(true);
//         return;
//       }
//       else {
//         console.log("rflag is true which means there was some already previous expression and result", resultForIntermediateCalculations);
//         console.log(input, "this is the input i need to evalute");
//         const opInfo = extractDetails(input)
//         const { lastOperator } = opInfo;
//         const resultFromFunction = extractLastEPlusNumbers(input);
//         console.log(resultFromFunction);
//         const { base, exponent } = resultFromFunction;
//         console.log(base, exponent);
//         const ansToBeEvaluated = `${base}e+${exponent}`;
//         console.log(ansToBeEvaluated, "this is the exp i am evaluating ");
//         const ans = math.evaluate(ansToBeEvaluated);
//         console.log(ans);
//         console.log(resultForIntermediateCalculations);
//         const ansWithprevValue = `${resultForIntermediateCalculations}${lastOperator}${ans}`;
//         const finalAnswer = math.evaluate(ansWithprevValue)
//         console.log(finalAnswer, "finalAnswer");
//         setResult(finalAnswer);
//         setResultForIntermediateCalculations(finalAnswer)
//         setIsExpBtn(false)
//         setIsEqualsToClicked(true);
//         return;
//       }

//     }

//     //   if(isYroot){
//     //     console.log(isYroot,"this is the value of isyroot");
//     //     console.log(isEqualsToClicked,"eeeeeeeeeeeee")
//     //     console.log("previously y root button was clicked");
//     //     if(rFlag===false){
//     //       console.log("the res for inter mediate var is ", resultForIntermediateCalculations);
//     //       try {
//     //         // Use regex to extract values for yroot
//     //         const yRootMatch = input.match(/(\d+)yroot(\d+)/);
//     //         console.log("yRootMatch result:", yRootMatch);
//     //         if (yRootMatch) {
//     //           const numberValue = parseFloat(yRootMatch[1].trim());
//     //           const yValue = parseFloat(yRootMatch[2].trim());

//     //           if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//     //             console.error("Invalid values for y-root");
//     //             setResult("Error");
//     //             return;
//     //           }
//     //           // Calculate the y-th root
//     //           const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//     //           const finalEvalRes=resultForIntermediateCalculations;
//     //           console.log(evaluatedYthRoot, "result of y-th root evaluation");
//     //           // setInput(prev=>`${prev}${operator}`)
//     //           setResult(evaluatedYthRoot); 
//     //           setRFlag(true);
//     //           setResultForIntermediateCalculations(evaluatedYthRoot)
//     //           setIsYroot(false)
//     //           return;
//     //         } else {
//     //           console.error("yroot format not recognized.");
//     //           setResult("Error: Invalid yroot format");
//     //           setIsError(true);
//     //           setIsYroot(false)

//     //         }
//     //       } catch (error) {
//     //         setResult("Error");
//     //         setIsError(true);
//     //         setIsYroot(false)
//     //         console.error("Error evaluating y-th root expression:", error);
//     //       }
//     //       // here we need to do it manually 
//     //       setRFlag(true)
//     //       setIsYroot(false)
//     //       return;
//     //     }
//     //   else {
//     //     // rFlag is true, meaning there's a previous expression
//     //     console.log("rFlag is true which means there was some already previous expression and result", resultForIntermediateCalculations);
//     //     setIsYroot(false);
//     //     console.log(input, "this is the input I need to evaluate");
//     //     // setInput(prev => `${prev}${operator}`);
//     //     try {
//     //         // Extract base and exponent for yroot
//     //         const resultFromFunction = extractLastYRootNumbers(input);
//     //         console.log(resultFromFunction);
//     //         const { base, exponent } = resultFromFunction;
//     //         console.log(base, exponent);

//     //         // Validate the base and exponent
//     //         const numberValue = parseFloat(base);
//     //         const yValue = parseFloat(exponent);

//     //         if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//     //             console.error("Invalid values for y-root in else block");
//     //             setResult("Error");
//     //             return;
//     //         }
//     //         // Calculate the y-th root
//     //         const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//     //         console.log(evaluatedYthRoot, "result of y-th root evaluation for else block");
//     //         const opInfo=extractDetails(input)
//     //         const{lastOperator}=opInfo;
//     //         // Combine the previous result with the new one
//     //         const ansWithPrevValue = `${resultForIntermediateCalculations}${lastOperator}${evaluatedYthRoot}`;
//     //         const finalAnswer = math.evaluate(ansWithPrevValue);
//     //         console.log(finalAnswer, "finalAnswer");

//     //         // Update state with the final result
//     //         setResult(finalAnswer);
//     //         setResultForIntermediateCalculations(finalAnswer);
//     //         return;
//     //     } catch (error) {
//     //         setResult("Error");
//     //         setIsError(true);
//     //         console.error("Error evaluating y-th root expression in else block:", error);
//     //     }
//     // }
//     //   }
//     if (isYroot) {
//       console.log(isYroot, "this is the value of isyroot");
//       console.log(isEqualsToClicked, "eeeeeeeeeeeee")
//       console.log("previously y root button was clicked");
//       if (rFlag === false) {
//         // rFlag is false which means the expression do not have the preResult
//         // the exp may be 3yroot2+

//         console.log("the res for inter mediate var is ", resultForIntermediateCalculations);
//         try {
//           // =====custom Evaluation start==========
//           // Use regex to extract values for yroot
//           const yRootMatch = input.match(/(\d+)yroot(\d+)/);
//           console.log("yRootMatch result:", yRootMatch);
//           if (yRootMatch) {
//             const numberValue = parseFloat(yRootMatch[1].trim());
//             const yValue = parseFloat(yRootMatch[2].trim());

//             if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//               console.error("Invalid values for y-root");
//               setResult("Error");
//               return;
//             }
//             // Calculate the y-th root
//             const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//             const finalEvalRes = resultForIntermediateCalculations;
//             console.log(evaluatedYthRoot, "result of y-th root evaluation");
//             // =======custom evaluation end=======

//             setResult(evaluatedYthRoot);
//             setRFlag(true);
//             setResultForIntermediateCalculations(evaluatedYthRoot)
//             setIsYroot(false)
//             return;
//           } else {
//             console.error("yroot format not recognized.");
//             setResult("Error: Invalid yroot format");
//             setIsError(true);
//             setIsYroot(false)

//           }
//         } catch (error) {
//           setResult("Error");
//           setIsError(true);
//           setIsYroot(false)
//           console.error("Error evaluating y-th root expression:", error);
//         }
//         // here we need to do it manually 
//         setRFlag(true)
//         setIsYroot(false)
//         return;
//       }
//       // this means there was previously evaluated answer for this
//       // the exp may be "22+sin(20)+3yroot7"
//       else {
//         // rFlag is true, meaning there's a previous expression
//         console.log("rFlag is true which means there was some already previous expression and result", resultForIntermediateCalculations);
//         setIsYroot(false);
//         console.log(input, "this is the input I need to evaluate");
//         // 1. extracting last yrootx's base and exp 
//         // 2. have to find out answer for those base, exp 
//         // 3. then calculate with the resFIVAns+lastOperator+evaluated answer from yrootx
//         // 4.  
//         try {
//           // Extract base and exponent for yroot
//           const resultFromFunction = extractLastYRootNumbers(input);
//           console.log(resultFromFunction, "this is the result for last y root  ");
//           const { base, exponent } = resultFromFunction;
//           console.log(base, exponent);
//           // Validate the base and exponent
//           const numberValue = parseFloat(base);
//           const yValue = parseFloat(exponent);

//           if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//             console.error("Invalid values for y-root in else block");
//             setResult("Error");
//             return;
//           }
//           // Calculate the y-th root
//           const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//           console.log(evaluatedYthRoot, "result of y-th root evaluation for else block");
//           const opInfo = extractDetails(input)
//           const { lastOperator } = opInfo;
//           // Combine the previous result with the new one
//           const ansWithPrevValue = `${resultForIntermediateCalculations}${lastOperator}${evaluatedYthRoot}`;
//           const finalAnswer = math.evaluate(ansWithPrevValue);
//           console.log(finalAnswer, "finalAnswer");
//           // Update state with the final result
//           setResult(finalAnswer);
//           setResultForIntermediateCalculations(finalAnswer);
//           return;
//         } catch (error) {
//           setResult("Error");
//           setIsError(true);
//           console.error("Error evaluating y-th root expression in else block:", error);
//         }
//       }
//     }

//     console.log("Equals clicked");
//     setIsEqualsToClicked(true)
//     console.log(rFlag, "rrrflaaaagggg");
//     console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//     console.log(input, "input");
//     console.log(prevExpV, "prevExpV");
//     if (rFlag) {
//       console.log("rFlag is true which means there is some previously evaluated value", rFlag);
//       console.log("which means there is some resultForIntermediateCalculations is available which is ", resultForIntermediateCalculations);
//       const toExtractOpInfo = extractDetailsLastExp(input);
//       console.log(toExtractOpInfo);
//       const { lastExpression, lastOperator } = toExtractOpInfo;
//       // here i need to take the resultForIntermediateResult last operator, last expression, 
//       // const equalEvalString=`${resultForIntermediateCalculations}${lastOperator}${lastExpression}`;
//       // it means exp like 25+sin(3)
//       if (lastExpression.includes("sin") || lastExpression.includes("cos") || lastExpression.includes("tan")) {
//         console.log("sin is included in the sin function handleEvaluation ");
//         const equalEvalString = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(equalEvalString, "equalEvalString equalEvalString")
//         const trigIncludedEval = math.evaluate(equalEvalString);
//         console.log(trigIncludedEval);
//         setResult(trigIncludedEval);
//       }
//       else if (lastExpression.includes("asin") || lastExpression.includes("acos") || lastExpression.includes("atan")) {
//         console.log("acos, asn, atna functions included with rFLag true");
//         console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations")
//       }
//       else if (lastExpression.includes("ln")) {
//         console.log("in handle Evaluation ln is included");
//         console.log("this is intermed", resultForIntermediateCalculations);

//         if (resultForIntermediateCalculations) {
//           const lnToBeEvaluated = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(lnToBeEvaluated, "to be evaluated  ");
//           const ansForLn = math.evaluate(lnToBeEvaluated);
//           console.log(ansForLn);
//           setResult(ansForLn);
//           return
//         }
//         else {
//           console.log("there is no intermediate v;ie");
//         }
//         return
//       }
//       else if (lastExpression.includes("cuberoot")) {
//         console.log("cube root is included in the handle evaluate function");
//         console.log("rrrrrrrrr", resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           console.log("in ric block");
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExp);
//           const newExpAns = math.evaluate(newExp);
//           console.log(newExpAns);
//           setResult(newExpAns)
//           setResultForIntermediateCalculations(newExpAns)
//         }
//         else {
//           console.log("Entered into else handleEval function");

//         }
//         return
//       }
//       else if (lastExpression.includes("cube")) {
//         console.log("cube is included in this ");
//         console.log("ressssssss", resultForIntermediateCalculations);
//         // may be exp will be 25+cube(3) some prevExp+cube(24)
//         if (resultForIntermediateCalculations) {
//           console.log("in interrr result block")
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const expAns = math.evaluate(newExp);
//           console.log("this is expAns", expAns);
//           setResult(expAns)
//           setResultForIntermediateCalculations(expAns);
//           return;
//         }
//         // the expression is akela cube(2)
//         else {
//           console.log("the input is", input);
//           console.log(result, "this is the result");
//           setResultForIntermediateCalculations(result)
//         }
//         return;
//       }
//       else if (lastExpression.includes("sqr")) {
//         console.log("in sqr lastExp functin block");
//         console.log(resultForIntermediateCalculations, "reesss");
//         if (resultForIntermediateCalculations) {
//           console.log("t means there was a prev exp res");
//           const newSqrExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newSqrExp);
//           const newSqrResult = math.evaluate(newSqrExp);
//           console.log(newSqrResult);
//           setResult(newSqrResult)
//           setResultForIntermediateCalculations(newSqrExp);
//           return
//         }
//         else {
//           console.log("there is no prev exp result");
//           // setResultForIntermediateCalculations()
//           return;
//         }
//       }
//       else if (lastExpression.includes("powe")) {
//         // 1.428.4287934927351+powe(6)+powe(6)
//         console.log("thee exp may be ");
//         console.log("rrres", resultForIntermediateCalculations);
//         const poweToBeEval = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log(poweToBeEval);
//         const ansForPowe = math.evaluate(poweToBeEval);
//         console.log(ansForPowe, "amsssss");
//         setResultForIntermediateCalculations(ansForPowe);
//         setResult(ansForPowe);
//         return
//       }
//       else if (lastExpression.includes("logXbase2")) {
//         console.log("this is inrFlag true block and rrrrr is", resultForIntermediateCalculations)
//         if (resultForIntermediateCalculations) {
//           console.log("in blokkkkkkkk");
//           const newExpForLxB2 = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const ansForLogXBy = math.evaluate(newExpForLxB2);
//           setResult(ansForLogXBy);
//           setResultForIntermediateCalculations(ansForLogXBy);
//           return
//         }
//         // as the rFlag is already true which means there will be always a intermediate result so i think there is no need of else block
//         else {
//           console.log("the inputis", input);
//           console.log("Thi sis result", result);
//           setResultForIntermediateCalculations(result)
//           return;
//         }
//       }
//       else if (lastExpression.includes("log")) {
//         console.log("In last expression, log is involved");
//         if (resultForIntermediateCalculations) {
//           console.log(resultForIntermediateCalculations);
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log("newexo", newExp);
//           const newResAns = math.evaluate(newExp);
//           console.log(newResAns);
//           setResult(newResAns);
//           setResultForIntermediateCalculations(newResAns)
//           return;
//         }
//         else {
//           console.log("else block of resultForInt mediate ans");
//           setResultForIntermediateCalculations(result);
//         }
//         return;
//       }
//       else if (lastExpression.includes("powTen")) {
//         console.log("PowTen is included in this last exp");
//         console.log("rrrrrrrrr", resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           console.log("in ric block of powTen");
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExp);
//           const newExpAns = math.evaluate(newExp);
//           console.log(newExpAns);
//           setResult(newExpAns)
//           setResultForIntermediateCalculations(newExpAns)
//         }
//         else {
//           console.log("Entered into else handleEval function");
//         }

//         return;

//       }
//       else if (lastExpression.includes("recipro")) {
//         console.log("reciproc of rFlag true");
//         console.log("this is inrFlag true block and rrrrr is", resultForIntermediateCalculations)
//         if (resultForIntermediateCalculations) {
//           console.log("in blokkkkkkkk");
//           const newExpForReciproc = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const ansForReciproc = math.evaluate(newExpForReciproc);
//           setResult(ansForReciproc);
//           setResultForIntermediateCalculations(ansForReciproc);
//           return
//         }
//         return
//       }
//       // it means exp has only digits 25+4+.. or 3/sin(20)+4
//       else {
//         const equalEvalString = `${resultForIntermediateCalculations}${lastOperator}${lastExpression}`;
//         console.log(equalEvalString);
//         const justNumberEval = math.evaluate(equalEvalString);
//         console.log(justNumberEval);
//         setResult(justNumberEval);
//       }
//     }
//     // it means sin(20)=? 
//     else {
//       console.log("rflag is falase which means the input is not being evaluated we need to manually do this");
//       console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations which should do not exist, let's see");
//       console.log("input which should be evaluated", input);
//       if ((input.includes("sin") || input.includes("cos") || input.includes("tan"))) {
//         console.log("this expression includes sin cos, tan ");
//         console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations");
//         const toExtractOpInfo = extractDetailsLastExp(input);
//         const { lastOperator } = toExtractOpInfo;
//         const expWithTrig = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//         console.log("expWithTrig ", expWithTrig)
//         const finalEvalAnsForsinIncluded = math.evaluate(expWithTrig);
//         console.log(finalEvalAnsForsinIncluded, "finalEvalAnsForsinIncluded");
//         setResult(finalEvalAnsForsinIncluded);
//       }
//       else if (input.includes("reciproc")) {
//         setIsEqualsToClicked(true)
//         console.log("reciproc included block with rFlag as false", input);
//         const opInfoReciproc = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoReciproc;
//         console.log(resultForIntermediateCalculations, "rrrrrrrrrr")
//         if (resultForIntermediateCalculations) {
//           const reciprocToBeEvaluated = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(reciprocToBeEvaluated, "to be evaluated  ");
//           const ansForReciproc = math.evaluate(reciprocToBeEvaluated);
//           console.log(ansForReciproc);
//           setResult(ansForReciproc);
//           setResultForIntermediateCalculations(ansForReciproc);
//         }
//         console.log('is eval flag', isEqualsToClicked)
//         return;
//       }
//       else if (input.includes("ln")) {
//         console.log("ln is included");
//         const opInfoLn = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoLn;
//         console.log(resultForIntermediateCalculations, "rrrrrrrrrr")
//         if (resultForIntermediateCalculations) {
//           const lnToBeEvaluated = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(lnToBeEvaluated, "to be evaluated  ");
//           const ansForLn = math.evaluate(lnToBeEvaluated);
//           console.log(ansForLn);
//           setResult(ansForLn);
//           setResultForIntermediateCalculations(ansForLn);
//         } else {
//           console.log("inthe else block of sqr where res of int ans is ntg");
//           setResultForIntermediateCalculations(result);
//           return;
//         }
//         console.log('is eval flag', isEqualsToClicked)
//         return;
//       }

//       else if (input.includes("sqr")) {
//         console.log("rFlag values is", rFlag);
//         const opInfoSqr = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoSqr;
//         console.log(lastOperator);
//         console.log("input is", input);
//         console.log(resultForIntermediateCalculations);
//         if (resultForIntermediateCalculations) {
//           console.log("There is some int function and i am in intfun block");
//           const sqrExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const newExpAns = math.evaluate(sqrExp);
//           console.log(newExpAns);
//           setResult(newExpAns);
//           setResultForIntermediateCalculations(newExpAns);
//           return
//         }
//         else {
//           console.log("inthe else block of sqr where res of int ans is ntg");
//           setResultForIntermediateCalculations(result);
//           return;
//         }
//       }
//       else if (input.includes("powe")) {
//         console.log("else powe block in handleEvaluate");
//         console.log(resultForIntermediateCalculations, "rrrrrrrrr")
//         const { lastOperator } = extractDetailsLastExp(input)
//         if (resultForIntermediateCalculations) {
//           console.log("In resultForInt Calc block");
//           console.log(lastOperator, "this is last operato");
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExp);
//           const ansPowe = math.evaluate(newExp);
//           console.log(ansPowe, "ansPower");
//           setResult(ansPowe);
//           setResultForIntermediateCalculations(ansPowe)
//           return;
//         }
//         else {
//           // the input might be 
//           console.log("in else btn function");

//         }
//         return
//       }
//       else if (input.includes("logXbase2")) {
//         console.log("cme into logXbase2 function");
//         console.log(resultForIntermediateCalculations, "RRRRRR");
//         const opInfoForl2By = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoForl2By;
//         console.log("input is ", input);
//         if (resultForIntermediateCalculations) {
//           console.log("ther is some int fun");
//           const newL2ByExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log("newwwwwww", newL2ByExp);
//           const newAnsForLxB2 = math.evaluate(newL2ByExp);
//           setResult(newAnsForLxB2)
//           setResultForIntermediateCalculations(newAnsForLxB2)
//           return
//         }
//         else {
//           console.log("there is no intr ans");
//           setResultForIntermediateCalculations(result)
//           return
//         }
//         // return 
//       }
//       else if (input.includes("log")) {
//         console.log("in handle evaluate function");
//         console.log(resultForIntermediateCalculations, "Rrrrrrrr");
//         const opInfoForlog = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoForlog;
//         if (resultForIntermediateCalculations) {
//           console.log("there is some int fun");
//           const newLogExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           const newLogExpResult = math.evaluate(newLogExp);
//           console.log(newLogExpResult)
//           setResult(newLogExpResult);
//           setResultForIntermediateCalculations(newLogExpResult);
//           return
//         }
//         else {
//           console.log("there is no intr ans");
//           setResultForIntermediateCalculations(result)
//           return
//         }
//       }
//       else if (input.includes("powTen")) {
//         console.log("In this powTen is inculded");
//         console.log("The value of rFlag is", rFlag);
//         console.log("RESULT F INT VA", resultForIntermediateCalculations);
//         const opInfoForPowTen = extractDetailsLastExp(input);
//         const { lastOperator } = opInfoForPowTen;
//         if (resultForIntermediateCalculations) {
//           console.log(lastOperator, "Thi sis the last operator");
//           const newExp = `${resultForIntermediateCalculations}${lastOperator}${result}`;
//           console.log(newExp, "this is the last value that we are evaluting");
//           const evalPowTen = math.evaluate(newExp);
//           console.log(evalPowTen);
//           setResult(evalPowTen);
//           setResultForIntermediateCalculations(evalPowTen);
//           return
//         }
//         else {
//           console.log("there is no intr ans");
//           setResultForIntermediateCalculations(result)
//           return
//         }
//       }
//       else {
//         const justDigitsExp = math.evaluate(input);
//         setResult(justDigitsExp);
//         // for the expression 6e+3 it is directly evaluating;
//         console.log("just digitssss");
//       }
//     }


//   };


//   //   const handleEvaluate = () => {
//   //     console.log("Equals to button is clicked");

//   //     try {
//   //       if (isEvaluated) {
//   //         console.log("Using pre-calculated result");
//   //         setResult(evaluatedResult);
//   //         setInput(evaluatedResult.toString());
//   //         setIsEvaluated(false); 
//   //         return;
//   //       }
//   //       else if (islogXY) {
//   //         console.log("Handling logxBasey");
//   //         // Call the function to evaluate the log expression
//   //         const updatedInput = evaluateLogXYExpression(input);
//   //         if (updatedInput !== null) {
//   //           // If valid log expression was found, evaluate the entire expression
//   //           try {
//   //             const result = math.evaluate(updatedInput); // WARNING: Avoid eval in production, use a math library instead
//   //             setResult(result);
//   //             setInput(result.toString());
//   //           } catch (error) {
//   //             setResult("Error");
//   //           }
//   //         } else {
//   //           setResult("Error"); // Handle case where log expression is invalid
//   //         }
//   //         setIsLogXY(false);
//   //         return;
//   //       }
//   //       if (input.includes("ln")) {
//   //         console.log("Handling ln expression in evaluation");
//   //         try {
//   //           const lnMatch = input.match(/ln\(([^)]+)\)/); 
//   //           if (lnMatch) {
//   //             const lnValue = lnMatch[1]; 
//   //             console.log(lnValue, "lnValue for evaluation");
//   //             const evaluatedLn = Math.log(lnValue); 
//   //             const newInput = input.replace(lnMatch[0], evaluatedLn); 
//   //             const evaluatedResult = math.evaluate(newInput); 
//   //             setResult(evaluatedResult);
//   //             setInput(evaluatedResult.toString());
//   //             console.log(evaluatedResult, "result of ln evaluation");
//   //             return;
//   //           }
//   //         } catch (error) {
//   //           setResult("Error");
//   //           console.error("Error evaluating ln expression:", error);
//   //           return;
//   //         }
//   //       }
//   //       if(input.includes("log")){
//   //         console.log("log is included in the input of handleEvaluate function");
//   //           console.log("Handling ln expression in evaluation");
//   //           try {
//   //             const logMatch = input.match(/log\(([^)]+)\)/); 
//   //             if (logMatch) {
//   //               const lnValue = logMatch[1]; 
//   //               console.log(lnValue, "lnValue for evaluation");
//   //               const evaluatedLog = Math.log10(lnValue); 
//   //               const newInput = input.replace(logMatch[0], evaluatedLog); 
//   //               const evaluatedResult = math.evaluate(newInput); 
//   //               setResult(evaluatedResult);
//   //               setInput(evaluatedResult.toString());
//   //               console.log(evaluatedResult, "result of ln evaluation");
//   //               return;
//   //             }
//   //           } catch (error) {
//   //             setResult("Error");
//   //             console.error("Error evaluating ln expression:", error);
//   //             return;
//   //           }
//   //       }
//   //       if (input.includes("powe")) {
//   //         console.log("Handling powe expression in evaluation");
//   //         try {

//   //           const poweMatch = input.match(/powe\(([^)]+)\)/); 
//   //           if (poweMatch) {
//   //             const poweValue = poweMatch[1]; 
//   //             console.log(poweValue, "poweValue for evaluation");
//   //             const evaluatedLn = Math.exp(poweValue);
//   //             const newInput = input.replace(poweMatch[0], evaluatedLn); 
//   //             const evaluatedResult = math.evaluate(newInput); 
//   //             setResult(evaluatedResult);
//   //             setInput(evaluatedResult.toString());
//   //             console.log(evaluatedResult, "result of ln evaluation");
//   //             return;
//   //           }
//   //         } catch (error) {
//   //           setResult("Error");
//   //           console.error("Error evaluating ln expression:", error);
//   //           return;
//   //         }
//   //       }


//   //       if (input.includes("powTen")) {
//   //         console.log("powTen included in this");
//   //         try {
//   //           const powTenMatch=input.match(/powTen\(([^)]+)\)/)
//   //           if(powTenMatch){
//   //             const powTenValue= powTenMatch[1];
//   //             const evaluatedPowTen=math.pow(10,powTenValue);
//   //             const newInput=input.replace(powTenMatch[0],evaluatedPowTen);
//   //             //I think there is no need to replace the newInput 
//   //             const evaluatedPTResult=math.evaluate(newInput);
//   //             setResult(evaluatedPTResult);
//   //             setInput(evaluatedPTResult.toString());
//   //             console.log(evaluatedPTResult,"evaluatedPTResult");
//   //             return;
//   //           }
//   //           return
//   //         } catch (error) {
//   //           setResult("Error");
//   //           console.log("Error while evaluation");
//   //           return;
//   //         }
//   //       }
//   //       if(input.includes("sqr")){
//   //         console.log("sqr included");
//   //         try { 
//   //           const sqrMatch=input.match(/sqr\(([^(]+)\)/);
//   //           if(sqrMatch){
//   //             const sqrValue=sqrMatch[1];
//   //             const evaluatedSqrValue=math.square(sqrValue);
//   //             //  In order to extract the input and set it with the expression value
//   //             const newInput=input.replace(sqrMatch[0],evaluatedSqrValue);
//   //             const evaluatedResult=math.evaluate(newInput);
//   //             setInput(evaluatedResult.toString());
//   //             console.log(evaluatedResult,"");
//   //             setResult(evaluatedResult);
//   //             console.log(evaluatedResult,"evaluatedResult");
//   //             return;
//   //           }
//   //         } catch (error) {
//   //           setResult("Error");
//   //           return;
//   //         }
//   //         return;
//   //       }
//   //       console.log("General expression evaluation:", input);
//   //       if (isMod&&input.includes("mod")) {
//   //         console.log("Entered into Mod preprocessed function");
//   //         const evalResult = handleModulusOperation(input);
//   //         setResult(evalResult);
//   //         setInput(evalResult.toString())
//   //         return;
//   //       }
//   //       if(input.includes("asinh")){
//   //         console.log("Entered into arcc sinh functi")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("acosh")){
//   //         console.log("Entered into arcc acosh functi")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("atanh")){
//   //         console.log("Entered into arcc atanh functinnnn")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("sinh")){
//   //         console.log("Entered into sinh functi")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("cosh")){
//   //         console.log("Entered into cosh functi")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("tanh")){
//   //         console.log("Entered into tanh function");
//   //         // console.log(/)
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         return
//   //       }
//   //       if(input.includes("asin")){
//   //         console.log("asin is included in this");
//   //         // handleArcTrigValues("asin",input)
//   //         console.log(input,"This is the inuputt")
//   //         const mathEvalValue=math.evaluate(input)
//   //         console.log(mathEvalValue);
//   //         setResult(mathEvalValue)
//   //         // this is another approach or we can use handleArcTrigValues which is used in below acos function
//   //         return;
//   //       }
//   //       if(input.includes("acos")){
//   //         console.log("acos is included in this");
//   //         handleArcTrigValues("acos",input)
//   //         return;
//   //       }
//   //       if(input.includes("atan")){
//   //         console.log("atan is included in this");
//   //         handleArcTrigValues("atan",input)
//   //         return;
//   //       }

//   //       if(input.includes("sin")){
//   //         console.log("sin included");
//   //       handleEvaluateForTrigValues("sin",input)

//   //       return;  
//   //       }
//   //       if(input.includes("cos")){
//   //       console.log("cos included");
//   //       handleEvaluateForTrigValues("cos",input)
//   //       return
//   //       }
//   //       if(input.includes("tan")){
//   //         handleEvaluateForTrigValues("tan",input)
//   //         return
//   //       }
//   // // *********************************************************************************
//   // // *********************************************************************************



//   // // if (input.includes("yroot")) {
//   // //   console.log("Handling y-th root expression in evaluation");
//   // //   try {
//   // //     // Match number followed by yroot and an optional second number
//   // //     const yRootMatch = input.match(/(\d+)yroot(\d+)?/);

//   // //     if (yRootMatch) {
//   // //       // Extract the number and the degree
//   // //       const numberValue = parseFloat(yRootMatch[1].trim());
//   // //       let yValue = yRootMatch[2] ? parseFloat(yRootMatch[2].trim()) : numberValue; // Default to numberValue if not provided

//   // //       // If yValue is NaN, use numberValue
//   // //       if (isNaN(yValue)) {
//   // //         console.log(`Using ${numberValue} for both base and degree.`);
//   // //         yValue = numberValue; // Set yValue to numberValue
//   // //       }

//   // //       // Check for NaN or invalid y value
//   // //       if (isNaN(numberValue) || yValue <= 0) {
//   // //         console.error("Invalid values for y-root: numberValue =", numberValue, ", yValue =", yValue);
//   // //         setResult("Error");
//   // //         return;
//   // //       }

//   // //       console.log(numberValue, "numberValue for evaluation");
//   // //       console.log(yValue, "yValue for evaluation");

//   // //       // Calculate the y-th root
//   // //       const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//   // //       console.log(evaluatedYthRoot, "result of y-th root evaluation");

//   // //       // Update result and input with the evaluated value
//   // //       setResult(evaluatedYthRoot);
//   // //       // Show the complete expression without any zeros
//   // //       setInput(`${numberValue}yroot${yValue}`); 
//   // //       return;
//   // //     } else {
//   // //       console.error("yroot format not recognized.");
//   // //       setResult("Error: Invalid yroot format");
//   // //     }
//   // //   } catch (error) {
//   // //     setResult("Error");
//   // //     console.error("Error evaluating y-th root expression:", error);
//   // //   }
//   // // }

//   // if (input.includes("yroot")) {
//   //   console.log("Handling y-th root expression in evaluation");
//   //   try {
//   //     // Match all occurrences of yroot expressions
//   //     const yRootPattern = /(\d+)yroot(\d+)/g;
//   //     let match;
//   //     let modifiedInput = input;

//   //     // Loop to replace all yroot occurrences
//   //     while ((match = yRootPattern.exec(input)) !== null) {
//   //       const numberValue = parseFloat(match[1].trim());
//   //       const yValue = parseFloat(match[2].trim());

//   //       // Validate yValue
//   //       if (isNaN(numberValue) || isNaN(yValue) || yValue <= 0) {
//   //         console.error("Invalid values for y-root: numberValue =", numberValue, ", yValue =", yValue);
//   //         setResult("Error");
//   //         return;
//   //       }

//   //       console.log(numberValue, "numberValue for evaluation");
//   //       console.log(yValue, "yValue for evaluation");

//   //       // Calculate the y-th root
//   //       const evaluatedYthRoot = Math.pow(numberValue, 1 / yValue);
//   //       console.log(evaluatedYthRoot, "result of y-th root evaluation");

//   //       // Replace the yroot expression in modifiedInput
//   //       modifiedInput = modifiedInput.replace(match[0], evaluatedYthRoot);
//   //     }

//   //     // Evaluate the final expression after replacing all yroot
//   //     const finalResult = math.evaluate(modifiedInput);
//   //     console.log(finalResult, "final evaluated result");
//   //     setResult(finalResult);
//   //     setInput(modifiedInput); // You can choose how to handle the input here
//   //     return;

//   //   } catch (error) {
//   //     setResult("Error");
//   //     console.error("Error evaluating y-th root expression:", error);
//   //   }
//   // }





//   // // *********************************************************************************
//   // // *********************************************************************************

//   //       else {
//   //         console.log("Entered into the else mode");
//   //         console.log(input,"this is the input i have to calculate");
//   //         setResult(math.evaluate(input));
//   //       }
//   //       // if(result){
//   //       //   setResult(result);
//   //       //   console.log(result,"This is the result");
//   //       //   console.log("Entered into result state")
//   //       //   return
//   //       // }
//   //     } catch (error) {
//   //       setResult("Error");
//   //       console.error("Evaluation error:", error);
//   //     }
//   //   };

//   const handlePowerFunction = (func) => {
//     if (isError) {
//       console.log("in error handlePowerFunction");
//       return;
//     }
//     let calculatedResult;
//     let inputOrResult = input || result;
//     try {
//       switch (func) {
//         case "exp":
//           if (!input) {
//             console.log("There is no input here");
//             setInput(`powe(${0})`)
//             console.log("When clicked alone");
//             const resultZero = Math.exp(0);
//             console.log(resultZero);
//             setResult(resultZero.toString())
//             return
//           }
//           console.log("In exp function");
//           // if input has some operators, then we need to seperate it and then evaluate
//           const operatorResult = extractDetails(inputOrResult)
//           console.log(operatorResult, "operatorResultOperatorResult")
//           const { previousExpression, lastOperator, lastNumber } = operatorResult;
//           if (lastOperator !== null) {
//             setInput(`${previousExpression}${lastOperator}powe(${lastNumber})`);
//             const calculatedPoweValue = math.exp(lastNumber);
//             console.log(calculatedPoweValue);
//             setResult(calculatedPoweValue);
//           }
//           //  if no operators are present, we need to just set to below
//           else {
//             console.log("this is the else block");
//             setInput(`powe(${inputOrResult})`)
//             const powResult = math.exp(input);
//             console.log(powResult);
//             setResult(powResult)

//           }
//           break;
//         case "10^x":
//           // if(input.includes("ln")){
//           //   console.log(result,"this is the input");
//           //   try {
//           //     setInput(`powTen(${input})`)
//           //     const evaluatedResult=
//           //    math.pow(10,result);
//           //     setResult(evaluatedResult);
//           //     setIsEvaluated(true)
//           //     return;
//           //   } catch (error) {
//           //     setResult("Error");
//           //     console.log("error",error)
//           //   }
//           //   setInput(result.toString());
//           //   calculatedResult = math.pow(10, math.evaluate(input))
//           //   setResult(calculatedResult)
//           //   return;
//           // }
//           // calculatedResult = math.pow(10, math.evaluate(input))
//           try {
//             console.log("In 10 pow x function");
//             console.log(input, "This is the input state");

//             const powTenOpResult = extractDetails(input);
//             if (powTenOpResult) {
//               const { previousExpression, lastOperator, lastNumber } = powTenOpResult;
//               if (lastOperator === null) {
//                 console.log("ope is null")
//                 const evalPowTenAns = math.pow(10, math.evaluate(input));
//                 console.log(evalPowTenAns);
//                 setInput(`powTen(${input})`);
//                 setResult(evalPowTenAns);
//                 return
//               }
//               else {
//                 console.log("there is some prev exp");
//                 setInput(`${previousExpression}${lastOperator}powTen(${lastNumber})`);
//                 const powTenAnsForLastNum = math.pow(10, math.evaluate(lastNumber));
//                 console.log(powTenAnsForLastNum);
//                 setResult(powTenAnsForLastNum)
//                 return;
//               }
//             }
//           } catch (error) {
//             setResult("Error");
//             setIsError(true)
//           }
//           break;
//         case "x^2":
//           console.log(result, input,)
//           const sqrOpResult = extractDetails(input);
//           if (sqrOpResult) {
//             const { previousExpression, lastOperator, lastNumber } = sqrOpResult;
//             console.log(previousExpression, lastOperator, lastNumber);
//             if (lastOperator === null) {
//               console.log("Which means this is the expression such as square(2");
//               console.log("the inpt");
//               const evalSqrAns = math.square(input);
//               setInput(`sqr(${input})`)
//               setResult(evalSqrAns)
//               console.log(evalSqrAns, "evalSqrAns");
//               return
//             }
//             else {
//               console.log("there is some previous expression");
//               setInput(`${previousExpression}${lastOperator}sqr(${lastNumber})`);
//               const sqrAnsForLastNum = math.square(lastNumber);
//               console.log(sqrAnsForLastNum, "this is the answer uussssssssssshhhhhhhhhhh");
//               setResult(sqrAnsForLastNum);
//               return

//             }
//           }
//           else {
//             setInput(`sqr(${input})`);
//             setResult(calculatedResult)
//           }
//           console.log(result, "this is result");
//           console.log(input, "this is the input");
//           break;
//         // cccubee
//         case "x^3":
//           // calculatedResult = math.cube(math.evaluate(input))
//           // console.log("Cube value");
//           // const calculatedCubeResult=math.cube(math.evaluate(inputOrResult));
//           // console.log(calculatedCubeResult);
//           // setResult(calculatedCubeResult);
//           const cubeOpResult = extractDetails(input);
//           if (cubeOpResult) {
//             // const{operator,numberAfterOperator,numberBeforeOperator}=cubeOpResult;
//             // setInput(`${numberBeforeOperator}${operator}cube(${numberAfterOperator})`);
//             // const cubeResult=math.cube(math.evaluate(numberAfterOperator));
//             // console.log(cubeResult);
//             // setResult(cubeResult);
//             const { previousExpression, lastOperator, lastNumber } = cubeOpResult;
//             if (lastOperator === null) {
//               setInput(`cube(${input})`);
//               const aloneCubeAns = math.cube(input);
//               console.log(aloneCubeAns);
//               setResult(aloneCubeAns);
//             }
//             else {
//               //this means there is pr ev exp
//               setInput(`${previousExpression}${lastOperator}cube(${lastNumber})`);
//               const newCubeAns = math.cube(lastNumber);
//               console.log(newCubeAns, "new cube an");
//               setResult(newCubeAns);
//             }
//           }
//           else {
//             setInput(`cube(${input})`);
//             // setResult(calculatedCubeResult)
//             console.log("total else block");
//           }
//           break;
//         case "x^y":
//           console.log("Entered into x^y")
//           setInput(`${input}^`)
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       setResult("Error");
//     }
//   };

//   const handleMPlusButton = () => {
//     if (isError) {
//       return
//     }
//     setShowM(true)
//     console.log(memory, "This is the memo in MPlus function");
//     if (memory !== null && memory !== undefined) {
//       setMemory(prev => prev - parseFloat(input));
//       console.log(memory, "This is the memory after clicking M- button");
//     }
//     else {
//       console.log("No memory value to plus");
//     }
//     setMemory(prev => prev + parseFloat(input))
//     console.log(memory, "This is the memory after clicking the M+ button")
//   }

//   // const handleMPlusButton = () => {
//   //   setMemory(prev => (prev || 0) + parseFloat(input));
//   //   console.log(memory || 0, "This is the memory after clicking the M+ button");
//   // }

//   // const handleMMinusButton = () => {
//   //   setMemory(prev => prev - parseFloat(input));
//   //   console.log(memory, "This is the memory after clicking the M- button")
//   // }

//   const handleMMinusButton = () => {
//     if (isError) {
//       return
//     }
//     setShowM(true);
//     console.log(memory, "this is mem value");
//     if (memory !== null && memory !== undefined) { // Check if memory has a value
//       setMemory(prev => prev - parseFloat(input));
//       console.log(memory, "This is the memory after clicking the M- button");
//     } else {
//       console.log("No memory value to subtract from.");
//     }
//   }

//   useEffect(() => {
//     console.log("Result has been updated:", result);

//   }, [result]);

//   const handleLogOfXWithBasey = () => {
//     if (isError) {
//       console.log("in error handlelogXwith base y");
//       return;
//     }
//     if (input !== null) {
//       setIsLogXY(true);
//       setInput(prev => prev + "logxBasey")
//     }
//   }

//   const handleMod = () => {
//     if (isError) {
//       console.log("handle mod error function");
//       return;
//     }
//     setIsMod(true);
//     console.log(showM, "this is showM value")
//     setInput(prev => prev + "mod")
//   };
//   const handleModulusOperation = (inputStr) => {
//     // Replace 'mod' with '%'
//     const modifiedInput = inputStr.replace(/(\d+)\s*mod\s*(\d+)/g, (match, p1, p2) => {
//       return `${p1} % ${p2}`; // replace with modulo operator
//     });

//     try {
//       const evalResult = math.evaluate(modifiedInput);
//       return evalResult;
//     } catch (error) {
//       console.error('Error evaluating expression:', error);
//       return "Error";
//     }
//   };



//   const handleFactorial = () => {
//     if (isError) {
//       return;
//     }
//     console.log("In handle factorial function", input);
//     const lastNumberMatch = input.match(/(\d+\.?\d*)\s*$/); // Match the last number at the end of the string
//     if (lastNumberMatch) {
//       const lastNumber = lastNumberMatch[0].trim(); // Get the last matched number
//       // Replace the last number or the empty space after it with its factorial representation
//       const updatedInput = input.slice(0, -lastNumber.length) + `factorial(${lastNumber})`;
//       console.log(`Replacing last number ${lastNumber} with factorial(${lastNumber})`);
//       setInput(updatedInput);
//       const factorialResult = math.factorial(lastNumber)
//       console.log("factorialResult", factorialResult)
//       setResult(factorialResult)
//       console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations")
//       // if(resultForIntermediateCalculations){
//       console.log("resultForIntermediateCalculations we do have this before the fact");
//       // setResultForIntermediateCalculations(factorialResult);
//       // setResult(finalIntResult);
//       // setRFlag(true)
//       // return;
//       // }
//       // else{
//       // setResultForIntermediateCalculations(factorialResult)
//       // console.log("for the exp like fac(4)");
//       // setResultForIntermediateCalculations(factorialResult);
//       // setRFlag(true);
//       // }
//     } else {
//       // If the input ends with a space, you might want to handle it
//       if (input.endsWith(' ')) {
//         // If it ends with a space, we can safely append factorial()
//         setInput(input + 'factorial()');

//         // setResult()
//       } else {
//         // If no number found, log an error
//         console.log("No number found to apply factorial on.");
//         setInput(`factorial(0)`)
//         setResult(math.factorial(0))
//       }
//     }
//   };


//   // *********************************************************************************
//   // *********************************************************************************
//   const handleYthRoot = () => {
//     setIsYroot(true)
//     if (isError) {
//       console.log("in error handleYthRoot ");
//       return;
//     }
//     console.log(input, "this is ythroot fu");
//     // Assume the first part of the input is the number and the second part is the root
//     let var1 = input === "" ? 0 : input;
//     let var2 = ""; // Initialize var2 as needed (e.g., you might want to get the y-value)
//     setInput(`${var1}yroot${var2}`);
//   };

//   // *********************************************************************************
//   // *********************************************************************************


//   const handlePercentage = () => {
//     if (isError) {
//       console.log("in handlePercentage");
//       return
//     }
//     try {
//       setResult(math.evaluate(input) / 100);
//     } catch (error) {
//       setResult("Error");
//     }
//   };

//   // const handleInverse = () => {
//   //   if(isError){
//   //     return
//   //   }
//   //   try {
//   //     setResult(1 / math.evaluate(input));
//   //   } catch (error) {
//   //     setResult("Error");
//   //   }
//   // };

//   // const handleInverse = () => {
//   //   if (isError) {
//   //     return; // Early return if there's an error
//   //   }

//   //   try {
//   //     // Check if input is empty or just whitespace
//   //     const currentInput = input.trim();
//   //     if (!currentInput) {
//   //       const defaultValue = 0;
//   //       setInput(`reciproc(${defaultValue})`); // Show as reciproc(0)
//   //       setResult("Infinity");
//   //       return;
//   //     }

//   //     // Evaluate the current input
//   //     const evaluatedValue = math.evaluate(currentInput);

//   //     // Check for division by zero
//   //     if (evaluatedValue === 0) {
//   //       setInput(`reciproc(${currentInput})`); // Show reciproc(0)
//   //       setResult("Infinity");
//   //       return;
//   //     }

//   //     // Calculate the reciprocal directly
//   //     const reciprocalValue = 1 / evaluatedValue;
//   //     const reciprocalExpression = `reciproc(${currentInput})`; // Format as reciproc(value)

//   //     // Update input to show the reciprocal format
//   //     const lastChar = input.charAt(input.length - 1);
//   //     if (['+', '-', '*', '/'].includes(lastChar)) {
//   //       setInput(`${input}${reciprocalExpression}`); // Append to existing expression
//   //     } else {
//   //       setInput(reciprocalExpression); // Set as new input if no operator
//   //     }

//   //     // Update the result
//   //     setResult(reciprocalValue.toString());

//   //   } catch (error) {
//   //     console.error("Error in handleInverse:", error);
//   //     setResult("Error"); // Set error state
//   //   }
//   // };
//   const handleInverse = () => {
//     if (isError) return; // Prevent further actions if there is an error

//     try {
//       const currentInput = input.trim();
//       if (!currentInput) {
//         setResult("Please enter a number");
//         return;
//       }
//       // Evaluate the input using math.js
//       const reciprocOpInfo = extractDetails(input);
//       const { previousExpression, lastOperator, lastNumber } = reciprocOpInfo;
//       // console.log(previousExpression,lastOperator,lastNumber);
//       if (lastOperator === null) {
//         console.log("there is no last operator");
//         setInput(`reciproc(${input})`);
//         console.log(input, "This is the input  ");
//         const evaluatedValue = math.evaluate(currentInput);
//         const reciprocalValue = calculateReciprocal(evaluatedValue);
//         setResult(reciprocalValue.toString());
//         return
//       }
//       else {
//         console.log("There is prev expression");
//         setInput(`${previousExpression}${lastOperator}reciproc(${lastNumber})`);
//         const reciprocalValue = calculateReciprocal(lastNumber);
//         console.log(reciprocalValue);
//         setResult(reciprocalValue);
//       }
//     } catch (error) {
//       console.error("Error in handleInverse:", error);
//       setResult("Error");
//       setIsError(true);
//     }
//   }
//   const handleCubthRoot = () => {
//     if (isError) {
//       console.log("in error cubeRoot funtion")
//       return;
//     }
//     try {
//       const cubethOpInfo = extractDetails(input);
//       const { previousExpression, lastOperator, lastNumber } = cubethOpInfo;
//       console.log(previousExpression, lastOperator, lastNumber);
//       if (lastOperator !== null) {
//         setInput(`${previousExpression}${lastOperator}cuberoot(${lastNumber})`);
//         const cbrtExpAns = math.cbrt(lastNumber);
//         console.log(cbrtExpAns);
//         setResult(cbrtExpAns);
//         return
//       }
//       else {
//         console.log("It is in the else block");
//         setInput(`cuberoot(${input})`);
//         const newAns = math.cbrt(input);
//         console.log(newAns, 'newAns  ');
//         setResult(newAns)
//         return
//       }
//     } catch (error) {
//       setResult("Error");
//     }
//   };



//   //   const handleAbs = () => {
//   //     if(isError){
//   //       return
//   //     }
//   //     try {
//   //         const evaluatedValue = math.evaluate(input);
//   //         const absResult = Math.abs(evaluatedValue);
//   //         const expression = `abs(${evaluatedValue})`;
//   //         setInput(expression);
//   //         setResult(absResult);
//   //     } catch (error) {
//   //         console.error("Error in handleAbs:", error);
//   //         setResult("Error: Invalid input");
//   //     }
//   // };
//   // *************************************************

//   const handleAbs = () => {
//     if (isError) {
//       return;
//     }

//     try {
//       // First, evaluate the current input
//       const evaluatedValue = math.evaluate(input);
//       const absResult = Math.abs(evaluatedValue); // Calculate the absolute value

//       // Check if there are operators in the input
//       const hasOperator = /[\+\-\*\/]/.test(input);

//       if (hasOperator) {
//         // Split the input by operators while retaining them
//         const parts = input.split(/([\+\-\*\/])/);
//         const newExpression = parts.map(part => {
//           // Check if the part is a number or a valid expression
//           const trimmedPart = part.trim();
//           if (!isNaN(trimmedPart) || trimmedPart === "") {
//             // Wrap the evaluated result in abs() if it's a number
//             return `abs(${trimmedPart})`;
//           }
//           return part; // Return operators as they are
//         }).join(""); // Join the parts back into a single expression

//         // Set the new input to include the evaluated absolute result
//         setInput(`abs(${evaluatedValue})`); // Use the evaluated value directly in abs
//         setResult(absResult); // Update the result with the absolute value
//       } else {
//         // If there are no operators, apply abs to the entire evaluated input
//         const expression = `abs(${input})`; // Wrap the entire input in abs()
//         setInput(expression);
//         setResult(absResult); // Update the result with the absolute value
//       }
//     } catch (error) {
//       console.error("Error in handleAbs:", error);
//       setResult("Error: Invalid input");
//     }
//   };

//   const handlePlusMinus = () => {
//     if (isError) {
//       return
//     }
//     try {
//       if (input) {
//         const evaluatedValue = math.evaluate(input);
//         const newValue = -evaluatedValue;
//         setInput(newValue.toString());
//       }
//     } catch (error) {
//       console.error("Error in handlePlusMinus:", error);
//       setResult("Error: Invalid input");
//     }
//   };
//   // Toggle +/- function
//   // const toggleSign = () => {
//   //   if (result !== null) {
//   //     // If a result is already calculated, toggle the result's sign
//   //     setResult(-result);
//   //   } else {
//   //     // If the user is still entering a number, toggle the input sign
//   //     if (input) {
//   //       // Check if the input already has a minus sign
//   //       if (input.startsWith("-")) {
//   //         setInput(input.slice(1)); // Remove the minus sign
//   //       } else {
//   //         setInput("-" + input); // Add the minus sign
//   //       }
//   //     }
//   //   }
//   // };
  
//   const toggleSign = () => {
//     if (input) {
//       // Check if the input contains a function like log, sin, etc.
//       if (input.includes("(")) {
 
//         const match = input.match(/\(([^)]+)\)/); // Matches the content inside parentheses
//         if (match) {
//           const innerValue = match[1];
//           console.log("inner value", innerValue);
 
//           // Check if the inner value starts with a minus sign
//           if (innerValue.startsWith("-")) {
 
//             setInput(input.replace(innerValue, innerValue.slice(1))); // Remove the minus sign inside the parentheses
//           } else {
         
//             setInput(input.replace(innerValue, "-" + innerValue)); // Add the minus sign inside the parentheses
//           }
//         }
//       } else {
 
//         if (input.startsWith("-")) {
//           setInput(input.slice(1)); // Remove the minus sign from the front
//         } else {
//           setInput("-" + input); // Add the minus sign to the front
//         }
//       }
//     } else {
//       // If input is empty, set the default value to '-0'
//       setInput("-0");
//     }
//   };
//   // *********************************************************
//   const [isVisible, setIsVisible] = useState(true);
//   const [isMinimized, setIsMinimized] = useState(false);

//   // const closePopup = () => {
//   //   setIsVisible(false);
//   // };

//   const minimizePopup = () => {
//     setIsMinimized(prev => !prev);

//   };
//   const handleHelpClick = ({ onClose }) => {
//     setShowHelp(prev => !prev);
//   }
//   const calculateExpN = () => {
//     setIsExpBtn(true)
//     if (isError) {
//       return
//     }
//     console.log(input, "inputt");

//     // case 1. if the input is 25+5 clicked on button, and then a number
//     // for this i need to get the operators first, 
//     if (resultForIntermediateCalculations) {
//       // if this is true then the expression must be f type 25+ something 
//       console.log("There is some intermediate val and it is ", resultForIntermediateCalculations);
//       // 1. Extract prev Exp
//       console.log("input is", input);
//       const inputStr = input.toString();
//       const lastOpInfo = extractDetails(inputStr);
//       const { previousExpression, lastOperator, lastNumber } = lastOpInfo;
//       console.log(previousExpression, lastOperator, lastNumber);
//       // const opForExp='+';
//       const newExp = `${previousExpression}${lastOperator}${lastNumber}e+0`;
//       console.log(newExp, "this is what i wanna evaluate");
//       setInput(newExp);

//     }
//     else {
//       console.log("there is no intermediate value");
//       let var1 = input === "" ? 0 : input;
//       let var2 = 0;
//       setInput(`${var1}e+${var2}`);
//     }
//   }

//   return (
//     // <Draggable>
//       <div className={isMinimized ? "hideTheCalc Calculatormaindivpopup" : "Calculatormaindiv Calculatormaindivpopup"}>
//         <div className="Calculatorheader">
//           {" "}
//           <h4 className="calcName">Scientific Calculator</h4>{" "}
//           <div className={`Calculatorheaderright ${isMinimized ? 'minimized' : ''} ${isVisible ? 'show' : ''}`}>
//             <button className="Calculatorhelp" onClick={handleHelpClick} >
//               {showHelp ? "Back" : "Help"}
//             </button>
//             {/* {isMinimized ?
//               (<FaRegWindowMaximize style={{ fontSize: "28px", cursor: "pointer" }} onClick={minimizePopup} />) :
//               (
//                 // <i className="fa-solid fa-minus minusButton" ></i>
//                 <FaMinus onClick={minimizePopup} style={{ fontSize: "28px", cursor: "pointer" }} />
//               )
//             } */}
//             {/* <i className="fa-solid fa-xmark" ></i>
//              */}
//             {/* <FaXmark onClick={onClose} style={{ fontSize: "28px", cursor: "pointer" }} /> */}
//           </div>
//         </div>

//         {showHelp ? (<>
//           <div className="helpDivInCalc">
//             <h2 className="instructionsHeading">Calculator Instructions</h2>
//             <div>
//               <p> You can operate the calculator using the buttons provided on screen with your mouse. </p>
//               <p>
//                 Allows you to perform basic and complex mathematical operations such as modulus, square root, cube root, trigonometric, exponential, logarithmic, hyperbolic functions, etc.</p>
//             </div>
//             <h2 className="headdingDos">Do's:</h2>
//             <ul>
//               <li> Be sure to press [C] when beginning a new calculation.</li>
//               <li> Simply an equation using parenthesis and other mathematical operators.</li>
//               <li> Use the predefined operations such as p (Pi), log, Exp to save time during calculation.</li>
//               <li> Use memory function for calculating cumulative totals.</li>
//               <strong>
//                 [M+]: Will add displayed value to memory.
//               </strong>
//               <br />
//               <strong>
//                 [MR]: Will recall the value stored in memory.
//               </strong>
//               <br />
//               <strong>
//                 [M-]: Subtracts the displayed value from memory.
//               </strong>
//               <br />
//               <li> Be sure select the angle unit (Deg or Rad) before beginning any calculation.</li>
//               <strong>Note: By default angle unit is set as Degree</strong>
//             </ul>
//             <h2 className="toBeRed"><span>Don'ts:</span></h2>
//             <ul>
//               <li>"Perform multiple operations together."</li>
//               <li>"Leave parenthesis unbalanced."</li>
//               <li>"Change the angle unit (Deg or Rad) while performing a calculation.."</li>
//             </ul>
//             <h2><span>Limitations:</span></h2>
//             <ul>
//               <li>"Keyboard operation is disabled."</li>
//               <li>"The output for a Factorial calculation is precise up to 14 digits."</li>
//               <li>"The output for Logarithmic and Hyperbolic calculations is precise up to 5 digits."</li>
//               <li>"Modulus (mod) operation performed on decimal numbers with 15 digits would not be precise."</li>
//               <br />
//               <strong> Use mod operation only if the number comprises of less than 15 digits i.e. mod operation provides best results for smaller numbers.</strong>
//               <br />
//               <li>The range of value supported by the calculator is 10(-323) to 10(308).</li>
//             </ul>

//           </div>
//         </>
//         ) : (
//           <>
//             <div className="calculator1 ">
//               <input type="text" value={input} readOnly className="calculatorinput" />
//               {/* <button className="downloadsButton"> 1</button> */}
//               <div className="calculatorinput">{result}</div>
//               <div className={showM ? `MText mDF` : "mDN"}  >M</div>
//               <div className="calculatorbuttons">
//                 <div className="firstcolom">
//                   <button className="calculatorbutton" onClick={handleMod}>
//                     mod
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("sinh")}
//                   >
//                     sinh
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("asinh")}
//                   >
//                     sinh⁻¹
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleButtonClick("π")}
//                   >
//                     π
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("sin")}
//                   >
//                     sin
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("asin")}
//                   >
//                     sin⁻¹
//                   </button>
//                 </div>
//                 <div className="firstcolom">
//                   <div className="mode">
//                     <label>
//                       <input
//                         type="radio"
//                         value="Deg"
//                         checked={mode === "Deg"}
//                         onChange={handleModeChange}
//                       />
//                       Deg
//                     </label>
//                   </div>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("cosh")}
//                   >
//                     cosh
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("acosh")}
//                   >
//                     cosh⁻¹
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleButtonClick("e")}
//                   >
//                     e
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("cos")}
//                   >
//                     cos
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("acos")}
//                   >
//                     cos⁻¹
//                   </button>
//                 </div>
//                 <div className="firstcolom">
//                   <div className="mode">
//                     <label>
//                       <input
//                         type="radio"
//                         value="Rad"
//                         checked={mode === "Rad"}
//                         onChange={handleModeChange}
//                       />
//                       Rad
//                     </label>
//                   </div>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("tanh")}
//                   >
//                     tanh
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("atanh")}
//                   >
//                     tanh⁻¹
//                   </button>
//                   <button className="calculatorbutton" onClick={handleFactorial}>
//                     n!
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("tan")}
//                   >
//                     tan
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleTrigFunction("atan")}
//                   >
//                     tan⁻¹
//                   </button>
//                 </div>
//                 <div className="threedcolom">
//                   <button
//                     className="calculatorbutton"
//                     // onClick={() => handlePowerFunction("expN")}
//                     onClick={calculateExpN}
//                   >
//                     Exp
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleLogFunction("log2")}
//                   >
//                     log₂X
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={
//                       handleLogOfXWithBasey
//                     }
//                   >
//                     log<sub>y</sub>x
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handlePowerFunction("x^y")}
//                   >
//                     xʸ
//                   </button>
//                   <button className="calculatorbutton" onClick={handleYthRoot}>
//                     {/*³√x  */}
//                     <sup>y</sup>√x
//                   </button>
//                 </div>
//                 <div className="threedcolom">
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleButtonClick("(")}
//                   >
//                     (
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleLogFunction("loge")}
//                   >
//                     ln
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handlePowerFunction("exp")}
//                   >
//                     eˣ
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handlePowerFunction("x^3")}
//                   >
//                     x³
//                   </button>
//                   <button className="calculatorbutton" onClick={handleCubthRoot}>

//                     ∛
//                   </button>
//                 </div>
//                 <div className="threedcolom">
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleButtonClick(")")}
//                   >
//                     )
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handleLogFunction("log")}
//                   >
//                     log
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handlePowerFunction("10^x")}
//                   >
//                     10ˣ
//                   </button>
//                   <button
//                     className="calculatorbutton"
//                     onClick={() => handlePowerFunction("x^2")}
//                   >
//                     x²
//                   </button>
//                   <button className="calculatorbutton" onClick={handleAbs}>
//                     |X|
//                   </button>
//                 </div>
//                 <div className="calculatortoplines">
//                   <div className="firstlineright">
//                     <button className="calculatorbutton" onClick={handleMemoryClear}>MC</button>
//                     <button className="calculatorbutton" onClick={handleMemoryRecall}>MR</button>
//                     <button className="calculatorbutton" onClick={handleMemoryStore} >MS</button>
//                     <button className="calculatorbutton" onClick={handleMPlusButton} >M+</button>
//                     <button className="calculatorbutton" onClick={handleMMinusButton} >M-</button>
//                   </div>
//                   <div className="firstlineright">
//                     <button
//                       className="calculatorbutton calculatorBackspace"
//                       onClick={handleBackspace}
//                     >
//                       {/* <FaArrowLeftLong /> */}
//                     </button>
//                     <button
//                       className="calculatorbutton calculatorClear"
//                       onClick={handleClear}
//                     >
//                       C
//                     </button>
//                     <button className="calculatorbutton"
//                       // onClick={handlePlusMinus}
//                       onClick={toggleSign}

//                     >+/-</button>
//                     <button className="calculatorbutton" onClick={handleSqrt}>
//                       √
//                     </button>
//                   </div>
//                   <div className="firstlineright">
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("7")}
//                     >
//                       7
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("8")}
//                     >
//                       8
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("9")}
//                     >
//                       9
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleOperator("/")}
//                     >
//                       /
//                     </button>
//                     <button className="calculatorbutton" onClick={handlePercentage}>
//                       %
//                     </button>
//                   </div>
//                   <div className="firstlineright">
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("4")}
//                     >
//                       4
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("5")}
//                     >
//                       5
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("6")}
//                     >
//                       6
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleOperator("*")}
//                     >
//                       *
//                     </button>
//                     <button className="calculatorbutton" onClick={handleInverse}>
//                       1/x
//                     </button>
//                   </div>
//                   <div className="secondlineright">
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("1")}
//                     >
//                       1
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("2")}
//                     >
//                       2
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick("3")}
//                     >
//                       3
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleOperator("-")}
//                     >
//                       -
//                     </button>
//                   </div>
//                   <div className="calculatorequalto" >
//                     <button
//                       className="calculatorbutton calculatorequalto1"
//                       onClick={handleEvaluate}
//                     >
//                       =
//                     </button>
//                   </div>
//                   <div className="secondlineright secondlineright11 ">
//                     <button
//                       className="calculatorbutton calculatorzero"
//                       onClick={() => handleButtonClick("0")}
//                     >
//                       0
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleButtonClick(".")}
//                     >
//                       .
//                     </button>
//                     <button
//                       className="calculatorbutton"
//                       onClick={() => handleOperator("+")}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )
//         }
//       </div>
//     // </Draggable>
//   );
// };

// export default ScientificCalculator;
