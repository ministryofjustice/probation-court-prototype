import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../assets/moj-logotype-crest.svg'

function Header () {
  return (
    <header className="moj-header" role="banner">

      <div className="moj-header__container">

        <div>
          <a href="#main-content" className="app-skip-link">Skip to main content</a>
        </div>

        <div className="moj-header__logo">

          <Logo className="moj-header__logotype-crest govuk-header__logotype-crown"/>
          <Link to="/dashboard" className="moj-header__link">
            <span className="moj-header__link moj-header__link--organisation-name">MoJ D&amp;T</span>&nbsp;
            <span className="moj-header__link moj-header__link--service-name">Probation in court</span>
          </Link>

        </div>
        <div className="moj-header__content">

          <nav className="moj-header__navigation" aria-label="Account navigation">

            <ul className="moj-header__navigation-list">
              <li className="moj-header__navigation-item">
                <a className="moj-header__navigation-link" href="/" onClick={ e => e.preventDefault() }>Profile</a>
              </li>

              <li className="moj-header__navigation-item">
                <a className="moj-header__navigation-link" href="/" onClick={ e => e.preventDefault() }>Sign out</a>
              </li>
            </ul>

          </nav>

        </div>
      </div>

    </header>
  )
}

export default Header
