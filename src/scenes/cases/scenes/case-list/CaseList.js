import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { configureCaseData, getCaseData } from '../../../../utils/DataService'
import { initialState } from '../../context/CaseContext'
import { useStateValue } from '../../../../utils/StateProvider'

import Pagination from '../../../../components/Pagination'
import CaseListFilter from './components/CaseListFilter'
import PageTitle from '../../shared-components/PageTitle'

function CaseList (props) {

  const [data, setData] = useState({})
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {

    document.title = `Case list - ${ AppTitle }`
    window.scrollTo(0, 0)

    getCaseData().then($data => {
      setData(configureCaseData($data))
      dispatch({ type: 'setCourt', setCourt: $data.courtName })
    })

  }, [dispatch])

  function toggleFilter () {
    const $filter = document.querySelector('.moj-filter')
    const $button = document.querySelector('#filter-button')
    if ($filter && $button) {
      $filter.classList.toggle('moj-hidden')
      const isOpen = !$filter.classList.contains('moj-hidden')
      $button.textContent = isOpen ? 'Hide filter' : 'Show filter'
      $button.setAttribute('aria-expanded', isOpen.toString())
    }
  }

  function resetState () {
    dispatch({
      type: 'newCase',
      newCase: {
        ...initialState.newCase
      }
    })
  }

  return (
    <div className="govuk-width-container">
      <main id="main-content" role="main" className="govuk-main-wrapper">

        <PageTitle title="Cases"/>

        <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd D MMMM') }
          <span className="govuk-hint govuk-!-display-inline-block">&nbsp;at { data.courtName }</span>
        </p>

        <div className="moj-filter-layout">

          <div className="moj-filter-layout__filter">
            <div className="moj-filter moj-hidden">
              <div className="moj-filter__header">

                <div className="moj-filter__header-title">
                  <h2 className="govuk-heading-m app-!-color-white">Filter</h2>
                </div>

                <div className="moj-filter__header-action"/>

              </div>

              <div className="moj-filter__content">

                <CaseListFilter/>

              </div>

            </div>

          </div>

          <div className="moj-filter-layout__content">

            <table className="govuk-table app-table govuk-!-margin-bottom-2" role="presentation">
              <tbody>
              <tr>
                <td>

                  <div className="govuk-grid-row app-!-display-flex">
                    <div className="govuk-grid-column-one-third app-!-display-flex--1">
                      <div className="app-card app-card--muted">

                        <p className="govuk-body govuk-!-margin-0 govuk-!-font-weight-bold">
                        <span
                          className="govuk-heading-l govuk-!-margin-0 govuk-!-display-inline-block">12</span> Current
                          defendants</p>

                        <p className="govuk-body govuk-!-margin-top-2">
                          <Link to="/" className="govuk-link app-link--dark" onClick={ e => e.preventDefault() }>View
                            current defendants</Link>
                        </p>

                      </div>
                    </div>
                    <div className="govuk-grid-column-one-third app-!-display-flex--1">
                      <div className="app-card app-card--muted">

                        <p className="govuk-body govuk-!-margin-0 govuk-!-font-weight-bold"><span
                          className="govuk-heading-l govuk-!-margin-0 govuk-!-display-inline-block">24</span> Previously
                          known
                          defendants</p>

                        <p className="govuk-body govuk-!-margin-top-2">
                          <Link to="/" className="govuk-link app-link--dark" onClick={ e => e.preventDefault() }>View
                            previously known defendants</Link>
                        </p>

                      </div>
                    </div>

                    <div className="govuk-grid-column-one-third app-!-display-flex--1">
                      <div
                        className="app-card app-card--muted">

                        <p className="govuk-body govuk-!-margin-0 govuk-!-font-weight-bold"><span
                          className="govuk-heading-l govuk-!-margin-0 govuk-!-display-inline-block">6</span> Not known
                          defendants</p>

                        <p className="govuk-body govuk-!-margin-top-2">
                          <Link to="/" className="govuk-link app-link--dark" onClick={ e => e.preventDefault() }>View
                            not known defendants</Link>
                        </p>

                      </div>
                    </div>
                  </div>

                </td>
                <td className="app-!-text-align-right">

                  <div className="moj-action-bar">
                    <button data-module="govuk-button" id="filter-button"
                            className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                    </button>

                    <div className="moj-action-bar__filter"/>

                    <button data-module="govuk-button" type="button"
                            className="govuk-button govuk-button--secondary moj-menu__item"
                            onClick={ () => {
                              resetState()
                              props.history.push('/cases/add')
                            } }>
                      Add case
                    </button>

                  </div>

                </td>
              </tr>
              </tbody>
            </table>

            <div className="moj-scrollable-pane">

              <div className="moj-scrollable-pane__wrapper govuk-!-margin-top-0">

                <table className="govuk-table app-table app-table--split-rows app-alternate-rows-table">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Delius record</th>
                    <th scope="col" style={ { 'width': '40%' } }>Offence</th>
                    <th scope="col">Listing</th>
                    <th scope="col">Sitting</th>
                    <th scope="col">Court</th>
                  </tr>
                  </thead>
                  <tbody>

                  { data.cases && data.cases.map(($case, caseIndex) => {
                    return (
                      caseIndex < 15 && (
                        <tr key={ caseIndex }>
                          <th scope="row"><Link
                            to={ `/cases/details/${ $case.id }` }
                            onClick={ () => {
                              dispatch({ type: 'setCase', setCase: $case })
                            } }
                            className="govuk-link govuk-link--no-visited-state">{ $case.defendant.name }</Link>
                          </th>
                          <td>
                            { $case.defendant.breachedConditions && (
                              <div
                                className="moj-badge moj-badge--dark govuk-!-display-block govuk-!-margin-bottom-1">Breach</div>
                            ) }

                            { $case.defendant.ssoAlert && (
                              <div
                                className="moj-badge moj-badge--dark govuk-!-display-block govuk-!-margin-bottom-1">SSO</div>
                            ) }

                            { $case.defendant.deliusStatus }
                            { $case.defendant.assignment && (
                              <span
                                className="govuk-!-margin-0 govuk-!-display-inline-block">&nbsp;({ $case.defendant.assignment })</span>
                            ) }

                            { $case.defendant.deliusStatus === 'Previously known' && (
                              <p>
                                { moment().subtract(3, 'months').format('DD/MM/YYYY') }
                              </p>
                            ) }
                          </td>
                          <td>
                            { $case.offences.length > 1 ? (
                              <ol className="govuk-list govuk-!-margin-left-4">
                                { $case.offences.map((offence, offenceIndex) => {
                                  return <li key={ offenceIndex }
                                             className="govuk-list--number app-offence-title">{ offence.title }</li>
                                }) }
                              </ol>
                            ) : (
                              <p className="govuk-body govuk-!-margin-bottom-2">{ $case.offences[0].title }</p>
                            ) }
                          </td>
                          <td>
                            { $case.listingNumber === '2st' ? '2nd' : $case.listingNumber } listing
                            { $case.listingNumber === '2st' && (
                              <p>
                                Adjourned from { moment().subtract(3, 'weeks').format('DD/MM/YYYY') }
                              </p>
                            ) }
                          </td>
                          <td>{ moment($case.startTime, 'HH:mm:ss').format('HH:mm') } to { moment($case.endTime, 'HH:mm:ss').format('HH:mm') }</td>
                          <td>{ $case.courtRoom }</td>
                        </tr>
                      )
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
    </div>
  )
}

export default CaseList
