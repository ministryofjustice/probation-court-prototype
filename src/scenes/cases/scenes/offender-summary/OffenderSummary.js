import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import OffenderRisk from './components/OffenderRisk'
import OffenderEvents from './components/OffenderEvents'
import OffenderDetails from './components/OffenderDetails'
import DefendantBanner from '../../shared-components/DefendantBanner'

function OffenderSummary (props) {

  const [{ currentDate, currentCase }] = useStateValue()

  useEffect(() => {
    document.title = `Offender record - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase } id={ props.match.params.id } showCaseLink={ true }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <div className="moj-page-header-actions">
            <div className="moj-page-header-actions__title">
              <h1 className="govuk-heading-l">Offender record</h1>
            </div>
          </div>

          { currentCase && currentCase.defendant && (
            <Fragment>

              <div className="govuk-grid-row app-!-display-flex">
                <div className="govuk-grid-column-one-third app-!-display-flex--1">
                  <div
                    className={ `app-card app-card--muted ${ currentCase.defendant.deliusStatus !== 'Current' ? 'app-card__secondary' : '' }` }>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>
                        <p className="govuk-heading-m govuk-!-margin-0">Rehabilitation Activity Requirement (RAR)</p>
                        <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">Hours ordered: <strong>5</strong></p>
                        <p className="govuk-body">Hours credited: <strong>0</strong></p>

                        <p className="govuk-body">
                          <a href="/" className="govuk-link app-link--dark"
                             onClick={ e => e.preventDefault() }>CPS Pack</a>
                        </p>
                      </Fragment>
                    ) }

                  </div>
                </div>

                <div className="govuk-grid-column-one-third app-!-display-flex--1">
                  <div
                    className={ `app-card app-card--muted ${ currentCase.defendant.deliusStatus !== 'Current' ? 'app-card__secondary' : '' }` }>

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>
                        <p className="govuk-heading-m govuk-!-margin-0">OM Update</p>
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
                        <p className="govuk-heading-m govuk-!-margin-0">PSR</p>
                        <p className="govuk-body">A pre-sentence report was requested at 09:25 and is currently in
                          draft.</p>

                        <p className="govuk-body"><a href="/contact" className="govuk-link app-link--dark"
                                                     onClick={ e => e.preventDefault() }>View draft report</a></p>
                      </Fragment>
                    ) }

                  </div>
                </div>
              </div>

              <OffenderRisk/>
              <OffenderEvents/>
              <OffenderDetails/>

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Notes</h2>

              { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                <Fragment>
                  <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd Do MMMM ') }</p>
                  <p className="govuk-body">Laboris sunt officia ex quis laboris sit exercitation et. Occaecat
                    nulla tempor laborum adipisicing reprehenderit sint cupidatat dolor nulla proident est non
                    ipsum.</p>
                </Fragment>
              ) }

              <p className="govuk-body">
                <Link to="/" className="govuk-link govuk-link--no-visited-state">Add note</Link>
              </p>
            </Fragment>
          ) }

        </main>

      </div>

    </Fragment>
  )
}

export default OffenderSummary
