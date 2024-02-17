import {ACTIONS} from "./App"

export default function OperationButton({dispatch, operation}){
  return  <button onClick={() => dispatch({type: ACTIONS.OPERATIONS_ACTION, payload: {operation}})}>
        {operation}
        </button>
}