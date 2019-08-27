import { READ_SUCCES} from "../actions";


const initialState = {
    data : '尚未載入網頁',
  };
  


export default function readReducer ( state = initialState, action)  {
  switch (action.type) {
    case READ_SUCCES:
        console.log('read done')
        const data = action.payload
      return { ...state, data: data };;
    default:
      return state
  }
}

