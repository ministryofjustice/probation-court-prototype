import React from 'react'
import { Route } from 'react-router-dom'

import { StateProvider } from '../../utils/StateProvider'
import { initialState, reducer } from '../cases/context/CaseContext'

import TodayDashboard from './scenes/today/TodayDashboard'

function Dashboard (props) {

  return (
    <div className="govuk-width-container">
      <StateProvider initialState={ initialState } reducer={ reducer }>
        <Route path={ `${ props.match.url }/` } component={ TodayDashboard }/>
      </StateProvider>
    </div>
  )
}

export default Dashboard
