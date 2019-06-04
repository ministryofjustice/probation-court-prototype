import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import currentCourtList from '../../assets/dummy-data'

function OffenderSummary (props) {

  const offenderData = currentCourtList[props.match.params.id]
  const hasDV = offenderData.markers.map((marker) => {
    return marker.short === 'DV'
  }).indexOf(true) !== -1

  console.info(hasDV)

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

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/" className="govuk-breadcrumbs__link">Case list</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Current case</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Current case</h1>

        <div className="hmcts-filter-layout">

          <div className="hmcts-filter-layout__filter">

            <div className="hmcts-filter">

              <div className="hmcts-filter__header">

                <div className="hmcts-filter__header-title">
                  <h2 className="govuk-heading-m">{ offenderData.name }</h2>
                </div>
              </div>

              <div className="hmcts-filter__content">

                <div className="hmcts-filter__selected">

                  <div className="hmcts-filter__selected-heading">

                    <div className="moj-!-float-left">

                      <img src="/assets/images/no-photo.png" width="82" height="102"
                           alt={ `${ offenderData.name }` }
                           className="app-offender-image"/>
                    </div>
                    <div className="moj-!-float-left">

                      <p className="govuk-body govuk-!-margin-bottom-0">
                        <strong>DOB:</strong> { offenderData.dateOfBirth }</p>
                      <p className="govuk-body govuk-!-margin-bottom-0"><strong>CRN:</strong> { offenderData.crn }</p>
                      <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> { offenderData.pnc }</p>
                      <p className="govuk-body govuk-!-margin-bottom-0"><strong>Court
                        store:</strong> { offenderData.courtStore }</p>

                    </div>

                    { offenderData.status.type === 'current' && (
                      <div className="hmcts-badge moj-badge moj-badge-current govuk-!-margin-top-4">Current
                        offender</div>
                    ) }

                  </div>
                </div>

                <div className="hmcts-filter__options">

                  { offenderData.markers && !!offenderData.markers.length && (
                    <Fragment>
                      <h2 className="govuk-heading-m">Libra markers</h2>

                      { offenderData.markers.map((marker, markerIndex) => {
                        return <p key={ markerIndex } className="govuk-body govuk-!-margin-bottom-0">{ marker.long }</p>
                      }) }

                      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                    </Fragment>
                  ) }

                  <h2 className="govuk-heading-m">Address</h2>

                  <p className="govuk-body">{ offenderData.address.line1 }<br/>
                    { offenderData.address.line2 && (<Fragment>{ offenderData.address.line2 }<br/></Fragment>) }
                    { offenderData.address.city }<br/>
                    { offenderData.address.postcode }</p>

                  { offenderData.currentOrder && !!offenderData.currentOrder.length && (
                    <Fragment>
                      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      <h2 className="govuk-heading-m">Current order</h2>

                      { offenderData.currentOrder.map((order, orderIndex) => {
                        return <p key={ orderIndex } className="govuk-body govuk-!-margin-bottom-0">{ order }</p>
                      }) }

                      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>
                    </Fragment>
                  ) }

                  { offenderData.status.type === 'current' && (
                    <Fragment>
                      <h2 className="govuk-heading-m">Probation office</h2>

                      <p className="govuk-body">CRC South Yorkshire<br/>
                        12 Holme Road<br/>
                        Sheffield<br/>
                        South Yorkshire<br/>
                        S7 2TT</p>

                      <button className="govuk-button govuk-button--secondary">Contact offender manager</button>

                    </Fragment>
                  ) }

                  <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                  <h2 className="govuk-heading-m">Something wrong?</h2>

                  <p className="govuk-body">If this offender record does not appear to be correct, you can correct this manually.</p>

                  <button className="govuk-button govuk-button--secondary">Find correct record</button>

                </div>

              </div>

            </div>

          </div>

          <div className="hmcts-filter-layout__content">

            <div className="hmcts-scrollable-pane">

              <div className="hmcts-scrollable-pane__wrapper">

                <div className="hmcts-identity-bar">
                  <div className="hmcts-identity-bar__container">
                    <div className="hmcts-identity-bar__details govuk-!-padding-left-4">

                      <h2 className="govuk-heading-m">Current offence</h2>

                      { offenderData.offences.map((offence, offenceIndex) => {
                        return <p key={ offenceIndex } className="govuk-body">{ offence }</p>
                      }) }

                    </div>
                  </div>
                </div>

                <div className="hmcts-identity-bar">
                  <div className="hmcts-identity-bar__container">
                    <div className="hmcts-identity-bar__details govuk-!-padding-left-4">

                      <h2 className="govuk-heading-m">Previous convictions</h2>

                      { offenderData.previous && offenderData.previous.map((offence, offenceIndex) => {
                        return <p key={ offenceIndex } className="govuk-body">{ offence }</p>
                      }) }

                      { (!offenderData.previous || !offenderData.previous.length) && (
                        <p className="govuk-body">No previous convictions</p>
                      ) }

                    </div>
                  </div>
                </div>

                <h2 className="govuk-heading-m govuk-!-margin-top-6">Current status of case</h2>

                <div className="hmcts-timeline govuk-!-margin-top-4">

                  { hasDV && (
                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">DV logs received</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">from Police, Sheffield</p>
                      </div>

                      <p className="hmcts-timeline__date">{ today() } at 10:34</p>

                      <p className="hmcts-timeline__description">The DV logs have been received.</p>

                      <ul className="hmcts-timeline__documents">
                        <li className="hmcts-timeline__document-item"><a
                          className="govuk-link hmcts-timeline__document-link" href="#3">DV logs</a></li>
                      </ul>

                    </div>
                  )}

                  { offenderData.status.type === 'current' && (
                    <Fragment>

                      <div className="hmcts-timeline__item">

                        <div className="hmcts-timeline__header">
                          <h2 className="hmcts-timeline__title">Response received</h2>
                          <p className="hmcts-timeline__by govuk-!-margin-left-1">from Offender Manager, Nicholas
                            Johnson</p>
                        </div>

                        <p className="hmcts-timeline__date">
                          <time dateTime="2018-01-25T14:04">{ today() } at 10:02</time>
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
                          <time dateTime="2017-12-05T09:10">{ today() } at 07:27</time>
                        </p>

                        <p className="hmcts-timeline__description">The offender is currently under order.<br/>An update
                          from the Offender Manager has been requested.</p>

                      </div>
                    </Fragment>
                  ) }

                  { hasDV && (
                    <div className="hmcts-timeline__item">

                      <div className="hmcts-timeline__header">
                        <h2 className="hmcts-timeline__title">DV logs requested</h2>
                        <p className="hmcts-timeline__by govuk-!-margin-left-1">(automated)</p>
                      </div>

                      <p className="hmcts-timeline__date">{ today() } at 07:27</p>

                      <p className="hmcts-timeline__description">The offender has a DV Marker in Libra.<br/>The DV logs
                        have been requested from Police, Sheffield.</p>

                    </div>
                  )}

                  <div className="hmcts-timeline__item">

                    <div className="hmcts-timeline__header">
                      <h2 className="hmcts-timeline__title">CPS Pack Uploaded</h2>
                      <p className="hmcts-timeline__by govuk-!-margin-left-1">(automated)</p>
                    </div>

                    <p className="hmcts-timeline__date">{ today() } at 07:27</p>

                    <p className="hmcts-timeline__description">The CPS Pack was uploaded to Delius.</p>

                    <ul className="hmcts-timeline__documents">
                      <li className="hmcts-timeline__document-item"><a
                        className="govuk-link hmcts-timeline__document-link" href="#3">CPS Pack</a></li>
                    </ul>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        <Link to="/" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default OffenderSummary
