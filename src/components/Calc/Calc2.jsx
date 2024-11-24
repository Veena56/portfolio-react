import React, { useEffect, useState } from "react";
import * as math from "mathjs";
import './calc.css';
// import Draggable from "react-draggable";
// import "./Calculator.css";
// import '../../components/UG/navbar.css'
// import { FaMinus } from "react-icons/fa";
// import { FaXmark } from "react-icons/fa6";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaRegWindowMaximize } from "react-icons/fa";
const ScientificCalculator2 = ({ onClose }) => {
  const [openParenthesesCount, setOpenParenthesesCount] = useState(0);
  const [toggledResult, setToggledResult] = useState(false);
  const [areParenthesesBalanced, setAreParenthesesBalanced] = useState(true);
  const [intermediateExp, setIntermediateExp] = useState('');
  const [isEqualsToClicked, setIsEqualsToClicked] = useState(false);
  const [isYroot, setIsYroot] = useState(false);
  const [resFromBR, setResFromBR] = useState([])
  const [isExpBtn, setIsExpBtn] = useState(false);
  const [isError, setIsError] = useState(false)
  const [isLastInputE, setIsLastInputE] = useState(false)
  const [input, setInput] = useState("");
  const [showM, setShowM] = useState(false)
  const [isNested, setIsNested] = useState(false)
  const [result, setResult] = useState("0");
  const [historyArray, setHistoryArray] = useState([]);
  const [mode, setMode] = useState("Deg");
  const [memory, setMemory] = useState(0);
  const [showHelp, setShowHelp] = useState(false)
  const [resultForIntermediateCalculations, setResultForIntermediateCalculations] = useState("")
  const [intermediateResultsStack, setIntermediateResultsStack] = useState([]);
  const [shouldAddParen, setShouldAddParen] = useState(false);

  const handleOpenParenthesis = () => {
    setShouldAddParen(true)
    const lastChar = input.trim().slice(-1); // Get the last character of the input (after trimming any spaces)

    // Check if the last character is an operator or an opening parenthesis
    if (lastChar === "" || ["+", "-", "*", "/", "(", ".", "^"].includes(lastChar)) {
      // If it's an operator or empty, allow the opening parenthesis
      setInput(prev => prev + "(");
      setIntermediateExp(prev => prev + "(");
      setOpenParenthesesCount(prevCount => prevCount + 1);
    } else {
      // If there's no operator, you can replace the current character with an opening parenthesis
      setInput(prev => prev.slice(0, -1) + "(");
      setIntermediateExp(prev => prev.slice(0, -1) + "(");
    }
  };


  const handleCloseParenthesis = () => {
    setShouldAddParen(false)
    const openParenthesesCount = (input.match(/\(/g) || []).length;
    const closeParenthesesCount = (input.match(/\)/g) || []).length;

    if (openParenthesesCount > closeParenthesesCount) {
      // If parentheses are unbalanced, add the closing parenthesis
      setInput(prev => `${prev})`);
      setIntermediateExp(prev => `${prev})`);

      const updatedOpenParenthesesCount = (input.match(/\(/g) || []).length;
      const updatedCloseParenthesesCount = (input.match(/\)/g) || []).length;

      if (updatedOpenParenthesesCount === updatedCloseParenthesesCount) {
        setAreParenthesesBalanced(true);
        console.log("Parentheses are now balanced.");
      }
    }

    // After adding the closing parenthesis, evaluate the expression
    // if (areParenthesesBalanced) {
    //   try {
    //     if (typeof intermediateExp === "string") {
    //       const ansToBeSet = math.evaluate(intermediateExp);
    //       setResult(ansToBeSet);
    //     } else {
    //       console.warn("IntermediateExp is not a string. Skipping evaluation.");
    //     }
    //   } catch (error) {
    //     console.error("Error evaluating intermediateExp:", error);
    //     setResult("Error");
    //   }
    // }

  };


  const handleMemoryRecall = () => {
    if (isError) {
      return
    }
    const operators = ['+', '-', '/', '*'];
    const lastChar = input.charAt(input.length - 1);
    console.log(lastChar, "This is the last charrrrrrr ")
    if (operators.includes(lastChar)) {
      console.log(`The last character is ${lastChar}and is included in the array`);
      setInput(prev => prev + memory.toString());
    }
    else {
      // if (memory !== null)
      setInput(memory.toString());
      console.log("The input value being set issssssssss..........", input);
    }
    console.log(memory, "This is the memory that is stored in the memory variable");
  }

  const handleMemoryClear = () => {
    if (isError) {
      return
    }
    setMemory(0)
    setShowM(false)
    console.log("The memory is set to 0 again", memory);
    console.log(memory)
  }
  useEffect(() => {
    console.log('Memory:', memory);
    console.log('Result:', result);
  }, [memory, result]);

  useEffect(() => {
    console.log('Result:', result);
  }, [result]);







  // useEffect(() => {
  //   console.log("The array for prev exp is", arrayForIntResults)
  // }, [arrayForIntResults])




  useEffect(() => {
    console.log(input, "aaaaaaafter ")
  }, [input]);


  const handleMemoryStore = (event) => {
    if (isError) {
      return
    }
    setShowM(true);
    try {
      if (input.trim() === '') {
        setResult('Error: No input provided');
        return; // Exit the function early
      }

      // Regular expression to match the last complete number in the input
      const lastNumberMatch = input.match(/-?\d+(\.\d+)?(?=[+\-*/]|$)/);

      // If no valid number is found, set error
      if (!lastNumberMatch) {
        setResult('Error: No valid number found');
        return; // Exit if no valid number is found
      }

      // Get the last complete number
      const lastNumber = parseFloat(lastNumberMatch[0]);
      console.log(lastNumber, "This is the last number found in the input");

      // Check for incomplete expressions by ensuring the last character is not an operator
      const lastChar = input.trim().slice(-1);

      if (['+', '-', '*', '/'].includes(lastChar)) {
        // If the expression ends with an operator, extract the number before it
        const inputWithoutLastChar = input.trim().slice(0, -1); // Remove the last character (operator)
        const previousNumberMatch = inputWithoutLastChar.match(/-?\d+(\.\d+)?$/); // Match the last complete number in the updated string

        if (previousNumberMatch) {
          const previousNumber = parseFloat(previousNumberMatch[0]);
          setMemory(previousNumber);
        } else {
          setResult('Error: No valid number found before operator');
          return; // Exit if no valid number is found before the operator
        }
      } else {
        // If the input is complete, store the last evaluated result in memory
        const evaluatedResult = math.evaluate(input);
        console.log(evaluatedResult, "This is the evaluated result");

        // Set the result and memory using the last complete number
        // setResult(evaluatedResult);
        setMemory(evaluatedResult); // Store the last complete number in memory
      }
    } catch (error) {
      setResult('Error');
      console.error("Error while evaluating input:", error);
    }
  }




  const isOperatorAtEnd = (expression) => {
    // Check if the expression ends with an operator
    const operators = ["+", "-", "*", "/", "%"];
    return operators.includes(expression.slice(-1));
  };


  const extractParenAndNumberForPIe = (input) => {
    // Look for the pattern where there's an opening parenthesis followed by a number (optional)
    const regex = /\((\d*\.?\d+)?/;
    const match = input.match(regex);

    if (match) {
      const number = match[1]; // Capture the number after the opening parenthesis (if any)
      return { paren: '(', number: number || null }; // Return null if there's no number
    }

    return null; // No parentheses or number found
  };


  const handleButtonClick = (value) => {
    if (isError) {
      return;
    }
    if (toggledResult) {
      setResult(value);
      setToggledResult(false)
    }
    setIntermediateExp(prev => `${prev}${value}`)
    // const hasOperator = /[\+\-\*\/]/.test(input);
    const hasOperator = /[\+\-\*\/](?!\()/.test(input) && !input.includes("(");

    const lastChar = input.charAt(input.length - 1);
    if (value === "π") {

      console.log("in pie handle buttn click");
      const piOpInfo = extractDetails(input);

      console.log(piOpInfo, "piOpInfo")
      if (piOpInfo) {
        const { previousExpression, lastOperator } = piOpInfo;
        if (lastOperator !== null) {
          setInput(`${previousExpression}${lastOperator}${Math.PI}`);
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${Math.PI}`)
          return;
        }
        else {
          console.log("the lastoperator is null here");
          const parentInfo = extractParenAndNumberForPIe(input);
          if (parentInfo) {
            const { paren, number } = parentInfo;

            if (paren === "(" && !number) {
              // If the parenthesis is '(' and there is no number, append Pi directly
              console.log(`"came to the vloack paren === "(" && !number"`)
              setInput(prev => prev + Math.PI);  // Append Pi to the current input
              setIntermediateExp(prev => prev + Math.PI);  // Append Pi to the intermediate expression
              setResult(Math.PI);
              return
            } else {
              console.log("came to else bloc")
              setInput(`${paren}${Math.PI}`);
              setIntermediateExp(`(${Math.PI}`);
              setResult(Math.PI);
              return
            }

          }
          else {
            console.log("in else block")
            setInput(`${Math.PI}`)
            setIntermediateExp(Math.PI);
            setResult(Math.PI)
            return
          }
        }

      }
      if (!hasOperator) {
        setInput(Math.PI.toString())
        console.log("In !hasOperator")
        setIntermediateExp(Math.PI.toString());
        return

      }
      else {
        // vna
        setInput(input + Math.PI);
        console.log("else block of masth.pi blcok");
        setIntermediateExp(prev => `${prev}`)
        return
      }
    }
    else if (value === "e") {
      const opInfo = extractDetails(input);
      console.log(input, "this is input");

      if (opInfo) {
        const { previousExpression, lastOperator, lastNumber } = opInfo;
        console.log("previousExpression,lastOperator,lastNumber", previousExpression, lastOperator, lastNumber);
        if (lastOperator !== null) {
          console.log("yes there is lasst number and it is", lastNumber);
          setInput(`${previousExpression}${lastOperator}${Math.E}`);
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumber: lastNumInputForIE } = extractDetails(intermediateExp);
          console.log(`${previousExpression}${lastOperator}${Math.E}`);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${Math.E}`)
          // vna
          setResult(`${Math.E}`)
          return;
        }
        else {
          console.log("there s no lastnumber lastoperator is null here");
          const parentInfo = extractParenAndNumberForPIe(input);
          if (parentInfo) {
            console.log("Entered into parenthesis info block");
            const { paren, number } = parentInfo;
            console.log(paren, number, "paren,number")
            setInput(`${paren}${Math.E}`)
            setIntermediateExp(`(${Math.E}`);
            setResult(Math.E)
            return
          }
          else {
            console.log("Entered into parenthesis info elseeeeee block");
            setInput(`${Math.E}`)
            setIntermediateExp(`${Math.E}`)
            setResult(`${Math.E}`)
            return
          }
        }

      }

      if (!hasOperator) {
        console.log("do not have any operastor")
        setInput(math.e.toString())
        setIntermediateExp(`${Math.E}`)
        setResult(`${Math.E}`)
        return
      }
      // else {
      //   console.log("complete else block");
      //   setInput(input + Math.E);
      //   setIntermediateExp(`${Math.E}`)
      //   return
      // }
    }
    //  **************************NEWWWWWWWWWWWWWWW*****************************
    //  ******************************NEWWWWWWWWWWWWWWWWWWWW*********************************
    else if (value === "+") {
      const lastChar = input.charAt(input.length - 1);
      const openCount = (input.match(/\(/g) || []).length;
      const closeCount = (input.match(/\)/g) || []).length;

      if (lastChar !== "" && !"+-*/(".includes(lastChar) && openCount > closeCount) {
        setInput(input + "+");
      } else {
        console.log("Invalid placement of operator");
      }
    }
    // ============for multiple digits=================
    if (input.includes("e+") && isExpBtn) {
      console.log("e+ is included here");
      // Find the last occurrence of 'e+'
      const lastEIndex = input.lastIndexOf("e+");
      if (lastEIndex !== -1) {
        // Split input at last 'e+'
        const base = input.slice(0, lastEIndex); // Everything before e+
        let exponentPart = input.slice(lastEIndex + 2); // Everything after e+

        // Remove leading zero if it exists
        exponentPart = exponentPart.replace(/^0+/, ''); // Remove leading zeros

        // Append the new value to the exponent part
        exponentPart += value; // Simply append the new value

        // Combine base and updated exponent part
        const newInput = `${base}e+${exponentPart}`;
        console.log(`New input after appending: ${newInput}`); // Log the new input for verification
        setInput(newInput); // Update the input state
      }
    }
    else if (isYroot) {
      console.log("yroot is previously clicked");
      console.log("input is", input);
      //  if the yroot is included then the every button click should be like 1/entered value 
      setInput(prev => `${prev}${value}`);

      return
    }
    else if (input.includes("^")) {
      console.log("^ is included");
      setInput(`${input}${value}`)
    }

    else if (input.includes("yroot")) {
      console.log("yroot is included");

      // Find the last occurrence of 'yroot'
      const lastYRootIndex = input.lastIndexOf("yroot");

      if (lastYRootIndex !== -1) {
        // Split input at last 'yroot'
        const base = input.slice(0, lastYRootIndex); // Everything before yroot
        let exponentPart = input.slice(lastYRootIndex + 5); // Everything after yroot (5 characters for "yroot")

        // Remove leading zeros if it exists
        exponentPart = exponentPart.replace(/^0+/, ''); // Remove leading zeros
        exponentPart += value;
        const newInput = `${base}yroot${exponentPart}`;
        console.log(`New input after appending: ${newInput}`);
        setInput(newInput);
      }
    }

    // For any other value (numbers, operators, etc.)
    else {
      const lastOpInfoForE = extractDetails(input)
      const { previousExpression, lastOperator, lastNumber } = lastOpInfoForE
      if (isLastInputE) {
        console.log(lastOpInfoForE, "lastOpInfoForE");
        if (lastOperator) {
          console.log("there is lastopereator and it is", lastOperator);
          console.log(`${previousExpression}${lastOperator}${value}`);
          console.log(previousExpression, lastOperator, lastNumber, "previousExpression,lastOperator, lastNumber");
          setInput(`${previousExpression}${lastOperator}${value}`);
        }
        else {
          console.log("Entered into the lastop info with op null");
          setInput(value)
        }
      }

      else {
        setInput(prev => `${prev}${value}`)
        console.log("thia is the modified ele block");
      }
    }
  };



  const handleClear = () => {
    setInput("");
    setResult("0")
    setNewLogxBasey(false)
    setResultForIntermediateCalculations(0)
    setOperatorStack([])
    setPrevExpV("")
    setPrevResultV(null)
    setRFlag(false)
    setIsEqualsToClicked(false)
    setIsError(false)
    setHistoryArray([])
    setShouldAddParen(false)
    setIsExpBtn(false)
    setIsYroot(false)
    setIsPercentageMode(false)
    setResFromBR([])

    setIntermediateExp('')
  };

  const handleBackspace = () => {
    if (isError) {
      return;
    }

    const inputString = input ? input.toString() : "";

    // Check if the last character is an operator
    if (inputString.length === 0 || ['+', '-', '*', '/', ')', "("].includes(inputString[inputString.length - 1])) {
      return; // Return if the last character is an operator or input is empty
    }

    // Remove the last character (which must be a digit)
    const updatedInput = inputString.slice(0, -1);
    setInput(updatedInput);
    const intExpString = intermediateExp ? intermediateExp.toString() : "";

    if (intExpString.length === 0 || ['+', '-', '*', '/', ')'].includes(intExpString[intExpString.length - 1])) {
      return; // Return if the last character is an operator or input is empty
    }
    const updatedIntExp = intExpString.slice(0, -1)
    console.log(updatedIntExp, "this is the updated int exp after the backspace clicked");
    setIntermediateExp(updatedIntExp)
    console.log(input, "This is the input after clicking backspace");
  }

  const handleSqrt = () => {
    if (isError) {
      return
    }
    try {
      console.log("Mode:", mode);
      const sqrtOpForLastExpOpInfo = extractDetailsLastExp(input);
      console.log(sqrtOpForLastExpOpInfo, "sqrtOpForLastExpOpInfo");

      if (sqrtOpForLastExpOpInfo) {
        console.log("The last expression block is true");
        const { previousExpression, lastOperator, lastExpression } = sqrtOpForLastExpOpInfo;
        console.log(previousExpression, lastOperator, lastExpression);

        if (lastOperator === null) {
          const parentInfo = extractParenAndNumber(input);
          if (parentInfo) {
            const { paren, number } = parentInfo;
            console.log(paren, "paren, number", number);
            setInput(`${paren}sqrt(${number})`);
            const parseNumber = parseFloat(number);
            const sqrtAloneExp = Math.sqrt(parseNumber);
            setResult(sqrtAloneExp);
            setIntermediateExp(`(${sqrtAloneExp}`);
            return;
          } else {
            if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
              const isNested = String(intermediateExp).startsWith('(');
              if (isNested) {
                const sqrtAlonePN = extractParenAndNumber(intermediateExp);
                const { paren, number } = sqrtAlonePN;
                const toBeSet = Math.sqrt(number);
                const removedLP = removeLeadingParenthesis(input);
                setInput(`(sqrt(${removedLP})`);
                setIntermediateExp(`(${toBeSet}`);
                return;
              }
              const sqrtResult = Math.sqrt(intermediateExp);
              setResult(sqrtResult);
              setIntermediateExp(sqrtResult);
              setInput(`sqrt(${input})`);
              if (sqrtResult === Infinity || sqrtResult === -Infinity || isNaN(sqrtResult)) {
                setIsError(true);
                console.log("Error: Result is Infinity or NaN");
                return;
              }
              return;
            }
            const lastNumberFloat = parseFloat(lastExpression);
            const sqrtAloneExp = Math.sqrt(lastNumberFloat);
            setInput(prev => `sqrt(${lastExpression})`);
            setIntermediateExp(sqrtAloneExp);
            setResult(sqrtAloneExp);
            return;
          }
        } else {
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
          if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
            const lastExpForIE = extractDetailsLastExp(intermediateExp);
            const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
            if (lastNumInput.startsWith("(")) {
              const numAndParForNested = extractParenAndNumber(lastNumInput);
              if (numAndParForNested) {
                const { paren, number } = numAndParForNested;
                const sqrtWithParenthesis = Math.sqrt(number);
                const removedLP = removeLeadingParenthesis(lastExpression);
                setInput(`${previousExpression}${lastOperator}(sqrt(${removedLP})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${sqrtWithParenthesis}`);
                setResult(sqrtWithParenthesis);
                return;
              }
              return;
            }
            const parsedlastNumInput = parseFloat(lastNumInput);
            const sqrtNestedAns = Math.sqrt(parsedlastNumInput);
            setResult(sqrtNestedAns);
            if (sqrtNestedAns === Infinity || sqrtNestedAns === -Infinity || isNaN(sqrtNestedAns)) {
              setIsError(true);
              console.log("Error: Result is Infinity or NaN");
              return;
            }
            setInput(`${previousExpression}${lastOperator}sqrt(${lastExpression})`);
            setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sqrtNestedAns}`);
            return;
          }
          if (lastNumInput.startsWith("(")) {
            const numAndPar = extractParenAndNumber(lastNumInput);
            if (numAndPar) {
              const { paren, number } = numAndPar;
              const numAndParRe = Math.sqrt(number);
              setResult(numAndParRe);
              setInput(`${previousExpression}${lastOperator}(sqrt(${number})`);
              setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
              return;
            }
            return;
          }
          const lastNumberFloat = parseFloat(lastExpression);
          const sqrtResult = Math.sqrt(lastNumberFloat);
          setInput(`${previousExpression}${lastOperator}sqrt(${lastExpression})`);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sqrtResult}`);
          setResult(sqrtResult);
          return;
        }
      } else {
        console.log("The last expression block is false");
      }

    } catch (error) {
      console.log("Error happened in sqrt function");
      setResult("Error");
      setIsError(true);
    }

  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleNestedTrigFunction = (fun, currentInput) => {
    console.log(fun, currentInput, result, "this is the function, currentInput that is being sent");
    const updatedInput = `${fun}(${currentInput})`;

    setInput(updatedInput);

    const parsedResult = parseFloat(result);

    if (isNaN(parsedResult)) {
      console.error("Parsed result is NaN. Please check the result state.");
      return;
    }
    console.log(parsedResult, "parsedResult");
    console.log(fun, "this is fun value");
    const asinRadians = Math[fun](parsedResult);
    console.log(asinRadians);
    const finalCurrentModeAns = mode === 'Deg' ? asinRadians * (180 / Math.PI) : asinRadians
    setResult(finalCurrentModeAns)
    return;
  };


  // const extractParenAndNumber = (input) => {
  //   const regex = /^\((\d+(\.\d+)?)$/; // Matches a number inside a parenthesis like (2 or (2.5

  //   // Check if the input matches the pattern
  //   const match = input.match(regex);
  //   if (match) {
  //     // If match found, return the parenthesis and the number separately
  //     return {
  //       paren: '(',
  //       number: match[1]
  //     };
  //   } else {
  //     // Return null if the input doesn't match the expected pattern
  //     return null;
  //   }
  // };
  const extractParenAndNumber = (input) => {
    const regex = /^\((\d+(\.\d+)?)$/; // Matches "(2" or "(2.5" but no closing parenthesis

    // Check if the input matches the pattern
    const match = input.match(regex);
    if (match) {
      // If a match is found, return the opening parenthesis and number separately
      return {
        paren: '(',
        number: match[1]
      };
    } else {
      // Return null if the input doesn't match the expected pattern
      return null;
    }
  };



  // function extractParenAndExpression(input) {
  //   const match = input.match(/^(\(*)([a-zA-Z]*\(?\d+.*)$/);

  //   if (match) {
  //     const parens = match[1];       // All opening parentheses, e.g., "((("
  //     const expression = match[2];   // The expression after parentheses, e.g., "cos(3)"

  //     return { parens, expression };
  //   }

  //   // If no match, return default empty values
  //   // return { parens: '', expression: '' };
  //   return null; 
  // }
  function extractParenAndExpression(input) {
    const match = input.match(/^\(?([a-zA-Z]+)\((\d+(\.\d+)?)\)$/);

    if (match) {
      const parens = match[0].startsWith('(') ? '(' : ''; // Capture "(" if it’s there
      const expression = `${match[1]}(${match[2]})`;      // Capture the entire "cos(3)"

      return { parens, expression };
    }

    return null;  // Return null if the input doesn't match the expected pattern
  }


  // Reusable function for all trigonometric calculations
  const calculateTrigFunction = (inputVarIE, mode, func) => {
    console.log(`in the input of ${func}(${inputVarIE}) type of nested function`);
    console.log(input, "this is the intermediate exp");
    let trigResult;
    if (['asin', 'acos', 'atan'].includes(func)) {
      // For asin and acos, validate input range
      if (func === 'asin' || func === 'acos') {
        if (intermediateExp < -1 || intermediateExp > 1) {
          // Handle the case where the input is out of range for asin/acos
          console.error(`${func} input must be between -1 and 1`);
          setResult(NaN); // Set the result as NaN if out of range
          setIntermediateExp(NaN);
          setIsError(true);
          // setInput(`${func}(${input})`); 
          console.log(`this is what we are setting to,${func}${inputVarIE}`,)
          return;
        }
        if (mode === 'Deg') {
          inputVarIE = inputVarIE * (Math.PI / 180); // Convert degrees to radians
        }
      }
      // Calculate inverse trig function if input is valid
      // trigResult = Math[func](inputVarIE);

    } else {
      trigResult = Math[func](mode === 'Deg' ? inputVarIE * (Math.PI / 180) : inputVarIE);
    }
    const threshold = 2.786300682386695e-7;

    if (Math.abs(trigResult) < threshold) {
      trigResult = 0;
    }

    // Set the result and intermediate expression to the updated value
    setResult(trigResult);
    setIntermediateExp(trigResult);
    // Set the input in the format func(expression)
    console.log(`${func}(${inputVarIE})`);
    setInput(`${func}(${input})`);

    return; // Exit the function after setting values
  };


  const calculateAndSetInverseTrig = (functionType, value, mode) => {
    // Step 1: Parse the value
    const parsedValue = parseFloat(value);

    // Step 2: Calculate the inverse trig function based on the mode
    let result;
    if (mode === 'Deg') {
      if (functionType === 'asin') {
        result = Math.asin(parsedValue) * (180 / Math.PI); // asin in degrees
      } else if (functionType === 'acos') {
        result = Math.acos(parsedValue) * (180 / Math.PI); // acos in degrees
      } else if (functionType === 'atan') {
        result = Math.atan(parsedValue) * (180 / Math.PI); // atan in degrees
      }
    } else {
      // Use radians directly
      if (functionType === 'asin') {
        result = Math.asin(parsedValue); // asin in radians
      } else if (functionType === 'acos') {
        result = Math.acos(parsedValue); // acos in radians
      } else if (functionType === 'atan') {
        result = Math.atan(parsedValue); // atan in radians
      }
    }

    // Step 3: Update state
    console.log(result, `${functionType} result`); // Log the result for debugging
    setIntermediateExp(`${result}`);  // Update intermediateExp state
    setInput(`${functionType}(${input})`); // Update input state
    setResult(result);  // Update result state
  };






  // const removeLeadingParenthesis = (input) => {
  //   // Regular expression to find functions with a leading '('
  //   return input.replace(/\(\s*(sin|cos|tan|log|sqrt|sinh|cosh|tanh|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|powTen|reciproc|yroot|square|cbrt)\(/g, "$1(");
  // };

  const removeLeadingParenthesis = (input) => {
    // Regular expression to find functions (including arc variants) with a leading '('
    return input.replace(/\(\s*(a?sin|a?cos|a?tan|log|sqrt|sinh|cosh|tanh|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|powTen|reciproc|yroot|square|cbrt)\(/g, "$1(");
  };

  const
    handleTrigFunction = (func) => {
      if (isError) {
        return;
      }
      try {
        let angle;
        if (mode === "Deg") {
          angle = Math.PI / 180 * parseFloat(input);
          console.log(angle, "this is the angle in deg for which we r calculating");
        }
        else {
          angle = parseFloat(input);
          console.log(angle, "This is the angel in rad");
        }
        switch (func) {
          // completed
          case "sin":
            try {
              console.log("Mode:", mode);
              const sinOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(sinOpForLastExpOpInfo, "sinopfor last exp");

              if (sinOpForLastExpOpInfo) {
                console.log("The last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = sinOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren, number", number);
                    setInput(`${paren}sin(${number})`);
                    const parseNumber = parseFloat(number);
                    const sinAloneExp = Math.sin(mode === 'Deg' ? parseNumber * (Math.PI / 180) : parseNumber);
                    setResult(sinAloneExp);
                    setIntermediateExp(`(${sinAloneExp}`);
                    return;
                  } else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastNumber lastNumber");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("Function in input matching regex condition");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("Detected nested expression with (");
                        const sinAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = sinAlonePN;
                        console.log(paren, number, "Extracted for nested expression");
                        const toBeSet = Math.sin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(sin(${removedLP})`);
                        setIntermediateExp(`(${toBeSet}`);
                        return;
                      }
                      const sinResult = Math.sin(mode === 'Deg' ? intermediateExp * (Math.PI / 180) : intermediateExp);
                      console.log(sinResult);
                      setResult(sinResult);
                      setIntermediateExp(sinResult);
                      setInput(`sin(${input})`);

                      if (sinResult === Infinity || sinResult === -Infinity || isNaN(sinResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("This is a standalone expression");
                    const sinAloneExp = Math.sin(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                    console.log(sinAloneExp, "sin standalone expression result");
                    setInput(prev => `sin(${lastExpression})`);
                    setIntermediateExp(sinAloneExp);
                    setResult(sinAloneExp);
                    return;
                  }
                } else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastNumber lastNumber");

                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("Processing nested function in last expression");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;

                    if (lastNumInput.startsWith("(")) {
                      console.log("Nested expression starts with (");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const sinWithParenthesis = Math.sin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(sinWithParenthesis);
                        setResult(sinWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        setInput(`${previousExpression}${lastOperator}(sin(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${sinWithParenthesis}`);
                        return;
                      }
                      return;
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput);
                    const sinNestedAns = Math.sin(mode === 'Deg' ? parsedlastNumInput * (Math.PI / 180) : parsedlastNumInput);
                    console.log(sinNestedAns, "sinNestedAns");
                    setResult(sinNestedAns);

                    if (sinNestedAns === Infinity || sinNestedAns === -Infinity || isNaN(sinNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    setInput(`${previousExpression}${lastOperator}sin(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sinNestedAns}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("Expression starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.sin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(sin(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    } else {
                      console.log("Entered else block for parenthesis handling");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("First value in input expression", input);
                  const sinResult = Math.sin(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}sin(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sinResult}`);

                  console.log(sinResult, "result obtained");
                  setResult(sinResult);
                  return;
                }
              } else {
                console.log("The last exp block is false");
              }
            } catch (error) {
              console.log("Error occurred in sin function");
              setResult("Error");
              setIsError(true);
            }
            break;
          //  ct()
          case "cos":
            try {
              console.log("Mode:", mode);
              const cosOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(cosOpForLastExpOpInfo, "cosOpFor last exp");

              if (cosOpForLastExpOpInfo) {
                console.log("The last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = cosOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren, number", number);
                    setInput(`${paren}cos(${number})`);
                    const parseNumber = parseFloat(number);
                    const cosAloneExp = Math.cos(mode === 'Deg' ? parseNumber * (Math.PI / 180) : parseNumber);
                    setResult(cosAloneExp);
                    setIntermediateExp(`(${cosAloneExp}`);
                    return;
                  } else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastNumber lastNumber");

                    if (input && /cos|sin|tan|asin|acos|atan|sqrt|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("Function in input matching regex condition");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("Detected nested expression with (");
                        const cosAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = cosAlonePN;
                        console.log(paren, number, "Extracted for nested expression");
                        const toBeSet = Math.cos(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(cos(${removedLP})`);
                        setIntermediateExp(`(${toBeSet}`);
                        return;
                      }
                      const cosResult = Math.cos(mode === 'Deg' ? intermediateExp * (Math.PI / 180) : intermediateExp);
                      console.log(cosResult);
                      setResult(cosResult);
                      setIntermediateExp(cosResult);
                      setInput(`cos(${input})`);

                      if (cosResult === Infinity || cosResult === -Infinity || isNaN(cosResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("This is a standalone expression");
                    const cosAloneExp = Math.cos(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                    console.log(cosAloneExp, "cos standalone expression result");
                    setInput(prev => `cos(${lastExpression})`);
                    setIntermediateExp(cosAloneExp);
                    setResult(cosAloneExp);
                    return;
                  }
                } else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastNumber lastNumber");

                  if (lastExpression && /cos|sin|tan|asin|acos|atan|sqrt|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("Processing nested function in last expression");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;

                    if (lastNumInput.startsWith("(")) {
                      console.log("Nested expression starts with (");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const cosWithParenthesis = Math.cos(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(cosWithParenthesis);
                        setResult(cosWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        setInput(`${previousExpression}${lastOperator}(cos(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${cosWithParenthesis}`);
                        return;
                      }
                      return;
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput);
                    const cosNestedAns = Math.cos(mode === 'Deg' ? parsedlastNumInput * (Math.PI / 180) : parsedlastNumInput);
                    console.log(cosNestedAns, "cosNestedAns");
                    setResult(cosNestedAns);

                    if (cosNestedAns === Infinity || cosNestedAns === -Infinity || isNaN(cosNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    setInput(`${previousExpression}${lastOperator}cos(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cosNestedAns}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("Expression starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.cos(mode === 'Deg' ? number * (Math.PI / 180) : number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(cos(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    } else {
                      console.log("Entered else block for parenthesis handling");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("First value in input expression", input);
                  const cosResult = Math.cos(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}cos(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cosResult}`);

                  console.log(cosResult, "result obtained");
                  setResult(cosResult);
                  return;
                }
              } else {
                console.log("The last exp block is false");
              }
            } catch (error) {
              console.log("Error occurred in cos function");
              setResult("Error");
              setIsError(true);
            }
            break;
          // for new tan()
          case "tan":
            try {
              console.log("Mode:", mode);
              const tanOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(tanOpForLastExpOpInfo, "tanOp for last exp");

              if (tanOpForLastExpOpInfo) {
                console.log("The last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = tanOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren, number", number);
                    setInput(`${paren}tan(${number})`);
                    const parseNumber = parseFloat(number);
                    const tanAloneExp = Math.tan(mode === 'Deg' ? parseNumber * (Math.PI / 180) : parseNumber);
                    setResult(tanAloneExp);
                    setIntermediateExp(`(${tanAloneExp}`);
                    return;
                  } else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastNumber lastNumber");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("Function in input matching regex condition");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("Detected nested expression with (");
                        const tanAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = tanAlonePN;
                        console.log(paren, number, "Extracted for nested expression");
                        const toBeSet = Math.tan(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(tan(${removedLP})`);
                        setIntermediateExp(`(${toBeSet}`);
                        return;
                      }
                      const tanResult = Math.tan(mode === 'Deg' ? intermediateExp * (Math.PI / 180) : intermediateExp);
                      console.log(tanResult);
                      setResult(tanResult);
                      setIntermediateExp(tanResult);
                      setInput(`tan(${input})`);

                      if (tanResult === Infinity || tanResult === -Infinity || isNaN(tanResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("This is a standalone expression");
                    const tanAloneExp = Math.tan(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                    console.log(tanAloneExp, "tan standalone expression result");
                    setInput(prev => `tan(${lastExpression})`);
                    setIntermediateExp(tanAloneExp);
                    setResult(tanAloneExp);
                    return;
                  }
                } else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastNumber lastNumber");

                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("Processing nested function in last expression");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;

                    if (lastNumInput.startsWith("(")) {
                      console.log("Nested expression starts with (");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const tanWithParenthesis = Math.tan(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(tanWithParenthesis);
                        setResult(tanWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        setInput(`${previousExpression}${lastOperator}(tan(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${tanWithParenthesis}`);
                        return;
                      }
                      return;
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput);
                    const tanNestedAns = Math.tan(mode === 'Deg' ? parsedlastNumInput * (Math.PI / 180) : parsedlastNumInput);
                    console.log(tanNestedAns, "tanNestedAns");
                    setResult(tanNestedAns);

                    if (tanNestedAns === Infinity || tanNestedAns === -Infinity || isNaN(tanNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    setInput(`${previousExpression}${lastOperator}tan(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${tanNestedAns}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("Expression starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.tan(mode === 'Deg' ? number * (Math.PI / 180) : number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(tan(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    } else {
                      console.log("Entered else block for parenthesis handling");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("First value in input expression", input);
                  const tanResult = Math.tan(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}tan(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${tanResult}`);

                  console.log(tanResult, "result obtained");
                  setResult(tanResult);
                  return;
                }
              } else {
                console.log("The last exp block is false");
              }
            } catch (error) {
              console.log("Error occurred in tan function");
              setResult("Error");
              setIsError(true);
            }
            break;

          // ******************************************************************************
          // *****************************************************************************
          // 
          case "asin":
            try {
              console.log("Mode:", mode);
              const asinOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(asinOpForLastExpOpInfo, "asinOpForLastExpOpInfo");

              if (asinOpForLastExpOpInfo) {
                console.log("The last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = asinOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren, number", number);
                    setInput(`${paren}asin(${number})`);
                    const parseNumber = parseFloat(number);
                    // const asinAloneExp = Math.asin(mode === 'Deg' ? parseNumber * (Math.PI / 180) : parseNumber);
                    const asinAloneExp = mode === 'Deg' ? Math.asin(parseNumber) * (180 / Math.PI) : Math.asin(parseNumber)
                    setResult(asinAloneExp);
                    setIntermediateExp(`(${asinAloneExp}`);
                    return;
                  } else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastNumber lastNumber");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("Function in input matching regex condition");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("Detected nested expression with (");
                        const asinAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = asinAlonePN;
                        console.log(paren, number, "Extracted for nested expression");
                        const toBeSet = mode === 'Deg' ? Math.asin(number) * (180 / Math.PI) : Math.asin(number);
                        // const toBeSet = Math.asin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(asin(${removedLP})`);
                        setIntermediateExp(`(${toBeSet}`);
                        return;
                      }
                      const asinResult = mode === 'Deg' ? Math.asin(intermediateExp) * (180 / Math.PI) : Math.asin(intermediateExp)
                      // const asinResult = Math.asin(mode === 'Deg' ? intermediateExp * (Math.PI / 180) : intermediateExp);
                      console.log(asinResult);
                      setResult(asinResult);
                      setIntermediateExp(asinResult);
                      setInput(`asin(${input})`);

                      if (asinResult === Infinity || asinResult === -Infinity || isNaN(asinResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("This is a standalone expression");
                    const asinAloneExp = mode === 'Deg' ? Math.asin(lastNumberFloat) * (180 / Math.PI) : Math.asin(lastNumberFloat)
                    // const asinAloneExp = Math.asin(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                    console.log(asinAloneExp, "asin standalone expression result");
                    setInput(prev => `asin(${lastExpression})`);
                    setIntermediateExp(asinAloneExp);
                    setResult(asinAloneExp);
                    return;
                  }
                } else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastNumber lastNumber");

                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("Processing nested function in last expression");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;

                    if (lastNumInput.startsWith("(")) {
                      console.log("Nested expression starts with (");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const asinWithParenthesis = mode === 'Deg' ? Math.asin(number) * (180 / Math.PI) : Math.asin(number)
                        // const asinWithParenthesis = Math.asin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                        console.log(asinWithParenthesis);
                        setResult(asinWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        setInput(`${previousExpression}${lastOperator}(asin(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${asinWithParenthesis}`);
                        return;
                      }
                      return;
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput);
                    const asinNestedAns = mode === 'Deg' ? Math.asin(parsedlastNumInput) * (180 / Math.PI) : Math.asin(parsedlastNumInput)
                    // const asinNestedAns = Math.asin(mode === 'Deg' ? parsedlastNumInput * (Math.PI / 180) : parsedlastNumInput);
                    console.log(asinNestedAns, "asinNestedAns");
                    setResult(asinNestedAns);

                    if (asinNestedAns === Infinity || asinNestedAns === -Infinity || isNaN(asinNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    setInput(`${previousExpression}${lastOperator}asin(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${asinNestedAns}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("Expression starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = mode === 'Deg' ? Math.asin(number) * (180 / Math.PI) : Math.asin(number)
                      // const numAndParRe = Math.asin(mode === 'Deg' ? number * (Math.PI / 180) : number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(asin(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    } else {
                      console.log("Entered else block for parenthesis handling");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("First value in input expression", input);
                  const asinResult = mode === 'Deg' ? Math.asin(lastNumberFloat) * (180 / Math.PI) : Math.asin(lastNumberFloat)
                  // const asinResult = Math.asin(mode === 'Deg' ? lastNumberFloat * (Math.PI / 180) : lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}asin(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${asinResult}`);

                  console.log(asinResult, "result obtained");
                  setResult(asinResult);
                  return;
                }
              } else {
                console.log("The last exp block is false");
              }
            } catch (error) {
              console.log("Error occurred in asin function");
              setResult("Error");
              setIsError(true);
            }
            break;

          case "acos":
            try {
              const acosOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(acosOpForLastExpOpInfo, "asinOpForLastExpOpInfo");
              if (acosOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = acosOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);
                const lastNumberFloat = parseFloat(lastExpression);
                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number,)
                    setInput(`${paren}acos(${number})`)
                    const parseNumber = parseFloat(number);
                    const acosAloneResult = mode === 'Deg' ? Math.acos(parseNumber) * (180 / Math.PI) : Math.acos(parseNumber);
                    console.log(acosAloneResult, "acosAloneExp");
                    setResult(acosAloneResult);
                    setIntermediateExp(`(${acosAloneResult}`)
                    return
                  }
                  else {
                    console.log(lastOperator, "This is the last operator");
                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const acosAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = acosAlonePN
                        console.log(paren, number, "ddddddd");
                        const parseNumber = parseFloat(number);
                        const acosAloneResult = mode === 'Deg' ? Math.acos(parseNumber) * (180 / Math.PI) : Math.acos(parseNumber);
                        setResult(acosAloneResult);
                        console.log(input, "this is the input")
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(acos(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${acosAloneResult}`)
                        return
                      }
                      const acosAloneResult = mode === 'Deg' ? Math.acos(intermediateExp) * (180 / Math.PI) : Math.acos(intermediateExp);
                      // const asinResult = Math.asin(intermediateExp);;
                      console.log(acosAloneResult);
                      setResult(acosAloneResult);
                      setIntermediateExp(acosAloneResult);
                      // Check for errors (Infinity or NaN)

                      setInput(`acos(${input})`)
                      if (acosAloneResult === Infinity || acosAloneResult === -Infinity || isNaN(acosAloneResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    else {
                      const acosAloneResult = mode === 'Deg' ? Math.acos(lastNumberFloat) * (180 / Math.PI) : Math.acos(lastNumberFloat);
                      // const cosAloneExp = Math.asin(lastNumberFloat);
                      console.log(acosAloneResult, "acosnnAloneExp");
                      setInput(`acos(${lastExpression})`);
                      setIntermediateExp(acosAloneResult)
                      setResult(acosAloneResult);
                      return
                    }

                  }
                }
                else {
                  console.log("lastnumber", lastExpression);
                  const acosAloneResult = mode === 'Deg' ? Math.cos(lastNumberFloat) * (180 / Math.PI) : Math.acos(lastNumberFloat);
                  // const asinResult = Math.asin(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}cos(${lastExpression})`);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastNumInput, "lastNumInput")
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("lastExpression include")
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExop for Ie");
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      console.log("Came into the ( of neseted function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came itnp num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const acosNestedResultwithp = mode === 'Deg' ? Math.acos(number) * (180 / Math.PI) : Math.acos(number);
                        // const asinWithParenthesis = math.asin(number);
                        console.log(acosNestedResultwithp);
                        setResult(acosNestedResultwithp);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(acos(${removedLP})`)
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${acosNestedResultwithp}`);
                        return
                      }
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const acosResultwithoutp = mode === 'Deg' ? Math.acos(parsedlastNumInput) * (180 / Math.PI) : Math.acos(parsedlastNumInput);

                    // const asinNestedAns = math.asin(parsedlastNumInput);
                    console.log(acosResultwithoutp, "acosNestedAns");
                    setResult(acosResultwithoutp)
                    // Check for errors (Infinity or NaN)
                    if (acosResultwithoutp === Infinity || acosResultwithoutp === -Infinity || isNaN(acosResultwithoutp)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}acos(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${acosResultwithoutp}`);
                    return
                  }

                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const acosnNumAndParRe = mode === 'Deg' ? Math.acos(number) * (180 / Math.PI) : Math.acos(number);
                      // const numAndParRe = math.asin(number);
                      setResult(acosnNumAndParRe);
                      setInput(`${previousExpression}${lastOperator}(acos(${number})`)
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${acosnNumAndParRe}`)
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${acosAloneResult}`)
                  console.log(acosAloneResult);
                  setResult(acosAloneResult)
                  return
                }
              }
              else {
                console.log("the last exp block is faaaaalse");
              }
            } catch (error) {
              setResult("Error")
              setIsError(true)
            }
            break;

          case "atan":
            try {
              const atanOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(atanOpForLastExpOpInfo, "atanOpForLastExpOpInfo");
              if (atanOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = atanOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);
                const lastNumberFloat = parseFloat(lastExpression);
                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number);
                    setInput(`${paren}atan(${number})`);
                    const parseNumber = parseFloat(number);
                    const atanAloneResult = mode === 'Deg' ? Math.atan(parseNumber) * (180 / Math.PI) : Math.atan(parseNumber);
                    console.log(atanAloneResult, "atanAloneExp");
                    setResult(atanAloneResult);
                    setIntermediateExp(`(${atanAloneResult}`);
                    return;
                  } else {
                    console.log(lastOperator, "This is the last operator");
                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const atanAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = atanAlonePN;
                        console.log(paren, number, "ddddddd");
                        const parseNumber = parseFloat(number);
                        const atanAloneResult = mode === 'Deg' ? Math.atan(parseNumber) * (180 / Math.PI) : Math.atan(parseNumber);
                        setResult(atanAloneResult);
                        console.log(input, "this is the input");
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(atan(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp);
                        setIntermediateExp(`(${atanAloneResult}`);
                        return;
                      }
                      const atanAloneResult = mode === 'Deg' ? Math.atan(intermediateExp) * (180 / Math.PI) : Math.atan(intermediateExp);
                      console.log(atanAloneResult);
                      setResult(atanAloneResult);
                      setIntermediateExp(atanAloneResult);
                      // Check for errors (Infinity or NaN)
                      setInput(`atan(${input})`);
                      if (atanAloneResult === Infinity || atanAloneResult === -Infinity || isNaN(atanAloneResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    } else {
                      const atanAloneResult = mode === 'Deg' ? Math.atan(lastNumberFloat) * (180 / Math.PI) : Math.atan(lastNumberFloat);
                      console.log(atanAloneResult, "atanAloneExp");
                      setInput(`atan(${lastExpression})`);
                      setIntermediateExp(atanAloneResult);
                      setResult(atanAloneResult);
                      return;
                    }
                  }
                } else {
                  console.log("lastnumber", lastExpression);
                  const atanAloneResult = mode === 'Deg' ? Math.atan(lastNumberFloat) * (180 / Math.PI) : Math.atan(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}atan(${lastExpression})`);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastNumInput, "lastNumInput");
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("lastExpression include");
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExop for Ie");
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      console.log("Came into the ( of neseted function");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        console.log("came into num and par nested starts with (");
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const atanNestedResultWithP = mode === 'Deg' ? Math.atan(number) * (180 / Math.PI) : Math.atan(number);
                        console.log(atanNestedResultWithP);
                        setResult(atanNestedResultWithP);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp");
                        setInput(`${previousExpression}${lastOperator}(atan(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${atanNestedResultWithP}`);
                        return;
                      }
                    }
                    const parsedLastNumInput = parseFloat(lastNumInput);
                    const atanResultWithoutP = mode === 'Deg' ? Math.atan(parsedLastNumInput) * (180 / Math.PI) : Math.atan(parsedLastNumInput);
                    console.log(atanResultWithoutP, "atanResultWithoutP");
                    setResult(atanResultWithoutP);
                    // Check for errors (Infinity or NaN)
                    if (atanResultWithoutP === Infinity || atanResultWithoutP === -Infinity || isNaN(atanResultWithoutP)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}atan(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${atanResultWithoutP}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const atanNumAndParRe = mode === 'Deg' ? Math.atan(number) * (180 / Math.PI) : Math.atan(number);
                      setResult(atanNumAndParRe);
                      setInput(`${previousExpression}${lastOperator}(atan(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${atanNumAndParRe}`);
                    } else {
                      console.log("entered into else statement");
                      return;
                    }
                    return;
                  }
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${atanAloneResult}`);
                  console.log(atanAloneResult);
                  setResult(atanAloneResult);
                  return;
                }
              } else {
                console.log("the last exp block is faaaaalse");
              }
            } catch (error) {
              setResult("Error");
              setIsError(true);
            }
            break;

          case "sinh":
            try {
              console.log("Mode:", mode);
              const sinhOpForLastExpOpInfo = extractDetailsLastExp(input)
              console.log(sinhOpForLastExpOpInfo, "sinopfor last ex[");
              if (sinhOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = sinhOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);
                // let functionInput = shouldAddParen ? 'sinh(' : 'sinh';

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number)
                    setInput(`${paren}sinh(${number})`);
                    const parseNumber = parseFloat(number)
                    const sinhAloneExp = Math.sinh(parseNumber);
                    setResult(sinhAloneExp)
                    setIntermediateExp(`(${sinhAloneExp}`);
                    return;
                  }
                  else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastNumber lastNumber");
                    // here we can take lastExpression or input because the input and last expression will be same, as i followed input for the prev, here also i am using input
                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      // here intermediate exp will be like 0.34343234 something
                      console.log("ininput && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input) funciton ");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const sinhAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = sinhAlonePN;
                        console.log(paren, number, "ddddddd");
                        const toBeSet = math.sinh(number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(sinh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${toBeSet}`)
                        setResult(toBeSet)
                        return
                      }
                      const sinhResult = Math.sinh(intermediateExp);;
                      console.log(sinhResult);
                      setResult(sinhResult);
                      setIntermediateExp(sinhResult);
                      // Check for errors (Infinity or NaN)

                      setInput(`sinh(${input})`)
                      if (sinhResult === Infinity || sinhResult === -Infinity || isNaN(sinhResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("this is alone expression");
                    const sinhAloneExp = Math.sinh(lastNumberFloat);
                    console.log(sinhAloneExp, "sinh alone expression to be set to result value");
                    setInput(prev => `sinh(${lastExpression})`);
                    setIntermediateExp(sinhAloneExp);
                    setResult(sinhAloneExp);
                    return
                  }

                }
                else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastNumber lastNumber");
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExop for Ie");
                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of neseted function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came itnp num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const sinhWithParenthesis = math.sinh(number);
                        console.log(sinhWithParenthesis);
                        setResult(sinhWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(sinh(${removedLP})`)
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${sinhWithParenthesis}`);
                        return
                      }
                      return
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const sinhNestedAns = math.sinh(parsedlastNumInput);
                    console.log(sinhNestedAns, "sinhNestedAns");
                    setResult(sinhNestedAns)
                    // Check for errors (Infinity or NaN)
                    if (sinhNestedAns === Infinity || sinhNestedAns === -Infinity || isNaN(sinhNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}sinh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sinhNestedAns}`);
                    return
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = math.sinh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(sinh(${number})`)
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`)
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("this is the first val in input expression and input is", input);
                  const sinhResult = Math.sinh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}sinh(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${sinhResult}`)

                  console.log(sinhResult, "result obtained");
                  setResult(sinhResult)
                  return
                }
              }
              else {
                console.log("the last exp block is faaaaalse");
              }

            } catch (error) {
              console.log("Error happened in sinh function");
              setResult("Error");
              setIsError(true)
            }
            break;

          case "cosh":
            try {
              const coshOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(coshOpForLastExpOpInfo, "coshOpForLastExpOpInfo");
              if (coshOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = coshOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);
                const lastNumberFloat = parseFloat(lastExpression);
                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number,)
                    setInput(`${paren}cosh(${number})`)
                    const parseNumber = parseFloat(number);
                    const cosAloneExp = Math.cosh(parseNumber);
                    console.log(cosAloneExp, "cosAloneExp");
                    console.log(cosAloneExp, "cosAloneExp");
                    setResult(cosAloneExp);
                    setIntermediateExp(`(${cosAloneExp}`)
                    return
                  }
                  else {
                    console.log(lastOperator, "This is the last operator");
                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)");
                      console.log(intermediateExp, "this is the intexp")
                      //  const parsedIE=parseFloat(intermediateExp)
                      const is = String(intermediateExp).startsWith('(');
                      console.log(is)
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const coshAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = coshAlonePN
                        console.log(paren, number, "ddddddd");
                        const toBeSet = math.cosh(number)
                        setResult(toBeSet);
                        console.log(input, "this is the input")
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(cosh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${toBeSet}`)
                        return
                      }
                      console.log("in the else of not starting with(")
                      console.log(intermediateExp, "thisis int")
                      const coshResult = Math.cosh(intermediateExp);;
                      console.log(coshResult);
                      setResult(coshResult);
                      setIntermediateExp(coshResult);
                      // Check for errors (Infinity or NaN)

                      setInput(`cosh(${input})`)
                      if (coshResult === Infinity || coshResult === -Infinity || isNaN(coshResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    else {
                      console.log("came to the mathelse")
                      const cosAloneExp = Math.cosh(lastNumberFloat);
                      console.log(cosAloneExp, "cosAloneExp");
                      setInput(`cosh(${lastExpression})`);
                      setIntermediateExp(cosAloneExp)
                      setResult(cosAloneExp);
                      return
                    }

                  }
                }
                else {
                  console.log("lastnumber", lastExpression);
                  const coshResult = Math.cosh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}cosh(${lastExpression})`);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastNumInput, "lastNumInput")
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("lastExpression include")
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExop for Ie");
                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of neseted function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came itnp num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const coshWithParenthesis = math.cosh(number);
                        console.log(coshWithParenthesis);
                        setResult(coshWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(cosh(${removedLP})`)
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${coshWithParenthesis}`);
                        return
                      }
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const coshNestedAns = math.cosh(parsedlastNumInput);
                    console.log(coshNestedAns, "coshNestedAns");
                    setResult(coshNestedAns)
                    // Check for errors (Infinity or NaN)
                    if (coshNestedAns === Infinity || coshNestedAns === -Infinity || isNaN(coshNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}cosh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${coshNestedAns}`);
                    return
                  }

                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = math.cosh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(cosh(${number})`)
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`)
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${coshResult}`)
                  console.log(coshResult);
                  setResult(coshResult)
                  return
                }
              }
              else {
                console.log("the last exp block is faaaaalse");
              }
            } catch (error) {
              setResult("Error")
              setIsError(true)
            }
            break;

          // four places lo i have to set them
          case "tanh":
            try {
              const tanhOpForLastExpInfo = extractDetailsLastExp(input);
              console.log(tanhOpForLastExpInfo);
              if (tanhOpForLastExpInfo) {
                console.log("The last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = tanhOpForLastExpInfo;
                const lastNumberFloat = parseFloat(lastExpression);
                const parseFloatLastNum = parseFloat(lastExpression);
                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number,)
                    setInput(`${paren}tanh(${number})`);
                    const parseNumber = parseFloat(number);
                    const tanAloneExp = Math.tanh(parseNumber);
                    setResult(tanAloneExp);
                    setIntermediateExp(`(${tanAloneExp}`)
                    return
                  }
                  else {
                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const tanhAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = tanhAlonePN
                        console.log(paren, number, "ddddddd");
                        const toBeSet = math.tanh(number)
                        setResult(toBeSet);
                        console.log(input, "this is the input")
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(tanh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${toBeSet}`)
                        return
                      }
                      const tanhResult = Math.tanh(intermediateExp);;
                      console.log(tanhResult);
                      setResult(tanhResult);
                      setIntermediateExp(tanhResult);
                      // Check for errors (Infinity or NaN)

                      setInput(`tanh(${input})`)
                      if (tanhResult === Infinity || tanhResult === -Infinity || isNaN(tanhResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    else {
                      console.log("this is alone exp");
                      const tanAloneExp = Math.tanh(parseFloatLastNum);
                      console.log(tanAloneExp, "tanAloneExpression");
                      setInput(`tanh(${lastExpression})`);
                      setIntermediateExp(tanAloneExp);
                      setResult(tanAloneExp)
                      return;
                    }

                  }
                }
                // else {
                //   const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);

                //   console.log("lastNumber", lastExpression);
                //   const tanhResult = Math.tanh(parseFloatLastNum);
                //   setResult(tanhResult)
                //   setInput(`${previousExpression}${lastOperator}tanh(${lastExpression})`);
                //   setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${tanhResult}`)
                //   return
                // }
                else {
                  console.log("lastnumber", lastExpression);
                  const tanhResult = Math.tanh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}tanh(${lastExpression})`);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastNumInput, "lastNumInput")
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("lastExpression include")
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExop for Ie");
                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of neseted function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came itnp num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const tanhWithParenthesis = math.tanh(number);
                        console.log(tanhWithParenthesis);
                        setResult(tanhWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(tanh(${removedLP})`)
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${tanhWithParenthesis}`);
                        return
                      }
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const tanhNestedAns = math.tanh(parsedlastNumInput);
                    console.log(tanhNestedAns, "coshNestedAns");
                    setResult(tanhNestedAns)
                    // Check for errors (Infinity or NaN)
                    if (tanhNestedAns === Infinity || tanhNestedAns === -Infinity || isNaN(tanhNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}cosh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${tanhNestedAns}`);
                    return
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = math.tanh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(tanh(${number})`)
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`)
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${tanhResult}`)
                  console.log(tanhResult);
                  setResult(tanhResult)
                  return
                }
              }
            } catch (error) {
              setResult("Error")
              setIsError(true)
            }
            break;
          // ******************************************************************************************************

          case "asinh":
            try {
              console.log("Mode:", mode);
              const asinhOpForLastExpOpInfo = extractDetailsLastExp(input);
              console.log(asinhOpForLastExpOpInfo, "asinhOpForLastExpOpInfo");

              if (asinhOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = asinhOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number);
                    setInput(`${paren}asinh(${number})`);
                    const parseNumber = parseFloat(number);
                    const asinhAloneExp = Math.asinh(parseNumber);
                    setResult(asinhAloneExp);
                    setIntermediateExp(`(${asinhAloneExp}`);
                    return;
                  } else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastExpression lastExpression");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input function");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const asinhAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = asinhAlonePN;
                        console.log(paren, number);
                        const toBeSet = Math.asinh(number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input);
                        setInput(`(asinh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp);
                        setIntermediateExp(`(${toBeSet}`);
                        return;
                      }
                      const asinhResult = Math.asinh(intermediateExp);
                      console.log(asinhResult);
                      setResult(asinhResult);
                      setIntermediateExp(asinhResult);

                      // Check for errors (Infinity or NaN)
                      setInput(`asinh(${input})`);
                      if (asinhResult === Infinity || asinhResult === -Infinity || isNaN(asinhResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return;
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("this is alone expression");
                    const asinhAloneExp = Math.asinh(lastNumberFloat);
                    console.log(asinhAloneExp, "asinh alone expression to be set to result value");
                    setInput(prev => `asinh(${lastExpression})`);
                    setIntermediateExp(asinhAloneExp);
                    setResult(asinhAloneExp);
                    return;
                  }
                } else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastExpression lastExpression");
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExpForIE");

                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of nested function");
                      const numAndParForNested = extractParenAndNumber(lastNumInput);
                      if (numAndParForNested) {
                        console.log("came into num and par nested starts with (");
                        const { paren, number } = numAndParForNested;
                        console.log(paren, number);
                        const asinhWithParenthesis = Math.asinh(number);
                        console.log(asinhWithParenthesis);
                        setResult(asinhWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp");
                        setInput(`${previousExpression}${lastOperator}(asinh(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${asinhWithParenthesis}`);
                        return;
                      }
                      return;
                    }

                    const parsedlastNumInput = parseFloat(lastNumInput);
                    const asinhNestedAns = Math.asinh(parsedlastNumInput);
                    console.log(asinhNestedAns, "asinhNestedAns");
                    setResult(asinhNestedAns);

                    // Check for errors (Infinity or NaN)
                    if (asinhNestedAns === Infinity || asinhNestedAns === -Infinity || isNaN(asinhNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }

                    setInput(`${previousExpression}${lastOperator}asinh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${asinhNestedAns}`);
                    return;
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar);
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.asinh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(asinh(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    } else {
                      console.log("entered into else statement");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("this is the first val in input expression and input is", input);
                  const asinhResult = Math.asinh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}asinh(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${asinhResult}`);

                  console.log(asinhResult, "result obtained");
                  setResult(asinhResult);
                  return;
                }
              } else {
                console.log("the last exp block is faaaaalse");
              }
            } catch (error) {
              console.log("Error happened in asinh function");
              setResult("Error");
              setIsError(true);
            }
            break;

          case "acosh":
            try {
              console.log("Mode:", mode);
              const acoshOpForLastExpOpInfo = extractDetailsLastExp(input)
              console.log(acoshOpForLastExpOpInfo, "acoshOpForLastExpOpInfo");
              if (acoshOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = acoshOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number)
                    setInput(`${paren}acosh(${number})`);
                    const parseNumber = parseFloat(number)
                    const acoshAloneExp = Math.acosh(parseNumber);
                    setResult(acoshAloneExp)
                    setIntermediateExp(`(${acoshAloneExp}`);
                    return;
                  }
                  else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastExpression lastExpression");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input) function ");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const acoshAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = acoshAlonePN;
                        console.log(paren, number, "ddddddd");
                        const toBeSet = Math.acosh(number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(acosh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${toBeSet}`);
                        return
                      }
                      const acoshResult = Math.acosh(intermediateExp);
                      console.log(acoshResult);
                      setResult(acoshResult);
                      setIntermediateExp(acoshResult);
                      // Check for errors (Infinity or NaN)
                      setInput(`acosh(${input})`);
                      if (acoshResult === Infinity || acoshResult === -Infinity || isNaN(acoshResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("this is alone expression");
                    const acoshAloneExp = Math.acosh(lastNumberFloat);
                    console.log(acoshAloneExp, "acosh alone expression to be set to result value");
                    setInput(prev => `acosh(${lastExpression})`);
                    setIntermediateExp(acoshAloneExp);
                    setResult(acoshAloneExp);
                    return
                  }

                }
                else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastExpression lastExpression");
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExpForIE");
                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of nested function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came into num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const acoshWithParenthesis = Math.acosh(number);
                        console.log(acoshWithParenthesis);
                        setResult(acoshWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(acosh(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${acoshWithParenthesis}`);
                        return
                      }
                      return
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const acoshNestedAns = Math.acosh(parsedlastNumInput);
                    console.log(acoshNestedAns, "acoshNestedAns");
                    setResult(acoshNestedAns);
                    // Check for errors (Infinity or NaN)
                    if (acoshNestedAns === Infinity || acoshNestedAns === -Infinity || isNaN(acoshNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}acosh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${acoshNestedAns}`);
                    return
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.acosh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(acosh(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("this is the first val in input expression and input is", input);
                  const acoshResult = Math.acosh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}acosh(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${acoshResult}`);

                  console.log(acoshResult, "result obtained");
                  setResult(acoshResult)
                  return
                }
              }
              else {
                console.log("the last exp block is false");
              }

            } catch (error) {
              console.log("Error happened in acosh function");
              setResult("Error");
              setIsError(true)
            }
            break;
          case "atanh":
            try {
              console.log("Mode:", mode);
              const atanhOpForLastExpOpInfo = extractDetailsLastExp(input)
              console.log(atanhOpForLastExpOpInfo, "atanhOpForLastExpOpInfo");
              if (atanhOpForLastExpOpInfo) {
                console.log("the last exp block is true");
                const { previousExpression, lastOperator, lastExpression } = atanhOpForLastExpOpInfo;
                console.log(previousExpression, lastOperator, lastExpression);

                if (lastOperator === null) {
                  const parentInfo = extractParenAndNumber(input);
                  if (parentInfo) {
                    const { paren, number } = parentInfo;
                    console.log(paren, "paren,number", number)
                    setInput(`${paren}atanh(${number})`);
                    const parseNumber = parseFloat(number)
                    const atanhAloneExp = Math.atanh(parseNumber);
                    setResult(atanhAloneExp)
                    setIntermediateExp(`(${atanhAloneExp}`);
                    return;
                  }
                  else {
                    console.log(lastOperator, "lastOperator lastOperator");
                    console.log(lastExpression, "lastExpression lastExpression");

                    if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                      console.log("in input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input) function ");
                      const is = String(intermediateExp).startsWith('(');
                      if (is) {
                        console.log("this is the ( nested alone exp");
                        const atanhAlonePN = extractParenAndNumber(intermediateExp);
                        const { paren, number } = atanhAlonePN;
                        console.log(paren, number, "ddddddd");
                        const toBeSet = Math.atanh(number);
                        console.log(toBeSet);
                        const removedLP = removeLeadingParenthesis(input)
                        setInput(`(atanh(${removedLP})`);
                        console.log("this is the intermediate exp", intermediateExp)
                        setIntermediateExp(`(${toBeSet}`);
                        return
                      }
                      const atanhResult = Math.atanh(intermediateExp);
                      console.log(atanhResult);
                      setResult(atanhResult);
                      setIntermediateExp(atanhResult);
                      // Check for errors (Infinity or NaN)
                      setInput(`atanh(${input})`);
                      if (atanhResult === Infinity || atanhResult === -Infinity || isNaN(atanhResult)) {
                        setIsError(true);
                        console.log("Error: Result is Infinity or NaN");
                        return;
                      }
                      return
                    }
                    const lastNumberFloat = parseFloat(lastExpression);
                    console.log("last number in lastOperator===null", lastNumberFloat);
                    console.log("this is alone expression");
                    const atanhAloneExp = Math.atanh(lastNumberFloat);
                    console.log(atanhAloneExp, "atanh alone expression to be set to result value");
                    setInput(prev => `atanh(${lastExpression})`);
                    setIntermediateExp(atanhAloneExp);
                    setResult(atanhAloneExp);
                    return
                  }

                }
                else {
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                  console.log(lastExpression, "lastExpression lastExpression");
                  if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                    console.log("in the lastExp nested function");
                    const lastExpForIE = extractDetailsLastExp(intermediateExp);
                    const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                    console.log(lastExpForIE, "this is the lastExpForIE");
                    if (lastNumInput.startsWith("(")) {
                      console.log("Came into the ( of nested function")
                      const numAndParForNested = extractParenAndNumber(lastNumInput)
                      if (numAndParForNested) {
                        console.log("came into num and par nested starts with (");
                        const { paren, number } = numAndParForNested
                        console.log(paren, number);
                        const atanhWithParenthesis = Math.atanh(number);
                        console.log(atanhWithParenthesis);
                        setResult(atanhWithParenthesis);
                        const removedLP = removeLeadingParenthesis(lastExpression);
                        console.log(removedLP, "this is the exp after removing lp")
                        setInput(`${previousExpression}${lastOperator}(atanh(${removedLP})`);
                        setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${atanhWithParenthesis}`);
                        return
                      }
                      return
                    }
                    const parsedlastNumInput = parseFloat(lastNumInput)
                    const atanhNestedAns = Math.atanh(parsedlastNumInput);
                    console.log(atanhNestedAns, "atanhNestedAns");
                    setResult(atanhNestedAns);
                    // Check for errors (Infinity or NaN)
                    if (atanhNestedAns === Infinity || atanhNestedAns === -Infinity || isNaN(atanhNestedAns)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;  // Prevent further calculations
                    }
                    setInput(`${previousExpression}${lastOperator}atanh(${lastExpression})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${atanhNestedAns}`);
                    return
                  }
                  if (lastNumInput.startsWith("(")) {
                    console.log("this starts with open parenthesis");
                    const numAndPar = extractParenAndNumber(lastNumInput);
                    console.log(numAndPar)
                    if (numAndPar) {
                      const { paren, number } = numAndPar;
                      console.log(number, paren);
                      const numAndParRe = Math.atanh(number);
                      setResult(numAndParRe);
                      setInput(`${previousExpression}${lastOperator}(atanh(${number})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                    }
                    else {
                      console.log("entered into else statement");
                      return
                    }
                    return
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("this is the first val in input expression and input is", input);
                  const atanhResult = Math.atanh(lastNumberFloat);
                  setInput(`${previousExpression}${lastOperator}atanh(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${atanhResult}`);

                  console.log(atanhResult, "result obtained");
                  setResult(atanhResult)
                  return
                }
              }
              else {
                console.log("the last exp block is false");
              }

            } catch (error) {
              console.log("Error happened in atanh function");
              setResult("Error");
              setIsError(true)
            }
            break;
          // *****************************************************************
          default:
            break;
        }

      } catch (error) {
        setResult("Error");
        setIsError(true)
      }
    };








  // const handleLogFunction = (func) => {
  //   if (isError) {
  //     console.log("Is error in handleLog function");
  //     return
  //   }
  //   let calculatedLogValue;
  //   let inputOrResult = input || result;
  //   try {
  //     // Calculate log based on the input
  //     switch (func) {
  //       case "log":
  //         try {
  //           const logOpInfo = extractDetails(input);
  //           console.log(logOpInfo);
  //           const { previousExpression, lastOperator, lastNumber } = logOpInfo;
  //           if (logOpInfo) {
  //             if (lastOperator !== null) {
  //               const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);

  //               setInput(`${previousExpression}${lastOperator}log(${lastNumber})`);
  //               const logResult = math.log10(lastNumber);
  //               setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${logResult}`);
  //               console.log(logResult);
  //               setResult(logResult);
  //               return
  //             }
  //             else {
  //               const parentInfo = extractParenAndNumber(input);
  //               if (parentInfo) {
  //                 const { paren, number } = parentInfo;
  //                 console.log(paren, number, "paren,number")
  //                 setInput(`${paren}log(${number})`);
  //                 const logAloneExpRes = math.log10(number);
  //                 console.log(logAloneExpRes);
  //                 setResult(logAloneExpRes);
  //                 setIntermediateExp(`(${logAloneExpRes}`)
  //                 return;
  //               }
  //               else {
  //                 console.log("the operator is null here");
  //                 setInput(`log(${input})`);
  //                 const logAloneExpRes = math.log10(input);
  //                 console.log(logAloneExpRes);
  //                 setIntermediateExp(logAloneExpRes)
  //                 setResult(logAloneExpRes);
  //                 return
  //               }

  //             }
  //           }
  //         } catch (error) {
  //           setResult("Error")
  //           setIsError(true)
  //         }
  //         break;
  //       // log2asdf
  //       case "log2":
  //         const log2OpInfo = extractDetails(input);
  //         console.log(log2OpInfo);
  //         if (log2OpInfo) {
  //           console.log("Ths is the block in which there is some prev exp in the input");
  //           const { previousExpression, lastOperator, lastNumber } = log2OpInfo;
  //           if (lastOperator !== null) {
  //             setInput(`${previousExpression}${lastOperator}logXbase2(${lastNumber})`);
  //             const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);
  //             const log2ExpResult = math.log2(lastNumber);
  //             setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${log2ExpResult}`)

  //             setResult(log2ExpResult);
  //             return
  //           }
  //           else {

  //             const parentInfo = extractParenAndNumber(input);
  //             if (parentInfo) {
  //               const { paren, number } = parentInfo;
  //               console.log(paren, number, "paren,number")
  //               setInput(`${paren}logXbase2(${number})`);
  //               const log2Result = math.log2(number);
  //               console.log(log2Result);
  //               setResult(log2Result);
  //               setIntermediateExp(`(${log2Result}`)
  //               return;
  //             } else {
  //               console.log("the operator is nll here");
  //               setInput(`logXbase2(${input})`);
  //               const log2Result = math.log2(input);
  //               setIntermediateExp(log2Result)
  //               setResult(log2Result)
  //               return
  //             }


  //           }
  //         }
  //         else {
  //           console.log("the operator is nll here total else nlockkkkkkkkkkk");
  //           // setInput(`logXbase2(${input})`);
  //           // const log2Result=math.log2(input);
  //           // setResult(log2Result)
  //         }

  //         break;
  //       case "loge":
  //         console.log(input, "This is the input");
  //         console.log("This is in the ln function, the input is", input);
  //         if (input.trim().startsWith('-')) {
  //           console.log("Negative number detected");
  //           const negativeNumber = input.trim().substring(1);
  //           console.log("Negative number is", negativeNumber);
  //           setInput(`0-ln(${negativeNumber})`)
  //           const calculatedNegLnVal = math.log(math.evaluate(negativeNumber))
  //           setResult(calculatedNegLnVal)
  //           // vnaaa
  //           return;
  //         }
  //         const logeOpInfo = extractDetails(input);
  //         console.log(logeOpInfo);
  //         const { previousExpression, lastOperator, lastNumber } = logeOpInfo;
  //         if (lastOperator === null) {
  //           const parentInfo = extractParenAndNumber(input);
  //           if (parentInfo) {
  //             const { paren, number } = parentInfo;
  //             console.log(paren, number, "paren,number")
  //             setInput(`${paren}ln(${number})`);
  //             const logResult = Math.log(number);
  //             console.log(logResult);
  //             setResult(logResult);
  //             setIntermediateExp(`(${logResult}`)
  //             return;
  //           }
  //           else {
  //             setInput(`ln(${lastNumber})`);
  //             const logResult = Math.log(lastNumber);
  //             setResult(logResult);
  //             setIntermediateExp(logResult)
  //             console.log(logResult);
  //             return
  //           }


  //         }
  //         else {
  //           console.log("There is prev exp");
  //           const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);

  //           setInput(`${previousExpression}${lastOperator}ln(${lastNumber})`);
  //           const logResult = Math.log(lastNumber);
  //           setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${logResult}`)
  //           setResult(logResult)
  //           // return;
  //         }

  //         break;

  //         //  i think this is not present
  //       case "logxy":
  //         const [x, y] = inputOrResult.split(",").map(val => math.evaluate(val.trim()));
  //         if (x <= 0 || x === 1 || y <= 0) throw new Error("Base must be > 0 and not 1, and argument must be > 0.");
  //         calculatedLogValue = math.log(y) / math.log(x);
  //         setResult(calculatedLogValue);
  //         setInput(calculatedLogValue);
  //         setIntermediateExp(calculatedLogValue)
  //         break;
  //       default:
  //         return;
  //     }
  //   } catch (error) {
  //     setResult("Error");
  //     console.error("Error occurred:", error);
  //   }
  // };

  const handleLogFunction = (func) => {
    if (isError) {
      console.log("Is error in handleLog function");
      return
    }
    let calculatedLogValue;
    let inputOrResult = input || result;
    try {
      // Calculate log based on the input
      switch (func) {

        case "log":
          try {
            console.log("Mode:", mode);
            const log10OpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(log10OpForLastExpOpInfo, "log10OpForLastExpOpInfo");
            if (log10OpForLastExpOpInfo) {
              console.log("the last exp block is true");
              const { previousExpression, lastOperator, lastExpression } = log10OpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}log(${number})`);
                  const parseNumber = parseFloat(number);
                  const log10AloneExp = Math.log10(parseNumber);
                  setResult(log10AloneExp);
                  setIntermediateExp(`(${log10AloneExp}`);
                  return;
                } else {
                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      const log10AlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = log10AlonePN;
                      const toBeSet = Math.log10(number);
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(log(${removedLP})`);
                      setIntermediateExp(`(${toBeSet}`);
                      setResult(toBeSet)
                      return;
                    }
                    const log10Result = Math.log10(intermediateExp);
                    setResult(log10Result);
                    setIntermediateExp(log10Result);
                    setInput(`log(${input})`);
                    if (log10Result === Infinity || log10Result === -Infinity || isNaN(log10Result)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  const log10AloneExp = Math.log10(lastNumberFloat);
                  setInput(prev => `log(${lastExpression})`);
                  setIntermediateExp(log10AloneExp);
                  setResult(log10AloneExp);
                  return;
                }
              } else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                  if (lastNumInput.startsWith("(")) {
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      const { paren, number } = numAndParForNested;
                      const log10WithParenthesis = Math.log10(number);
                      setResult(log10WithParenthesis);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      setInput(`${previousExpression}${lastOperator}(log(${removedLP}))`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${log10WithParenthesis}`);
                      return;
                    }
                  }
                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const log10NestedAns = Math.log10(parsedlastNumInput);
                  setResult(log10NestedAns);
                  if (log10NestedAns === Infinity || log10NestedAns === -Infinity || isNaN(log10NestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }
                  setInput(`${previousExpression}${lastOperator}log(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${log10NestedAns}`);
                  return;
                }
                if (lastNumInput.startsWith("(")) {
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    const numAndParRe = Math.log10(number);
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(log(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                  } else {
                    console.log("entered into else statement");
                    return;
                  }
                  return;
                }
                const lastNumberFloat = parseFloat(lastExpression);
                const log10Result = Math.log10(lastNumberFloat);
                setInput(`${previousExpression}${lastOperator}log(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${log10Result}`);
                setResult(log10Result);
                return;
              }
            } else {
              console.log("the last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in log10 function");
            setResult("Error");
            setIsError(true);
          }
          break;
        // **********************************************

        case "log2":
          try {
            console.log("Mode:", mode);
            const log2OpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(log2OpForLastExpOpInfo, "log2OpFor last exp");

            if (log2OpForLastExpOpInfo) {
              console.log("The last exp block is true");
              const { previousExpression, lastOperator, lastExpression } = log2OpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}logXbase2(${number})`);
                  const parseNumber = parseFloat(number);
                  const log2AloneExp = Math.log2(parseNumber);
                  setResult(log2AloneExp);
                  setIntermediateExp(`(${log2AloneExp}`);
                  return;
                } else {
                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      const log2AlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = log2AlonePN;
                      const toBeSet = Math.log2(number);
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(logXbase2(${removedLP})`);
                      setIntermediateExp(`(${toBeSet}`);
                      setResult(toBeSet)
                      return;
                    }
                    const log2Result = Math.log2(intermediateExp);
                    setResult(log2Result);
                    setIntermediateExp(log2Result);

                    setInput(`logXbase2(${input})`);
                    if (log2Result === Infinity || log2Result === -Infinity || isNaN(log2Result)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }

                  const lastNumberFloat = parseFloat(lastExpression);
                  const log2AloneExp = Math.log2(lastNumberFloat);
                  setInput(prev => `logXbase2(${lastExpression})`);
                  setIntermediateExp(log2AloneExp);
                  setResult(log2AloneExp);
                  return;
                }
              } else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                  if (lastNumInput.startsWith("(")) {
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      const { paren, number } = numAndParForNested;
                      const log2WithParenthesis = Math.log2(number);
                      setResult(log2WithParenthesis);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      setInput(`${previousExpression}${lastOperator}(logXbase2(${removedLP})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${log2WithParenthesis}`);
                      return;
                    }
                    return;
                  }

                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const log2NestedAns = Math.log2(parsedlastNumInput);
                  setResult(log2NestedAns);

                  if (log2NestedAns === Infinity || log2NestedAns === -Infinity || isNaN(log2NestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }
                  setInput(`${previousExpression}${lastOperator}logXbase2(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${log2NestedAns}`);
                  return;
                }

                if (lastNumInput.startsWith("(")) {
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    const numAndParRe = Math.log2(number);
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(logXbase2(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                  } else {
                    return;
                  }
                  return;
                }

                const lastNumberFloat = parseFloat(lastExpression);
                const log2Result = Math.log2(lastNumberFloat);
                setInput(`${previousExpression}${lastOperator}logXbase2(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${log2Result}`);
                setResult(log2Result);
                return;
              }
            } else {
              console.log("The last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in log2 function");
            setResult("Error");
            setIsError(true);
          }
          break;
        //  *********************************************

        case "loge":
          // Case 1: If input is a negative number (starts with a '-')
          if (input.trim().startsWith('-')) {
            console.log("Negative number detected");
            const negativeNumber = input.trim(); // Keep the negative sign with the number

            // Set the input to show the expression as `ln(-9)`
            setInput(`ln(${negativeNumber})`);

            // Check if the number is negative; for ln of negative number, return NaN
            const calculatedNegLnVal = Math.log(negativeNumber); // `Math.log` will return NaN for negative numbers
            setResult("NaN");  // Set result as NaN for invalid logarithm
            setIntermediateExp("NaN");  // Set intermediate expression to NaN

            console.log("Log result for negative number:", calculatedNegLnVal);
            return;  // Exit early as we handled the negative case
          }
          try {
            console.log("Mode:", mode);
            const logOpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(logOpForLastExpOpInfo, "logOpForLastExpOpInfo");
            if (logOpForLastExpOpInfo) {
              console.log("The last exp block is true");
              const { previousExpression, lastOperator, lastExpression } = logOpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}ln(${number})`);
                  const parseNumber = parseFloat(number);
                  const logAloneExp = Math.log(parseNumber);
                  setResult(logAloneExp);
                  setIntermediateExp(`(${logAloneExp}`);
                  return;
                } else {
                  console.log(lastOperator, "lastOperator lastOperator");
                  console.log(lastExpression, "lastExpression lastExpression");

                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                    console.log("Input contains a function");
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      console.log("This is the nested alone expression");
                      const logAlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = logAlonePN;
                      console.log(paren, number);
                      const toBeSet = Math.log(number);
                      console.log(toBeSet);
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(ln(${removedLP})`);
                      console.log("This is the intermediate expression", intermediateExp);
                      setIntermediateExp(`(${toBeSet}`);
                      setResult(toBeSet)
                      return;
                    }
                    const logResult = Math.log(intermediateExp);
                    console.log(logResult);
                    setResult(logResult);
                    setIntermediateExp(logResult);
                    setInput(`ln(${input})`);
                    if (logResult === Infinity || logResult === -Infinity || isNaN(logResult)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }

                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("Last number in lastOperator === null", lastNumberFloat);
                  console.log("This is an alone expression");
                  const logAloneExp = Math.log(lastNumberFloat);
                  console.log(logAloneExp, "Log alone expression to be set to result value");
                  setInput(prev => `ln(${lastExpression})`);
                  setIntermediateExp(logAloneExp);
                  setResult(logAloneExp);
                  return;
                }

              } else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                console.log(lastExpression, "lastExpression lastExpression");

                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                  console.log("In the lastExp nested function");
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                  console.log(lastExpForIE, "This is the lastExp for IE");

                  if (lastNumInput.startsWith("(")) {
                    console.log("Came into the nested function with open parenthesis");
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      console.log("Came into num and par nested starts with (");
                      const { paren, number } = numAndParForNested;
                      console.log(paren, number);
                      const logWithParenthesis = Math.log(number);
                      console.log(logWithParenthesis);
                      setResult(logWithParenthesis);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      console.log(removedLP, "This is the expression after removing leading parenthesis");
                      setInput(`${previousExpression}${lastOperator}(log(${removedLP})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${logWithParenthesis}`);
                      return;
                    }
                    return;
                  }

                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const logNestedAns = Math.log(parsedlastNumInput);
                  console.log(logNestedAns, "logNestedAns");
                  setResult(logNestedAns);

                  if (logNestedAns === Infinity || logNestedAns === -Infinity || isNaN(logNestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }

                  setInput(`${previousExpression}${lastOperator}ln(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${logNestedAns}`);
                  return;
                }

                if (lastNumInput.startsWith("(")) {
                  console.log("This starts with open parenthesis");
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  console.log(numAndPar);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    console.log(number, paren);
                    const numAndParRe = Math.log(number);
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(ln(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                  } else {
                    console.log("Entered into else statement");
                    return;
                  }
                  return;
                }

                const lastNumberFloat = parseFloat(lastExpression);
                console.log("This is the first value in the input expression and input is", input);
                const logResult = Math.log(lastNumberFloat);
                setInput(`${previousExpression}${lastOperator}ln(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${logResult}`);
                console.log(logResult, "Result obtained");
                setResult(logResult);
                return;
              }
            } else {
              console.log("The last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in log function");
            setResult("Error");
            setIsError(true);
          }
          break;
        // ******************************************************************

        //  i think this is not present
        case "logxy":
          const [x, y] = inputOrResult.split(",").map(val => math.evaluate(val.trim()));
          if (x <= 0 || x === 1 || y <= 0) throw new Error("Base must be > 0 and not 1, and argument must be > 0.");
          calculatedLogValue = math.log(y) / math.log(x);
          setResult(calculatedLogValue);
          setInput(calculatedLogValue);
          setIntermediateExp(calculatedLogValue)
          break;
        default:
          return;
      }
    } catch (error) {
      setResult("Error");
      console.error("Error occurred:", error);
    }
  };


  const extractDetails = (input) => {
    const operatorRegex = /[\+\-\*\/%]/g;
    // Regular expression to find all numbers
    const numberRegex = /(\d+(\.\d+)?)/g; // Match integers and decimals

    // Find all numbers in the input
    const numbers = input.match(numberRegex);
    const lastNumber = numbers ? numbers[numbers.length - 1] : null; // Last number (decimal)

    // Find the last operator in the expression
    const operators = input.match(operatorRegex);
    const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

    // Get the previous expression by removing the last number and operator
    let previousExpression = input;
    if (lastOperator && lastNumber) {
      const lastOperatorIndex = input.lastIndexOf(lastOperator);
      const lastNumberIndex = input.lastIndexOf(lastNumber);
      previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
    }

    return {
      previousExpression,
      lastOperator,
      lastNumber,  // Correct last number
    };
  };



  const extractLastExpDetailsForLogxbasey = (input) => {
    // Regex to find all operators (+, -, *, /)
    // const operatorRegex = /[\+\-\*\/]/g;
    const operatorRegex = /[\+\-\*\/%]/g;
    // Find all operators in the input
    const operators = input.match(operatorRegex);
    const lastOperatorForLxBy = operators ? operators[operators.length - 1] : null;

    // If there is no operator, return the entire input as the last expression
    if (!lastOperatorForLxBy) {
      return {
        lastExpressionForLxBy: input.trim(),
        previousExpressionForLxBy: null,
        lastOperatorForLxBy: null,
      };
    }

    // Get the index of the last operator
    const lastOperatorIndex = input.lastIndexOf(lastOperatorForLxBy);

    // The expression after the last operator
    const lastExpressionForLxBy = input.slice(lastOperatorIndex + 1).trim();

    // Get the previous expression by removing the last operator and everything after it
    const previousExpressionForLxBy = input.slice(0, lastOperatorIndex).trim();

    return {
      previousExpressionForLxBy,
      lastOperatorForLxBy,
      lastExpressionForLxBy,
    };
  };

  // two sin=>sin(sin(3))

  // const extractDetailsLastExp = (input) => {
  //   // Regular expression to find operators
  //   const operatorRegex = /[\+\-\*\/]/g;

  //   // Regular expression to match nested functions or numbers
  //   const expressionRegex = /(?:sin|cos|tan|log|sqrt|sinh|cosh|tanh|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt)?\([^\(\)]*(?:\([^\(\)]*\))*[^\(\)]*\)|\d+(\.\d+)?/g;

  //   // Find all expressions in the input
  //   const expressions = input.match(expressionRegex);
  //   const lastExpression = expressions ? expressions[expressions.length - 1] : null; // Last expression

  //   // Find the last operator in the expression
  //   const operators = input.match(operatorRegex);
  //   const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

  //   // Get the previous expression by removing the last expression and operator
  //   let previousExpression = input;
  //   if (lastOperator && lastExpression) {
  //     const lastOperatorIndex = input.lastIndexOf(lastOperator);
  //     previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
  //   }

  //   return {
  //     previousExpression,
  //     lastOperator,
  //     lastExpression, // Correct last expression
  //   };
  // };



  // const extractDetailsLastExp = (input) => {
  //   // Regular expression to match functions, numbers, and operators
  //   const expressionRegex = /(?:sin|cos|tan|log|sqrt|sinh|cosh|tanh|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt)?\([^\(\)]*\)|\d+(\.\d+)?|[+\-\*/]|\(/g;

  //   // Find all expressions in the input
  //   const expressions = input.match(expressionRegex);

  //   let lastExpression = expressions ? expressions[expressions.length - 1] : null; // Last expression

  //   // If the last expression is just a number or function without parentheses, it's fine
  //   if (!lastExpression) {
  //     return {
  //       previousExpression: '',
  //       lastOperator: null,
  //       lastExpression: null,
  //     };
  //   }

  //   // Find the last operator in the expression
  //   const operatorRegex = /[\+\-\*\/]/g;
  //   const operators = input.match(operatorRegex);
  //   const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

  //   // Get the previous expression by removing the last expression and operator
  //   let previousExpression = input;
  //   if (lastOperator && lastExpression) {
  //     const lastOperatorIndex = input.lastIndexOf(lastOperator);
  //     previousExpression = input.slice(0, lastOperatorIndex).trim(); // Extract everything before the last operator
  //   }

  //   return {
  //     previousExpression,
  //     lastOperator,
  //     lastExpression,
  //   };
  // };
  // everything after, before lastOp
  const extractDetailsLastExp = (input) => {
    // Regular expression to find the last operator
    const operatorRegex = /[+\-*/]/g;

    // Find all operators in the input
    const operators = input.match(operatorRegex);
    const lastOperator = operators ? operators[operators.length - 1] : null; // Last operator

    if (!lastOperator) {
      // No operators found, the whole input is the last expression
      return {
        previousExpression: '',
        lastOperator: null,
        lastExpression: input,
      };
    }

    // Get the index of the last operator
    const lastOperatorIndex = input.lastIndexOf(lastOperator);

    // Everything before the last operator is the previous expression
    const previousExpression = input.slice(0, lastOperatorIndex).trim();

    // Everything after the last operator is the last expression
    const lastExpression = input.slice(lastOperatorIndex + 1).trim();

    return {
      previousExpression,
      lastOperator,
      lastExpression,
    };
  };




  const handleSinhClick = (func) => {
    const functionPattern = /(?:sin|cos|tan)\([^\(\)]*\)/g;

    // Find all matches in the input
    const allMatches = input.match(functionPattern);
    console.log("All matches:", allMatches); // Debug log for matches

    if (allMatches && allMatches.length > 0) {
      let updatedInput = input;

      // While we have any functions left in the input, keep processing
      while (functionPattern.test(updatedInput)) {
        // Find the innermost function (which will be the last match in the string)
        let lastMatch = "";
        let lastMatchIndex = -1;
        const matches = [];
        let match;

        // Loop through and capture all functions
        while ((match = functionPattern.exec(updatedInput)) !== null) {
          matches.push(match[0]);
        }

        // The last match will be the innermost function
        if (matches.length > 0) {
          lastMatch = matches[matches.length - 1];
          lastMatchIndex = updatedInput.indexOf(lastMatch);
          console.log("Last Match:", lastMatch);
          console.log("Last Occurrence Index:", lastMatchIndex);
        }

        // Wrap the innermost match inside the selected function (e.g., sin(), cos(), tan())
        if (lastMatchIndex !== -1) {
          console.log(`Wrapping the innermost match inside ${func}().`);

          // Create the updated input by wrapping the innermost match with the function
          updatedInput = updatedInput.substring(0, lastMatchIndex) + `${func}(` + lastMatch + `)` + updatedInput.substring(lastMatchIndex + lastMatch.length);
          console.log("Updated Input with " + func + "():", updatedInput);
        }
      }

      // After wrapping, set the updated input
      setInput(updatedInput);

      let toBeSetToResult;

      // Function to handle calculations
      const calculateFunctions = (expression) => {
        console.log(expression, "this is the expression");

        // Apply the function (sin, cos, tan) only to the last part of the expression
        expression = expression.replace(/(sin|cos|tan)\(([^()]+)\)/g, (match, funcName, num) => {
          let angle = parseFloat(num);
          console.log(num, "this is the number for " + funcName + "()");

          // Convert angle if in degrees
          if (mode === 'Deg') {
            angle = (angle * Math.PI) / 180; // Convert degrees to radians
          }

          // Apply the function logic based on funcName
          if (funcName === 'sin') {
            return calculateSin(angle);
          }
          if (funcName === 'cos') {
            return calculateCos(angle);
          }
          if (funcName === 'tan') {
            return calculateTan(angle);
          }

          return match; // If no function is matched, return the original
        });

        return expression; // Return the updated expression after processing
      };

      // Separate functions for sin, cos, tan
      const calculateSin = (angle) => {
        const result = Math.sin(mode === 'Deg' ? angle * (Math.PI / 180) : angle);
        console.log(`sin(${angle}) = ${result}`);
        toBeSetToResult = result;
        return result;
      };

      const calculateCos = (angle) => {
        const result = Math.cos(angle);
        console.log(`cos(${angle}) = ${result}`);
        toBeSetToResult = result;
        return result;
      };

      const calculateTan = (angle) => {
        const result = Math.tan(angle);
        console.log(`tan(${angle}) = ${result}`);
        toBeSetToResult = result;
        return result;
      };

      // Prevent reprocessing of the already wrapped part
      let finalExpression = updatedInput;
      let prevExpression = "";
      let latestCalculatedValue = finalExpression;

      // Keep evaluating until there are no more function calls (sin, cos, tan, etc.)
      while (finalExpression !== prevExpression) {
        prevExpression = finalExpression;
        finalExpression = calculateFunctions(finalExpression);
        latestCalculatedValue = finalExpression; // Update latest calculated value
      }

      console.log("Latest Calculated Value:", latestCalculatedValue); // Debug log for latest calculated value

      // Set the result to the most recent calculated value (final result)
      setResult(toBeSetToResult);
      setIntermediateExp(finalExpression);
    }
  };

























  const extractDetailsLastExpFN = (input) => {
    // Regular expression to find operators (+, -, *, /)
    const operatorRegex = /[\+\-\*\/]/g;

    // Regular expression to match numbers, including negative ones (e.g., -1.6094379124341003)
    const numberRegex = /([+-]?\d+(\.\d+)?)/g; // Match integers and floating-point numbers, including optional + or -

    // Find all operators in the input
    const operators = input.match(operatorRegex);

    // Find all numbers in the input, including negatives
    const numbers = [...input.matchAll(numberRegex)];

    // Get the last operator in the expression
    const lastOperator = operators ? operators[operators.length - 1] : null;

    // Get the last number (which can be negative)
    const lastNumber = numbers.length ? numbers[numbers.length - 1][0] : null;

    // If the last number is negative, keep it as is, otherwise it's the last number
    const lastExpression = lastNumber;

    // Get the previous expression by removing the last number and operator
    let previousExpression = input;
    if (lastOperator && lastNumber) {
      const lastOperatorIndex = input.lastIndexOf(lastOperator);
      const lastNumberIndex = input.lastIndexOf(lastNumber);

      // Extract everything before the last operator and number
      previousExpression = input.slice(0, lastOperatorIndex).trim();
    }

    return {
      previousExpression,  // Expression before the last operator
      lastOperator,        // Last operator
      lastExpression       // Last expression (e.g., -1.6094379124341003)
    };
  };





  useEffect(() => {
    console.log(intermediateResultsStack, " intermediateResultsStack"
    );
  }, [setIntermediateResultsStack, intermediateResultsStack])


  const [rFlag, setRFlag] = useState(false)
  useEffect(() => {
    console.log(rFlag, "rflag value")
  }, [rFlag])
  useEffect(() => {
    console.log(isExpBtn, "isExpBtn value")
  }, [isExpBtn])


  //  ==============BODMAS ==================



  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;


  useEffect(() => {
    console.log(resFromBR, "resFromBR")
  }, [resFromBR])



  // Effect to monitor input and remove redundant operators at the end
  useEffect(() => {
    // Check if the input ends with two operators
    const operators = ["+", "-", "*", "/", "^"];
    const lastChar = input.charAt(input.length - 1);
    const secondLastChar = input.charAt(input.length - 2);

    // If two operators are at the end, remove the last one
    if (operators.includes(lastChar) && operators.includes(secondLastChar)) {
      setInput(prevInput => prevInput.slice(0, -1));
    }
  }, [input]); //

  function getPrecedingOperator(expression) {
    // Remove spaces if there are any
    expression = expression.replace(/\s+/g, '');

    // Regular expression to match operators, excluding the ones inside functions
    const operatorPattern = /[-+*/]/g;
    let lastOperator = null;
    let lastOperatorIndex = -1;

    // Traverse the expression from right to left
    for (let i = expression.length - 1; i >= 0; i--) {
      const char = expression[i];

      // Check if it's an operator
      if (operatorPattern.test(char)) {
        lastOperator = char;
        lastOperatorIndex = i;
        break;
      }
    }

    return lastOperator;
  }



  const getPrecedingOperators = (expression, currentOperator) => {
    // Remove spaces and split by non-numeric characters (operators)
    const operators = expression.split(/(\+|\-|\*|\/)/).filter(Boolean);

    let precedingOperators = [];

    for (let i = operators.length - 1; i >= 0; i--) {
      // If we encounter the current operator
      if (operators[i] === currentOperator) {
        if (precedingOperators.length >= 2) {
          return precedingOperators.slice(0, 2);  // Return the last 2 operators
        }
      } else {
        precedingOperators.push(operators[i]);
      }
    }

    return precedingOperators.slice(0, 2);  // Return the last 2 if available
  };

  // function extractLastFunctionBeforeOperator(expression) {
  //   // Remove spaces from the expression to simplify processing
  //   expression = expression.replace(/\s+/g, '');

  //   // Regular expression to find the part of the expression preceding the last division operator
  //   const regex = /(\d+\/(?:sin|cos|tan)\([^\)]+\))[^\/]*$/;

  //   // Match using the regular expression
  //   const match = expression.match(regex);

  //   // Return the matched portion if found, otherwise return null
  //   return match ? match[1] : null;
  // }

  function extractLastFunctionBeforeOperator(expression) {
    // Remove spaces from the expression to simplify processing
    expression = expression.replace(/\s+/g, '');

    // Regular expression to match trigonometric expressions with division
    const regex = /((?:\d+|\b(?:sin|cos|tan)\([^()]+\))(?:\/(?:\d+|\b(?:sin|cos|tan)\([^()]+\)))+)/g;

    // Find all matches in the expression
    const matches = expression.match(regex);

    // Return the last match if available, otherwise return null
    return matches ? matches[matches.length - 1] : null;
  }

  const toRadians = (degrees) => degrees * (Math.PI / 180);


  function evaluateExtractedExpression(expression, mode) {
    // Determine whether to convert angles to radians based on the mode
    const expressionInCorrectMode = expression.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, angle) => {
      const numericAngle = Number(angle);
      const angleInCorrectMode = mode === 'Rad' ? numericAngle : toRadians(numericAngle);
      return `${func}(${angleInCorrectMode})`; // Replace with the appropriate angle in the expression
    });

    // Evaluate the expression
    try {
      // math.evaluate should interpret trigonometric functions in the desired mode
      const result = math.evaluate(expressionInCorrectMode);
      console.log("Result of expression", expressionInCorrectMode, "is", result);
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return null;
    }
  }


  function getPrecedingOperatorOfLastDivision(input) {
    // Find the position of the last '/' in the input
    const lastDivisionIndex = input.lastIndexOf('/');

    // If there's no division operator, return null
    if (lastDivisionIndex === -1) {
      console.log("No division operator found.");
      return null;
    }

    // Find the preceding part of the string up to the last '/'
    const precedingPart = input.slice(0, lastDivisionIndex);

    // Define the operators to look for
    const operators = ['+', '-', '*', '/'];

    // Find the last occurrence of any of these operators in the preceding part
    let precedingOperatorIndex = -1;
    let precedingOperator = null;

    // Check each operator to find the last occurrence before the last division
    for (let op of operators) {
      const index = precedingPart.lastIndexOf(op);
      if (index > precedingOperatorIndex) {
        precedingOperatorIndex = index;
        precedingOperator = op;
      }
    }

    // If no preceding operator found, return null
    if (precedingOperatorIndex === -1) {
      console.log("No preceding operator found before the last division.");
      return null;
    }

    console.log("The preceding operator of the last '/' is:", precedingOperator);
    return precedingOperator;
  }


  function extractOperandBeforeLastDivision(input) {
    // Remove spaces for easier processing
    input = input.replace(/\s+/g, '');

    // Find the last occurrence of the division operator
    const lastDivisionIndex = input.lastIndexOf('/');

    // If there is no division operator, return null
    if (lastDivisionIndex === -1) {
      return null;
    }

    // Extract the portion of the string before the last division operator
    const portionBeforeLastDivision = input.slice(0, lastDivisionIndex);

    // Find the last operand (which could be a trigonometric function or a number) before the last division operator
    // This regex captures numbers or trigonometric functions like sin(6), cos(4), etc.
    const regex = /(?:\d+(\.\d+)?|\w+\([^\)]+\))/g;

    const matches = [...portionBeforeLastDivision.matchAll(regex)];

    // The last match should be the operand before the last division operator
    const lastOperandBeforeDivision = matches.length > 0 ? matches[matches.length - 1][0] : null;

    return lastOperandBeforeDivision;
  }
  function extractExpressionAfterLastDivision(input) {
    // Remove spaces for easier processing
    input = input.replace(/\s+/g, '');

    // Find the last occurrence of the division operator
    const lastDivisionIndex = input.lastIndexOf('/');

    // If there is no division operator, return null
    if (lastDivisionIndex === -1) {
      return null;
    }

    // Extract the portion of the string after the last division operator
    const portionAfterLastDivision = input.slice(lastDivisionIndex + 1);

    return portionAfterLastDivision;
  }
  function findLastOperator(expression) {
    // Remove spaces from the expression to avoid issues
    expression = expression.replace(/\s+/g, '');

    // Scan the expression from the end to the start
    for (let i = expression.length - 1; i >= 0; i--) {
      const char = expression[i];

      // Skip numbers, parentheses, and functions (sin, cos, etc.)
      if (/[0-9\)]/.test(char)) {
        continue;
      }
      // If we find an operator (+, -, *, or /), return it
      if (['+', '-', '*', '/'].includes(char)) {
        return char;
      }
    }

    // If no operator is found, return null or handle accordingly
    return null;
  }


  useEffect(() => {
    console.log("int exp issssss", intermediateExp)
  }, [intermediateExp])





  const [isPercentageMode, setIsPercentageMode] = useState(false);
  // const extractBeforeAndAfterLastExponent = (input) => {
  //   // Regular expression to match the last ^ and capture everything before and after it
  //   const match = input.match(/^(.*)\^(\d+)$/);

  //   if (match) {
  //     const beforeExponent = match[1]; // Everything before the last ^
  //     const afterExponent = match[2];  // Everything after the last ^

  //     console.log("Before ^:", beforeExponent);
  //     console.log("After ^:", afterExponent);

  //     return { beforeExponent, afterExponent };
  //   } else {
  //     console.log("No exponent found.");
  //     return null;
  //   }
  // };
  // const extractLogXBaseY = (input) => {
  //   // Regular expression to capture the format `<before>log<base>Base<y>`
  //   // const regex = /(\d*)log(\d+)Base(\d+)/;
  //   // const regex = /(\d*)log(\d+)base(\d+)/i; 
  //   const regex = /^(\d+)logXbaseY(\d+)$/;

  //   const match = input.match(regex);
  //   if (match) {
  //     const beforeLog = match[1] || "1"; // If nothing before `log`, default to "1"
  //     const x = match[2];
  //     const y = match[3];

  //     return { beforeLog, x, y };
  //   } else {
  //     return null; // No match found
  //   }
  // };
  const extractBeforeAndAfterLastExponent = (input) => {
    // Regular expression to match the last ^ and capture everything before and after it
    // This regex now matches floating-point numbers as well
    const match = input.match(/^(.*\d(\.\d+)?)\^(\d+)$/);

    if (match) {
      const beforeExponent = match[1]; // Everything before the last ^
      const afterExponent = match[3];  // Everything after the last ^

      console.log("Before ^:", beforeExponent);
      console.log("After ^:", afterExponent);

      return { beforeExponent, afterExponent };
    } else {
      console.log("No exponent found.");
      return null;
    }
  };

  // const extractBeforeAndAfterLogXBaseY = (input) => {
  //   // Regex to match the pattern "number logXbaseY number"
  //   const regex = /^(\d+)logxBasey(\d+)$/;

  //   const match = input.match(regex);
  //   if (match) {
  //     const beforeLog = match[1]; // Number before `logXbaseY`
  //     const afterBase = match[2]; // Number after `baseY`

  //     return { beforeLog, afterBase };
  //   } else {
  //     return null; // No match found
  //   }
  // };
  // const extractBeforeAndAfterLogXBaseY = (input) => {
  //   // Regex to match the pattern "number logxBasey number" with support for floating-point numbers
  //   const regex = /^([0-9]*\.?[0-9]+)logxBasey([0-9]*\.?[0-9]+)$/;
  
  //   const match = input.match(regex);
  //   if (match) {
  //     const beforeLog = match[1];  // Number before `logxBasey` (supports floating-point numbers)
  //     const afterBase = match[2];  // Number after `logxBasey` (also supports floating-point numbers)
  
  //     return { beforeLog, afterBase };
  //   } else {
  //     return null;  // No match found
  //   }
  // };
  const extractBeforeAndAfterLogXBaseY = (input) => {
    // Regex to match the pattern "number logxBasey number" with support for floating-point and negative numbers
    const regex = /^(-?[0-9]*\.?[0-9]+)logxBasey(-?[0-9]*\.?[0-9]+)$/;
  
    const match = input.match(regex);
    if (match) {
      const beforeLog = match[1];  // Number before `logxBasey` (supports floating-point and negative numbers)
      const afterBase = match[2];  // Number after `logxBasey` (also supports floating-point and negative numbers)
  
      return { beforeLog, afterBase };
    } else {
      return null;  // No match found
    }
  }; 



  const logBase = (x, base) => {
    return Math.log(x) / Math.log(base);  // Natural log conversion
  };
  const extractExpressionDetails = (input) => {
    // Find the position of the last operator (it could be any of +, -, *, /)
    const lastOperatorIndex = Math.max(
      input.lastIndexOf('+'),
      input.lastIndexOf('-'),
      input.lastIndexOf('*'),
      input.lastIndexOf('/')
    );

    // If there's no operator, return null (invalid input)
    if (lastOperatorIndex === -1) {
      console.log("No operator found in the input.");
      return null;
    }

    // Extract prevExp (everything before the last operator) and lastExp (everything after it)
    const prevExp = input.substring(0, lastOperatorIndex);
    const lastOp = input[lastOperatorIndex];
    const lastExp = input.substring(lastOperatorIndex + 1);

    // Return the result
    return { prevExp, lastOp, lastExp };
  };

  const handleOperator = (operator) => {

    // if (toggledResult) {
    //   // Reset toggledResult flag and append the result to the input along with the operator
    //   setToggledResult(false);
    //   const validResult = !isNaN(result) ? result.toString() : '0'; 
    //   setInput(prev => `${prev}${validResult}${operator}`);
    //   setIntermediateExp(prev => `${prev}${validResult}${operator}`);
    //   return;
    // }

    if (isOperatorAtEnd(input) && !toggledResult) {
      setInput(input.slice(0, -1) + operator);
      setIntermediateExp(intermediateExp.slice(0, -1) + operator)
      console.log(`Replaced last operator with: ${operator}`);
      return;
    }

    // Handle the case where equals button was clicked
    if (isEqualsToClicked) {
      setInput(`${result}${operator}`);
      console.log("Entered into isEqualsToClicked and returning");
      resetEqualsFlag();
      setIntermediateExp(`${result}${operator}`);
      return;
    }

    // Case 1: If there are more opening parentheses than closing parentheses
    const openParenthesesCount = (input.match(/\(/g) || []).length;
    const closeParenthesesCount = (input.match(/\)/g) || []).length;

    // Case: Handle the percentage symbol (%)
    if (operator === '%') {
      setIsPercentageMode(true);
      setInput(prev => `${prev}%`);
      setIntermediateExp(prev => `${prev}/100*`);
      return;
    }

    if (isYroot) {
      // Log input for debugging to ensure it's in the correct format
      console.log("Current Input:", input);

      const extration = extractBeforeAndAfterLastExponent(intermediateExp);
      if(extration){
        const { beforeExponent, afterExponent } = extration
        if (extration === null || afterExponent === null || afterExponent === '' || afterExponent === undefined) {
          return
        }
        console.log(extration, "extraction");
       
        //  so now i need to set the int as 
        const newExp = `${beforeExponent}^(1/${afterExponent})`;
        console.log(newExp, "This is the new exp to be set to the yroot");
        const ans = math.evaluate(newExp);
        setIntermediateExp(`${newExp}${operator}`);
        setResult(ans);
        setInput(prev => `${prev}${operator}`);
        setIsYroot(false)
        return;
  
      }
      else{
        console.log("not found")
        return
      }
      
    } else {
      setInput(prev => `${prev}${operator}`);
      setIsYroot(false)
      console.log("n total else block")
    }
    if (newLogxBasey) {
      console.log("entered into setNewLogxBasey block");
      console.log(intermediateExp, "this is the intermediate exp");
      console.log(input, "this is the input");
      setNewLogxBasey(false);
      // const opInfo = extractExpressionDetails(intermediateExp);
      const opInfo=extractDetailsLastExp(intermediateExp)

      if (opInfo) {
        //  i think the exp will be 25+3logxbasey3
        const { prevExp, lastOp, lastExp } = opInfo;
        console.log("there is last operator");
        console.log(lastOp, "lastOp", "prevExp", prevExp, "lastExp", lastExp)
        console.log()
        const extraction = extractBeforeAndAfterLogXBaseY(lastExp);
        console.log(extraction, "extractttttt");
        const { beforeLog, afterBase } = extraction;
        const ans = logBase(beforeLog, afterBase);
        const newIntExp = `${prevExp}${lastOp}${ans}`
        const ansWithIntExp = math.evaluate(newIntExp);
        console.log(ansWithIntExp, "ansssssssss");
        console.log(newIntExp, "this is the ew int expression");
        setIntermediateExp(`${newIntExp}${operator}`)
        setResult(ansWithIntExp)
        return
      }
      else {
        //  i think the exp will be 3logxbasey3
        console.log("there is no operator")
        const extraction = extractBeforeAndAfterLogXBaseY(intermediateExp);
        const { beforeLog, afterBase } = extraction;
        // const newExp = `log(${beforeLog}) / log(${afterBase})`
        // console.log(newExp, "this is the new exp")
        const ans = logBase(beforeLog, afterBase);
        console.log(ans, "this is the ans for log x basey alone answer");

        setIntermediateExp(`${ans}${operator}`);
        setResult(ans);
        // vna
      }
      return;
    }

    if (isPercentageMode) {
      console.log("came into is percentage mode to true");
      setIsPercentageMode(false);
      console.log(input, "Ths is the inpu");
      setInput(prev => `${prev}${operator}`)
      setIntermediateExp(prev => `${prev}${operator}`)
      console.log(intermediateExp, "this is int ex[");
      const ansForPercentage = math.evaluate(intermediateExp);
      console.log(ansForPercentage);
      setResult(ansForPercentage)
      return
    }


    if (openParenthesesCount > closeParenthesesCount) {
      // Parentheses are unbalanced, wait until user closes them
      setAreParenthesesBalanced(false);
      setInput(prev => `${prev}${operator}`);
      setIntermediateExp(prev => `${prev}${operator}`);
      console.log("Parentheses are unbalanced, operator added.");
      return;
    }

    // Case 2: Parentheses are balanced, add the operator
    setAreParenthesesBalanced(true);
    setInput(prev => `${prev}${operator}`);
    setIntermediateExp(prev => `${prev}${operator}`);
    console.log("Parentheses balanced, added operator:", operator);


    // Try evaluating the expression
    try {
      if (typeof intermediateExp === "string"
        // && balancedParentheses(intermediateExp)
        // vna
      ) {
        const ansToBeSet = math.evaluate(intermediateExp);
        setResult(ansToBeSet);
      } else {
        console.warn("IntermediateExp is not a string. Skipping evaluation.");
      }
    } catch (error) {
      console.error("Error evaluating intermediateExp:", error);
      setResult("Error");
    }
  };





  const [operatorStack, setOperatorStack] = useState([]);
  const [prevExpV, setPrevExpV] = useState("");
  const [prevResultV, setPrevResultV] = useState(null)
  useEffect(() => {
    console.log(prevExpV, prevResultV, "prevResultV   prevExpV      prevExpV");
  }, [prevExpV, prevResultV])
  useEffect(() => {
    console.log("History array is ", historyArray);
  }, [historyArray])




  const evaluateStack = () => {
    if (operatorStack.length >= 3) {
      const firstValue = operatorStack[operatorStack.length - 3]; // 1st number
      const operator = operatorStack[operatorStack.length - 2];   // Operator
      const secondValue = operatorStack[operatorStack.length - 1]; // 2nd number

      // Evaluate the expression using math.js
      const expression = `${firstValue} ${operator} ${secondValue}`;
      const evaluatedResult = math.evaluate(expression);

      // Update the operator stack by replacing the last three elements with the result
      setOperatorStack((prevStack) => [
        ...prevStack.slice(0, prevStack.length - 3), // Remove the last three
        evaluatedResult, // Push the result
      ]);

      // Update the result state
      setResult(evaluatedResult);
    }
  };


  useEffect(() => {
    console.log("operator stack in useeffect", operatorStack);
  }, [operatorStack])

  useEffect(() => {
    console.log(isEqualsToClicked)
  }, [isEqualsToClicked])

  const resetEqualsFlag = () => {
    setIsEqualsToClicked(false);

  };

  const extractAfterLastOperator = (input) => {
    // Regular expression to find operators
    const operatorRegex = /[\+\-\*\/]/g;

    // Find all operators in the input
    const operators = input.match(operatorRegex);

    // If there are no operators, return the entire input
    if (!operators) {
      return input;
    }

    // Find the last operator's position
    const lastOperatorIndex = input.lastIndexOf(operators[operators.length - 1]);

    // Extract everything after the last operator
    const afterLastOperator = input.slice(lastOperatorIndex + 1).trim();

    return afterLastOperator;
  };

  const handleEvaluate = () => {
    console.log("in handle Evaluate");
    setIsEqualsToClicked(true)
    const isOpAtEndAtHE = isOperatorAtEnd(input)
    if (isOpAtEndAtHE) {
      console.log("yes there is an operator at the end");
      console.log("returning from is OperatorAtEnd");
      // if operator is at the end, i need to make that intermediate exp to be 
      setInput(prev => `${prev}${result}`)
      setIsEqualsToClicked(true);
      setIntermediateExp(prev => `${prev}${result}`)
      const newExp = `${intermediateExp}${result}`;
      console.log("when the operator is at end we are evaluating this exp and it is,", newExp);
      const finalAns = math.evaluate(newExp);
      console.log(finalAns);
      setResult(finalAns);
      return
    }
    console.log("isequals to clicked flag is set to true");
    if (isError) {
      return;
    }
    if ((result === "Math Error") || (result === "NaN") || (result === "Error")) {
      return;
    }
    console.log("the previous expression is ,", intermediateExp);
    let balancedExp = intermediateExp;
    for (let i = 0; i < openParenthesesCount; i++) {
      balancedExp += ")";
    }

    if (isYroot) {
      // Log input for debugging to ensure it's in the correct format
      console.log("Current Input:", input);
      const extration = extractBeforeAndAfterLastExponent(intermediateExp);
      console.log(extration, "extraction");
      const { beforeExponent, afterExponent } = extration
      //  so now i need to set the int as 

      const newExp = `${beforeExponent}^(1/${afterExponent})`;
      console.log(newExp, "This is the new exp to be set to the yroot");
      const ans = math.evaluate(newExp);
      setIntermediateExp(`${newExp}`);
      setResult(ans);
      setIsEqualsToClicked(true)
      setInput(prev => `${prev}`);
      setIsYroot(false)
      return;

    } else {
      setInput(prev => `${prev}`);
      setIsYroot(false)
      setIsEqualsToClicked(true)
      console.log("n total else block")
    }
    if (newLogxBasey) {
      console.log("entered into setNewLogxBasey block");
      console.log(intermediateExp, "this is the intermediate exp");
      console.log(input, "this is the input");
      setNewLogxBasey(false);
      const opInfo = extractExpressionDetails(intermediateExp);
      setIsEqualsToClicked(true)

      if (opInfo) {
        //  i think the exp will be 25+3logxbasey3
        const { prevExp, lastOp, lastExp } = opInfo;
        console.log("there is last operator");
        console.log(lastOp, "lastOp", "prevExp", prevExp, "lastExp", lastExp)
        console.log()
        const extraction = extractBeforeAndAfterLogXBaseY(lastExp);
        console.log(extraction, "extractttttt");
        const { beforeLog, afterBase } = extraction;
        const ans = logBase(beforeLog, afterBase);
        const newIntExp = `${prevExp}${lastOp}${ans}`
        const ansWithIntExp = math.evaluate(newIntExp);
        console.log(ansWithIntExp, "ansssssssss");
        console.log(newIntExp, "this is the ew int expression");
        setIntermediateExp(`${newIntExp}`)
        setResult(ansWithIntExp)
        return
      }
      else {
        //  i think the exp will be 3logxbasey3
        console.log("there is no operator")
        const extraction = extractBeforeAndAfterLogXBaseY(input);
        const { beforeLog, afterBase } = extraction;
        // const newExp = `log(${beforeLog}) / log(${afterBase})`
        // console.log(newExp, "this is the new exp")
        const ans = logBase(beforeLog, afterBase);
        console.log(ans, "this is the ans for log x basey alone answer");
        setIntermediateExp(`${ans}`);
        setResult(ans);
        // vna
      }
      return;
    }

    if (isPercentageMode) {
      setIsEqualsToClicked(true)

      console.log("came into is percentage mode to true");
      setIsPercentageMode(false);
      console.log(input, "Ths is the inpu");
      // setInput(prev => `${prev}${operator}`)
      // setIntermediateExp(prev => `${prev}${operator}`)
      console.log(intermediateExp, "this is int ex[");
      const ansForPercentage = math.evaluate(intermediateExp);
      console.log(ansForPercentage);
      setResult(ansForPercentage)
      return
    }



    console.log("Evaluating balanced expression:", balancedExp);

    try {
      const ansToBeSet = math.evaluate(balancedExp);
      setResult(ansToBeSet);
      setOpenParenthesesCount(0); // Reset parentheses count after evaluation
    } catch (error) {
      console.error("Error evaluating balanced expression:", error);
      setResult("Error");
    }
    try {

      if (typeof intermediateExp === "string") {
        const ansToBeSet = math.evaluate(intermediateExp);
        setResult(ansToBeSet);
      } else {
        console.warn("intermediateExp is not a string. Skipping evaluation. ");
      }
    } catch (error) {
      console.error("Error evaluating intermediateExp:", error);
      setResult("Error");
    }

  }


  const handlePowerFunction = (func) => {
    if (isError) {
      console.log("in error handlePowerFunction");
      return;
    }
    let inputOrResult = input || result;
    try {
      switch (func) {
        case "exp":
          try {
            console.log("Mode:", mode);
            const expOpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(expOpForLastExpOpInfo, "expOpForLastExpOpInfo");

            if (expOpForLastExpOpInfo) {
              const { previousExpression, lastOperator, lastExpression } = expOpForLastExpOpInfo;

              if (lastOperator === null) {
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}exp(${number})`);
                  const parseNumber = parseFloat(number);
                  const expAloneExp = Math.exp(parseNumber);
                  setResult(expAloneExp);
                  setIntermediateExp(`(${expAloneExp}`);
                  return;
                } else {
                  console.log(lastOperator, "lastOperator lastOperator");
                  console.log(lastExpression, "lastNumber lastNumber");

                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|log|ln|exp/.test(input)) {
                    const isNested = String(intermediateExp).startsWith('(');
                    if (isNested) {
                      const expNestedInfo = extractParenAndNumber(intermediateExp);
                      const { paren, number } = expNestedInfo;
                      const nestedExpResult = Math.exp(number);
                      console.log(nestedExpResult, "exp nested result");
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(exp(${removedLP})`);
                      setIntermediateExp(`(${nestedExpResult}`);
                      setResult(nestedExpResult);
                      return;
                    }

                    const expResult = Math.exp(parseFloat(intermediateExp));
                    setResult(expResult);
                    setIntermediateExp(expResult);
                    setInput(`exp(${input})`);
                    if (expResult === Infinity || expResult === -Infinity || isNaN(expResult)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }

                  const lastNumberFloat = parseFloat(lastExpression);
                  const expAloneExp = Math.exp(lastNumberFloat);
                  setInput(prev => `exp(${lastExpression})`);
                  setIntermediateExp(expAloneExp);
                  setResult(expAloneExp);
                  return;
                }
              } else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);

                if (lastExpression && /sin|cos|tan|exp|sqrt|factorial|reciproc|log|ln/.test(lastExpression)) {
                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const expNestedAns = Math.exp(parsedlastNumInput);
                  setResult(expNestedAns);

                  if (expNestedAns === Infinity || expNestedAns === -Infinity || isNaN(expNestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }

                  setInput(`${previousExpression}${lastOperator}exp(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${expNestedAns}`);
                  return;
                }

                if (lastNumInput.startsWith("(")) {
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    const expParenResult = Math.exp(number);
                    setResult(expParenResult);
                    setInput(`${previousExpression}${lastOperator}(exp(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${expParenResult}`);
                  } else {
                    return;
                  }
                  return;
                }

                const lastNumberFloat = parseFloat(lastExpression);
                const expResult = Math.exp(lastNumberFloat);
                setInput(`${previousExpression}${lastOperator}exp(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${expResult}`);
                setResult(expResult);
                return;
              }
            } else {
              console.log("The last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in exp function");
            setResult("Error");
            setIsError(true);
          }
          break;

        case "10^x":
          try {
            console.log("Mode:", mode);

            // Extract last expression details
            const powTenOpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(powTenOpForLastExpOpInfo, "powTenOpForLastExpOpInfo");

            if (powTenOpForLastExpOpInfo) {
              console.log("The last exp block is true");
              const { previousExpression, lastOperator, lastExpression } = powTenOpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                // Handle case where there is no operator before the expression
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren, number", number);

                  // Set the input and evaluate the expression
                  setInput(`${paren}powTen(${number})`);
                  const parseNumber = parseFloat(number);
                  const powTenAloneExp = Math.pow(10, parseNumber);  // Use Math.pow for exponentiation
                  setResult(powTenAloneExp);
                  setIntermediateExp(`(${powTenAloneExp})`);
                  return;
                } else {
                  // Handle complex cases with nested expressions
                  console.log(lastOperator, "lastOperator");
                  console.log(lastExpression, "lastExpression");

                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot/.test(input)) {
                    console.log("Handling nested function");
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      console.log("This is a nested expression.");
                      const powTenAlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = powTenAlonePN;
                      console.log(paren, number, "Number extracted from nested expression");
                      const toBeSet = Math.pow(10, parseFloat(number));  // Use Math.pow for exponentiation
                      setIntermediateExp(`(${toBeSet})`);
                      return;
                    }
                    const powTenResult = Math.pow(10, parseFloat(intermediateExp)); // Use Math.pow for exponentiation
                    console.log(powTenResult);
                    setResult(powTenResult);
                    setIntermediateExp(powTenResult);

                    if (powTenResult === Infinity || powTenResult === -Infinity || isNaN(powTenResult)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    setInput(`powTen(${input})`);
                    return;
                  }

                  // Handle last expression if it is a standalone number
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("last number in lastOperator===null", lastNumberFloat);
                  const powTenAloneExp = Math.pow(10, lastNumberFloat);  // Use Math.pow for exponentiation
                  console.log(powTenAloneExp, "powTen alone expression to be set to result value");
                  setInput(prev => `powTen(${lastExpression})`);
                  setIntermediateExp(powTenAloneExp);
                  setResult(powTenAloneExp);
                  return;
                }
              } else {
                // Handle cases where there is a previous operator
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                console.log(lastExpression, "lastNumber");

                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot/.test(lastExpression)) {
                  console.log("Handling nested functions in the expression.");
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;

                  if (lastNumInput.startsWith("(")) {
                    console.log("Handling parenthesis in the nested expression");
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      const { paren, number } = numAndParForNested;
                      const powTenWithParenthesis = Math.pow(10, parseFloat(number));  // Use Math.pow for exponentiation
                      setResult(powTenWithParenthesis);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      setInput(`${previousExpression}${lastOperator}(powTen(${removedLP})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${powTenWithParenthesis})`);
                      return;
                    }
                  }
                  const parsedLastNumInput = parseFloat(lastNumInput);
                  const powTenNestedAns = Math.pow(10, parsedLastNumInput);  // Use Math.pow for exponentiation
                  console.log(powTenNestedAns, "powTenNestedAns");
                  setResult(powTenNestedAns);

                  if (powTenNestedAns === Infinity || powTenNestedAns === -Infinity || isNaN(powTenNestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }
                  setInput(`${previousExpression}${lastOperator}powTen(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${powTenNestedAns}`);
                  return;
                }

                if (lastNumInput.startsWith("(")) {
                  console.log("this starts with open parenthesis");
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    const numAndParRe = Math.pow(10, parseFloat(number));  // Use Math.pow for exponentiation
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(powTen(${number}))`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe})`);
                  }
                  return;
                }

                // Evaluate the last expression directly
                const lastNumberFloat = parseFloat(lastExpression);
                const powTenResult = Math.pow(10, lastNumberFloat);  // Use Math.pow for exponentiation
                setInput(`${previousExpression}${lastOperator}powTen(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${powTenResult}`);
                setResult(powTenResult);
                console.log(powTenResult, "result obtained");
                return;
              }
            } else {
              console.log("The last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in powTen function");
            setResult("Error");
            setIsError(true);
          }
          break;
        case "x^2":
          try {
            console.log("Mode:", mode);
            const squareOpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(squareOpForLastExpOpInfo, "squareOpForLastExpOpInfo");

            if (squareOpForLastExpOpInfo) {
              console.log("the last exp block is true");
              const { previousExpression, lastOperator, lastExpression } = squareOpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}square(${number})`);
                  const parseNumber = parseFloat(number);
                  const squareAloneExp = math.square(parseNumber);  // Change to square operation
                  setResult(squareAloneExp);
                  setIntermediateExp(`(${squareAloneExp}`);
                  return;
                }
                else {
                  console.log(lastOperator, "lastOperator lastOperator");
                  console.log(lastExpression, "lastExpression lastExpression");

                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                    console.log("Input matches function pattern for nested expressions");
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      console.log("this is the ( nested alone exp");
                      const squareAlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = squareAlonePN;
                      console.log(paren, number, "ddddddd");
                      const toBeSet = math.square(number);  // Change to square operation
                      console.log(toBeSet);
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(square(${removedLP})`);
                      console.log("this is the intermediate exp", intermediateExp);
                      setIntermediateExp(`(${toBeSet}`);
                      setResult(toBeSet)
                      return;
                    }
                    const squareResult = math.square(intermediateExp);  // Change to square operation
                    console.log(squareResult);
                    setResult(squareResult);
                    setIntermediateExp(squareResult);
                    setInput(`square(${input})`);
                    if (squareResult === Infinity || squareResult === -Infinity || isNaN(squareResult)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  console.log("last number in lastOperator===null", lastNumberFloat);
                  console.log("this is alone expression");
                  const squareAloneExp = math.square(lastNumberFloat);
                  console.log(lastNumberFloat, "this is the value thatt we are finding square")
                  console.log(squareAloneExp, "square alone expression to be set to result value");
                  setInput(prev => `square(${lastExpression})`);
                  setIntermediateExp(squareAloneExp);
                  setResult(squareAloneExp);
                  return;
                }
              }
              else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                console.log(lastExpression, "lastExpression lastExpression");

                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                  console.log("in the lastExp nested function");
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                  console.log(lastExpForIE, "this is the lastExpForIE");

                  if (lastNumInput.startsWith("(")) {
                    console.log("Came into the ( of nested function");
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      console.log("came into num and par nested starts with (");
                      const { paren, number } = numAndParForNested;
                      console.log(paren, number);
                      const squareWithParenthesis = math.square(number);  // Change to square operation
                      console.log(squareWithParenthesis);
                      setResult(squareWithParenthesis);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      console.log(removedLP, "this is the exp after removing lp");
                      setInput(`${previousExpression}${lastOperator}(square(${removedLP})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${squareWithParenthesis}`);
                      return;
                    }
                    return;
                  }
                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const squareNestedAns = math.square(parsedlastNumInput);  // Change to square operation
                  console.log(squareNestedAns, "squareNestedAns");
                  setResult(squareNestedAns);
                  if (squareNestedAns === Infinity || squareNestedAns === -Infinity || isNaN(squareNestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }
                  setInput(`${previousExpression}${lastOperator}square(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${squareNestedAns}`);
                  return;
                }
                if (lastNumInput.startsWith("(")) {
                  console.log("this starts with open parenthesis");
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  console.log(numAndPar);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    console.log(number, paren);
                    const numAndParRe = math.square(number);  // Change to square operation
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(square(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                  }
                  else {
                    console.log("entered into else statement");
                    return;
                  }
                  return;
                }
                const lastNumberFloat = parseFloat(lastExpression);
                console.log("this is the first val in input expression and input is", input);
                const squareResult = math.square(lastNumberFloat);  // Change to square operation
                setInput(`${previousExpression}${lastOperator}square(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${squareResult}`);
                console.log(squareResult, "result obtained");
                setResult(squareResult);
                return;
              }
            }
            else {
              console.log("the last exp block is false");
            }
          } catch (error) {
            console.log("Error happened in square function");
            setResult("Error");
            setIsError(true);
          }
          break;
        // cccubee

        case "x^3":
          try {
            console.log("Mode:", mode);
            const cubeOpForLastExpOpInfo = extractDetailsLastExp(input);
            console.log(cubeOpForLastExpOpInfo, "cubeOpForLastExpOpInfo");
            if (cubeOpForLastExpOpInfo) {
              console.log("The last expression block is true");
              const { previousExpression, lastOperator, lastExpression } = cubeOpForLastExpOpInfo;
              console.log(previousExpression, lastOperator, lastExpression);

              if (lastOperator === null) {
                console.log("entered into")
                const parentInfo = extractParenAndNumber(input);
                if (parentInfo) {
                  const { paren, number } = parentInfo;
                  console.log(paren, "paren,number", number);
                  setInput(`${paren}cube(${number})`);
                  const parseNumber = parseFloat(number);
                  const cubeAloneExp = Math.pow(parseNumber, 3);
                  setResult(cubeAloneExp);
                  setIntermediateExp(`(${cubeAloneExp}`);
                  return;
                } else {
                  if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
                    const is = String(intermediateExp).startsWith('(');
                    if (is) {
                      const cubeAlonePN = extractParenAndNumber(intermediateExp);
                      const { paren, number } = cubeAlonePN;
                      const toBeSet = Math.pow(number, 3);
                      const removedLP = removeLeadingParenthesis(input);
                      setInput(`(cube(${removedLP})`);
                      setIntermediateExp(`(${toBeSet}`);
                      setResult(toBeSet);
                      return;
                    }
                    const cubeResult = Math.pow(intermediateExp, 3);
                    setResult(cubeResult);
                    setIntermediateExp(cubeResult);
                    setInput(`cube(${input})`);
                    if (cubeResult === Infinity || cubeResult === -Infinity || isNaN(cubeResult)) {
                      setIsError(true);
                      console.log("Error: Result is Infinity or NaN");
                      return;
                    }
                    return;
                  }
                  const lastNumberFloat = parseFloat(lastExpression);
                  const cubeAloneExp = Math.pow(lastNumberFloat, 3);
                  setInput(prev => `cube(${lastExpression})`);
                  setIntermediateExp(cubeAloneExp);
                  setResult(cubeAloneExp);
                  return;
                }
              } else {
                const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
                if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
                  const lastExpForIE = extractDetailsLastExp(intermediateExp);
                  const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
                  if (lastNumInput.startsWith("(")) {
                    const numAndParForNested = extractParenAndNumber(lastNumInput);
                    if (numAndParForNested) {
                      const { paren, number } = numAndParForNested;
                      const cubeWithParenthesis = Math.pow(number, 3);
                      const removedLP = removeLeadingParenthesis(lastExpression);
                      setInput(`${previousExpression}${lastOperator}(cube(${removedLP})`);
                      setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${cubeWithParenthesis}`);
                      setResult(cubeWithParenthesis);
                      return;
                    }
                    return;
                  }
                  const parsedlastNumInput = parseFloat(lastNumInput);
                  const cubeNestedAns = Math.pow(parsedlastNumInput, 3);
                  setResult(cubeNestedAns);
                  if (cubeNestedAns === Infinity || cubeNestedAns === -Infinity || isNaN(cubeNestedAns)) {
                    setIsError(true);
                    console.log("Error: Result is Infinity or NaN");
                    return;
                  }
                  setInput(`${previousExpression}${lastOperator}cube(${lastExpression})`);
                  setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cubeNestedAns}`);
                  return;
                }
                if (lastNumInput.startsWith("(")) {
                  const numAndPar = extractParenAndNumber(lastNumInput);
                  if (numAndPar) {
                    const { paren, number } = numAndPar;
                    const numAndParRe = Math.pow(number, 3);
                    setResult(numAndParRe);
                    setInput(`${previousExpression}${lastOperator}(cube(${number})`);
                    setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
                  } else {
                    return;
                  }
                  return;
                }
                const lastNumberFloat = parseFloat(lastExpression);
                const cubeResult = Math.pow(lastNumberFloat, 3);
                setInput(`${previousExpression}${lastOperator}cube(${lastExpression})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cubeResult}`);
                setResult(cubeResult);
                return;
              }
            } else {
              console.log("The last expression block is false");
            }
          } catch (error) {
            console.log("Error happened in cube function");
            setResult("Error");
            setIsError(true);
          }
          break;



        // case "x^y":
        //   console.log("entereed into x^Y");
        //   const opInfoForXpY = extractDetailsLastExp(input);
        //   const { lastExpression, lastOperator } = opInfoForXpY;
        //   console.log(lastExpression, lastOperator)
        //   if (lastOperator === null || lastOperator === undefined) {
        //     console.log("the lastoperator is null here")
        //         console.log("No last operator in this block; evaluating expression");

        //         // Split `intermediateExp` by `^` to extract base and exponent
        //         const parts = intermediateExp.split('^');
        //         // If the exponentiation chain is valid
        //         if (parts.length >= 2) {
        //           const base = Number(parts[0]);
        //           const exponent = Number(parts[1]);

        //           // Calculate base^exponent
        //           const result = Math.pow(base, exponent);
        //           console.log("Calculated result:", result);

        //           // Update the intermediate expression with the evaluated result for the next step
        //           setIntermediateExp(`${result}^`); // Store the result for further exponentiation
        //           setInput(prev => `${prev}^`);  // Append `^` to the input for the user
        //           setResult(result);  // Set the result for display
        //         }
        //         else{
        //           console.log("there are no parts")
        //           setInput(prev=>`${prev}^`)
        //           setIntermediateExp(prev=>`${prev}^`)
        //         }

        //     }

        //   else {
        //     console.log("last operator present here");
        //     console.log("i need to take out the prevExp, lastOperator, and find the answer for the exp after the last oper")
        //     setInput(prev=>`${prev}^`)
        //     console.log(input,"this is input  ");
        //     console.log(intermediateExp,"this is intermediate exp");
        //     setIntermediateExp(prev=>`${prev}^`)
        //     const opInfoForIE=extractDetailsLastExp(intermediateExp);
        //     console.log(opInfoForIE);
        //     // 

        //   }
        //   break

        case "x^y":
          console.log("Entered into x^y");
          const opInfoForXpY = extractDetailsLastExp(input);
          const { lastExpression, lastOperator } = opInfoForXpY;

          console.log(lastExpression, lastOperator);

          // If there's no operator, evaluate the expression in intermediateExp (e.g., 2^3)
          if (lastOperator === null || lastOperator === undefined) {
            console.log("The last operator is null; evaluating expression");

            // Split intermediateExp by '^' to extract the base and exponent
            const parts = intermediateExp.split('^');

            if (parts.length >= 2) {

              let base = parts[0].trim();
              console.log("this is base", base);
              const exponent = Number(parts[1]);
              if (base.startsWith(`(`)) {
                const newExAloneWithp = extractParenAndNumber(base);
                const { paren, number } = newExAloneWithp;
                console.log(paren, number);
                const newAloneBase = number;
                const withPResult = Math.pow(newExAloneWithp, exponent);
                const updatedIntermediateExp = intermediateExp.replace(lastExpression, `${withPResult}`);
                setIntermediateExp(`(${updatedIntermediateExp}`);  // Replace the old exponentiation with the result
                setInput(prev => `${prev}`);  // Update input accordingly
                setResult(withPResult);

              }
              // Calculate base^exponent
              const result = Math.pow(base, exponent);
              console.log("Calculated result:", result);

              // Update intermediateExp with the evaluated result
              const updatedIntermediateExp = intermediateExp.replace(lastExpression, `${result}`);
              setIntermediateExp(updatedIntermediateExp);  // Replace the old exponentiation with the result
              setInput(prev => `${prev}`);  // Update input accordingly
              setResult(result);  // Set the result for display

            } else {
              console.log("Invalid exponentiation chain");
              setInput(prev => `${prev}^`);
              setIntermediateExp(prev => `${prev}^`);
            }

          } else {
            // If there's a last operator, evaluate the last part of the expression after the operator
            console.log("Last operator present, handling exponentiation after the operator");

            // Extract the part of intermediateExp after the last operator (e.g., 2^3 from 25+2^3)
            const { previousExpression: prevExpForIE, lastOperator: lastOpForIE, lastExpression: lastExpForIE } = extractDetailsLastExp(intermediateExp);

            if (lastExpForIE && lastExpForIE.includes('^')) {
              // Split the last expression by '^' to extract the base and exponent
              const parts = lastExpForIE.split('^');
              let base = parts[0].trim();
              // const base = Number(parts[0]);
              console.log(parts[0], "this is baseparts[0]");
              const exponent = Number(parts[1]);
              if (base.startsWith('(')) {
                // Remove the parentheses and parse the number inside
                // base = base.slice(1, -1);
                // base = Number(base);
                const newExtractionWithP = extractParenAndNumber(base)
                const { paren, number } = newExtractionWithP;
                console.log(paren, number)
                const newBase = number;
                console.log(base, "thi si base in parenthesis function")
                const withPResult = Math.pow(newBase, exponent);
                const updatedExp = intermediateExp.replace(lastExpForIE, `${withPResult}`);
                // Update intermediateExp and input accordingly
                setIntermediateExp(updatedExp);
                // setInput(prev => `${prevExpForIE}${lastOperator}${result}^`);  // Update input with the result and append '^'
                setInput(prev => `${prev}^`)
                setIntermediateExp(`${prevExpForIE}${lastOperator}(${withPResult}^`);
                setResult(withPResult);
                return

              }

              // Convert base to number
              // Calculate base^exponent
              const result = Math.pow(base, exponent);
              console.log("Calculated result:", result);

              // Update the intermediateExp to replace the last exponentiation with the result
              const updatedExp = intermediateExp.replace(lastExpForIE, `${result}`);
              // Update intermediateExp and input accordingly
              setIntermediateExp(updatedExp);
              // setInput(prev => `${prevExpForIE}${lastOperator}${result}^`);  // Update input with the result and append '^'
              setInput(prev => `${prev}^`)
              setIntermediateExp(`${prevExpForIE}${lastOperator}${result}^`);

              setResult(result);

              return

            } else {
              console.log("No exponentiation found after the operator, appending `^` for further input");
              setInput(prev => `${prev}^`);
              setIntermediateExp(prev => `${prev}^`);
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const handleMPlusButton = () => {
    if (isError) {
      return
    }
    setShowM(true)
    console.log(memory, "This is the memo in MPlus function");
    if (memory !== null && memory !== undefined) {
      setMemory(prev => prev - parseFloat(input));
      console.log(memory, "This is the memory after clicking M- button");
    }
    else {
      console.log("No memory value to plus");
    }
    setMemory(prev => prev + parseFloat(input))
    console.log(memory, "This is the memory after clicking the M+ button")
  }

  // const handleMPlusButton = () => {
  //   setMemory(prev => (prev || 0) + parseFloat(input));
  //   console.log(memory || 0, "This is the memory after clicking the M+ button");
  // }

  // const handleMMinusButton = () => {
  //   setMemory(prev => prev - parseFloat(input));
  //   console.log(memory, "This is the memory after clicking the M- button")
  // }

  const handleMMinusButton = () => {
    if (isError) {
      return
    }
    setShowM(true);
    console.log(memory, "this is mem value");
    if (memory !== null && memory !== undefined) { // Check if memory has a value
      setMemory(prev => prev - parseFloat(input));
      console.log(memory, "This is the memory after clicking the M- button");
    } else {
      console.log("No memory value to subtract from.");
    }
  }

  useEffect(() => {
    console.log("Result has been updated:", result);

  }, [result]);

  // const handleLogOfXWithBasey = () => {
  //   if (isError) {
  //     console.log("in error handlelogXwith base y");
  //     return;
  //   }
  //   if (input !== null) {
  //     setInput(prev => prev + "logxBasey")
  //     const inputStr = input.toString();
  //     console.log("isLogXy is enabled");
  //     console.log("rFlag is true block");
  //     // const firstEvalExp=extractLastExpDetailsForLogxbasey(input)
  //     // console.log(firstEvalExp,"answer from the funtion");
  //     const expEval = extractLastExpDetailsForLogxbasey(inputStr);
  //     console.log(expEval, "expEval");
  //     const { previousExpressionForLxBy, lastOperatorForLxBy, lastExpressionForLxBy } = expEval
  //     const ansForLogXBy = evaluateLogXYExpression(lastExpressionForLxBy);
  //     console.log(ansForLogXBy, "ansForLogXBy")
  //     const expToBeEvaluated = `${resultForIntermediateCalculations}${lastOperatorForLxBy}${ansForLogXBy}`;
  //     console.log(expToBeEvaluated);
  //     const finalAnsExpLxBy = math.evaluate(expToBeEvaluated);
  //     console.log(finalAnsExpLxBy, "finalAnsExpLxBy");
  //     setResult(finalAnsExpLxBy);
  //     setIntermediateExp(prev => `${prev}${finalAnsExpLxBy}`);
  //     return;



  //     // console.log("rFlag is false block");
  //     // const firstEvalExp = evaluateLogXYExpression(inputStr)
  //     // console.log(firstEvalExp, "answer from the funtion");
  //     // const evalAns = math.evaluate(firstEvalExp);
  //     // setResult(evalAns);


  //   }
  // }
  const [newLogxBasey, setNewLogxBasey] = useState(false)
  // asdfv
  const handleLogOfXWithBasey = () => {
    if(newLogxBasey){
      console.log("entered into setNewLogxBasey block");
      console.log(intermediateExp, "this is the intermediate exp");
      const opInfo = extractExpressionDetails(intermediateExp);
      if(opInfo){
        const{lastExp,lastOp,prevExp}=opInfo
        if (lastOp!==null &&lastExp!==null &&prevExp!==null &&prevExp!=='') {
          //  i think the exp will be 25+3logxbasey3
          const { prevExp, lastOp, lastExp } = opInfo;
          console.log("there is last operator");
          console.log(lastOp, "lastOp", "prevExp", prevExp, "lastExp", lastExp)
          console.log()
          const extraction = extractBeforeAndAfterLogXBaseY(lastExp);
          console.log(extraction, "extractttttt");
          const { beforeLog, afterBase } = extraction;
          const ans = logBase(beforeLog, afterBase);
          const newIntExp = `${prevExp}${lastOp}${ans}`
          const ansWithIntExp = math.evaluate(newIntExp);
          console.log(ansWithIntExp, "ansssssssss");
          console.log(newIntExp, "this is the ew int expression");
          // setIntermediateExp(`${newIntExp}${operator}`)
          setInput(prev=>`${prev}logxBasey`);
          setIntermediateExp(`${ansWithIntExp}logxBasey`)
          setResult(ansWithIntExp)
          return
        }
        else{
          console.log("came into exo ")
          const extraction = extractBeforeAndAfterLogXBaseY(intermediateExp);

          const { beforeLog, afterBase } = extraction;
          const ans = logBase(beforeLog, afterBase);
          const newIntExp = `${prevExp}${lastOp}${ans}`
          const ansWithIntExp = math.evaluate(newIntExp);
          console.log(ansWithIntExp, "ansssssssss");
          console.log(newIntExp, "this is the ew int expression");
          if (isNaN(ans)) {
          const  eans = "NaN";  // or use a fallback value of your choice
            console.log("Answer is NaN due to invalid log calculation");
            setResult(eans)
            setIsError(true)
        }
        }
      }
      
      else {
        //  i think the exp will be 3logxbasey3
        console.log("there is no operator")
        // prev one 
        // const extraction = extractBeforeAndAfterLogXBaseY(input);
        const extraction = extractBeforeAndAfterLogXBaseY(intermediateExp);
        const { beforeLog, afterBase } = extraction;
        // const newExp = `log(${beforeLog}) / log(${afterBase})`
        // console.log(newExp, "this is the new exp")
        const ans = logBase(beforeLog, afterBase);
        console.log(ans, "this is the ans for log x basey alone answer");
        setInput(prev=>`${prev}logxBasey`)
        setIntermediateExp(`${ans}logxBasey`);
        setResult(ans);
        return
        // vna
      }
      return;
    }
    setNewLogxBasey(true)
    console.log("in handleLogOfXWith Basey");
    setInput(prev => `${prev}logxBasey`)
    console.log(intermediateExp, "this is the int exp");
    setIntermediateExp(prev => `${prev}logxBasey`)
    console.log(input, "this is the input")
  }

  const handleMod = () => {
    if (isError) {
      console.log("handle mod error function");
      return;
    }
    console.log(showM, "this is showM value")
    setInput(prev => `${prev}mod`);
    setIntermediateExp(prev => `${prev}%`)
  };


  const handleModulusOperation = (inputStr) => {
    // Replace 'mod' with '%'
    const modifiedInput = inputStr.replace(/(\d+)\s*mod\s*(\d+)/g, (match, p1, p2) => {
      return `${p1} % ${p2}`; // replace with modulo operator
    });

    try {
      const evalResult = math.evaluate(modifiedInput);
      return evalResult;
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return "Error";
    }
  };



  // const handleFactorial = () => {
  //   if (isError) {
  //     return;
  //   }
  //   console.log("In handle factorial function", input);
  //   const lastNumberMatch = input.match(/(\d+\.?\d*)\s*$/); // Match the last number at the end of the string
  //   if (lastNumberMatch) {
  //     const lastNumber = lastNumberMatch[0].trim(); // Get the last matched number
  //     // Replace the last number or the empty space after it with its factorial representation
  //     const updatedInput = input.slice(0, -lastNumber.length) + `factorial(${lastNumber})`;
  //     console.log(`Replacing last number ${lastNumber} with factorial(${lastNumber})`);
  //     setInput(updatedInput);
  //     const factorialResult = math.factorial(lastNumber)
  //     console.log("factorialResult", factorialResult)
  //     setResult(factorialResult)
  //     // vna
  //     setIntermediateExp()
  //     console.log(resultForIntermediateCalculations, "resultForIntermediateCalculations")
  //     // if(resultForIntermediateCalculations){
  //     console.log("resultForIntermediateCalculations we do have this before the fact");
  //   } else {
  //     // If the input ends with a space, you might want to handle it
  //     if (input.endsWith(' ')) {
  //       // If it ends with a space, we can safely append factorial()
  //       setInput(input + 'factorial()');

  //       // setResult()
  //     } else {
  //       // If no number found, log an error
  //       console.log("No number found to apply factorial on.");
  //       setInput(`factorial(0)`)
  //       setResult(math.factorial(0))
  //     }
  //   }
  // };



  // *********************************************************************************
  // *********************************************************************************

  const handleFactorial = () => {

    try {
      console.log("Mode:", mode);
      const factorialOpForLastExpOpInfo = extractDetailsLastExp(input);
      console.log(factorialOpForLastExpOpInfo, "factorialOpForLastExpOpInfo");
      if (factorialOpForLastExpOpInfo) {
        console.log("the last exp block is true");
        const { previousExpression, lastOperator, lastExpression } = factorialOpForLastExpOpInfo;
        console.log(previousExpression, lastOperator, lastExpression);

        if (lastOperator === null) {
          const parentInfo = extractParenAndNumber(input);
          if (parentInfo) {
            const { paren, number } = parentInfo;
            console.log(paren, "paren, number", number);
            setInput(`${paren}factorial(${number})`);
            const parseNumber = parseInt(number);  // factorial should work with integers
            const factorialAloneExp = math.factorial(parseNumber);
            setResult(factorialAloneExp);
            setIntermediateExp(`(${factorialAloneExp}`);
            return;
          } else {
            console.log(lastOperator, "lastOperator lastOperator");
            console.log(lastExpression, "lastExpression lastExpression");

            if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
              console.log("in the input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)");
              const is = String(intermediateExp).startsWith('(');
              if (is) {
                console.log("this is the ( nested alone exp");
                const factorialAlonePN = extractParenAndNumber(intermediateExp);
                const { paren, number } = factorialAlonePN;
                console.log(paren, number, "ddddddd");
                const toBeSet = math.factorial(number);
                console.log(toBeSet);
                const removedLP = removeLeadingParenthesis(input);
                setInput(`(factorial(${removedLP})`);
                console.log("this is the intermediate exp", intermediateExp);
                setIntermediateExp(`(${toBeSet}`);
                return;
              }
              const factorialResult = math.factorial(intermediateExp);
              console.log(factorialResult);
              setResult(factorialResult);
              setIntermediateExp(factorialResult);

              // Check for errors (Infinity or NaN)
              setInput(`factorial(${input})`);
              if (factorialResult === Infinity || factorialResult === -Infinity || isNaN(factorialResult)) {
                setIsError(true);
                console.log("Error: Result is Infinity or NaN");
                return;
              }
              return;
            }
            const lastNumberFloat = parseFloat(lastExpression);
            console.log("last number in lastOperator===null", lastNumberFloat);
            console.log("this is alone expression");
            const factorialAloneExp = math.factorial(lastNumberFloat);
            console.log(factorialAloneExp, "factorial alone expression to be set to result value");
            setInput(prev => `factorial(${lastExpression})`);
            setIntermediateExp(factorialAloneExp);
            setResult(factorialAloneExp);
            return;
          }
        } else {
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
          console.log(lastExpression, "lastExpression lastExpression");

          if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
            console.log("in the lastExp nested function");
            const lastExpForIE = extractDetailsLastExp(intermediateExp);
            const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
            console.log(lastExpForIE, "this is the lastExpForIE");

            if (lastNumInput.startsWith("(")) {
              console.log("Came into the ( of nested function");
              const numAndParForNested = extractParenAndNumber(lastNumInput);
              if (numAndParForNested) {
                console.log("came into num and par nested starts with (");
                const { paren, number } = numAndParForNested;
                console.log(paren, number);
                const factorialWithParenthesis = math.factorial(number);
                console.log(factorialWithParenthesis);
                setResult(factorialWithParenthesis);
                const removedLP = removeLeadingParenthesis(lastExpression);
                console.log(removedLP, "this is the exp after removing LP");
                setInput(`${previousExpression}${lastOperator}(factorial(${removedLP}))`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${factorialWithParenthesis}`);
                return;
              }
              return;
            }
            const parsedLastNumInput = parseFloat(lastNumInput);
            const factorialNestedAns = math.factorial(parsedLastNumInput);
            console.log(factorialNestedAns, "factorialNestedAns");
            setResult(factorialNestedAns);

            // Check for errors (Infinity or NaN)
            if (factorialNestedAns === Infinity || factorialNestedAns === -Infinity || isNaN(factorialNestedAns)) {
              setIsError(true);
              console.log("Error: Result is Infinity or NaN");
              return;  // Prevent further calculations
            }
            setInput(`${previousExpression}${lastOperator}factorial(${lastExpression})`);
            setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${factorialNestedAns}`);
            return;
          }

          if (lastNumInput.startsWith("(")) {
            console.log("this starts with open parenthesis");
            const numAndPar = extractParenAndNumber(lastNumInput);
            console.log(numAndPar);
            if (numAndPar) {
              const { paren, number } = numAndPar;
              console.log(number, paren);
              const numAndParRe = math.factorial(number);
              setResult(numAndParRe);
              setInput(`${previousExpression}${lastOperator}(factorial(${number})`);
              setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
            } else {
              console.log("entered into else statement");
              return;
            }
            return;
          }

          const lastNumberFloat = parseFloat(lastExpression);
          console.log("this is the first val in input expression and input is", input);
          const factorialResult = math.factorial(lastNumberFloat);
          setInput(`${previousExpression}${lastOperator}factorial(${lastExpression})`);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${factorialResult}`);

          console.log(factorialResult, "result obtained");
          setResult(factorialResult);
          return;
        }
      } else {
        console.log("the last exp block is faaaaalse");
      }

    } catch (error) {
      console.log("Error happened in factorial function");
      setResult("Error");
      setIsError(true);
    }
  }

  // const handleYthRoot = () => {
  //   // setIsYroot(true)
  //   if (isError) {
  //     console.log("in error handleYthRoot ");
  //     return;
  //   }
  //   console.log(input, "this is ythroot fu");
  //   let var1 = input === "" ? 0 : input;
  //   let var2 = ""; // Initialize var2 as needed (e.g., you might want to get the y-value)
  //   setInput(`${var1}yroot${var2}`);
  // };
  const [previousResult, setPreviousResult] = useState(null);
  const handleYthRoot = () => {
    if (isYroot) {

      const extraction = extractBeforeAndAfterLastExponent(intermediateExp);
      console.log(extraction, "extraction");
      // Check if extraction is valid
      // Validate that extraction is an object and has the required properties
      if (!extraction || !extraction.beforeExponent || !extraction.afterExponent) {
        console.error("Extraction failed or incomplete:", extraction);
        return; // Exit if extraction is invalid
      }
      const { beforeExponent, afterExponent } = extraction;
      if (extraction === null || afterExponent === null || afterExponent === '' || afterExponent === undefined) {
        return
      }
      if (extraction) {
        // If we have a previous result (in case this is a nested yroot operation)
        // const base = previousResult !== null ? previousResult : beforeExponent;

        // //  so now i need to set the int as
        // const newExp = `${beforeExponent}^(1/${afterExponent})`;
        // Construct the new expression for yroot
        const newExp = `${beforeExponent}^(1/${afterExponent})`;
        console.log(newExp, "This is the new exp to be set to the yroot");

        // console.log(newExp, "This is the new exp to be set to the yroot");
        const ans = math.evaluate(newExp);

        // Update the previous result for the next yroot operation
        setPreviousResult(ans);
        // setIntermediateExp(`${newExp}${operator}`);
        setResult(ans);
        setInput(prev => `${prev}yroot`);
        setIntermediateExp(`${ans}^`)
        // setIsYroot(false)
        return;
      }
      else{
        console.log("np extraction found")
        return
      }


    } else {
      // First time yroot is clicked, initialize the expression
      setInput(prev => `${prev}yroot`);
      setIntermediateExp(prev => `${prev}^`);
      setIsYroot(true);  // Mark yroot mode as active
    }
  };


  // *********************************************************************************
  // *********************************************************************************


  // const handlePercentage = () => {
  //   if (isError) {
  //     console.log("in handlePercentage");
  //     return
  //   }
  //   try {
  //     setResult(math.evaluate(input) / 100);
  //   } catch (error) {
  //     setResult("Error");
  //   }
  // };
  const handlePercentage = () => {
    if (isError) {
      console.log("in handlePercentage - Error State");
      return;
    }
    setInput(prev => `${prev}`)

    try {
      if (input.includes('%')) {
        const percentageValue = parseFloat(input.replace('%', ''));
        setResult(percentageValue / 100);
      } else {
        // If there's no percentage sign, calculate the percentage of the input
        setResult(math.evaluate(input) / 100);
      }
    } catch (error) {
      console.error("Error in handlePercentage:", error);
      setResult("Error");
    }
  };

  // const handleInverse = () => {
  //   if(isError){
  //     return
  //   }
  //   try {
  //     setResult(1 / math.evaluate(input));
  //   } catch (error) {
  //     setResult("Error");
  //   }
  // };


  // const handleInverse = () => {
  //   if (isError) return; 
  //   try {
  //     const currentInput = input.trim();
  //     if (!currentInput) {
  //       setResult("Please enter a number");
  //       return;
  //     }
  //     // Evaluate the input using math.js
  //     const reciprocOpInfo = extractDetails(input);
  //     const { previousExpression, lastOperator, lastNumber } = reciprocOpInfo;
  //     // console.log(previousExpression,lastOperator,lastNumber);
  //     if (lastOperator === null) {
  //       console.log("there is no last operator");
  //       setInput(`reciproc(${input})`);
  //       console.log(input, "This is the input  ");
  //       const evaluatedValue = math.evaluate(currentInput);
  //       const reciprocalValue = calculateReciprocal(evaluatedValue);
  //       setResult(reciprocalValue.toString());
  //       return
  //     }
  //     else {
  //       console.log("There is prev expression");
  //       setInput(`${previousExpression}${lastOperator}reciproc(${lastNumber})`);
  //       const reciprocalValue = calculateReciprocal(lastNumber);
  //       console.log(reciprocalValue);
  //       setResult(reciprocalValue);
  //     }
  //   } catch (error) {
  //     console.error("Error in handleInverse:", error);
  //     setResult("Error");
  //     setIsError(true);
  //   }
  // }
  const handleInverse = () => {
    if (isError) {
      return
    }
    if (!input) {
      setInput(`reciproc(0)`);
      setResult(`Infinity`);
      setIsError(true)
      return
    }
    try {
      console.log("Mode:", mode);
      const reciprocOpForLastExpOpInfo = extractDetailsLastExp(input);
      console.log(reciprocOpForLastExpOpInfo, "reciprocOpForLastExpOpInfo");

      if (reciprocOpForLastExpOpInfo) {
        console.log("The last expression block is true");
        const { previousExpression, lastOperator, lastExpression } = reciprocOpForLastExpOpInfo;
        console.log(previousExpression, lastOperator, lastExpression);

        if (lastOperator === null) {
          const parentInfo = extractParenAndNumber(input);
          if (parentInfo) {
            const { paren, number } = parentInfo;
            console.log(paren, "paren, number:", number);
            setInput(`${paren}reciproc(${number})`);
            const parseNumber = parseFloat(number);
            const reciprocAloneExp = math.evaluate(`1/${parseNumber}`);
            setResult(reciprocAloneExp);
            setIntermediateExp(`(${reciprocAloneExp}`);
            return;
          } else {
            console.log(lastOperator, "lastOperator lastOperator");
            console.log(lastExpression, "lastExpression lastExpression");

            if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|sinh|yroot|square/.test(input)) {
              const is = String(intermediateExp).startsWith('(');
              if (is) {
                console.log("This is the nested expression with '('");
                const reciprocAlonePN = extractParenAndNumber(intermediateExp);
                const { paren, number } = reciprocAlonePN;
                console.log(paren, number, "Nested Expression Info");
                const toBeSet = math.evaluate(`1/${number}`);
                console.log(toBeSet);
                const removedLP = removeLeadingParenthesis(input);
                setInput(`(reciproc${removedLP})`);
                setIntermediateExp(`(${toBeSet}`);
                setResult(toBeSet);
                return;
              }
              const reciprocResult = math.evaluate(`1/${intermediateExp}`);
              console.log(reciprocResult);
              setResult(reciprocResult);
              setIntermediateExp(reciprocResult);
              setInput(`reciproc(${input})`);

              if (reciprocResult === Infinity || reciprocResult === -Infinity || isNaN(reciprocResult)) {
                setIsError(true);
                console.log("Error: Result is Infinity or NaN");
                return;
              }
              return;
            }
            const lastNumberFloat = parseFloat(lastExpression);
            console.log("last number in lastOperator === null", lastNumberFloat);
            const reciprocAloneExp = math.evaluate(`1/${lastNumberFloat}`);
            setInput(prev => `reciproc(${lastExpression})`);
            setIntermediateExp(reciprocAloneExp);
            setResult(reciprocAloneExp);
            return;
          }
        } else {
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
          console.log(lastExpression, "lastNumber lastNumber");

          if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|cuberoot|cube|sqr|logXbase2|log|powTen|sinh|yroot|square/.test(lastExpression)) {
            const lastExpForIE = extractDetailsLastExp(intermediateExp);
            const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
            if (lastNumInput.startsWith("(")) {
              const numAndParForNested = extractParenAndNumber(lastNumInput);
              if (numAndParForNested) {
                const { paren, number } = numAndParForNested;
                const reciprocWithParenthesis = math.evaluate(`1/${number}`);
                setResult(reciprocWithParenthesis);
                const removedLP = removeLeadingParenthesis(lastExpression);
                setInput(`${previousExpression}${lastOperator}reciproc(${removedLP})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${reciprocWithParenthesis}`);
                return;
              }
              return;
            }
            const parsedlastNumInput = parseFloat(lastNumInput);
            const reciprocNestedAns = math.evaluate(`1/${parsedlastNumInput}`);
            setResult(reciprocNestedAns);

            if (reciprocNestedAns === Infinity || reciprocNestedAns === -Infinity || isNaN(reciprocNestedAns)) {
              setIsError(true);
              console.log("Error: Result is Infinity or NaN");
              return;
            }
            setInput(`${previousExpression}${lastOperator}reciproc(${lastExpression})`);
            setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${reciprocNestedAns}`);
            return;
          }

          if (lastNumInput.startsWith("(")) {
            const numAndPar = extractParenAndNumber(lastNumInput);
            if (numAndPar) {
              const { paren, number } = numAndPar;
              const numAndParRe = math.evaluate(`1/${number}`);
              setResult(numAndParRe);
              setInput(`${previousExpression}${lastOperator}reciproc(${number})`);
              setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
            } else {
              return;
            }
            return;
          }
          const lastNumberFloat = parseFloat(lastExpression);
          const reciprocResult = math.evaluate(`1/${lastNumberFloat}`);
          setInput(`${previousExpression}${lastOperator}reciproc(${lastExpression})`);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${reciprocResult}`);
          setResult(reciprocResult);
          return;
        }
      } else {
        console.log("The last expression block is false");
      }

    } catch (error) {
      console.log("Error happened in reciproc function");
      setResult("Error");
      setIsError(true);
    }


  }

  // finished parenthesis

  const handleCubthRoot = () => {
    if (isError) {
      console.log("in error cubeRoot funtion")
      return;
    }
    try {
      console.log("Mode:", mode);
      const cbrtOpForLastExpOpInfo = extractDetailsLastExp(input);
      console.log(cbrtOpForLastExpOpInfo, "cbrtOpForLastExpOpInfo");
      if (cbrtOpForLastExpOpInfo) {
        console.log("the last exp block is true");
        const { previousExpression, lastOperator, lastExpression } = cbrtOpForLastExpOpInfo;
        console.log(previousExpression, lastOperator, lastExpression);

        if (lastOperator === null) {
          const parentInfo = extractParenAndNumber(input);
          if (parentInfo) {
            const { paren, number } = parentInfo;
            console.log(paren, "paren,number", number);
            setInput(`${paren}cbrt(${number})`);
            const parseNumber = parseFloat(number);
            const cbrtAloneExp = Math.cbrt(parseNumber);
            setResult(cbrtAloneExp);
            setIntermediateExp(`(${cbrtAloneExp}`);
            return;
          } else {
            if (input && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|sinh|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(input)) {
              console.log("in input function");
              const is = String(intermediateExp).startsWith('(');
              if (is) {
                const cbrtAlonePN = extractParenAndNumber(intermediateExp);
                const { paren, number } = cbrtAlonePN;
                const toBeSet = Math.cbrt(number);
                const removedLP = removeLeadingParenthesis(input);
                setInput(`(cbrt(${removedLP})`);
                setIntermediateExp(`(${toBeSet}`);
                setResult(toBeSet);
                return;
              }
              const cbrtResult = Math.cbrt(intermediateExp);
              setResult(cbrtResult);
              setIntermediateExp(cbrtResult);
              setInput(`cbrt(${input})`);
              if (cbrtResult === Infinity || cbrtResult === -Infinity || isNaN(cbrtResult)) {
                setIsError(true);
                console.log("Error: Result is Infinity or NaN");
                return;
              }
              return;
            }
            const lastNumberFloat = parseFloat(lastExpression);
            const cbrtAloneExp = Math.cbrt(lastNumberFloat);
            setInput(prev => `cbrt(${lastExpression})`);
            setIntermediateExp(cbrtAloneExp);
            setResult(cbrtAloneExp);
            return;
          }
        } else {
          const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExp(intermediateExp);
          if (lastExpression && /sin|cos|tan|asin|acos|atan|sqrt|factorial|reciproc|logxBasey|ln|powe|sinh|cube|sqr|logXbase2|log|powTen|reciproc|yroot|square|cbrt/.test(lastExpression)) {
            const lastExpForIE = extractDetailsLastExp(intermediateExp);
            const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = lastExpForIE;
            if (lastNumInput.startsWith("(")) {
              const numAndParForNested = extractParenAndNumber(lastNumInput);
              if (numAndParForNested) {
                const { paren, number } = numAndParForNested;
                const cbrtWithParenthesis = Math.cbrt(number);
                setResult(cbrtWithParenthesis);
                const removedLP = removeLeadingParenthesis(lastExpression);
                setInput(`${previousExpression}${lastOperator}(cbrt(${removedLP})`);
                setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${cbrtWithParenthesis}`);
                return;
              }
              return;
            }
            const parsedlastNumInput = parseFloat(lastNumInput);
            const cbrtNestedAns = Math.cbrt(parsedlastNumInput);
            setResult(cbrtNestedAns);
            if (cbrtNestedAns === Infinity || cbrtNestedAns === -Infinity || isNaN(cbrtNestedAns)) {
              setIsError(true);
              console.log("Error: Result is Infinity or NaN");
              return;
            }
            setInput(`${previousExpression}${lastOperator}cbrt(${lastExpression})`);
            setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cbrtNestedAns}`);
            return;
          }
          if (lastNumInput.startsWith("(")) {
            const numAndPar = extractParenAndNumber(lastNumInput);
            if (numAndPar) {
              const { paren, number } = numAndPar;
              const numAndParRe = Math.cbrt(number);
              setResult(numAndParRe);
              setInput(`${previousExpression}${lastOperator}(cbrt(${number})`);
              setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}(${numAndParRe}`);
            } else {
              return;
            }
            return;
          }
          const lastNumberFloat = parseFloat(lastExpression);
          const cbrtResult = Math.cbrt(lastNumberFloat);
          setInput(`${previousExpression}${lastOperator}cbrt(${lastExpression})`);
          setIntermediateExp(`${prevInputForIE}${lastOpInputForIE}${cbrtResult}`);
          setResult(cbrtResult);
          return;
        }
      } else {
        console.log("the last exp block is false");
      }
    } catch (error) {
      console.log("Error happened in cbrt function");
      setResult("Error");
      setIsError(true);
    }
  };

  // *************************************************


  const handleAbs = () => {
    try {
      if (input) {
        const absOpInfo = extractDetailsLastExp(input);

        if (absOpInfo) {
          const { previousExpression, lastOperator, lastExpression } = absOpInfo;
          console.log(previousExpression, lastOperator, lastExpression);
          if (lastOperator === null) {
            const parentInfoForAbs = extractParenAndNumber(input);
            if (parentInfoForAbs) {
              const { paren, number } = parentInfoForAbs;
              console.log(paren, number);
              setInput(`${paren}abs(${number})`);
              const ansForAbs = math.abs(math.evaluate(number));
              setIntermediateExp(`(${ansForAbs}`)
              setResult(ansForAbs)
              return
            }
            else {
              console.log("there is no parenthesis in this");
              setIntermediateExp(prev => `abs(${prev})`)
              setInput(`abs(${input})`);
              return
            }
          }
          else {
            const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastExpression: lastNumInput } = extractDetailsLastExpFN(intermediateExp);
            if (prevInputForIE !== "") {
              console.log("there is lastoperatr");
              console.log("prevInputForIE:", prevInputForIE, "lastOpInputForIE:", lastOpInputForIE, "lastNumInput:", lastNumInput, "vvvvvvv")
              setInput(`${previousExpression}${lastOperator}abs(${lastExpression})`);
              console.log(intermediateExp, "this is the intermediate expression");
              setIntermediateExp(`${prevInputForIE}abs(${lastNumInput})`)
              return
            }
          }

        }
        setInput(`abs(${input})`);
        setIntermediateExp(`abs(${intermediateExp || input})`);
      } else {
        // If input is empty, just set the input as abs(0) to display something meaningful
        setInput("abs(0)");
        setResult(0);
      }
    } catch (error) {
      console.error("Error evaluating absolute value:", error);
      setResult("Error");
    }
  };



  const handlePlusMinus = () => {
    if (isError) {
      return
    }
    try {
      if (input) {
        const evaluatedValue = math.evaluate(input);
        const newValue = -evaluatedValue;
        setInput(newValue.toString());
      }
    } catch (error) {
      console.error("Error in handlePlusMinus:", error);
      setResult("Error: Invalid input");
    }
  };


  // const toggleSign = () => {
  //   try {
  //     // Check if there is any input
  //     if (input) {
  //       // Case 1: If the input ends with a number, toggle the sign of the last number
  //       const numberRegex = /-?\d+(\.\d+)?$/;  // Regex to match the last number in the input
  //       const lastNumberMatch = input.match(numberRegex);

  //       if (lastNumberMatch) {
  //         // Extract the last number from the input
  //         const lastNumber = lastNumberMatch[0];

  //         // Toggle the sign of the last number
  //         const updatedInput = input.slice(0, input.lastIndexOf(lastNumber)) +
  //           (lastNumber.startsWith('-') ? lastNumber.slice(1) : `-${lastNumber}`);

  //         setInput(updatedInput);  // Update the input with the toggled sign
  //         setIntermediateExp(updatedInput);  // Optionally update intermediate expression
  //         setResult(math.evaluate(updatedInput));  // Recalculate the result

  //       } else {
  //         // Case 2: If input ends with an operator, toggle the sign of the result
  //         if (input.endsWith('+') || input.endsWith('-') || input.endsWith('*') || input.endsWith('/')) {
  //           const toggledResult = result ? -result : 0;  // Toggle the sign of the result
  //           setToggledResult(true)
  //           setResult(toggledResult);  // Update the result with the toggled value
  //         }
  //       }
  //     } else {
  //       // If the input is empty, default to 0
  //       setInput('0');
  //       setIntermediateExp('0');
  //       setResult(0);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling sign:", error);
  //     setResult("Error");
  //   }
  // };
  // const toggleSign = () => {
  //   try {
  //     // Case 1: If there's input, check for a valid number to toggle the sign
  //     if (input) {
  //       const numberRegex = /-?\d+(\.\d+)?$/;  // Regex to match the last number in the input
  //       const lastNumberMatch = input.match(numberRegex);

  //       if (lastNumberMatch) {
  //         // Toggle the sign of the last number in the input
  //         const lastNumber = lastNumberMatch[0];
  //         const updatedInput = input.slice(0, input.lastIndexOf(lastNumber)) +
  //           (lastNumber.startsWith('-') ? lastNumber.slice(1) : `-${lastNumber}`);

  //         setInput(updatedInput);  // Update the input
  //         setIntermediateExp(updatedInput);  
  //         setResult(math.evaluate(updatedInput));  // Recalculate the result
  //       } else if (input.endsWith('+') || input.endsWith('-') || input.endsWith('*') || input.endsWith('/')) {
  //         // Case 2: If input ends with an operator, toggle the sign of the result
  //         const toggledResult = result ? -result : 0;
  //         setToggledResult(true);
  //         setResult(toggledResult);  // Update the result with the toggled value
  //       }
  //     } else {
  //       // If there's no input, reset to 0
  //       setInput('0');
  //       setIntermediateExp('0');
  //       setResult(0);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling sign:", error);
  //     setResult("Error");
  //   }
  // };

  // const toggleSign = () => {
  //   try {
  //     // Case 1: If there's input, check for a valid number to toggle the sign
  //     if (input) {
  //       const numberRegex = /-?\d+(\.\d+)?$/;  // Regex to match the last number in the input
  //       const lastNumberMatch = input.match(numberRegex);

  //       if (lastNumberMatch) {
  //         // Toggle the sign of the last number in the input
  //         const lastNumber = lastNumberMatch[0];
  //         const updatedInput = input.slice(0, input.lastIndexOf(lastNumber)) +
  //           (lastNumber.startsWith('-') ? lastNumber.slice(1) : `-${lastNumber}`);

  //         setInput(updatedInput);  // Update the input
  //         setIntermediateExp(updatedInput);
  //         setResult(math.evaluate(updatedInput));  // Recalculate the result
  //       } else if (input.endsWith('+') || input.endsWith('-') || input.endsWith('*') || input.endsWith('/')) {
  //         // Case 2: If input ends with an operator, toggle the sign of the result
  //         const toggledResult = result ? -result : 0;
  //         setToggledResult(true);  // Set the flag to indicate result was toggled
  //         setResult(toggledResult);  // Update the result with the toggled value
  //       }
  //     } else {
  //       // If there's no input, reset to 0
  //       setInput('0');
  //       setIntermediateExp('0');
  //       setResult(0);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling sign:", error);
  //     setResult("Error");
  //   }
  // };


  const toggleSign = () => {
    try {
      if (input) {
        // Regex to match the last number, including negative numbers and decimals
        const numberRegex = /-?\d+(\.\d+)?$/;
        const lastNumberMatch = input.match(numberRegex);

        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];  // Get the last number
          console.log("lastNumber:", lastNumber);

          const isNegative = lastNumber.startsWith('-');
          console.log("isNegative:", isNegative);

          // Toggle the sign of the last number
          const updatedInput = input.slice(0, input.lastIndexOf(lastNumber)) +
            (isNegative ? lastNumber.slice(1) : `-${lastNumber}`);
          console.log("updatedInput", updatedInput);

          // If the expression contains 'log', ensure we handle it correctly
          if (input.includes('log')) {
            const logRegex = /log\(([^)]+)\)/;
            const logMatch = input.match(logRegex);

            if (logMatch && logMatch[1] === lastNumber) {
              // If the last number is negative, ensure log(-number) is displayed
              const updatedLogInput = input.replace(logMatch[0], `log(${updatedInput.slice(-updatedInput.length)})`);
              setInput(updatedLogInput);  // Update the input field
              setIntermediateExp(updatedLogInput);  // Update the expression shown

              // Check if the number inside log() is negative or zero
              const numberInsideLog = parseFloat(updatedLogInput.match(/log\(([^)]+)\)/)[1]);
              if (numberInsideLog < 0) {
                // If it's negative or zero, return NaN
                setResult("NaN");
                return;
              } else {
                // If it's positive, evaluate the log normally
                const logResult = math.evaluate(updatedLogInput);
                setResult(logResult);
              }

              console.log("Updated log expression:", updatedLogInput);
              return;
            }
          } else {
            // Regular number toggle, no function involved
            setInput(updatedInput);  // Update the input field
            setIntermediateExp(updatedInput);  // Update the expression shown
            const newResult = math.evaluate(updatedInput);  // Evaluate the expression
            setResult(newResult);  // Set the result
            console.log("Updated expression without log:", updatedInput);
          }

          console.log("Updated Input after toggle:", updatedInput);
        }
      } else {
        // If there's no input, reset to 0
        setInput('0');
        setIntermediateExp('0');
        setResult(0);
      }
    } catch (error) {
      console.error("Error toggling sign:", error);
      setResult("Error");
    }
  };





  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // const closePopup = () => {
  //   setIsVisible(false);
  // };

  const minimizePopup = () => {
    setIsMinimized(prev => !prev);

  };
  const handleHelpClick = ({ onClose }) => {
    setShowHelp(prev => !prev);
  }
  const evaluateExpression = (exp) => {
    // Convert scientific notation to a standard number
    return Number(exp);
  };
  const calculateExpN = () => {
    setIsExpBtn(true)
    if (isError) {
      return
    }
    if (input.endsWith("e+0")) {
      console.log("entered into e+0 block");
      const recentNumber = input.slice(0, input.indexOf("e"));
      // Append `e+2e+0` to create the pattern `2e+2e+0`
      console.log(recentNumber, "this is the recent number");
      //  if there is intermediateExp,
      console.log(intermediateExp, "this is the intermediate exp");
      const resultForAlone = math.evaluate(intermediateExp);
      console.log(resultForAlone, "this is the result for alone")
      setResult(resultForAlone);
      setIntermediateExp(`${resultForAlone}e+0`)
      const lastIndexOfEPlus0 = input.lastIndexOf("e+0");
      // if (lastIndexOfEPlus0 !== -1) {
      //   const updatedInput = input.slice(0, lastIndexOfEPlus0) + `e+${result}`;
      //   console.log({ updatedInput });
      //   const upInpDestrucuted = { updatedInput };
      //   console.log(upInpDestrucuted, "thi siis destructed one")
      //   const extractedPart = updatedInput.slice(0, lastIndexOfEPlus0);
      //   console.log("Extracted Part:", extractedPart);

      // }
      if (input.endsWith("e+0")) {
        console.log("Entered into e+0 block");
      
        // Verify if `result` is valid
        if (typeof result === 'undefined' || result === null) {
          console.error("Result is not defined or is null.");
          return;
        }
      
        // Find the last occurrence of `e+0`
        const lastIndexOfEPlus0 = input.lastIndexOf("e+0");
        if (lastIndexOfEPlus0 !== -1) {
          // Create the updated input by replacing only the last `0`
          const updatedInput = input.slice(0, lastIndexOfEPlus0 + 2) + `${result}`; // +2 to keep `e+`
          console.log({ updatedInput });
      
          // Destructure for clarity (although unnecessary for the update itself)
          const upInpDestrucuted = { updatedInput };
          console.log(upInpDestrucuted, "this is the destructed one");
      
          // Log the extracted part up to the last `e+0`
          const extractedPart = input.slice(0, lastIndexOfEPlus0);
          console.log("Extracted Part:", extractedPart);
        } else {
          console.log("No 'e+0' found in input.");
        }
      
        return;
      }
      
      else {
        console.log("No 'e+0' found in input.");
      }

      return;
    }
    const regex = /e\+\d+/;
    if (regex.test(intermediateExp)) {
      console.log("came into a block where the input exp will be e+some number");
      console.log(input, "this is the nput");
      console.log("Match found: ", input.match(regex)[0]);
      const res = math.evaluate(intermediateExp);
      console.log(res,"rrrrrrrr");
      setResult(res);
      setIntermediateExp(res);
      setInput(prev => `${prev}e+0`)
      setIntermediateExp(`${res}e+0`)
      return
    }
    const lastOpInfo = extractDetails(input);
    const { previousExpression, lastOperator, lastNumber } = lastOpInfo;
    console.log(previousExpression, lastOperator, lastNumber);
    if (lastOperator !== null) {
      const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);
      const newExp = `${previousExpression}${lastOperator}${lastNumber}e+0`;
      console.log(newExp, "this is what i wanna evaluate");
      setInput(newExp);
      const newExpForIntExp = `${prevInputForIE}${lastOperator}${lastNumber}e+0`
      setIntermediateExp(newExpForIntExp);
      return;
    }
    else {

      console.log("there is no intermediate value");
      let var1 = input === "" ? 0 : input;
      let var2 = 0;
      setInput(`${var1}e+${var2}`);
      // const answer=evaluateLogXYExpression(input)
      // console.log()
      setIntermediateExp(`${var1}e+${var2}`);

    }


    // console.log(input, "inputt");

    // if (resultForIntermediateCalculations) {
    //   // if this is true then the expression must be f type 25+ something 
    //   console.log("There is some intermediate val and it is ", resultForIntermediateCalculations);
    //   // 1. Extract prev Exp
    //   console.log("input is", input);
    //   const inputStr = input.toString();
    //   const lastOpInfo = extractDetails(inputStr);
    //   const { previousExpression, lastOperator, lastNumber } = lastOpInfo;
    //   console.log(previousExpression, lastOperator, lastNumber);
    //   // const opForExp='+';
    //   const newExp = `${previousExpression}${lastOperator}${lastNumber}e+0`;
    //   console.log(newExp, "this is what i wanna evaluate");
    //   setInput(newExp);
    // }
    // else {
    //   console.log("there is no intermediate value");
    //   let var1 = input === "" ? 0 : input;
    //   let var2 = 0;
    //   setInput(`${var1}e+${var2}`);
    // }

  }


  // const calculateExpN = () => {
  //   setIsExpBtn(true);

  //   if (isError) {
  //     return;
  //   }

  //   const lastOpInfo = extractDetails(input);
  //   const { previousExpression, lastOperator, lastNumber } = lastOpInfo;
  //   console.log(previousExpression, lastOperator, lastNumber);

  //   if (lastOperator !== null) {
  //     const { previousExpression: prevInputForIE, lastOperator: lastOpInputForIE, lastNumberForIE: lastNumInput } = extractDetails(intermediateExp);

  //     const newExp = `${previousExpression}${lastOperator}${lastNumber}e+0`;
  //     console.log(newExp, "This is what I want to evaluate");

  //     setInput(newExp);

  //     const newExpForIntExp = `${prevInputForIE}${lastOperator}${lastNumber}e+0`;
  //     setIntermediateExp(newExpForIntExp);
  //     return;
  //   } else {
  //     console.log("There is no intermediate value");
  //     let var1 = input === "" ? 0 : input;  // Handle empty input case
  //     let var2 = 0;

  //     setInput(`${var1}e+${var2}`);
  //     setIntermediateExp(`${var1}e+${var2}`);
  //   }
  // };



  return (
    // <Draggable>
      <div className={isMinimized ? "hideTheCalc Calculatormaindivpopup" : "Calculatormaindiv Calculatormaindivpopup"}>
        <div className="Calculatorheader">
          {" "}
          <h4 className="calcName">Scientific Calculator</h4>{" "}
          <div className={`Calculatorheaderright ${isMinimized ? 'minimized' : ''} ${isVisible ? 'show' : ''}`}>
            <button className="Calculatorhelp" onClick={handleHelpClick} >
              {showHelp ? "Back" : "Help"}
            </button>
            {/* {isMinimized ?
              (<FaRegWindowMaximize style={{ fontSize: "28px", cursor: "pointer" }} onClick={minimizePopup} />) :
              (
                // <i className="fa-solid fa-minus minusButton" ></i>
                <FaMinus onClick={minimizePopup} style={{ fontSize: "28px", cursor: "pointer" }} />
              )
            } */}
            {/* <i className="fa-solid fa-xmark" ></i>
             */}
            {/* <FaXmark onClick={onClose} style={{ fontSize: "28px", cursor: "pointer" }} /> */}
          </div>
        </div>

        {showHelp ? (<>
          <div className="helpDivInCalc">
            <h2 className="instructionsHeading">Calculator Instructions</h2>
            <div>
              <p> You can operate the calculator using the buttons provided on screen with your mouse. </p>
              <p>
                Allows you to perform basic and complex mathematical operations such as modulus, square root, cube root, trigonometric, exponential, logarithmic, hyperbolic functions, etc.</p>
            </div>
            <h2 className="headdingDos">Do's:</h2>
            <ul>
              <li> Be sure to press [C] when beginning a new calculation.</li>
              <li> Simply an equation using parenthesis and other mathematical operators.</li>
              <li> Use the predefined operations such as p (Pi), log, Exp to save time during calculation.</li>
              <li> Use memory function for calculating cumulative totals.</li>
              <strong>
                [M+]: Will add displayed value to memory.
              </strong>
              <br />
              <strong>
                [MR]: Will recall the value stored in memory.
              </strong>
              <br />
              <strong>
                [M-]: Subtracts the displayed value from memory.
              </strong>
              <br />
              <li> Be sure select the angle unit (Deg or Rad) before beginning any calculation.</li>
              <strong>Note: By default angle unit is set as Degree</strong>
            </ul>
            <h2 className="toBeRed"><span>Don'ts:</span></h2>
            <ul>
              <li>"Perform multiple operations together."</li>
              <li>"Leave parenthesis unbalanced."</li>
              <li>"Change the angle unit (Deg or Rad) while performing a calculation.."</li>
            </ul>
            <h2><span>Limitations:</span></h2>
            <ul>
              <li>"Keyboard operation is disabled."</li>
              <li>"The output for a Factorial calculation is precise up to 14 digits."</li>
              <li>"The output for Logarithmic and Hyperbolic calculations is precise up to 5 digits."</li>
              <li>"Modulus (mod) operation performed on decimal numbers with 15 digits would not be precise."</li>
              <br />
              <strong> Use mod operation only if the number comprises of less than 15 digits i.e. mod operation provides best results for smaller numbers.</strong>
              <br />
              <li>The range of value supported by the calculator is 10(-323) to 10(308).</li>
            </ul>

          </div>
        </>
        ) : (
          <>
            <div className="calculator1 ">
              <input type="text" value={input} readOnly className="calculatorinput" />
              {/* <button className="downloadsButton"> 1</button> */}
              <div className="calculatorinput">{result}</div>
              <div className={showM ? `MText mDF` : "mDN"}  >M</div>
              <div className="calculatorbuttons">
                <div className="firstcolom">
                  <button className="calculatorbutton" onClick={handleMod}>
                    mod
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("sinh")}
                  // onClick={() => handleSinhClick("sinh")}
                  >
                    sinh
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("asinh")}
                  >
                    sinh⁻¹
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleButtonClick("π")}
                  >
                    π
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("sin")}
                  // onClick={() => handleSinhClick("sin")}
                  >
                    sin
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("asin")}
                  >
                    sin⁻¹
                  </button>
                </div>
                <div className="firstcolom">
                  <div className="mode">
                    <label>
                      <input
                        type="radio"
                        value="Deg"
                        checked={mode === "Deg"}
                        onChange={handleModeChange}
                      />
                      Deg
                    </label>
                  </div>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("cosh")}
                  >
                    cosh
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("acosh")}
                  >
                    cosh⁻¹
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleButtonClick("e")}
                  >
                    e
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("cos")}
                  // onClick={() => handleSinhClick('cos')}
                  >
                    cos
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("acos")}
                  >
                    cos⁻¹
                  </button>
                </div>
                <div className="firstcolom">
                  <div className="mode">
                    <label>
                      <input
                        type="radio"
                        value="Rad"
                        checked={mode === "Rad"}
                        onChange={handleModeChange}
                      />
                      Rad
                    </label>
                  </div>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("tanh")}
                  >
                    tanh
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("atanh")}
                  >
                    tanh⁻¹
                  </button>
                  <button className="calculatorbutton" onClick={handleFactorial}>
                    n!
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("tan")}

                  >
                    tan
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleTrigFunction("atan")}
                  >
                    tan⁻¹
                  </button>
                </div>
                <div className="threedcolom">
                  <button
                    className="calculatorbutton"
                    // onClick={() => handlePowerFunction("expN")}

                    onClick={calculateExpN}
                  >
                    Exp
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleLogFunction("log2")}
                  >
                    log₂X
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={
                      handleLogOfXWithBasey
                    }
                  >
                    log<sub>y</sub>x
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handlePowerFunction("x^y")}
                  >
                    xʸ
                  </button>
                  <button className="calculatorbutton" onClick={handleYthRoot}>
                    {/*³√x  */}
                    <sup>y</sup>√x
                  </button>
                </div>
                <div className="threedcolom">
                  <button
                    className="calculatorbutton"
                    onClick={handleOpenParenthesis}
                  // onClick={() => handleButtonClick("(")}
                  >
                    (
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleLogFunction("loge")}
                  >
                    ln
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handlePowerFunction("exp")}
                  >
                    eˣ
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handlePowerFunction("x^3")}
                  >
                    x³
                  </button>
                  <button className="calculatorbutton" onClick={handleCubthRoot}>

                    ∛
                  </button>
                </div>
                <div className="threedcolom">
                  <button
                    className="calculatorbutton"
                    // onClick={() => handleButtonClick(")")}
                    onClick={handleCloseParenthesis}
                  >
                    )
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handleLogFunction("log")}
                  >
                    log
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handlePowerFunction("10^x")}
                  >
                    10ˣ
                  </button>
                  <button
                    className="calculatorbutton"
                    onClick={() => handlePowerFunction("x^2")}
                  >
                    x²
                  </button>
                  <button className="calculatorbutton" onClick={handleAbs}>
                    |X|
                  </button>
                </div>
                <div className="calculatortoplines">
                  <div className="firstlineright">
                    <button className="calculatorbutton" onClick={handleMemoryClear}>MC</button>
                    <button className="calculatorbutton" onClick={handleMemoryRecall}>MR</button>
                    <button className="calculatorbutton" onClick={handleMemoryStore} >MS</button>
                    <button className="calculatorbutton" onClick={handleMPlusButton} >M+</button>
                    <button className="calculatorbutton" onClick={handleMMinusButton} >M-</button>
                  </div>
                  <div className="firstlineright">
                    <button
                      className="calculatorbutton calculatorBackspace"
                      onClick={handleBackspace}
                    >
                      {/* <FaArrowLeftLong /> */}
                    </button>
                    <button
                      className="calculatorbutton calculatorClear"
                      onClick={handleClear}
                    >
                      C
                    </button>
                    <button className="calculatorbutton"
                      // onClick={handlePlusMinus}
                      onClick={toggleSign}

                    >+/-</button>
                    <button className="calculatorbutton" onClick={handleSqrt}>
                      √
                    </button>
                  </div>
                  <div className="firstlineright">
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("7")}
                    >
                      7
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("8")}
                    >
                      8
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("9")}
                    >
                      9
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleOperator("/")}
                    >
                      /
                    </button>
                    <button className="calculatorbutton"
                      //  onClick={handlePercentage}
                      onClick={() => handleOperator('%')}
                    >
                      %
                    </button>
                  </div>
                  <div className="firstlineright">
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("4")}
                    >
                      4
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("5")}
                    >
                      5
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("6")}
                    >
                      6
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleOperator("*")}
                    >
                      *
                    </button>
                    <button className="calculatorbutton" onClick={handleInverse}>
                      1/x
                    </button>
                  </div>
                  <div className="secondlineright">
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("1")}
                    >
                      1
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("2")}
                    >
                      2
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick("3")}
                    >
                      3
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleOperator("-")}
                    >
                      -
                    </button>
                  </div>

                  <div className="secondlineright secondlineright11 ">
                    <button
                      className="calculatorbutton calculatorzero"
                      onClick={() => handleButtonClick("0")}
                    >
                      0
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleButtonClick(".")}
                    >
                      .
                    </button>
                    <button
                      className="calculatorbutton"
                      onClick={() => handleOperator("+")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="calculatorequalto" >
                  <button
                    className="calculatorequalto1"
                    onClick={handleEvaluate}
                  >
                    =
                  </button>
                </div>
              </div>
            </div>
          </>
        )
        }
      </div>
    // </Draggable>
  );
};

export default ScientificCalculator2;
