import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles/app.scss'

import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PhaseBanner from './components/PhaseBanner'

import CourtList from './scenes/court-list/CourtList'
import OffenderSelection from './scenes/offender-selection/OffenderSelection'
import OffenderSummary from './scenes/offender-summary/OffenderSummary'

function App () {
  return (
    <Router>
      <Header/>
      <Navigation/>

      <div className="govuk-width-container">

        <PhaseBanner/>

        <Route exact path="/" component={ CourtList }/>
        <Route path="/offender-selection/:id" component={ OffenderSelection }/>
        <Route path="/offender-summary/:id" component={ OffenderSummary }/>

      </div>

      <Footer/>
    </Router>
  )
}

export default App
