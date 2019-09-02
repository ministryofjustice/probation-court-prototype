import moment from 'moment'

export const initialState = {
  court: '',
  currentDate: moment(),
  dashboard: {}
}

export const reducer = (state, action) => {
  console.info('Dashboard Reducer:', action)
  switch (action.type) {
    case 'setCourt':
      return {
        ...state,
        court: action.setCourt
      }
    case 'setDashboard':
      return {
        ...state,
        currentCase: action.setCase
      }
    default:
      return state
  }
}
