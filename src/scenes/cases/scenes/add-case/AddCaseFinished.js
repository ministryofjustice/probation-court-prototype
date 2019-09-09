import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'

import PageTitle from '../../shared-components/PageTitle'

function AddCaseFinished (props) {

  const [{ currentDate }] = useStateValue()

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
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/add" className="govuk-breadcrumbs__link">Add case</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">Match defendant</li>
          <li className="govuk-breadcrumbs__list-item">Case details</li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Finished</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">

            <PageTitle title="Add case" hint={ `for ${ currentDate.format('dddd D MMMM') }` }/>

          </div>
          <div className="govuk-grid-column-two-thirds">

            <div className="app-progress-bar govuk-!-margin-top-6 govuk-!-margin-bottom-0">
              <ol className="app-progress-bar__list">

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Defendant details</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Match defendant</span>
                </li>

                <li className="app-progress-bar__list-item" aria-current="step">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Case details</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Finished</span>
                </li>

              </ol>
            </div>

          </div>
        </div>

        <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-top-6">
          <h1 className="govuk-panel__title">
            New case added
          </h1>
          <div className="govuk-panel__body">
            <strong>Your new case has been added<br/>to the case list for today</strong>
          </div>
        </div>

        <p className="govuk-body govuk-!-margin-top-6">
          <Link to="/cases/list" className="govuk-link govuk-link--no-visited-state">Return to case list</Link>
        </p>

      </main>

    </Fragment>
  )
}

export default AddCaseFinished
