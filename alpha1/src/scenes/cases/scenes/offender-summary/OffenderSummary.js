import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getDateFromProps } from '../../../../utils/DateTools'

function OffenderSummary (props) {

  const id = props.match.params.id
  const [data, setData] = useState({})
  const currentDate = getDateFromProps(props.match.params)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function getData() {
      const response = await fetch(`http://localhost:8080/api/cases/details/${ id }`)
      const data = await response.json()
      setData({
        court: data.court,
        offenderData: data.details,
        hasDV: data.details.markers.map((marker) => {
          return marker.short === 'DV'
        }).indexOf(true) !== -1
      })
    }
    getData()
  }, [id])

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

        <table className="govuk-table">
          <tbody>
          <tr>
            <td>
              <h1 className="govuk-heading-l govuk-!-margin-0">Case details</h1>
              <p
                className="govuk-body-m govuk-!-font-weight-bold govuk-!-margin-bottom-0">{ currentDate.format('dddd, Do MMMM YYYY ') }
                <span className="govuk-hint moj-util-inline">at { data.court }</span></p>
            </td>
            <td>
              { data.offenderData && data.offenderData.currentState.type !== 'New' && (
                <Fragment>
                  <div className="moj-risk-alert">{ data.offenderData.currentState.type.toUpperCase() }</div>
                </Fragment>
              ) }
            </td>
          </tr>
          </tbody>
        </table>

        { data.offenderData && (
          <div className="hmcts-filter-layout">

            <div className="hmcts-filter-layout__filter">

              <div className="hmcts-filter">

                <div className="hmcts-filter__header">

                  <div className="hmcts-filter__header-title">
                    <h2 className="govuk-heading-m">{ data.offenderData.name }</h2>
                  </div>
                </div>

                <div className="hmcts-filter__content">

                  <div className="hmcts-filter__selected">

                    <div className="hmcts-filter__selected-heading">

                      <div className="moj-!-float-left">

                        <img src="/assets/images/no-photo.png" width="82" height="102"
                             alt={ `${ data.offenderData.name }` }
                             className="app-offender-image"/>
                      </div>
                      <div className="moj-!-float-left">

                        <p className="govuk-body govuk-!-margin-bottom-0">
                          <strong>DOB:</strong> { data.offenderData.dateOfBirth }</p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>CRN:</strong> { data.offenderData.crn }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> { data.offenderData.pnc }
                        </p>
                        <p className="govuk-body govuk-!-margin-bottom-0"><strong>Court
                          store:</strong> { data.offenderData.courtStore }</p>

                      </div>

                      { data.offenderData.status.type === 'current' && (
                        <div className="hmcts-badge moj-badge moj-badge-error govuk-!-margin-top-4">Current offender</div>
                      ) }

                    </div>
                  </div>

                  <div className="hmcts-filter__options">

                    { data.offenderData.risk && !!data.offenderData.risk.length && (
                      <Fragment>
                        <h2 className="govuk-heading-m govuk-!-margin-bottom-0">Risk <span
                          className="govuk-hint moj-util-inline govuk-!-margin-top-0">from Delius record</span></h2>

                        { data.offenderData.risk.map((risk, riskIndex) => {
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

                    { data.offenderData.currentOrder && !!data.offenderData.currentOrder.length && data.offenderData.nps && (
                      <Fragment>
                        <h2 className="govuk-heading-m">Current order</h2>

                        { data.offenderData.currentOrder.map((order, orderIndex) => {
                          return <p key={ orderIndex } className="govuk-body govuk-!-margin-bottom-0">{ order }</p>
                        }) }

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Intervention details</h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">ES - RAR Programme</p>
                        <p className="govuk-body govuk-!-margin-bottom-0">One to one</p>

                        <div className="hmcts-badge moj-badge moj-badge-current govuk-!-margin-top-4">Active</div>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                      </Fragment>
                    ) }

                    <h2 className="govuk-heading-m">Contact details</h2>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Address</h3>

                    <p className="govuk-body">{ data.offenderData.address.line1 }<br/>
                      { data.offenderData.address.line2 && (
                        <Fragment>{ data.offenderData.address.line2 }<br/></Fragment>) }
                      { data.offenderData.address.city }<br/>
                      { data.offenderData.address.postcode }</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Telephone</h3>

                    <p className="govuk-body">07777 777 777</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Email</h3>

                    <p className="govuk-body"><a href="/email" className="govuk-link govuk-link--no-visited-state"
                                                 onClick={ e => e.preventDefault() }>user-123456@some-host.com</a>
                    </p>

                    { data.offenderData.status.type === 'current' && data.offenderData.status.office && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Probation office</h2>

                        <p className="govuk-body">{ data.offenderData.status.office } South Yorkshire<br/>
                          12 Holme Road<br/>
                          Sheffield<br/>
                          South Yorkshire<br/>
                          S7 2TT</p>

                        <button className="govuk-button govuk-button--secondary">Contact offender manager</button>

                      </Fragment>
                    ) }

                    { data.offenderData.status.type !== 'not known' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Offender record</h2>

                        <p className="govuk-body">View the offender record in Delius.</p>

                        <button className="govuk-button govuk-button--secondary">View Delius record</button>

                      </Fragment>
                    ) }

                    { data.offenderData.currentState.type === 'New' && (
                      <Fragment>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                        <h2 className="govuk-heading-m">Something wrong?</h2>

                        <p className="govuk-body">If this offender record does not appear to be correct, you can correct
                          this
                          manually.</p>

                        <button className="govuk-button govuk-button--secondary">Find correct record</button>

                      </Fragment>
                    ) }

                  </div>

                </div>

              </div>

            </div>

            <div className="hmcts-filter-layout__content">

              { data.offenderData.currentState.type === 'Sentenced' && data.offenderData.deliusUpdated === 'N' && (
                <div className="govuk-warning-text moj-warning-text moj-warning-text--critical">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    The current sentence has not been recorded in Delius.
                  </strong>
                </div>
              ) }

              { data.offenderData.currentState.type === 'Sentenced' && !data.offenderData.nps && (
                <div className="govuk-warning-text moj-warning-text">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    The offender has been given a custodial sentence, this record has now been transferred to NOMIS.
                  </strong>
                </div>
              ) }

              <div className="hmcts-identity-bar">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Current offence</h2>

                    { data.offenderData.offences.map((offence, offenceIndex) => {
                      return (
                        <div key={ offenceIndex } className="govuk-grid-row">
                          <div className="govuk-grid-column-one-half">
                            <p className="govuk-body">{ offence }</p>
                          </div>
                          <div className="govuk-grid-column-one-half">
                            <p
                              className="govuk-body moj-!-text-align-right">{ currentDate.format('DD/MM/YYYY') }</p>
                          </div>
                        </div>
                      )
                    }) }

                    <table className="govuk-table moj-table govuk-!-margin-0">
                      <thead>
                      <tr>
                        <th colSpan="2">Appearing in Court { data.offenderData.court }</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>

                          <p className="govuk-body">{ currentDate.format('dddd, Do MMMM YYYY') }, AM</p>

                        </td>
                        <td>

                          { data.offenderData.markers && !!data.offenderData.markers.length && (
                            <div className="moj-!-text-align-right govuk-!-margin-bottom-2">
                              { data.offenderData.markers.map((marker, markerIndex) => {
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

              <div className="hmcts-identity-bar">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m govuk-!-margin-top-2">Previous convictions</h2>

                    { data.offenderData.previous && data.offenderData.previous.map((offence, offenceIndex) => {
                      return (
                        <div key={ offenceIndex } className="govuk-grid-row">
                          <div className="govuk-grid-column-one-half">
                            <p className="govuk-body">{ offence }</p>
                          </div>
                          <div className="govuk-grid-column-one-half">
                            <p className="govuk-body moj-!-text-align-right">24/03/2017</p>
                          </div>
                        </div>
                      )
                    }) }

                    { (!data.offenderData.previous || !data.offenderData.previous.length) && (
                      <p className="govuk-body">No previous convictions</p>
                    ) }

                  </div>
                </div>
              </div>

              <h2 className="govuk-heading-m govuk-!-margin-top-6">Case tracker</h2>

              <div className="hmcts-timeline govuk-!-margin-top-4">

                {
                  data.offenderData.currentState.type === 'Sentenced' && (
                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">Sentenced</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">from Court</p>
                      </div>

                      <p className="hmcts-timeline__date govuk-!-margin-bottom-4">{ currentDate.format('DD/MM/YYYY') } at
                        10:55</p>
                      { data.offenderData.sentence.map((sentence, sentenceIndex) => {
                        return <p key={ sentenceIndex }
                                  className="hmcts-timeline__description govuk-!-margin-0">{ sentence }</p>
                      }) }

                    </div>
                  )
                }

                {
                  data.offenderData.currentState.type === 'Adjourned' && (
                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">Adjourned</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">from Court</p>
                      </div>

                      <p className="hmcts-timeline__date">{ currentDate.format('DD/MM/YYYY') } at 10:45</p>
                      <p className="hmcts-timeline__description">{ data.offenderData.currentState.details }</p>
                    </div>
                  )
                }

                { data.hasDV && (
                  <div className="hmcts-timeline__item">

                    <div className="hmcts-timeline__header">
                      <h2 className="hmcts-timeline__title">DV logs received</h2>
                      <p className="hmcts-timeline__by govuk-!-margin-left-1">from Police, Sheffield</p>
                    </div>

                    <p className="hmcts-timeline__date">{ currentDate.format('DD/MM/YYYY') } at 10:34</p>

                    <p className="hmcts-timeline__description">The DV logs have been received.</p>

                    <ul className="hmcts-timeline__documents">
                      <li className="hmcts-timeline__document-item"><a
                        className="govuk-link hmcts-timeline__document-link" href="#3">DV logs</a></li>
                    </ul>

                  </div>
                ) }

                { data.offenderData.status.type === 'current' && (
                  <Fragment>

                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">Response received</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">from Offender Manager, Nicholas
                          Johnson</p>
                      </div>

                      <p className="hmcts-timeline__date">
                        <time dateTime="2018-01-25T14:04">{ currentDate.format('DD/MM/YYYY') } at 10:02</time>
                      </p>

                      <p className="hmcts-timeline__description">The Offender Manager has responded with an update on
                        the current order.</p>

                      <ul className="hmcts-timeline__documents">
                        <li className="hmcts-timeline__document-item"><a
                          className="govuk-link hmcts-timeline__document-link" href="#3">Read response</a></li>
                      </ul>

                    </div>

                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">Update from Offender Manager requested</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">(automated)</p>
                      </div>

                      <p className="hmcts-timeline__date">
                        <time dateTime="2017-12-05T09:10">{ currentDate.format('DD/MM/YYYY') } at 07:27</time>
                      </p>

                      <p className="hmcts-timeline__description">The offender is currently under order.<br/>An update
                        from the Offender Manager has been requested.</p>

                    </div>
                  </Fragment>
                ) }

                { data.hasDV && (
                  <div className="hmcts-timeline__item">

                    <div className="hmcts-timeline__header">
                      <h2 className="hmcts-timeline__title">DV logs requested</h2>
                      <p className="hmcts-timeline__by govuk-!-margin-left-1">(automated)</p>
                    </div>

                    <p className="hmcts-timeline__date">{ currentDate.format('DD/MM/YYYY') } at 07:27</p>

                    <p className="hmcts-timeline__description">The offender has a DV Marker in Libra.<br/>The DV logs
                      have been requested from Police, Sheffield.</p>

                  </div>
                ) }

                <div className="hmcts-timeline__item">

                  <div className="hmcts-timeline__header">
                    <h2 className="hmcts-timeline__title">CPS Pack Uploaded</h2>
                    <p className="hmcts-timeline__by govuk-!-margin-left-1">(automated)</p>
                  </div>

                  <p className="hmcts-timeline__date">{ currentDate.format('DD/MM/YYYY') } at 07:27</p>

                  <p className="hmcts-timeline__description">The CPS Pack was uploaded to Delius.</p>

                  <ul className="hmcts-timeline__documents">
                    <li className="hmcts-timeline__document-item"><a
                      className="govuk-link hmcts-timeline__document-link" href="#3">CPS Pack</a></li>
                  </ul>

                </div>

              </div>

              <div className="hmcts-identity-bar">
                <div className="hmcts-identity-bar__container">
                  <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                    <h2 className="govuk-heading-m">Notes</h2>

                    { data.offenderData.currentState.type === 'Adjourned' && (
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
        )}

        <Link to="/cases" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default OffenderSummary
