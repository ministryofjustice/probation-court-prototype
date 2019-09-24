import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'

import DefendantBanner from '../../shared-components/DefendantBanner'
import CurrentCase from './components/CurrentCase'

function CaseSummary (props) {

  const [{ currentDate, currentCase }] = useStateValue()

  useEffect(() => {
    document.title = `Case details - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  function getMarker ($marker) {
    let markerDescription
    switch ($marker) {
      case 'DV':
        markerDescription = 'Domestic Violence'
        break
      case 'VI':
        markerDescription = 'Violent'
        break
      default:
        markerDescription = ''
    }
    return markerDescription
  }

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase } id={ props.match.params.id } showRecordLink={ true }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <div className="moj-page-header-actions">

            <div className="moj-page-header-actions__title">
              <h1 className="govuk-heading-l">Case details</h1>
            </div>

            <div className="moj-page-header-actions__actions app-!-float-right">

              <div className="moj-button-menu">
                <div className="moj-button-menu__wrapper">

                  <Link to={ `/cases/close/${ props.match.params.id }` } role="button"
                        className="govuk-button moj-button-menu__item govuk-button--secondary moj-page-header-actions__action"
                        data-module="govuk-button">
                    Close case
                  </Link>

                  <Link to={ `/cases/adjourn/${ props.match.params.id }` } role="button"
                        className="govuk-button moj-button-menu__item govuk-button--secondary moj-page-header-actions__action"
                        data-module="govuk-button">
                    Adjourn case
                  </Link>

                  <Link to={ `/cases/record-sentence/${ props.match.params.id }` } role="button"
                        className="govuk-button moj-button-menu__item govuk-button--secondary moj-page-header-actions__action"
                        data-module="govuk-button">
                    Record sentence
                  </Link>

                </div>
              </div>

            </div>
          </div>

          { currentCase && currentCase.defendant && (
            <Fragment>

              <div className="govuk-grid-row app-!-display-flex">
                <div className="govuk-grid-column-one-third app-!-display-flex--1">
                  <div className="app-card app-card--muted">

                    <p className="govuk-heading-m govuk-!-margin-0">Crown Prosecution Service (CPS) pack</p>
                    <p className="govuk-body">The CPS pack was obtained on { currentDate.format('D MMMM YYYY ') } at
                      09:04.</p>

                    <p className="govuk-body">
                      <a href="/" className="govuk-link app-link--dark"
                         onClick={ e => e.preventDefault() }>View CPS pack</a>
                    </p>

                  </div>
                </div>

                <div className="govuk-grid-column-one-third app-!-display-flex--1">
                  <div
                    className={ `app-card app-card--muted ${ currentCase.defendant.deliusStatus !== 'Current' ? 'app-card__secondary' : '' }` }>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>
                        <p className="govuk-heading-m govuk-!-margin-0">Offender Manager update</p>
                        <p className="govuk-body">An update was requested on { currentDate.format('D MMMM YYYY ') } at
                          09:15, currently awaiting a response.</p>

                        <p className="govuk-body"><a href="/contact" className="govuk-link app-link--dark"
                                                     onClick={ e => e.preventDefault() }>Contact
                          offender manager</a></p>
                      </Fragment>
                    ) }

                  </div>
                </div>

                <div className="govuk-grid-column-one-third app-!-display-flex--1">
                  <div
                    className={ `app-card app-card--muted ${ currentCase.defendant.deliusStatus !== 'Current' ? 'app-card__secondary' : '' }` }>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>
                        <p className="govuk-heading-m govuk-!-margin-0">Pre-Sentence Report requested</p>
                        <p className="govuk-body">A pre-sentence report was requested at 09:25 and is currently in
                          draft.</p>

                        <p className="govuk-body"><a href="/contact" className="govuk-link app-link--dark"
                                                     onClick={ e => e.preventDefault() }>View draft report</a></p>
                      </Fragment>
                    ) }

                  </div>
                </div>
              </div>

              <h2 className="govuk-heading-m govuk-!-margin-top-6">Case tracker</h2>

              <table className="govuk-table app-table app-table--split-rows">
                <thead>
                <tr>
                  <th>Supporting information</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                { currentCase.defendant.deliusStatus === 'Current' && (
                  <Fragment>
                    <tr>
                      <td>Case adjourned - PSR</td>
                      <td>Requested on { currentDate.format('D MMMM YYYY ') } at 09:25</td>
                      <td>
                        <a className="govuk-link moj-timeline__document-link" href="/psr-link"
                           onClick={ e => e.preventDefault() }>Draft report</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Offender manager update</td>
                      <td>Requested on { currentDate.format('D MMMM YYYY ') } at 09:05</td>
                      <td>Awaiting response</td>
                    </tr>
                  </Fragment>
                ) }
                <tr>
                  <td>CPS Pack</td>
                  <td>Obtained on { currentDate.format('D MMMM YYYY ') } at 09:04</td>
                  <td>
                    <a className="govuk-link moj-timeline__document-link" href="/cps-link"
                       onClick={ e => e.preventDefault() }>CPS Pack</a>
                  </td>
                </tr>
                </tbody>
              </table>

              <table className="govuk-table app-table">
                <thead>
                <tr>
                  <th colSpan="2">Appearing in Court Room { currentCase.courtRoom }</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>

                    <p
                      className="govuk-body">{ currentDate.format('dddd D MMMM') }, { moment(currentCase.startTime, 'HH:mm:ss').format('HH:mm') } - { moment(currentCase.endTime, 'HH:mm:ss').format('HH:mm') }</p>

                  </td>
                  <td>

                    { currentCase.markers && !!currentCase.markers.length && (
                      <div className="app-!-text-align-right govuk-!-margin-bottom-2">
                        { currentCase.markers.map((marker, markerIndex) => {
                          return <div key={ markerIndex }
                                      className="moj-badge moj-badge--small app-tooltip app-tooltip--secondary govuk-!-display-inline-block app-!-text-align-center govuk-!-margin-left-1">{ marker }<span>{ getMarker(marker) }</span>
                          </div>
                        }) }
                      </div>
                    ) }

                  </td>
                </tr>
                </tbody>
              </table>

              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

              <CurrentCase/>

              { !!(currentCase.defendant.previousConvictions.summary && currentCase.defendant.previousConvictions.summary.length) && (
                <Fragment>

                  <h2 className="govuk-heading-m govuk-!-margin-top-2">Summary of convictions <span
                    className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">from CPS pack</span>
                  </h2>

                  <table className="govuk-table app-table app-table--split-rows">
                    <thead>
                    <tr>
                      <th>Count</th>
                      <th>Offence category</th>
                      <th>Dates</th>
                    </tr>
                    </thead>
                    <tbody>

                    { currentCase.defendant.previousConvictions.summary.map((conviction, convictionIndex) => {
                      return (
                        <tr key={ convictionIndex }>
                          <td style={ { 'width': '75px' } }>{ conviction.count }</td>
                          <td>{ conviction.description }</td>
                          <td style={ { 'width': '150px' } }>{ conviction.dateRange }</td>
                        </tr>
                      )
                    }) }

                    </tbody>
                  </table>

                  <table className="govuk-table app-table app-table--split-rows govuk-!-margin-top-4">
                    <tbody>
                    <tr>
                      <th>Convictions:</th>
                      <td>{ currentCase.defendant.previousConvictions.convictionCount }</td>
                      <th>Offences:</th>
                      <td>{ currentCase.defendant.previousConvictions.offenceCount }</td>
                    </tr>
                    <tr>
                      <th>First convicted:</th>
                      <td>{ currentCase.defendant.previousConvictions.firstConvicted }</td>
                      <th>Last convicted:</th>
                      <td>{ currentCase.defendant.previousConvictions.lastConvicted }</td>
                    </tr>
                    </tbody>
                  </table>

                  <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                </Fragment>
              ) }

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Notes</h2>

              { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') ? (
                <Fragment>
                  <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd Do MMMM ') }</p>
                  <p className="govuk-body">Case adjourned off as defendant has changed plea from guilty to not
                    guilty. Seems very upset, claiming the police didn't listen to them.</p>
                </Fragment>
              ) : (
                <p className="govuk-hint">No notes recorded.</p>
              ) }

              <p className="govuk-body">
                <Link to="/" className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-2"
                      onClick={ e => e.preventDefault() }>Add note</Link>
              </p>

            </Fragment>
          ) }

        </main>

      </div>

    </Fragment>
  )
}

export default CaseSummary
