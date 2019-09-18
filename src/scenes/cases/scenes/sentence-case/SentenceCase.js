import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import DefendantBanner from '../../shared-components/DefendantBanner'

function SentenceCase (props) {

  const [{ currentCase }] = useStateValue()
  const backLink = `/cases/details/${ props.match.params.id }`

  useEffect(() => {
    document.title = `Record sentence - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l">Record sentence</h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              <form name="ndForm">

                <p className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0">Offences</p>

                <dl className="govuk-summary-list">
                  { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                    return (

                      <div key={ offenceIndex } className="govuk-summary-list__row">
                        <dd className="govuk-summary-list__value">
                          { offence.title }
                        </dd>
                        <dd className="govuk-summary-list__actions">
                          <Link to="/" className="govuk-link govuk-link--no-visited-state"
                                onClick={ e => e.preventDefault() }>
                            Remove<span className="govuk-visually-hidden"> offence.title</span>
                          </Link>
                        </dd>
                      </div>
                    )
                  }) }
                </dl>

                <div className="moj-button-action">

                  <button data-module="govuk-button" type="submit"
                          className="govuk-button govuk-button--secondary moj-add-another__add-button govuk-!-margin-bottom-4">
                    Add another offence
                  </button>

                </div>

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset" aria-required="true">
                    <legend className="govuk-fieldset__legend">
                      <h1 className="govuk-fieldset__heading">Is this a custodial sentence?</h1>
                    </legend>

                    <div className="govuk-radios govuk-radios--inline">
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="changed-name" name="changed-name" type="radio"
                               value="yes"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="changed-name">Yes</label>
                      </div>
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="changed-name-2" name="changed-name" type="radio"
                               value="no"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="changed-name-2">No</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="width-20">Sentence</label>
                  <input className="govuk-input govuk-!-width-three-quarters" id="width-20" name="width-20" type="text"
                         aria-required="true"/>
                </div>

                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="more-detail">Sentence details</label>
                  <textarea className="govuk-textarea govuk-!-width-three-quarters" id="more-detail" name="more-detail"
                            rows="5" aria-required="true"/>
                </div>

                <button data-module="govuk-button" type="button"
                        className="govuk-button govuk-!-margin-right-2"
                        onClick={ e => e.preventDefault() }>Record sentence
                </button>

              </form>

            </div>
            <div className="govuk-grid-column-one-third">
              { ' ' }
            </div>
          </div>

          <Link to={ backLink } className="govuk-back-link">Back</Link>

        </main>

      </div>

    </Fragment>
  )
}

export default SentenceCase
