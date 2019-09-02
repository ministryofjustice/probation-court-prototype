import React from 'react'

function PageTitle (props) {
  return (
    <h1 className="govuk-heading-l govuk-!-margin-top-6 govuk-!-margin-bottom-1">{ props.title }
      { !!(props.hint) && (
        <span className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;{ props.hint }</span>
      ) }
    </h1>
  )
}

export default PageTitle
