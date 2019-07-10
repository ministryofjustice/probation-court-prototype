import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../../utils/StateProvider'

function NewCase () {

  const [{ currentDate }] = useStateValue()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Add case</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Add case <span
          className="govuk-hint moj-util-inline">for { currentDate.format('dddd, Do MMMM YYYY') }</span></h1>

        <div className="hmcts-filter-layout">

          <div className="hmcts-filter-layout__filter">

            <div className="hmcts-filter">

              <div className="hmcts-filter__header">

                <div className="hmcts-filter__header-title">
                  <h2 className="govuk-heading-m">Defendant details</h2>
                </div>
              </div>

              <div className="hmcts-filter__content">
                <div className="hmcts-filter__selected">

                  <div className="hmcts-filter__selected-heading">

                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="name">PNC</label>
                      <input className="govuk-input" id="name" name="name" type="text"/>
                    </div>

                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="name">Forename</label>
                      <input className="govuk-input" id="name" name="name" type="text"/>
                    </div>

                    <div className="govuk-form-group">
                      <label className="govuk-label" htmlFor="surname">Surname</label>
                      <input className="govuk-input" id="surname" name="surname" type="text"/>
                    </div>

                    <div className="govuk-form-group">
                      <fieldset className="govuk-fieldset" aria-describedby="dob-hint" role="group">
                        <legend className="govuk-fieldset__legend">Date of birth</legend>
                        <span id="dob-hint" className="govuk-hint">For example, 12 11 1997</span>
                        <div className="govuk-date-input" id="dob">
                          <div className="govuk-date-input__item">
                            <div className="govuk-form-group">
                              <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
                                Day
                              </label>
                              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                     id="dob-day" name="dob-day" type="number"
                                     pattern="[0-9]*"/>
                            </div>
                          </div>
                          <div className="govuk-date-input__item">
                            <div className="govuk-form-group">
                              <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
                                Month
                              </label>
                              <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                     id="dob-month" name="dob-month" type="number"
                                     pattern="[0-9]*"/>
                            </div>
                          </div>
                          <div className="govuk-date-input__item">
                            <div className="govuk-form-group">
                              <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
                                Year
                              </label>
                              <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                                     id="dob-year" name="dob-year" type="number"
                                     pattern="[0-9]*"/>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>

                  </div>
                </div>

                <div className="hmcts-filter__options">

                  <h2 className="govuk-heading-m">Offender not known?</h2>

                  <p className="govuk-body">Confirm that you have determined that the offender is not currently known
                    to
                    probation.</p>

                  <button className="govuk-button govuk-button--secondary">Offender not known</button>

                </div>

              </div>

            </div>

          </div>

          <div className="hmcts-filter-layout__content">

            <div className="hmcts-scrollable-pane">

              <div className="hmcts-scrollable-pane__wrapper">

                <div className="govuk-warning-text moj-warning-text moj-warning-text--interrupt">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    As you enter details, potential matches with Delius records will be displayed here.
                  </strong>
                </div>

              </div>

            </div>
          </div>
        </div>

        <Link to="/" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default NewCase