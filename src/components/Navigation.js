import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation () {
  return (
    <div className="moj-primary-navigation">

      <div className="moj-primary-navigation__container">

        <div className="moj-primary-navigation__nav">

          <nav className="moj-primary-navigation" aria-label="Primary navigation">

            <ul className="moj-primary-navigation__list">
              <li className="moj-primary-navigation__item">
                <NavLink to="/dashboard" className="moj-primary-navigation__link">Dashboard</NavLink>
              </li>
              <li className="moj-primary-navigation__item">
                <NavLink to="/cases/list" className="moj-primary-navigation__link">Cases</NavLink>
              </li>
            </ul>

          </nav>

        </div>
      </div>

    </div>
  )
}

export default Navigation