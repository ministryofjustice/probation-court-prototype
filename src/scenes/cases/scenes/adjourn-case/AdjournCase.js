import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import DefendantBanner from '../../shared-components/DefendantBanner'

function AdjournCase (props) {

  const [{ currentCase }] = useStateValue()
  const backLink = `/cases/details/${ props.match.params.id }`

  useEffect(() => {
    document.title = `Adjourn case - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l">Adjourn case</h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              <form name="ndForm">

                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="adjournReason">
                    Adjournment reason
                  </label>
                  <input className="govuk-input govuk-!-width-three-quarters" id="adjournReason" name="width-20" type="text"
                         aria-required="true"/>
                </div>

                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset" role="group">
                    <legend className="govuk-fieldset__legend">
                      <h1 className="govuk-fieldset__heading">Adjourned until</h1>
                    </legend>
                    <span id="passport-issued-hint"
                          className="govuk-hint">For example, { moment().add(1, 'days').format('DD MM YYYY') }</span>
                    <div className="govuk-date-input" id="passport-issued">
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="passport-issued-day">
                            Day
                          </label>
                          <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                 id="passport-issued-day" name="passport-issued-day" type="number" pattern="[0-9]*"
                                 aria-required="true"/>
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="passport-issued-month">
                            Month
                          </label>
                          <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                 id="passport-issued-month" name="passport-issued-month" type="number" pattern="[0-9]*"
                                 aria-required="true"/>
                        </div>
                      </div>
                      <div className="govuk-date-input__item">
                        <div className="govuk-form-group">
                          <label className="govuk-label govuk-date-input__label" htmlFor="passport-issued-year">
                            Year
                          </label>
                          <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                                 id="passport-issued-year" name="passport-issued-year" type="number" pattern="[0-9]*"
                                 aria-required="true"/>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="govuk-form-group">
                  <label className="govuk-label" htmlFor="plea-basis">Plea basis</label>
                  <textarea className="govuk-textarea govuk-!-width-three-quarters" id="plea-basis" name="plea-basis"
                            rows="5"/>
                </div>

                <Link to="/cases/list" type="button" className="govuk-button govuk-!-margin-right-2">Adjourn case</Link>

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

export default AdjournCase
