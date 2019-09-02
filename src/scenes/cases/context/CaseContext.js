import moment from 'moment'

export const initialState = {
  court: '',
  currentDate: moment(),
  currentCase: {},
  newCase: {
    defendant: {
      forename: '',
      surname: '',
      pnc: '',
      crn: '',
      gender: '',
      current: false,
      dateOfBirth: '',
      address: {
        line1: '',
        line2: '',
        line3: '',
        postcode: ''
      }
    },
    offences: []
  }
}

export const reducer = (state, action) => {
  console.info('Case Reducer:', action)
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
    case 'newCase' :
      return {
        ...state,
        newCase: action.newCase
      }
    default:
      return state
  }
}
