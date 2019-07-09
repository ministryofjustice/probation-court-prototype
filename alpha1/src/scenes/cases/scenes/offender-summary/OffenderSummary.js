import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

function OffenderSummary () {

  const [{ court, currentDate, currentCase }] = useStateValue()

  console.info(currentCase)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

        <h1 className="govuk-heading-l govuk-!-margin-0">Case details</h1>
        <p
          className="govuk-body-m govuk-!-font-weight-bold govuk-!-margin-bottom-0">{ currentDate.format('dddd, Do MMMM YYYY ') }<span
          className="govuk-hint moj-util-inline">at { court }</span></p>

        { currentCase && currentCase.defendant && (
          <div className="hmcts-filter-layout">

            <div className="hmcts-filter-layout__filter">

              <div className="hmcts-filter">

                <div className="hmcts-filter__header">

                  <div className="hmcts-filter__header-title">
                    <h2 className="govuk-heading-m">{ currentCase.defendant && currentCase.defendant.name }</h2>
                  </div>
                </div>

                <div className="hmcts-filter__content">

                  <div className="hmcts-filter__selected">

                    <div className="hmcts-filter__selected-heading">

                      <div className="moj-!-float-left">

                        <img src="/assets/images/no-photo.png" width="82" height="102"
                             alt={ `${ currentCase.defendant.name }` }
                             className="app-offender-image"/>
                      </div>
                      <div className="moj-!-float-left">

                        <p className="govuk-body govuk-!-margin-bottom-0">
                          <strong>DOB:</strong> { moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0">
                          <strong>CRN:</strong> { currentCase.defendant.crn }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0">
                          <strong>PNC:</strong> { currentCase.defendant.pnc }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>Court
                          store:</strong> { currentCase.caseNumber }</p>

                      </div>

                      { currentCase.defendant.deliusStatus === 'Current' && (
                        <div
                          className="hmcts-badge moj-badge moj-badge-error govuk-!-margin-top-4 app-full-width">Current
                          offender</div>
                      ) }

                    </div>
                  </div>

                  <div className="hmcts-filter__options">

                    { currentCase.defendant.risk && !!currentCase.defendant.risk.length && (
                      <Fragment>
                        <h2 className="govuk-heading-m govuk-!-margin-bottom-0">Risk <span
                          className="govuk-hint moj-util-inline govuk-!-margin-top-0">from Delius record</span></h2>

                        { currentCase.defendant.risk.map((risk, riskIndex) => {
                          if (risk.short === 'RoSH') {
                            return (
                              <div key={ riskIndex }
                                   className={ `moj-risk-alert moj-risk-alert--small ${ risk.level.toLowerCase().indexOf('high') !== -1 ? 'moj-risk-alert--high' : risk.level === 'Medium' ? 'moj-risk-alert--medium' : 'moj-risk-alert--low' }` }>{ risk.level } { risk.long }</div>
                            )
                          } else {
                            return <p key={ riskIndex }
                                      className="govuk-body govuk-!-margin-bottom-0">{ risk.level } { risk.long }</p>
                          }
                        }) }

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                      </Fragment>
                    ) }

                    { currentCase.defendant.currentOrder && !!currentCase.defendant.currentOrder.length && currentCase.defendant.nps && (
                      <Fragment>
                        <h2 className="govuk-heading-m">Current order</h2>

                        { currentCase.defendant.currentOrder.map((order, orderIndex) => {
                          return <p key={ orderIndex } className="govuk-body govuk-!-margin-bottom-0">{ order }</p>
                        }) }

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Intervention details</h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">ES - RAR Programme</p>
                        <p className="govuk-body govuk-!-margin-bottom-0">One to one</p>

                        <div
                          className="hmcts-badge moj-badge moj-badge-current govuk-!-margin-top-4 app-full-width">Active
                        </div>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                      </Fragment>
                    ) }

                    <h2 className="govuk-heading-m">Contact details</h2>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Address</h3>

                    <p className="govuk-body">{ currentCase.defendant.address.line1 }<br/>
                      { currentCase.defendant.address.line2 && (
                        <Fragment>{ currentCase.defendant.address.line2 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.line3 && (
                        <Fragment>{ currentCase.defendant.address.line3 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.line4 && (
                        <Fragment>{ currentCase.defendant.address.line4 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.postcode }</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Telephone</h3>

                    <p className="govuk-body">07777 777 777</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Email</h3>

                    <p className="govuk-body"><a href="/email" className="govuk-link govuk-link--no-visited-state"
                                                 onClick={ e => e.preventDefault() }>user-123456@some-host.com</a>
                    </p>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Probation office</h2>

                        <p className="govuk-body">{ currentCase.defendant.nps ? 'NPS' : 'CRC' } South Yorkshire<br/>
                          12 Holme Road<br/>
                          Sheffield<br/>
                          South Yorkshire<br/>
                          S7 2TT</p>

                        <button className="govuk-button govuk-button--secondary">Contact offender manager</button>

                      </Fragment>
                    ) }

                    { /* currentCase.defendant.status.type !== 'not known' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Offender record</h2>

                        <p className="govuk-body">View the offender record in Delius.</p>

                        <button className="govuk-button govuk-button--secondary">View Delius record</button>

                      </Fragment>
                    ) */ }

                    { /* currentCase.defendant.currentState.type === 'New' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Something wrong?</h2>

                        <p className="govuk-body">If this offender record does not appear to be correct, you can correct
                          this
                          manually.</p>

                        <button className="govuk-button govuk-button--secondary">Find correct record</button>

                      </Fragment>
                    ) */ }

                  </div>

                </div>

              </div>

            </div>

            <div className="hmcts-filter-layout__content">

              { /* currentCase.defendant.currentState.type === 'Sentenced' && currentCase.defendant.deliusUpdated === 'N' && (
                <div className="govuk-warning-text moj-warning-text moj-warning-text--critical">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    The current sentence has not been recorded in Delius.
                  </strong>
                </div>
              ) */ }

              { /* currentCase.defendant.currentState.type === 'Sentenced' && !currentCase.defendant.nps && (
                <div className="govuk-warning-text moj-warning-text">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    The offender has been given a custodial sentence, this record has now been transferred to NOMIS.
                  </strong>
                </div>
              ) */ }

              <div className="hmcts-identity-bar">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Current case</h2>

                    <table className="govuk-table moj-table moj-table--split-rows">
                      <thead>
                      <tr>
                        <th>Offence</th>
                        <th>Code</th>
                        <th><p className="moj-!-text-align-right">Plea date</p></th>
                      </tr>
                      </thead>
                      <tbody>

                      { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                        return (
                          <tr key={ offenceIndex }>
                            <td>{ offence.title }</td>
                            <td>{ offence.code }</td>
                            <td>
                              <p className="moj-!-text-align-right">
                                { offence.pleaDate && (moment(offence.pleaDate, 'YYYY-MM-DD').format('DD/MM/YYYY')) }
                              </p>
                            </td>
                          </tr>
                        )
                      }) }

                      </tbody>
                    </table>

                    <table className="govuk-table moj-table">
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

                          { currentCase.defendant.markers && !!currentCase.defendant.markers.length && (
                            <div className="moj-!-text-align-right govuk-!-margin-bottom-2">
                              { currentCase.defendant.markers.map((marker, markerIndex) => {
                                return <div key={ markerIndex }
                                            className="hmcts-badge hmcts-badge--small moj-tooltip moj-tooltip--secondary moj-util-inline moj-!-text-align-center govuk-!-margin-left-1">{ marker.short }<span>{ marker.long }</span>
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

              <div className="hmcts-identity-bar govuk-!-margin-top-4">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Previous convictions</h2>

                    <table className="govuk-table moj-table moj-table--split-rows">
                      <thead>
                      <tr>
                        <th>Offence</th>
                        <th>Code</th>
                        <th><p className="moj-!-text-align-right">Plea date</p></th>
                      </tr>
                      </thead>
                      <tbody>

                      { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                        return (
                          <tr key={ offenceIndex }>
                            <td>{ offence.title }</td>
                            <td>{ offence.code }</td>
                            <td>
                              <p className="moj-!-text-align-right">
                                { offence.pleaDate && (moment(offence.pleaDate, 'YYYY-MM-DD').subtract(1, 'years').format('DD/MM/YYYY')) }
                              </p>
                            </td>
                          </tr>
                        )
                      }) }

                      </tbody>
                    </table>

                  </div>
                </div>
              </div>

              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <h2 className="govuk-heading-m govuk-!-margin-top-6">Case summary</h2>

                { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                  return (
                    <p key={ offenceIndex } className="govuk-body">{ offence.summary }</p>
                  )
                }) }

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <h2 className="govuk-heading-m govuk-!-margin-top-6">Case tracker</h2>

                <table className="govuk-table moj-table moj-table--split-rows">
                  <thead>
                  <tr>
                    <th>Supporting information</th>
                    <th>Action</th>
                    <th><p className="moj-!-text-align-right">Status</p></th>
                  </tr>
                  </thead>
                  <tbody>
                  { currentCase.defendant.deliusStatus === 'Current' && (
                    <tr>
                      <td>Offender manager update</td>
                      <td>Requested on { currentDate.format('Do MMMM YYYY ') } at 09:15</td>
                      <td>
                        <p className="moj-!-text-align-right">Awaiting response</p>
                      </td>
                    </tr>
                  ) }
                  <tr>
                    <td>CPS Pack</td>
                    <td>Acquired</td>
                    <td className="moj-!-text-align-right">
                      <p className="moj-!-text-align-right">
                        <a className="govuk-link hmcts-timeline__document-link" href="/cps-link"
                           onClick={ e => e.preventDefault() }>CPS Pack</a>
                      </p>
                    </td>
                  </tr>
                  </tbody>
                </table>

              </div>

              <div className="hmcts-identity-bar">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m">Notes</h2>

                    <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd, Do MMMM YYYY ') }</p>

                    <p className="govuk-body">Case adjourned off as defendant has changed plea from guilty to not
                      guilty. Seems very upset, claiming the police didn't listen to them.</p>

                    <p className="moj-!-text-align-right">
                      <button className="govuk-button govuk-button--secondary">Add note</button>
                    </p>

                  </div>
                </div>
              </div>

            </div>
          </div>
        ) }

        <Link to="/cases" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default OffenderSummary
