import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './styles/app.scss'

import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

import Dashboard from './scenes/dashboard/Dashboard'
import Calendar from './scenes/calendar/Calendar'
import Cases from './scenes/cases/Cases'

function App () {
  return (
    <Router>
      <Header/>
      <Navigation/>

      <div className="govuk-width-container">
        <Route path="/dashboard" component={ Dashboard }/>
        <Route path="/cases/" component={ Cases }/>
        <Route path="/calendar/:month?/:year?" component={ Calendar }/>
        <Redirect from="*" to="/dashboard" />
      </div>

      <Footer/>
    </Router>
  )
}

export default App
