import React from 'react'

function Input (props) {
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={ props.id }>
        { props.label }
      </label>
      { !!(props.hint) && (
        <span id="defendant-pnc-hint" className="govuk-hint">{ props.hint }</span>
      ) }
      <input className={ `govuk-input${ props.width ? ' govuk-input--width-' + props.width : '' }` } type="text"
             id={ props.id } name={ props.id } defaultValue={ props.value || '' }/>
    </div>
  )
}

export default Input
