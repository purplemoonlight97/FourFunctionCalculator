import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const operands = ['*', '/', '+', '-'];

const isOperand = (value) => {
  for(let i = 0; i < operands.length; i++){
    if(value === operands[i]){
      return true;
    }
  }
  return false;
}

const NumberButton = (props) => {
  const handleClick = () => {
    if(isOperand(Array.from(props.nextElement)[0])){ //if next element is an operand, apend it to expression
      props.setExpression(String(props.expression).concat(props.nextElement));
      props.setNextElement(props.value);
    } else if (props.nextElement === "0"){
      props.setNextElement(props.value);
    } else {
      if(props.expression === '0'){
        props.setExpression("");
      }
      if(typeof props.nextElement === 'number') { //if the next element is a number, it is from a previous operation and must be removed
        props.setNextElement(props.value);
      } else{
        props.setNextElement(props.nextElement.concat(props.value));
      }
    }
  }

  return (
    <button className='number button' id={props.id} onClick={handleClick} type='button'>{props.value}</button>
  )
}

const ClearButton = (props) => {

  const handleClick = () => {
    props.setCalculatedAnswer("0");
    props.setExpression("");
    props.setNextElement("0");
  }

  return (
    <button className='clear button' id={props.id} onClick={handleClick} type='button'>AC</button>
  )
}

const OperandButton = (props) => {

  const handleClick = () => {

    if(props.value === '-'){ //- is a special case due to possibility of making a negative number

      if (!isOperand(props.nextElement)){//move numbers to the expression
        if(props.nextElement === ""){
          props.setExpression('');
        } else {
          props.setExpression(props.expression.concat(props.nextElement));
          //if an answer was last calculated it needs to be cleared
          if(props.expression.includes('=')){
            props.setExpression(props.nextElement);
          }
        }
        props.setNextElement(props.value);
      } else if (props.nextElement != '-'){ //is an operand besides -
        props.setNextElement(props.nextElement.concat(props.value));
      }
      return;
    }

    if(props.nextElement != ""){ //if next element is empty, don't start expression with operand
      if(!isOperand(Array.from(props.nextElement)[0])){//move numbers to the expression
        props.setExpression(props.expression.concat(props.nextElement));
        if(props.expression.includes('=')){
          props.setExpression(props.nextElement);
        }
        props.setNextElement(props.value);
      } else{ //not a number means current element is an operand and should be replaced
        props.setNextElement(props.value);
      }
    }
  }

  return(
    <button className='operand button' id={props.id} onClick={handleClick} type='button'>{props.value}</button>
  )
}

const EqualButton = (props) => {
  const handleClick = () => {
    let answer = 0;
    //eval the expression
    //be careful with eval. If expressions aren't 100% clean, it can lead to vulnerabilities
    if(!isOperand(Array.from(props.nextElement)[0])){ //if a number is next element, append it to expression before eval
      answer = parseFloat(eval(props.expression.concat(props.nextElement)).toFixed(5));
      props.setExpression(String(props.expression) + (String(props.nextElement) + "="));
    } else {
      answer = parseFloat(eval(props.expression).toFixed(5));
      props.setExpression(props.expression.concat("="))
    }  
    props.setNextElement(answer); 
  }

  return (
    <button id={props.id} className='equal button' onClick={handleClick} type='button'>=</button>
  )
}

const DecimalButton = (props) => {
  const handleClick = () => {
    if(isOperand(Array.from(props.nextElement)[0])){ //next element is an operand and needs to be moved to expression
      props.setExpression(props.expression.concat(props.nextElement));
      props.setNextElement('0.');
    } else if(props.nextElement === ''){ //no current element
      props.setNextElement('0.');
    } else { //current element is a number
      if(!props.nextElement.includes('.')){ //there is not already a decimal point
        props.setNextElement(props.nextElement.concat('.'));
      }
    }
  }

  return (
    <button id={props.id} className='operand button' onClick={handleClick} type='button'>.</button>
  )
}

const DisplayInputs = (props) => {
  let displayString = props.expression + props.nextElement;

  return(
    <div id={props.id} className='display'>
      {displayString}
    </div>
  )
}

const Display = (props) => {

  props.setCalculatedAnswer(props.nextElement);

  return (
    <div id={props.id} className='answer display'>
      {String(props.calculatedAnswer)}
    </div>
  )
}

const App = () => {
  const [expression, setExpression] = useState("");
  const [nextElement, setNextElement] = useState("0");
  const [calculatedAnswer, setCalculatedAnswer] = useState("0");

  return(
    <div id='calculator'>
      <DisplayInputs id='inputDisplay' expression={expression} nextElement={nextElement}/>
      <Display id='display' setCalculatedAnswer={setCalculatedAnswer} calculatedAnswer={calculatedAnswer} nextElement={nextElement}/>
      <ClearButton id='clear' setExpression={setExpression} setNextElement={setNextElement} setCalculatedAnswer={setCalculatedAnswer}/>
      <OperandButton id='multiply' value='*' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <OperandButton id='divide' value='/' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='one' value='1' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='two' value='2' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='three' value='3' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <OperandButton id='add' value='+' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='four' value='4' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='five' value='5' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='six' value='6' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <OperandButton id='subtract' value='-' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='seven' value='7' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='eight' value='8' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='nine' value='9' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <DecimalButton id='decimal' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <NumberButton id='zero' value='0' setNextElement={setNextElement} nextElement={nextElement} setExpression={setExpression} expression={expression}/>
      <EqualButton id="equals" setExpression={setExpression} expression={expression} setNextElement={setNextElement} nextElement={nextElement}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
