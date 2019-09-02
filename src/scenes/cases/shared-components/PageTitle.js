import React from 'react'

function PageTitle (props) {
  return (
    <h1 className="govuk-heading-l">{ props.title }
      { !!(props.hint) && (
        <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ props.hint }</span>
      ) }
    </h1>
  )
}

export default PageTitle
