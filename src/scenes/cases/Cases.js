import React from 'react'
import { Route } from 'react-router-dom'

import { StateProvider } from '../../utils/StateProvider'
import { initialState, reducer } from './context/CaseContext'

import CaseList from './scenes/case-list/CaseList'
import SentencedList from './scenes/sentenced-cases/SentenceList'
import AdjournedList from './scenes/adjourned-list/AdjournedList'
import CaseSummary from './scenes/case-summary/CaseSummary'
import OffenderSelection from './scenes/offender-selection/OffenderSelection'
import AddCase from './scenes/add-case/AddCase'
import OffenderSummary from './scenes/offender-summary/OffenderSummary'
import MatchCaseList from './scenes/match-case-list/MatchCaseList'

function Cases (props) {

  return (
    <StateProvider initialState={ initialState } reducer={ reducer }>
      <Route path={ `${ props.match.url }/list/:day?/:month?/:year?` } component={ CaseList }/>
      <Route path={ `${ props.match.url }/unmatched-list` } component={ MatchCaseList }/>
      <Route path={ `${ props.match.url }/adjourned/:day?/:month?/:year?` } component={ AdjournedList }/>
      <Route path={ `${ props.match.url }/sentenced/:day?/:month?/:year?` } component={ SentencedList }/>
      <Route path={ `${ props.match.url }/details/:id` } component={ CaseSummary }/>
      <Route path={ `${ props.match.url }/offender/:id` } component={ OffenderSummary }/>
      <Route path={ `${ props.match.url }/match/:id` } component={ OffenderSelection }/>
      <Route path={ `${ props.match.url }/add` } component={ AddCase }/>
    </StateProvider>
  )
}

export default Cases
