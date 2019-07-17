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
                <NavLink to="/cases/list" className="moj-primary-navigation__link">Case list</NavLink>
              </li>
              <li className="moj-primary-navigation__item">
                <NavLink to="/cases/search" className="moj-primary-navigation__link" onClick={ e => e.preventDefault() }>Search</NavLink>
              </li>
              <li className="moj-primary-navigation__item">
                <NavLink to="/help" className="moj-primary-navigation__link" onClick={ e => e.preventDefault() }>Help</NavLink>
              </li>
            </ul>

          </nav>

        </div>

      </div>
    </div>
  )
}

export default Navigation