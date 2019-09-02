import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function SomethingWrong () {
  return (
    <Fragment>
      <h2 className="govuk-heading-m">Something wrong?</h2>
      <p className="govuk-body">If this offender record does not appear to be correct, you can try to match the correct
        offender record within Delius.</p>
      <p className="govuk-body">
        <Link to="/cases/match/98979" className="govuk-link govuk-link--no-visited-state">Match offender record</Link>
      </p>
    </Fragment>
  )
}

export default SomethingWrong
