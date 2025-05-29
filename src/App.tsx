import { useState } from 'react'
import './App.css'

function Calculator() {
  const [result, setResult] = useState('0');

  const handleButtonClick = (value: string) => {
    if (result === '0' && value !== '.') {
      setResult(value);
    } else {
      setResult(result + value);
    }
  };

  const calculateResult = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearResult = () => {
    setResult('0');
  };

  return (
    <div className="calculator">
      <div className="display">{result}</div>
      <div className="buttons">
        <button id='7' onClick={() => handleButtonClick('7')}>7</button>
        <button id='8' onClick={() => handleButtonClick('8')}>8</button>
        <button id='9' onClick={() => handleButtonClick('9')}>9</button>
        <button id='divide' onClick={() => handleButtonClick('/')}>÷</button>
        <button id='4' onClick={() => handleButtonClick('4')}>4</button>
        <button id='5' onClick={() => handleButtonClick('5')}>5</button>
        <button id='6' onClick={() => handleButtonClick('6')}>6</button>
        <button id='multiply' onClick={() => handleButtonClick('*')}>x</button>
        <button id='1' onClick={() => handleButtonClick('1')}>1</button>
        <button id='2' onClick={() => handleButtonClick('2')}>2</button>
        <button id='3' onClick={() => handleButtonClick('3')}>3</button>
        <button id='-' onClick={() => handleButtonClick('-')}>-</button>
        <button id='clear' onClick={clearResult}>C</button>
        <button id='0' onClick={() => handleButtonClick('0')}>0</button>
        <button id='decimal' onClick={() => handleButtonClick('.')}>.</button>
        <button id='equals' onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;