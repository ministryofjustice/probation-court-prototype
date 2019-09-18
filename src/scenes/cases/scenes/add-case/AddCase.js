import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'

import Input from '../../shared-components/Input'
import DateInput from '../../shared-components/DateInput'

function AddCase (props) {

  const [{ newCase }, dispatch] = useStateValue()

  useEffect(() => {
    document.title = `Add case - ${ AppTitle }`
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
          dateOfBirth: `${ $form.get('dob-year') }-${ $form.get('dob-month') }-${ $form.get('dob-day') }`,
          deliusStatus: '',
          current: true,
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
    <div className="govuk-width-container">

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

        <span className="govuk-caption-xl">Step 1 of 3</span>
        <h1 className="govuk-heading-l">Defendant details</h1>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">

            <p className="govuk-body govuk-!-margin-bottom-6">We will use these details to search
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

    </div>
  )
}

export default AddCase
