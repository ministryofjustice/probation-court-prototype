import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'
import DefendantDetails from '../../shared-components/DefendantDetails'
import SomethingWrong from '../../shared-components/SomethingWrong'
import AdjournCase from './components/AdjournCase'
import RecordSentence from './components/RecordSentence'

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
                className="govuk-hint govuk-!-display-inline-block">&nbsp;at { court }</span></p>
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

                <div className="moj-filter__header app-filter__header--blue">
                  <div className="moj-filter__header-title">
                    <h2 className="govuk-heading-m">{ currentCase.defendant.name }</h2>
                  </div>
                </div>

                <div className="moj-filter__content">

                  <div className="moj-filter__selected">

                    <div className="moj-filter__selected-heading">

                      <DefendantDetails/>

                      { currentCase.defendant.deliusStatus !== 'Not known' && (
                        <button
                          className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0 govuk-!-margin-top-2 govuk-!-width-full"
                          onClick={ e => {
                            e.preventDefault()
                            props.history.push(`/cases/offender/${ props.match.params.id }`)
                          } }>View offender summary
                        </button>
                      ) }

                    </div>
                  </div>

                  <div className="moj-filter__options">

                    { !!(currentCase.defendant.risk && currentCase.defendant.risk.length) && (
                      <Fragment>
                        <h2 className="govuk-heading-m govuk-!-margin-bottom-0">RoSH <span
                          className="govuk-hint govuk-!-display-inline-block govuk-!-margin-top-0">from Delius record</span>
                        </h2>

                        { currentCase.defendant.risk.map((risk, riskIndex) => {
                          return (
                            <Fragment key={ riskIndex }>
                              { risk.type === 'RoSH' && (
                                <div
                                  className={ `app-risk-alert app-risk-alert--small app-risk-alert--${ risk.status.toLowerCase().replace(' ', '-') } govuk-!-margin-top-2` }>{ risk.status.charAt(0).toUpperCase() + risk.status.slice(1) } Risk
                                  of Serious Harm</div>
                              ) }
                            </Fragment>
                          )
                        }) }

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                      <Fragment>

                        <h2 className="govuk-heading-m">Current order</h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">155 days community service</p>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Intervention details</h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">ES - RAR Programme</p>
                        <p className="govuk-body govuk-!-margin-bottom-0">One to one</p>

                        <div
                          className="moj-badge moj-badge moj-badge--green govuk-!-margin-top-4 govuk-!-width-full">Active
                          Intervention
                        </div>

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

                        <button
                          className="govuk-button govuk-button--secondary govuk-!-width-full govuk-!-margin-bottom-0">
                          Contact offender manager
                        </button>

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

              <div className="moj-identity-bar">
                <div className="moj-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Current case</h2>

                    <table className="govuk-table app-table app-table--split-rows">
                      <thead>
                      <tr>
                        <th>Offence</th>
                        { currentCase.offences.some(offence => { return offence.plea && offence.plea.length }) && (
                          <th>Plea</th>) }
                        { currentCase.offences.some(offence => { return offence.pleaDate && offence.pleaDate.length }) && (
                          <th>Plea date</th>) }
                      </tr>
                      </thead>
                      <tbody>

                      { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                        return (
                          <tr key={ offenceIndex }>
                            <td>{ offence.title }</td>
                            { !!(offence.plea && offence.plea.length) && (<td>{ offence.plea }</td>) }
                            { !!(offence.pleaDate && offence.pleaDate.length) && (
                              <td>{ offence.pleaDate && (moment(offence.pleaDate, 'YYYY-MM-DD').format('DD/MM/YYYY')) }</td>
                            ) }
                          </tr>
                        )
                      }) }

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

                  </div>
                </div>
              </div>

              <div className="moj-identity-bar govuk-!-margin-top-4">
                <div className="moj-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Case summary</h2>

                    { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                      return (
                        offenceIndex < 2 ?
                          <Fragment key={ offenceIndex }>
                            <p className="govuk-body govuk-!-margin-bottom-1">{ offence.summary }</p>
                            <p
                              className="govuk-hint govuk-!-margin-top-1 govuk-!-margin-bottom-6">{ offence.contraryToActAndSection }</p>
                          </Fragment> : <Fragment key={ offenceIndex }/>
                      )
                    }) }

                    { !!(currentCase.offences && currentCase.offences.length > 3) && (
                      <p className="govuk-body app-!-text-align-center">
                        <a className="govuk-link govuk-link--no-visited-state" href="?expand"
                           onClick={ e => e.preventDefault() }><em className="app-icon-down"/> Show more <em
                          className="app-icon-down"/></a>
                      </p>
                    ) }

                    { !!(currentCase.bailConditions && currentCase.bailConditions.length) && (
                      <Fragment>
                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                        <h3 className="govuk-heading-s govuk-!-margin-bottom-1">Bail conditions</h3>
                        <p className="govuk-body">{ currentCase.bailConditions }</p>
                      </Fragment>
                    ) }

                  </div>
                </div>
              </div>

              { !!(currentCase.defendant.previousConvictions.summary && currentCase.defendant.previousConvictions.summary.length) && (
                <div className="moj-identity-bar govuk-!-margin-top-4">
                  <div className="moj-identity-bar__container">
                    <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                      <h2 className="govuk-heading-m govuk-!-margin-top-2">Summary of convictions <span
                        className="govuk-hint govuk-!-display-inline-block govuk-!-margin-top-0">from CPS pack</span>
                      </h2>

                      <table className="govuk-table app-table app-table--split-rows">
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

                      <table className="govuk-table app-table app-table--split-rows">
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

                    </div>
                  </div>
                </div>
              ) }

              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

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

              </div>

              <div className="moj-identity-bar">
                <div className="moj-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Notes</h2>

                    { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                      <Fragment>
                        <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd, Do MMMM YYYY ') }</p>
                        <p className="govuk-body">Case adjourned off as defendant has changed plea from guilty to not
                          guilty. Seems very upset, claiming the police didn't listen to them.</p>
                      </Fragment>
                    ) }

                    <p className="app-!-text-align-right">
                      <button className="govuk-button govuk-button--secondary">Add note</button>
                    </p>

                  </div>
                </div>
              </div>

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
