import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation () {
  return (
    <div className="hmcts-primary-navigation">
      <div className="hmcts-primary-navigation__container">
        <div className="hmcts-primary-navigation__nav">

          <nav className="hmcts-primary-navigation" aria-label="Primary navigation">

            <ul className="hmcts-primary-navigation__list">
              <li className="hmcts-primary-navigation__item">
                <NavLink to="/" className="hmcts-primary-navigation__link">Case list</NavLink>
              </li>
              <li className="hmcts-primary-navigation__item">
                <a className="hmcts-primary-navigation__link" href="/calendar" onClick={ (e) => e.preventDefault() }>Calendar</a>
              </li>
              <li className="hmcts-primary-navigation__item">
                <a className="hmcts-primary-navigation__link" href="/reports" onClick={ (e) => e.preventDefault() }>Reports</a>
              </li>
            </ul>

          </nav>

        </div>

      </div>
    </div>
  )
}

export default Navigation