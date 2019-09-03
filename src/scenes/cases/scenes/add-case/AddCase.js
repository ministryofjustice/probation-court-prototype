import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import Input from '../../shared-components/Input'
import DateInput from '../../shared-components/DateInput'
import PageTitle from '../../shared-components/PageTitle'

function AddCase (props) {

  const [{ currentDate, newCase }, dispatch] = useStateValue()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function updateNewCase ($form) {
    dispatch({
      type: 'newCase',
      newCase: {
        ...newCase,
        defendant: {
          forename: $form.get('forename'),
          surname: $form.get('surname'),
          pnc: $form.get('pnc'),
          crn: 'D123456',
          gender: 'M',
          current: true,
          dateOfBirth: `${ $form.get('dob-year') }-${ $form.get('dob-month') }-${ $form.get('dob-day') }`,
          address: {
            line1: '23 King Croson Street',
            line2: 'Nether Edge',
            line3: 'Sheffield',
            postcode: 'S4 1AB'
          }
        }
      }
    })
  }

  function getDobObject () {
    const dob = moment(newCase.defendant.dateOfBirth, 'YYYY-MM-DD')
    return {
      day: dob.date(),
      month: dob.month(),
      year: dob.year()
    }
  }

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

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">

            <PageTitle title="Add case" hint={ `for ${ currentDate.format('dddd Do MMMM') }` }/>

          </div>
          <div className="govuk-grid-column-two-thirds">

            <div className="app-progress-bar govuk-!-margin-top-6 govuk-!-margin-bottom-0">
              <ol className="app-progress-bar__list">

                <li className="app-progress-bar__list-item" aria-current="step">
                  <span className="app-progress-bar__icon app-progress-bar__icon--complete"/>
                  <span className="app-progress-bar__label">Defendant details</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon"/>
                  <span className="app-progress-bar__label">Match defendant</span>
                </li>

                <li className="app-progress-bar__list-item">
                  <span className="app-progress-bar__icon"/>
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

            <p className="govuk-body-l govuk-!-margin-bottom-0">Defendant details</p>

            <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-6">We will use these details to search
            against offender records in Delius.</p>

            <form name="ndForm" onSubmit={ e => {
              e.preventDefault()
              updateNewCase(new FormData(e.target))
              props.history.push('/cases/add/match')
            } }>

              <Input id="surname" label="Surname" width="20" value={ newCase.defendant.surname }/>
              <Input id="forename" label="First name" width="20" value={ newCase.defendant.forename }/>
              <DateInput id="dob" legend="Date of birth" hint="For example 23 08 1997"
                         value={ getDobObject() }/>
              <Input id="pnc" label="PNC" width="10" hint="If available" value={ newCase.defendant.pnc }/>

              <button type="submit" className="govuk-button govuk-!-margin-top-6" data-module="govuk-button">
                Search Delius records
              </button>

            </form>

          </div>
          <div className="govuk-grid-column-one-third">
            { ' ' }
          </div>
        </div>

        <Link to="/" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default AddCase
