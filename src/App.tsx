import { useState } from 'react'
import './App.css'

function Calculator() {
  const [result, setResult] = useState('0');
  const [lastPressedEquals, setLastPressedEquals] = useState(false);

  const handleButtonClick = (value: string) => {
    if (lastPressedEquals && ['+', '-', '*', '/'].includes(value)) {
      setResult(result + value);
      setLastPressedEquals(false);
      return;
    } else if (lastPressedEquals) {
      setResult(value);
      setLastPressedEquals(false);
      return;
    }

    // Prevent multiple decimals in the current number
    if (value === '.') {
      const parts = result.split(/[\+\-\*\/]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes('.')) return;
    }

    // Handle consecutive operators (except negative sign)
    if (['+', '*', '/'].includes(value)) {
      if (/[+\-*/]$/.test(result)) {
        // If last char is operator
        if (result.match(/[+\-*/]{2}$/)) {
          // If last two chars are operators, replace both unless the second is '-'
          if (value === '-' && !result.endsWith('-')) {
            setResult(result + value);
          } else {
            setResult(result.replace(/[+\-*/]+$/, value));
          }
        } else {
          // Replace last operator with new one
          setResult(result.replace(/[+\-*/]$/, value));
        }
        return;
      }
    }

    // Allow negative sign after operator
    if (value === '-' && /[+\-*/]$/.test(result)) {
      setResult(result + value);
      return;
    }

    if (result === '0' && value !== '.') {
      setResult(value);
    } else {
      setResult(result + value);
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(result);
      let displayResult = evalResult;
      if (typeof evalResult === 'number' && !Number.isInteger(evalResult)) {
        displayResult = parseFloat(evalResult.toFixed(10)).toString();
      }
      setResult(displayResult.toString());
      setLastPressedEquals(true);
    } catch (error) {
      setResult('Error');
      setLastPressedEquals(false);
    }
  };

  const clearResult = () => {
    setResult('0');
    setLastPressedEquals(false);
  };

  // Display the calculator
  return (
    <div className="calculator">
      <div className="display" id="display"><h2>{result}</h2></div>
      <div className="buttons">
        <div className="row">
          <button id="clear" onClick={clearResult}>AC</button>
          <button id="divide" onClick={() => handleButtonClick('/')}>/</button>
          <button id="multiply" onClick={() => handleButtonClick('*')}>x</button>
        </div>
        <div className="row">
          <button id="seven" onClick={() => handleButtonClick('7')}>7</button>
          <button id="eight" onClick={() => handleButtonClick('8')}>8</button>
          <button id="nine" onClick={() => handleButtonClick('9')}>9</button>
          <button id="subtract" onClick={() => handleButtonClick('-')}>-</button>
        </div>
        <div className="row">
          <button id="four" onClick={() => handleButtonClick('4')}>4</button>
          <button id="five" onClick={() => handleButtonClick('5')}>5</button>
          <button id="six" onClick={() => handleButtonClick('6')}>6</button>
          <button id="add" onClick={() => handleButtonClick('+')}>+</button>
        </div>
        <div className="row">
          <button id="one" onClick={() => handleButtonClick('1')}>1</button>
          <button id="two" onClick={() => handleButtonClick('2')}>2</button>
          <button id="three" onClick={() => handleButtonClick('3')}>3</button>
          <button id="equals" onClick={calculateResult}>=</button>
        </div>
        <div className="row">
          <button id="zero" onClick={() => handleButtonClick('0')}>0</button>
          <button id="decimal" onClick={() => handleButtonClick('.')}>.</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;