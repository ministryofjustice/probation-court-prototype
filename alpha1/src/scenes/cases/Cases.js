import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CourtList from './scenes/court-list/CourtList'
import SentencedList from './scenes/sentenced-cases/SentenceList'
import AdjournedList from './scenes/adjourned-list/AdjournedList'
import OffenderSummary from './scenes/offender-summary/OffenderSummary'
import OffenderSelection from './scenes/offender-selection/OffenderSelection'

const Cases = ({ match }) => (
  <Router>
    <Route path={ `${ match.url }/list` } component={ CourtList }/>
    <Route path={ `${ match.url }/adjourned` } component={ AdjournedList }/>
    <Route path={ `${ match.url }/sentenced` } component={ SentencedList }/>
    <Route path={ `${ match.url }/details/:id` } component={ OffenderSummary }/>
    <Route path={ `${ match.url }/match/:id` } component={ OffenderSelection }/>
  </Router>
)

export default Cases
