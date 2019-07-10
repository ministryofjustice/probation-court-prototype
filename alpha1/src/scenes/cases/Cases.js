import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { StateProvider } from '../../utils/StateProvider'
import { initialState, reducer } from './context/CaseContext'

import CaseList from './scenes/case-list/CaseList'
import SentencedList from './scenes/sentenced-cases/SentenceList'
import AdjournedList from './scenes/adjourned-list/AdjournedList'
import OffenderSummary from './scenes/offender-summary/OffenderSummary'
import OffenderSelection from './scenes/offender-selection/OffenderSelection'
import NewCase from './scenes/new-case/NewCase'

function Cases (props) {

  return (
    <Router>
      <StateProvider initialState={ initialState } reducer={ reducer }>
        <Route path={ `${ props.match.url }/list/:day?/:month?/:year?` } component={ CaseList }/>
        <Route path={ `${ props.match.url }/adjourned/:day?/:month?/:year?` } component={ AdjournedList }/>
        <Route path={ `${ props.match.url }/sentenced/:day?/:month?/:year?` } component={ SentencedList }/>
        <Route path={ `${ props.match.url }/details/:id` } component={ OffenderSummary }/>
        <Route path={ `${ props.match.url }/match/:id` } component={ OffenderSelection }/>
        <Route path={ `${ props.match.url }/new` } component={ NewCase }/>
      </StateProvider>
    </Router>
  )
}

export default Cases
