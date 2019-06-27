import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import dummyData from '../../../../assets/dummy-data'

import Pagination from '../../../../components/Pagination'
import CourtListFilter from './components/CourtListFilter'
import { getDateFromProps } from '../../../../utils/DateTools'

function CourtList (props) {

  const currentCourtList = dummyData.cases
  const currentDate = getDateFromProps(props.match.params)
  const hasErrors = currentCourtList.some(listItem => { return listItem.status.type === 'error' })

  useEffect(() => {
    window.scrollTo(0, 0)
  })

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

      <nav className="hmcts-sub-navigation" aria-label="Sub navigation">

        <ul className="hmcts-sub-navigation__list">

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/list/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              Cases
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/adjourned/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              Adjourned cases
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/sentenced/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              Sentenced cases
            </Link>
          </li>

        </ul>

      </nav>

      { hasErrors && (
        <Fragment>

          <div className="govuk-warning-text moj-warning-text moj-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There are 3 cases that have not been matched to
              offender records in Delius.</strong>
          </div>

          <div className="hmcts-identity-bar app-identity-bar-warning govuk-!-margin-bottom-6">
            <div className="hmcts-identity-bar__container">
              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <table className="govuk-table moj-table moj-table--split-rows">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Offence</th>
                    <th scope="col">Delius record</th>
                    <th scope="col">Status</th>
                    <th scope="col">Sitting</th>
                    <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                  </tr>
                  </thead>
                  <tbody>

                  { currentCourtList.map((listItem, index) => {
                    return listItem.status.type === 'error' ? (
                      <Fragment key={ index }>
                        { listItem.currentState.type !== 'Adjourned' && listItem.currentState.type !== 'Sentenced' && (
                          <tr>
                            <th scope="row"><Link
                              to={ `/cases/match/${ index }` }
                              className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                            </th>
                            <td>
                              { listItem.offences.map((offence, offenceIndex) => {
                                return <p key={ offenceIndex } className="govuk-body">{ offence }</p>
                              }) }
                            </td>
                            <td>{ listItem.status.label }</td>
                            <td>{ listItem.currentState.label }
                              { listItem.previousState && (
                                <Fragment>
                                  <p
                                    className="govuk-hint">{ listItem.previousState.label } { listItem.previousState.date && listItem.previousState.date }</p>
                                  <p className="govuk-hint">{ listItem.previousState.details }</p>
                                </Fragment>
                              ) }
                            </td>
                            <td>13:00 - 16:30</td>
                            <td><p className="moj-!-text-align-right">{ listItem.court }</p>
                            </td>
                          </tr>
                        ) }
                      </Fragment>
                    ) : (<Fragment key={ index }/>)
                  }) }

                  </tbody>
                </table>
              </div>

              <p className="govuk-body moj-!-text-align-center">
                <a className="govuk-link govuk-link--no-visited-state" href="?expand"
                   onClick={ e => e.preventDefault() }><em className="app-icon-down" /> Show more <em className="app-icon-down" /></a>
              </p>

            </div>
          </div>
        </Fragment>
      ) }

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
                <h2 className="govuk-heading-l govuk-!-margin-0">Cases</h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') } <span
                  className="govuk-hint moj-util-inline">at { dummyData.court }</span></p>
              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">
                  <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                  </button>

                  <div className="hmcts-action-bar__filter"/>

                  <div className="hmcts-menu">
                    <div className="hmcts-menu__wrapper">

                      <button type="submit" className="govuk-button govuk-button--secondary hmcts-menu__item">
                        Add case
                      </button>

                    </div>
                  </div>

                </div>

              </td>
            </tr>
            </tbody>
          </table>

          <div className="hmcts-scrollable-pane">

            <div className="hmcts-scrollable-pane__wrapper govuk-!-margin-top-0">

              <table className="govuk-table moj-table moj-table--split-rows">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Delius record</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sitting</th>
                  <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                </tr>
                </thead>
                <tbody>

                { currentCourtList.map((listItem, index) => {
                  return listItem.status.type !== 'error' ? (
                    <Fragment key={ index }>
                      { listItem.currentState.type !== 'Adjourned' && listItem.currentState.type !== 'Sentenced' && (
                        <tr>
                          <th scope="row"><Link
                            to={ `/cases/details/${ index }` }
                            className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                          </th>
                          <td>
                            { listItem.offences.map((offence, offenceIndex) => {
                              return <p key={ offenceIndex } className="govuk-body">{ offence }</p>
                            }) }
                          </td>
                          <td>{ listItem.status.label } { listItem.status.office && (
                            <span className="app-hint-s moj-util-inline">({ listItem.status.office })</span>) }</td>
                          <td>{ listItem.currentState.label }
                            { listItem.previousState && (
                              <Fragment>
                                <p
                                  className="govuk-hint">{ listItem.previousState.label } { listItem.previousState.date && listItem.previousState.date }</p>
                                <p className="govuk-hint">{ listItem.previousState.details }</p>
                              </Fragment>
                            ) }
                          </td>
                          <td>09:30 - 12:00</td>
                          <td><p className="moj-!-text-align-right">{ listItem.court }</p>
                          </td>
                        </tr>
                      ) }
                    </Fragment>
                  ) : (<Fragment key={ index }/>)
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

export default CourtList