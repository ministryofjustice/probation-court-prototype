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
                <NavLink to="/help" className="moj-primary-navigation__link" onClick={ e => e.preventDefault() }>Help</NavLink>
              </li>
            </ul>

          </nav>

        </div>
        <div className="moj-primary-navigation__search">

          <div className="moj-search moj-search--ondark moj-search--inline">
            <form action="" method="get">

              <div className="govuk-form-group">
                <label className="govuk-label moj-search__label govuk-visually-hidden" htmlFor="search-1">
                  Search
                </label>

                <input className="govuk-input moj-search__input " id="search-1" name="search-1" type="search"/>
              </div>

              <button data-module="govuk-button" type="submit" className="govuk-button moj-search__button ">
                Search
              </button>

            </form>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Navigation