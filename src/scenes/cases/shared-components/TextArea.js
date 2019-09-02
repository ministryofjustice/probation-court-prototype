import React from 'react'

function TextArea (props) {
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={ props.id }>{ props.label }</label>
      { !!(props.hint) && (
        <span id={ `${ props.id }-hint` } className="govuk-hint">{ props.hint }</span>
      ) }
      <textarea className="govuk-textarea" id={ props.id } name={ props.id } rows="5"
                aria-describedby={ `${ props.id }-hint` }>
        { props.value || '' }
      </textarea>
    </div>
  )
}

export default TextArea
