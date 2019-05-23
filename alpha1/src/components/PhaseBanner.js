import React from 'react'

function PhaseBanner() {
  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content"><strong className="govuk-tag govuk-phase-banner__content__tag">
        prototype
      </strong>
        <span className="govuk-phase-banner__text">
      This is a new service – your <a className="govuk-link" href="/feedback" onClick={ (e) => e.preventDefault() }>feedback</a> will help us to improve it.
    </span>
      </p>
    </div>
  )
}

export default PhaseBanner
