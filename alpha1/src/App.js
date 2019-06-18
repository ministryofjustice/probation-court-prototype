import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles/app.scss'

import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import PhaseBanner from './components/PhaseBanner'

import Cases from './scenes/cases/Cases'
import Calendar from './scenes/calendar/Calendar'

function App () {
  return (
    <Router>
      <Header/>
      <Navigation/>

      <div className="govuk-width-container">

        <PhaseBanner/>

        <Route path="/cases/" component={ Cases }/>
        <Route exact path="/calendar" component={ Calendar }/>

      </div>

      <Footer/>
    </Router>
  )
}

export default App
