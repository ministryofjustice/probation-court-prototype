import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import currentCourtList from '../../assets/dummy-data'

import Pagination from '../../components/Pagination'
import CourtListFilter from '../court-list/components/CourtListFilter'

function AdjournedList () {

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  function today () {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()

    return (
      `${ days[today.getDay()] }, ${ today.toLocaleDateString() }`
    )
  }

  function toggleFilter () {
    const $filter = document.querySelector('.hmcts-filter')
    const $button = document.querySelector('#filter-button')
    if ($filter && $button) {
      $filter.classList.toggle('hmcts-hidden')
      const isOpen = !$filter.classList.contains('hmcts-hidden')
      $button.textContent = isOpen ? 'Hide filter' : 'Show filter'
      $button.setAttribute('aria-expanded', isOpen.toString())
    }
  }

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <h1 className="govuk-heading-l govuk-!-margin-0">Sheffield Magistrates Court</h1>
      <p className="govuk-body-m govuk-!-font-weight-bold">{ today() }</p>

      <nav className="hmcts-sub-navigation" aria-label="Sub navigation">

        <ul className="hmcts-sub-navigation__list">

          <li className="hmcts-sub-navigation__item">
            <a className="hmcts-sub-navigation__link govuk-link--no-visited-state" href="/">
              Current cases
            </a>
          </li>

          <li className="hmcts-sub-navigation__item">
            <a className="hmcts-sub-navigation__link govuk-link--no-visited-state" aria-current="page" href="/adjourned" onClick={ (event) => event.preventDefault() }>
              Adjourned cases
            </a>
          </li>

          <li className="hmcts-sub-navigation__item">
            <a className="hmcts-sub-navigation__link govuk-link--no-visited-state" href="#3" onClick={ (event) => event.preventDefault() }>
              Sentenced cases
            </a>
          </li>

        </ul>

      </nav>

      <div className="hmcts-filter-layout">

        <div className="hmcts-filter-layout__filter">
          <div className="hmcts-filter hmcts-hidden">
            <div className="hmcts-filter__header">

              <div className="hmcts-filter__header-title">
                <h2 className="govuk-heading-m">Filter</h2>
              </div>

              <div className="hmcts-filter__header-action">

              </div>

            </div>

            <div className="hmcts-filter__content">

              <CourtListFilter/>

            </div>

          </div>

        </div>

        <div className="hmcts-filter-layout__content">

          <table className="govuk-table moj-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <h1 className="govuk-heading-l govuk-!-margin-0">Adjourned cases</h1>
              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">

                  <div className="hmcts-action-bar__filter">
                    <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                    </button>
                  </div>

                  <div className="hmcts-menu">
                    <div className="hmcts-menu__wrapper">

                      <button type="submit"
                              className="govuk-button hmcts-menu__item moj-button--secondary govuk-!-margin-bottom-0"
                              disabled>Reassign
                      </button>

                      <button type="submit"
                              className="govuk-button hmcts-menu__item moj-button--secondary govuk-!-margin-bottom-0"
                              disabled>Archive
                      </button>

                    </div>
                  </div>

                </div>
              </td>
            </tr>
            </tbody>
          </table>

          <div className="hmcts-scrollable-pane">

            <div className="hmcts-scrollable-pane__wrapper">

              <table className="govuk-table moj-table moj-table--split-rows">

                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Adjournment</th>
                </tr>
                </thead>

                <tbody>

                { currentCourtList.map((listItem, index) => {
                  return (
                    <tr key={ index }>
                      <th scope="row"><Link
                        to={ listItem.status.type === 'error' ? `/offender-selection/${ index }` : `/offender-summary/${ index }` }
                        className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                      </th>
                      <td>
                        { listItem.offences.map((offence, offenceIndex) => {
                          return <p key={ offenceIndex }>{ offence }</p>
                        }) }
                      </td>
                      <td>
                        Adjourned for Pre-Sentence Report
                      </td>
                    </tr>
                  )
                }) }

                </tbody>
              </table>

            </div>

          </div>

          <Pagination/>

        </div>
      </div>

    </main>
  )
}

export default AdjournedList