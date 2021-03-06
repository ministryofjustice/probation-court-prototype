import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import { AppTitle } from '../../../../utils/Title'
import { initialState } from '../../context/CaseContext'
import Input from '../../shared-components/Input'
import TextArea from '../../shared-components/TextArea'
import DateInput from '../../shared-components/DateInput'
import DefendantBanner from '../../shared-components/DefendantBanner'

function AddCaseDetails (props) {

  // eslint-disable-next-line
  const [{ newCase }, dispatch] = useStateValue()

  useEffect(() => {
    document.title = `Case details - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  function resetState () {
    dispatch({
      type: 'newCase',
      newCase: {
        ...initialState.newCase
      }
    })
  }

  return (
    <Fragment>

      { newCase && newCase.defendant && (
        <DefendantBanner case={ newCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <span className="govuk-caption-xl">Step 3 of 3</span>
          <h1 className="govuk-heading-l">Case details</h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">

              <form name="ndForm" onSubmit={ e => {
                e.preventDefault()
                resetState()
                props.history.push('/cases/add/finished')
              } }>

                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend">
                      <h1 className="govuk-fieldset__heading">
                        Does this case include an associated CPS pack?
                      </h1>
                    </legend>
                    <div className="govuk-radios govuk-radios--inline">
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="changed-name" name="changed-name" type="radio"
                               value="yes"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="changed-name">
                          Yes
                        </label>
                      </div>
                      <div className="govuk-radios__item">
                        <input className="govuk-radios__input" id="changed-name-2" name="changed-name" type="radio"
                               value="no"/>
                        <label className="govuk-label govuk-radios__label" htmlFor="changed-name-2">
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <Input id="court" label="Appearing in court" width="4"/>

                <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                <p className="govuk-caption-xl govuk-!-margin-bottom-4">Offences</p>

                <Input id="offence" label="Offence"/>

                <Input id="contrary" label="Contrary to"/>

                <TextArea id="summary" label="Offence summary"/>

                <DateInput id="offenceDate" legend="Date of the offence"
                           hint={ `For example ${ moment().subtract(1, 'days').format('DD MM YYYY') }` } value={ {
                  day: '',
                  month: '',
                  year: ''
                } }/>

                <div>
                  <button type="button" className="govuk-button govuk-button--secondary" data-module="govuk-button">
                    Add another offence
                  </button>
                </div>

                <button type="submit" className="govuk-button govuk-!-margin-top-6" data-module="govuk-button">
                  Submit new case
                </button>

              </form>

            </div>
            <div className="govuk-grid-column-one-third">
              { ' ' }
            </div>
          </div>

          <Link to="/cases/add/match" className="govuk-back-link">Back</Link>

        </main>

      </div>

    </Fragment>
  )
}

export default AddCaseDetails
