import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

function CaseSummary (props) {

  const [{ court, currentDate, currentCase }] = useStateValue()

  console.info(currentCase)

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
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Case</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Case details</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <table className="govuk-table moj-table" role="presentation">
          <tbody>
          <tr>
            <td>
              <h1 className="govuk-heading-l govuk-!-margin-0">Case details</h1>
              <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') }<span
                className="govuk-hint moj-util-inline">at { court }</span></p>
            </td>
            <td className="moj-!-text-align-right">

              <div className="moj-action-bar">

                <div className="moj-menu">
                  <div className="moj-menu__wrapper">

                    <button className="govuk-button govuk-button--secondary moj-menu__item" type="button">Adjourn
                      case
                    </button>

                    <button className="govuk-button govuk-button--secondary moj-menu__item" type="button">Record
                      sentence
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
                    <h2 className="govuk-heading-m">{ currentCase.defendant && currentCase.defendant.name }</h2>
                  </div>
                </div>

                <div className="moj-filter__content">

                  <div className="moj-filter__selected">

                    <div className="moj-filter__selected-heading">

                      <div className="moj-!-float-left">

                        <img src="/assets/images/no-photo.png" width="82" height="102"
                             alt={ `${ currentCase.defendant.name }` }
                             className="app-offender-image"/>
                      </div>
                      <div className="moj-!-float-left">

                        <p className="govuk-body govuk-!-margin-bottom-0">
                          <strong>DOB:</strong> { moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>CRN:</strong> X612323A</p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> 2004/123456B</p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>Court
                          store:</strong> { currentCase.caseNumber }</p>

                      </div>

                      <div
                        className={ `moj-badge moj-badge ${ currentCase.defendant.deliusStatus === 'Current' ? 'moj-badge-error' : currentCase.defendant.deliusStatus === 'Known' ? 'moj-badge-known' : '' } govuk-!-margin-top-4 app-full-width` }>{ currentCase.defendant.deliusStatus } offender</div>

                    </div>
                  </div>

                  <div className="moj-filter__options">

                    { !!(currentCase.defendant.risk && currentCase.defendant.risk.length) && (
                      <Fragment>
                        <h2 className="govuk-heading-m govuk-!-margin-bottom-0">RoSH <span
                          className="govuk-hint moj-util-inline govuk-!-margin-top-0">from Delius record</span></h2>

                        { currentCase.defendant.risk.map((risk, riskIndex) => {
                          return risk.type === 'RoSH' ? (
                            <div key={ riskIndex }
                                 className="moj-risk-alert moj-risk-alert--small moj-risk-alert--high">{ risk.status.charAt(0).toUpperCase() + risk.status.slice(1) } Risk
                              of Serious Harm</div>
                          ) : (<Fragment key={ riskIndex }/>)
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
                          className="moj-badge moj-badge moj-badge-current govuk-!-margin-top-4 app-full-width">Active Intervention
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

                    <p className="govuk-body">07765 765 432</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Email</h3>

                    <p className="govuk-body"><a href={ `/contact/${ props.match.params.id }` }
                                                 className="govuk-link govuk-link--no-visited-state"
                                                 onClick={ e => e.preventDefault() }>user-123456@some-host.com</a>
                    </p>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

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

                        <button className="govuk-button govuk-button--secondary">Contact offender manager</button>

                      </Fragment>
                    ) }

                  </div>
                </div>
              </div>
            </div>

            <div className="moj-filter-layout__content">

              <div className="moj-identity-bar">
                <div className="moj-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Current case</h2>

                    <table className="govuk-table moj-table moj-table--split-rows">
                      <thead>
                      <tr>
                        <th>Offence</th>
                        <th>
                          <p
                            className={ !currentCase.offences.some(offence => { return offence.plea && offence.plea.length }) ? 'moj-!-text-align-right' : '' }>
                            Code
                          </p>
                        </th>
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
                            <td>{ offence.code }</td>
                            { !!(offence.plea && offence.plea.length) && (<td>{ offence.plea }</td>) }
                            { !!(offence.pleaDate && offence.pleaDate.length) && (
                              <td>{ offence.pleaDate && (moment(offence.pleaDate, 'YYYY-MM-DD').format('DD/MM/YYYY')) }</td>
                            ) }
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

                          { currentCase.markers && !!currentCase.markers.length && (
                            <div className="moj-!-text-align-right govuk-!-margin-bottom-2">
                              { currentCase.markers.map((marker, markerIndex) => {
                                return <div key={ markerIndex }
                                            className="moj-badge moj-badge--small moj-tooltip moj-tooltip--secondary moj-util-inline moj-!-text-align-center govuk-!-margin-left-1">{ marker }<span>{ getMarker(marker) }</span>
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

              { !!(currentCase.defendant.previousConvictions && currentCase.defendant.previousConvictions.length) && (
                <div className="moj-identity-bar govuk-!-margin-top-4">
                  <div className="moj-identity-bar__container">
                    <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                      <h2 className="govuk-heading-m govuk-!-margin-top-2">Previous convictions</h2>

                      <table className="govuk-table moj-table moj-table--split-rows">
                        <thead>
                        <tr>
                          <th>Offence</th>
                          <th>Code</th>
                          <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>

                        { currentCase.defendant.previousConvictions && currentCase.defendant.previousConvictions.map((offence, offenceIndex) => {
                          return (
                            <tr key={ offenceIndex }>
                              <td>{ offence.title }</td>
                              <td>{ offence.code }</td>
                              <td>{ offence.pleaDate && (moment(offence.pleaDate, 'YYYY-MM-DD').subtract(1, 'years').format('DD/MM/YYYY')) }</td>
                            </tr>
                          )
                        }) }

                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
              ) }

              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                { !!(currentCase.defendant.risk && currentCase.defendant.risk.length) && (
                  <Fragment>
                    <h2 className="govuk-heading-m govuk-!-margin-top-6">Registers and warnings <span
                      className="govuk-hint moj-util-inline govuk-!-margin-top-0">from Delius record</span></h2>

                    <table className="govuk-table moj-table moj-table--split-rows">
                      <thead>
                      <tr>
                        <th style={ { 'width': '220px' } }>Type</th>
                        <th style={ { 'width': '130px' } }>Status</th>
                        <th>Description</th>
                        <th style={ { 'width': '130px' } }>Date</th>
                      </tr>
                      </thead>
                      <tbody>
                      { currentCase.defendant.risk.map((risk, riskIndex) => {
                        return (
                          <tr key={ riskIndex }>
                            <td>{ risk.type }</td>
                            <td><span
                              className={ `moj-risk-tag moj-risk-tag--${ risk.status.split(' ').join('-') }` }>{ risk.status }</span>
                            </td>
                            <td>{ risk.description }</td>
                            <td>{ moment(risk.date, 'YYYY-MM-DD').format('DD/MM/YYYY') }</td>
                          </tr>
                        )
                      }) }
                      </tbody>
                    </table>

                    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                  </Fragment>
                ) }

                <h2 className="govuk-heading-m govuk-!-margin-top-6">Case summary</h2>

                { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                  return (
                    <Fragment key={ offenceIndex }>
                      <p className="govuk-body govuk-!-margin-bottom-1">{ offence.summary }</p>
                      <p
                        className="govuk-hint govuk-!-margin-top-1 govuk-!-margin-bottom-6">{ offence.contraryToActAndSection }</p>
                    </Fragment>
                  )
                }) }

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <h2 className="govuk-heading-m govuk-!-margin-top-6">Case tracker</h2>

                <table className="govuk-table moj-table moj-table--split-rows">
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

                    <h2 className="govuk-heading-m">Notes</h2>

                    { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                      <Fragment>
                        <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd, Do MMMM YYYY ') }</p>
                        <p className="govuk-body">Case adjourned off as defendant has changed plea from guilty to not
                          guilty. Seems very upset, claiming the police didn't listen to them.</p>
                      </Fragment>
                    ) }

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

export default CaseSummary
