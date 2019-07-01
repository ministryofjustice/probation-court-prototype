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
                <NavLink to="/calendar" className="hmcts-primary-navigation__link">Calendar</NavLink>
              </li>
              <li className="hmcts-primary-navigation__item">
                <NavLink to="/cases/list" className="hmcts-primary-navigation__link">Case list</NavLink>
              </li>
              <li className="hmcts-primary-navigation__item">
                <NavLink to="/help" className="hmcts-primary-navigation__link" onClick={ e => e.preventDefault() }>Help</NavLink>
              </li>
            </ul>

          </nav>

        </div>

      </div>
    </div>
  )
}

export default Navigation