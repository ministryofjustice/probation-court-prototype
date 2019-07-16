import moment from 'moment'

export const initialState = {
  court: '',
  currentDate: moment(),
  currentCase: {}
}

export const reducer = (state, action) => {
  console.info(action)
  switch (action.type) {
    case 'setCourt':
      return {
        ...state,
        court: action.setCourt
      }
    case 'setCase':
      return {
        ...state,
        currentCase: action.setCase
      }
    default:
      return state
  }
}
