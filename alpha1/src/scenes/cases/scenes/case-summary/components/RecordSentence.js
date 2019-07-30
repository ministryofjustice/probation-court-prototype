import React from 'react'

function RecordSentence (props) {
  return (
    <div className="moj-identity-bar app-identity-bar--warning govuk-!-margin-bottom-4 govuk-!-padding-top-0">

      <div className="moj-filter__header app-filter__header--light-blue">
        <div className="moj-filter__header-title"><h2 className="govuk-heading-m">Record sentence</h2></div>
      </div>

      <div className="moj-identity-bar__container govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-4">

        <form name="ndForm">

          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
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
            <input className="govuk-input govuk-!-width-three-quarters" id="width-20" name="width-20" type="text"/>
          </div>

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="more-detail">Sentence details</label>
            <textarea className="govuk-textarea govuk-!-width-three-quarters" id="more-detail" name="more-detail"
                      rows="5"/>
          </div>

          <div className="app-!-text-align-right">
            <button data-module="govuk-button" type="button"
                    className="govuk-button app-button--interrupt govuk-!-margin-right-2"
                    onClick={ props.hideUI }>Record sentence
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

export default RecordSentence