import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './styles/app.scss'

import Header from './components/Header'
import Footer from './components/Footer'

import Cases from './scenes/cases/Cases'
import Calendar from './scenes/calendar/Calendar'

function App () {
  return (
    <Router>
      <Header/>

      <div className="govuk-width-container">
        <Route path="/cases/" component={ Cases }/>
        <Route path="/calendar/:month?/:year?" component={ Calendar }/>
        <Route path="/calendar/:month?/:year?" component={ Calendar }/>
        <Redirect from="*" to="/cases/list" />
      </div>

      <Footer/>
    </Router>
  )
}

export default App
