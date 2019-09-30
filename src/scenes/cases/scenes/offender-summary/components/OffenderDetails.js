import React, { Fragment } from 'react'

import { useStateValue } from '../../../../../utils/StateProvider'

function OffenderDetails () {

  const [{ currentCase }] = useStateValue()

  return (
    <Fragment>

      <h2 className="govuk-heading-m govuk-!-margin-top-6">Offender details</h2>

      <table className="govuk-table app-table app-table--split-rows">
        <tbody>
        <tr>
          <th style={ { 'width': '30%' } }>Aliases</th>
          <td>Yes <span className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(10)</span></td>
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

      <details className="govuk-details" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            Contact details
          </span>
        </summary>
        <div className="govuk-details__text">

          <table className="govuk-table app-table app-table--split-rows">
            <tbody>
            <tr>
              <th style={ { 'width': '30%' } }>Telephone</th>
              <td>01967 458 260</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>wallace.pearson@stralum.biz</td>
            </tr>
            <tr>
              <th>Mobile</th>
              <td>07839 469 354</td>
            </tr>
            <tr>
              <th>Main address</th>
              <td> 78<br/> Lincoln Avenue<br/> Sheffield<br/> South Yorkshire<br/> S7 8IU</td>
            </tr>
            </tbody>
          </table>

        </div>
      </details>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

    </Fragment>
  )
}

export default OffenderDetails