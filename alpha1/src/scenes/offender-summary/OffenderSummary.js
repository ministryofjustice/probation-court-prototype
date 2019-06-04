import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import currentCourtList from '../../assets/dummy-data'

function OffenderSummary (props) {

  const offenderData = currentCourtList[props.match.params.id]

  return (
    <Fragment>
      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/" className="govuk-breadcrumbs__link">Court list</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">{ offenderData.name }</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <div className="moj-!-float-left--not-narrow">

              <img src="/assets/images/no-photo.png" width="165" height="205" alt={ `${ offenderData.name }` }
                   className="app-offender-image"/>
            </div>
            <div className="moj-!-float-left--not-narrow app-offender-header">

              <h1 className="govuk-heading-l govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ offenderData.name }</h1>

              <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-third">

                  { offenderData.dateOfBirth && (
                    <Fragment>
                      <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of birth</p>
                      <p className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderData.dateOfBirth }</p>
                    </Fragment>
                  ) }

                  { offenderData.crn && (
                    <Fragment>
                      <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
                      <p className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderData.crn }</p>
                    </Fragment>
                  ) }

                </div>
                <div className="govuk-grid-column-two-thirds govuk-!-margin-top-2 govuk-!-padding-right-0">
                  <div
                    className="moj-risk-alert app-risk-alert app-float-right govuk-!-margin-bottom-2 moj-risk-alert--high"
                    role="alert">very high risk of serious harm
                  </div>
                  <div
                    className="moj-risk-alert app-risk-alert app-float-right moj-risk-alert--high moj-risk-alert--small govuk-!-margin-bottom-2"
                    role="alert">breached conditions
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
