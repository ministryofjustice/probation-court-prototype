import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import DefendantBanner from '../../shared-components/DefendantBanner'

function CloseCase (props) {

  const [{ currentCase }] = useStateValue()
  const backLink = `/cases/details/${ props.match.params.id }`

  useEffect(() => {
    document.title = `Close case - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l">Close case</h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              <form name="ndForm">

                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset" aria-required="true">
                    <legend className="govuk-fieldset__legend">
                      <h1 className="govuk-fieldset__heading">Reason for closing this case</h1>
                    </legend>

                    <div className="govuk-radios">
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="reason-1" name="reason" type="radio"
                               value="Not guilty"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="reason-1">Defendant found not
                          guilty</label>
                      </div>
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="reason-2" name="reason" type="radio"
                               value="Case dismissed"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="reason-2">Case dismissed</label>
                      </div>
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="reason-3" name="reason" type="radio"
                               value="Otgher"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="reason-3">Other</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="additional-info">Additional information</label>
                  <textarea className="govuk-textarea govuk-!-width-three-quarters" id="additional-info"
                            name="plea-basis"
                            rows="5"/>
                </div>

                <Link to="/cases/list" type="button" className="govuk-button govuk-!-margin-right-2">Close case</Link>

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

export default CloseCase
