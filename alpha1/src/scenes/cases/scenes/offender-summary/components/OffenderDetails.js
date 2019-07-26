import React, { Fragment } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../../../utils/StateProvider'

function OffenderDetails () {

  const [{ currentDate, currentCase }] = useStateValue()

  return (
    <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

      <h2 className="govuk-heading-m govuk-!-margin-top-6">Offender details</h2>

      <table className="govuk-table app-table app-table--split-rows">
        <tbody>
        <tr>
          <th style={ { 'width': '30%' } }>Aliases</th>
          <td>Yes <span className="govuk-hint govuk-!-display-inline-block">(10)</span></td>
          <td style={ { 'width': '100px' } }>
            <a className="govuk-link govuk-link--no-visited-state" href="/"
               onClick={ e => {e.preventDefault()} }>View</a></td>
        </tr>
        <tr>
          <th>Gender</th>
          <td colSpan="2">{ currentCase.defendant.gender === 'M' ? 'Male' : 'Female' }</td>
        </tr>
        <tr>
          <th>NI Number</th>
          <td colSpan="2">JB 89 64 94 B</td>
        </tr>
        <tr>
          <th>Nationality</th>
          <td colSpan="2">British</td>
        </tr>
        <tr>
          <th>Ethnicity</th>
          <td colSpan="2">Unknown</td>
        </tr>
        <tr>
          <th>Interpreter required</th>
          <td colSpan="2">Yes</td>
        </tr>
        <tr>
          <th>Disability status</th>
          <td colSpan="2">No disabilities recorded</td>
        </tr>
        </tbody>
      </table>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <h2 className="govuk-heading-m">Personal circumstances</h2>

      <table className="govuk-table app-table app-table--split-rows">
        <thead>
        <tr>
          <th style={ { width: '30%' } }>Type</th>
          <th>Sub type</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Offender level recording <span className="govuk-hint govuk-!-display-inline-block">(L)</span></td>
          <td>Agree offender childcare</td>
          <td>24/07/2018</td>
        </tr>
        </tbody>
      </table>

      { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
        <Fragment>

          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

          <h2 className="govuk-heading-m">Next appointment details</h2>

          <table className="govuk-table app-table app-table--split-rows">
            <tbody>
            <tr>
              <th style={ { width: '30%' } }>Contact type</th>
              <td>Planned office visit <span className="govuk-hint govuk-!-display-inline-block">(NS)</span></td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{ moment(currentDate).add(1, 'weeks').format('DD/MM/YYYY') }</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>14:00</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>Location 1</td>
            </tr>
            <tr>
              <th>Provider</th>
              <td>ZZ Bast Public Provider 1</td>
            </tr>
            <tr>
              <th>Team</th>
              <td>Team 1</td>
            </tr>
            <tr>
              <th>Officer</th>
              <td>Francis, Sarah</td>
            </tr>
            </tbody>
          </table>

        </Fragment>
      ) }

    </div>
  )
}

export default OffenderDetails