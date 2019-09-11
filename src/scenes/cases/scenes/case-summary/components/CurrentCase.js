import React, { Fragment, useEffect } from 'react'
import { useStateValue } from '../../../../../utils/StateProvider'
import { Accordion } from 'govuk-frontend'

function CurrentCase () {

  const [{ currentCase }] = useStateValue()

  useEffect(() => {
    window.scrollTo(0, 0)
    const $accordion = document.querySelector('[data-module="govuk-accordion"]')
    console.info($accordion)
    if ($accordion) {
      new Accordion($accordion).init()
    }
  }, [])

  return (
    <Fragment>

      <h2 className="govuk-heading-m govuk-!-margin-top-2 govuk-!-margin-bottom-0">Offences<span
        className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;for the current case</span></h2>

      <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-offences">

        { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
          return (
            <div key={ offenceIndex + 1 } className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h3 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id={`accordion-offences-heading-${offenceIndex + 1}`}>
                    { offence.title }
                  </span>
                </h3>
              </div>
              <div id={`accordion-offences-content-${offenceIndex + 1}`} className="govuk-accordion__section-content"
                   aria-labelledby={`accordion-offences-heading-${offenceIndex + 1}`}>
                <p className="govuk-body govuk-!-margin-bottom-1">{ offence.summary }</p>
                <p className="govuk-hint govuk-!-margin-top-1 govuk-!-margin-bottom-6">{ offence.contraryToActAndSection }</p>
              </div>
            </div>
          )
        }) }

      </div>

    </Fragment>
  )
}

export default CurrentCase
