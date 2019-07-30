import React from 'react'
import moment from 'moment'

function AdjournCase (props) {
  return (
    <div className="moj-identity-bar app-identity-bar--warning govuk-!-margin-bottom-4 govuk-!-padding-top-0">

      <div className="moj-filter__header app-filter__header--light-blue">
        <div className="moj-filter__header-title"><h2 className="govuk-heading-m">Adjourn case</h2></div>
      </div>

      <div className="moj-identity-bar__container govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-4">

        <form name="ndForm">

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="width-20">
              Adjournment reason
            </label>
            <input className="govuk-input govuk-!-width-three-quarters" id="width-20" name="width-20" type="text"/>
          </div>

          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset" aria-describedby="passport-issued-hint" role="group">
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
                           id="passport-issued-day" name="passport-issued-day" type="number" pattern="[0-9]*"/>
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label className="govuk-label govuk-date-input__label" htmlFor="passport-issued-month">
                      Month
                    </label>
                    <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                           id="passport-issued-month" name="passport-issued-month" type="number" pattern="[0-9]*"/>
                  </div>
                </div>
                <div className="govuk-date-input__item">
                  <div className="govuk-form-group">
                    <label className="govuk-label govuk-date-input__label" htmlFor="passport-issued-year">
                      Year
                    </label>
                    <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                           id="passport-issued-year" name="passport-issued-year" type="number" pattern="[0-9]*"/>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="plea-basis">Plea basis</label>
            <textarea className="govuk-textarea govuk-!-width-three-quarters" id="plea-basis" name="plea-basis"
                      rows="5" />
          </div>

          <div className="app-!-text-align-right">
            <button data-module="govuk-button" type="button"
                    className="govuk-button app-button--interrupt govuk-!-margin-right-2"
                    onClick={ props.hideUI }>Adjourn case
            </button>
            <button data-module="govuk-button" type="button" className="govuk-button govuk-button--warning"
                    onClick={ props.hideUI }>Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default AdjournCase