import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../../shared-components/PageTitle'
import { useStateValue } from '../../../../utils/StateProvider'
import moment from 'moment'

function AdjournCase (props) {

  const [{ currentDate, currentCase }] = useStateValue()
  const backLink = `/cases/details/${ props.match.params.id }`

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to={ backLink } className="govuk-breadcrumbs__link">Case
              details</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Adjourn case</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <PageTitle title="Adjourn case"/>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">

            <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">
              <strong>Defendant:</strong> { currentCase.defendant ? currentCase.defendant.name : '' }.</p>
            <p className="govuk-body govuk-!-margin-top-0"><strong>Appearing
              on:</strong> { currentDate.format('dddd D MMMM') } at { moment(currentCase.startTime, 'HH:mm:ss').format('HH:mm') } - { moment(currentCase.endTime, 'HH:mm:ss').format('HH:mm') }.
            </p>

            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

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
                          rows="5"/>
              </div>

              <button data-module="govuk-button" type="button"
                      className="govuk-button govuk-!-margin-right-2"
                      onClick={ e => e.preventDefault() }>Adjourn case
              </button>

            </form>


          </div>
          <div className="govuk-grid-column-one-third">
            { ' ' }
          </div>
        </div>

        <Link to={ backLink } className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default AdjournCase
