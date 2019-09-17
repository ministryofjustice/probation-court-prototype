import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'
import { AppTitle } from '../../../../utils/Title'

function AddCaseFinished () {

  const [{ currentDate }] = useStateValue()

  useEffect(() => {
    document.title = `New case added - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">

          <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-top-6">
            <h1 className="govuk-panel__title">
              New case added
            </h1>
            <div className="govuk-panel__body">
              <strong>Your new case has been added<br/>to the case list</strong>
            </div>
          </div>

          <p className="govuk-body">Your new case has been added to the case list for { currentDate.format('dddd D MMMM') }.</p>

          <h2 className="govuk-heading-m">Next steps</h2>

          <p className="govuk-body">
            <Link to="/cases/add" className="govuk-link govuk-link--no-visited-state">Add another case</Link>
          </p>

          <p className="govuk-body">
            <Link to="/cases/list" className="govuk-link govuk-link--no-visited-state">Return to case list</Link>
          </p>

        </div>
        <div className="govuk-grid-column-one-third"/>
      </div>

    </main>
  )
}

export default AddCaseFinished
