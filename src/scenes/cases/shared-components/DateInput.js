import React from 'react'

function DateInput (props) {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset" aria-describedby={ `${ props.id }-hint` } role="group">
        <legend className="govuk-fieldset__legend">
          <h1 className="govuk-fieldset__heading">{ props.legend }</h1>
        </legend>

        { !!(props.hint) && (
          <span id={ `${ props.id }-hint` } className="govuk-hint">{ props.hint }</span>
        ) }

        <div className="govuk-date-input" id={ props.id }>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={ `${ props.id }-day` }>Day</label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                     id={ `${ props.id }-day` } name={ `${ props.id }-day` } type="number" pattern="[0-9]*"
                     defaultValue={ props.value.day || '' }/>
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={ `${ props.id }-month` }>Month</label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                     id={ `${ props.id }-month` } name={ `${ props.id }-month` } type="number" pattern="[0-9]*"
                     defaultValue={ props.value.month || '' }/>
            </div>
          </div>
          <div className="govuk-date-input__item">
            <div className="govuk-form-group">
              <label className="govuk-label govuk-date-input__label" htmlFor={ `${ props.id }-year` }>Year</label>
              <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                     id={ `${ props.id }-year` } name={ `${ props.id }-year` } type="number" pattern="[0-9]*"
                     defaultValue={ props.value.year || '' }/>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default DateInput
