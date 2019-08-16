import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'
import DefendantDetails from '../../shared-components/DefendantDetails'
import SomethingWrong from '../../shared-components/SomethingWrong'
import AdjournCase from './components/AdjournCase'
import RecordSentence from './components/RecordSentence'
import CurrentCase from './components/CurrentCase'
import moment from 'moment'

function CaseSummary (props) {

  const [data, setData] = useState({ showAdjourn: false, showRecordSentence: false })
  const [{ court, currentDate, currentCase }] = useStateValue()

  useEffect(() => {
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

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Case details</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <table className="govuk-table app-table" role="presentation">
          <tbody>
          <tr>
            <td>
              <h1 className="govuk-heading-l govuk-!-margin-0">Case details</h1>
              <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') }<span
                className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;at { court }</span></p>
            </td>
            <td className="app-!-text-align-right">

              <div className="moj-action-bar">

                <div className="moj-menu">
                  <div className="moj-menu__wrapper">

                    <button
                      className="govuk-button app-button--interrupt moj-menu__item"
                      type="button"
                      onClick={ e => {
                        e.preventDefault()
                        setData({ ...data, showAdjourn: true })
                      } } disabled={ data.showAdjourn || data.showRecordSentence }>Adjourn case
                    </button>

                    <button
                      className="govuk-button app-button--interrupt moj-menu__item"
                      type="button" onClick={ e => {
                      e.preventDefault()
                      setData({ ...data, showRecordSentence: true })
                    } } disabled={ data.showAdjourn || data.showRecordSentence }>Record sentence
                    </button>

                  </div>
                </div>

              </div>

            </td>
          </tr>
          </tbody>
        </table>

        { currentCase && currentCase.defendant && (
          <div className="moj-filter-layout">
            <div className="moj-filter-layout__filter">
              <div className="moj-filter">

                <div className="moj-filter__header">
                  <div className="moj-filter__header-title">
                    <h2 className="govuk-heading-m app-!-color-white">Defendant details</h2>
                  </div>
                </div>

                <div className="moj-filter__content">

                  <div className="moj-filter__selected">

                    <div className="moj-filter__selected-heading">

                      <DefendantDetails/>

                      { currentCase.defendant.deliusStatus !== 'Not known' && (
                        <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">
                          <Link to={`/cases/offender/${props.match.params.id}`} className="govuk-link govuk-link--no-visited-state">View offender summary</Link>
                        </p>
                      ) }

                    </div>
                  </div>

                  <div className="moj-filter__options">

                    { !!((currentCase.defendant.risk && currentCase.defendant.risk.length) || currentCase.defendant.breachedConditions) && (
                      <Fragment>
                        <h2 className="govuk-heading-m govuk-!-margin-bottom-0">Alerts <span
                          className="govuk-hint govuk-!-display-inline-block govuk-!-margin-top-0">from Delius record</span>
                        </h2>

                        { currentCase.defendant.risk.map((risk, riskIndex) => {
                          return (
                            <Fragment key={ riskIndex }>
                              { risk.type === 'RoSH' && (
                                <div
                                  className={ `app-risk-alert app-risk-alert--small app-risk-alert--${ risk.status.toLowerCase().replace(' ', '-') } govuk-!-margin-top-2 govuk-!-margin-bottom-1` }>{ risk.status.charAt(0).toUpperCase() + risk.status.slice(1) } Risk
                                  of Serious Harm</div>
                              ) }
                            </Fragment>
                          )
                        }) }

                        { currentCase.defendant.breachedConditions && (
                          <div
                            className="moj-badge moj-badge moj-badge--red govuk-!-margin-bottom-1 govuk-!-width-full">Breached
                            order</div>
                        ) }

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                      <Fragment>

                        <h2 className="govuk-heading-m">Current order</h2>

                        <p className="govuk-body">155 days community service</p>

                        <h2 className="govuk-heading-s govuk-!-margin-bottom-0">Intervention details<span
                          className="govuk-hint govuk-!-display-inline-block">&nbsp;(active)</span></h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">ES - RAR Programme</p>
                        <p className="govuk-body govuk-!-margin-bottom-0">One to one</p>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>

                        <h2 className="govuk-heading-m">Offender manager</h2>

                        <p className="govuk-body">Sarah Francis<span className="govuk-hint govuk-!-margin-top-0">Allocated on 01/06/2019</span>
                        </p>

                        <p className="govuk-body">{ currentCase.defendant.nps ? 'NPS' : 'CRC' } South Yorkshire<br/>
                          12 Holme Road<br/>
                          Sheffield<br/>
                          South Yorkshire<br/>
                          S7 2TT</p>

                        <p className="govuk-body">
                          Telephone: 0114 276 0760
                        </p>

                        <p className="govuk-body">
                          <a href="/contact" className="govuk-link govuklink--no-visited-state govuk-!-margin-bottom-0"
                             onClick={ e => e.preventDefault() }>Contact offender manager</a>
                        </p>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    <SomethingWrong/>

                  </div>
                </div>
              </div>
            </div>

            <div className="moj-filter-layout__content">

              { data && data.showAdjourn && (
                <AdjournCase hideUI={ () => { setData({ ...data, showAdjourn: false }) } }/>
              ) }

              { data && data.showRecordSentence && (
                <RecordSentence hideUI={ () => { setData({ ...data, showRecordSentence: false }) } }/>
              ) }

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Case tracker</h2>

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
                  <tr>
                    <td>Offender manager update</td>
                    <td>Requested on { currentDate.format('Do MMMM YYYY ') } at 09:15</td>
                    <td>Awaiting response</td>
                  </tr>
                ) }
                <tr>
                  <td>CPS Pack</td>
                  <td>Acquired</td>
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
                      className="govuk-body">{ currentDate.format('dddd, Do MMMM YYYY') }, { moment(currentCase.startTime, 'HH:mm:ss').format('HH:mm') } - { moment(currentCase.endTime, 'HH:mm:ss').format('HH:mm') }</p>

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

              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

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
                  <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd, Do MMMM YYYY ') }</p>
                  <p className="govuk-body">Case adjourned off as defendant has changed plea from guilty to not
                    guilty. Seems very upset, claiming the police didn't listen to them.</p>
                </Fragment>
              ) : (
                <p className="govuk-hint">No notes recorded.</p>
              ) }

              <button data-module="govuk-button" className="govuk-button govuk-button--secondary govuk-!-margin-top-2">Add note</button>

            </div>

          </div>
        ) }

        <Link to="/cases/list" className="govuk-back-link">Back</Link>

        <Link to="#top" className="govuk-link govuk-link--no-visited-state app-back-to-top__link" onClick={ e => {
          e.preventDefault()
          window.scrollTo(0, 0)
        } }>
          <svg role="presentation" focusable="false" className="app-back-to-top__icon"
               xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17">
            <path fill="currentColor" d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"/>
          </svg>
          Back to top
        </Link>

      </main>

    </Fragment>
  )
}

export default CaseSummary