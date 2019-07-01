import React from 'react'
import { ReactComponent as Logo } from '../assets/hmcts-logotype-crest.svg'

function Header () {
  return (
    <header className="hmcts-header" role="banner">
      <div className="hmcts-header__container">

        <div className="hmcts-header__logo">
          <a className="hmcts-header__link" href="/" onClick={ e => e.preventDefault() }>
            <span className="govuk-header__logotype">
              <Logo className="govuk-header__logotype-crown"/>
            </span>
            <span className="govuk-header__logotype-text">Probation in court</span>
          </a>
        </div>

        <div className="hmcts-header__content">

          <nav className="hmcts-header__navigation" aria-label="Account navigation">

            <ul className="hmcts-header__navigation-list">

              <li className="hmcts-header__navigation-item">
                <a className="hmcts-header__navigation-link" href="/profile" onClick={ e => e.preventDefault() }>
                  Profile
                </a>
              </li>

              <li className="hmcts-header__navigation-item">
                <a className="hmcts-header__navigation-link" href="/sign-out" onClick={ e => e.preventDefault() }>
                  Sign out
                </a>
              </li>

            </ul>

          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
