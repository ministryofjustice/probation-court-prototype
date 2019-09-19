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
import AddCaseMatch from './scenes/add-case/AddCaseMatch'
import AddCaseDetails from './scenes/add-case/AddCaseDetails'
import AddCaseFinished from './scenes/add-case/AddCaseFinished'
import AdjournCase from './scenes/adjourn-case/AdjournCase'
import SentenceCase from './scenes/sentence-case/SentenceCase'
import CloseCase from './scenes/close-case/CloseCase'

function Cases (props) {

  return (
    <StateProvider initialState={ initialState } reducer={ reducer }>
      <Route path={ `${ props.match.url }/list/:day?/:month?/:year?` } component={ CaseList }/>
      <Route exact path={ `/cases/unmatched-list` } component={ MatchCaseList }/>
      <Route path={ `${ props.match.url }/adjourned/:day?/:month?/:year?` } component={ AdjournedList }/>
      <Route path={ `${ props.match.url }/sentenced/:day?/:month?/:year?` } component={ SentencedList }/>
      <Route path={ `${ props.match.url }/details/:id` } component={ CaseSummary }/>
      <Route path={ `${ props.match.url }/adjourn/:id` } component={ AdjournCase }/>
      <Route path={ `${ props.match.url }/record-sentence/:id` } component={ SentenceCase }/>
      <Route path={ `${ props.match.url }/close/:id` } component={ CloseCase }/>
      <Route path={ `${ props.match.url }/offender/:id` } component={ OffenderSummary }/>
      <Route path={ `${ props.match.url }/match/:id` } component={ OffenderSelection }/>
      <Route exact path={ `${ props.match.url }/add` } component={ AddCase }/>
      <Route path={ `${ props.match.url }/add/match` } component={ AddCaseMatch }/>
      <Route path={ `${ props.match.url }/add/details` } component={ AddCaseDetails }/>
      <Route path={ `${ props.match.url }/add/finished` } component={ AddCaseFinished }/>
    </StateProvider>
  )
}

export default Cases
