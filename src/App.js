import React from 'react';
import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'


export const ACTIONS = {
  CLEAR_DIGITS: "clear_digits",
  DELETE_DIGIT: "delete_digit",
  OPERATIONS_ACTION: "operators_action",
  ADD_DIGITS: "add_digits",
  CALCULATE : "calculate"
}


function reducer(state, {type, payload}){
  switch(type){

    case ACTIONS.ADD_DIGITS:
      if(state.overwrite){
        return{
          ...state,
          currentNum: payload.digit,
          overwrite: false
        }
      }
  if ((state.currentNum === null || state.currentNum === "0") && payload.digit === "0") {
    return state;
  }
  if ((state.currentNum && state.currentNum.includes(".")) && payload.digit === ".") {
    return state;
  }
  return {
    ...state,
    currentNum: `${state.currentNum || ""}${payload.digit}`
  };

    case ACTIONS.CLEAR_DIGITS :
      return {}

    case ACTIONS.OPERATIONS_ACTION:
      if(state.currentNum == null && state.previousNum == null){
        return state;
      }
      if(state.currentNum == null ){
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousNum == null){
        return {
          ...state,
          operation: payload.operation,
          previousNum: state.currentNum,
          currentNum: null
        }
      }
      return{
        ...state,
        operation: payload.operation,
        previousNum: calculate(state),
        currentNum: null
      }

    case ACTIONS.DELETE_DIGIT : 
      if(state.overwrite){
        return {
          ...state,
          currentNum: null,
          overwrite: false
        }
      }
      if(state.currentNum == null ) return state;
      if(state.currentNum.length === 1){
        return{
          ...state,
          currentNum: null
        }
      }
      return {
        ...state,
        currentNum: state.currentNum.slice(0, -1)
      }

      case ACTIONS.CALCULATE :
        if(
          state.previousNum == null ||
          state.currentNum == null  ||
          state.operation == null
        ){
          return state
        }
        return {
          ...state,
          previousNum: null,
          operation: null,
          currentNum: calculate(state),
          overwrite: true
        }

    default: 
    return state;
    
  }
}

function calculate({currentNum, previousNum, operation}){
  const currentNumber = parseFloat(currentNum);
  const prevNumber = parseFloat(previousNum);
  let evaluate = "";

  if(isNaN(currentNumber) || isNaN(prevNumber)) return ""

  switch(operation){
    case "/" :
      evaluate = prevNumber / currentNumber;
      break;
    case "*" :
      evaluate = prevNumber * currentNumber;
      break;
    case "+" :
      evaluate = prevNumber + currentNumber;
      break;
    case "-" :
      evaluate = prevNumber - currentNumber;
      break;
  }
  return evaluate.toString();

}

function App() {

  const[{currentNum, previousNum, operation}, dispatch] = useReducer(reducer, {
    currentNum: null,
    previousNum: null,
    operation: null,
  });

  return (
    <div className="calculator-app">
      <div className='output'>
        <div className='previous-num'>{previousNum} {operation}</div>
        <div className='current-num'>{currentNum}</div>
      </div>
      <button className='span-two'
      onClick={()=> dispatch({type: ACTIONS.CLEAR_DIGITS })}
      >
        AC
        </button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>
        DEL
        </button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two'
      onClick={()=> dispatch({type: ACTIONS.CALCULATE})}>=</button>
    </div>
  );
}

export default App;