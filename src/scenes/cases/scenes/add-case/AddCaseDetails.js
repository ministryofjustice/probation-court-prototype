import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'

import PageTitle from '../../shared-components/PageTitle'
import Input from '../../shared-components/Input'
import TextArea from '../../shared-components/TextArea'
import { initialState } from '../../context/CaseContext'
import DateInput from '../../shared-components/DateInput'
import moment from 'moment'

function AddCaseDetails (props) {

  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {
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

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/add" className="govuk-breadcrumbs__link">Add case</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/add/match" className="govuk-breadcrumbs__link">Match defendant</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Case details</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">

            <PageTitle title="Add case" hint={ `for ${ currentDate.format('dddd Do MMMM') }` }/>

          </div>
          <div className="govuk-grid-column-two-thirds">

            <div className="app-progress-bar govuk-!-margin-top-6 govuk-!-margin-bottom-0">
              <ol className="app-progress-bar__list">

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Defendant details</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Match defendant</span>
                </li>

                <li className="app-progress-bar__list-item" aria-current="step">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Case details</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon"/>
                  <span className="app-progress-bar__label">Finished</span>
                </li>

              </ol>
            </div>

          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">

            <p className="govuk-body-l govuk-!-margin-bottom-6">Case details</p>

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

    </Fragment>
  )
}

export default AddCaseDetails
