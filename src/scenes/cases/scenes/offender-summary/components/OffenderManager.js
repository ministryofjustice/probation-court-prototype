import React, { Fragment } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../../../utils/StateProvider'

function OffenderManager () {

  const [{ currentDate }] = useStateValue()

  return (
    <Fragment>

      <h2 className="govuk-heading-m govuk-!-margin-top-6">Offender manager</h2>

      <table className="govuk-table app-table app-table--split-rows">
        <tbody>
        <tr>
          <th style={ { 'width': '30%' } }>Provider</th>
          <td>CPA Hampshire and Isle of Wight</td>
        </tr>
        <tr>
          <th>Cluster</th>
          <td>CRC SW and SC Cluster</td>
        </tr>
        <tr>
          <th>LDU and team</th>
          <td>West hub <span
            className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(West engagement)</span></td>
        </tr>
        <tr>
          <th>Officer</th>
          <td>Francis, Sarah</td>
        </tr>
        <tr>
          <th>Team Telephone</th>
          <td>Unknown</td>
        </tr>
        <tr>
          <th>Date allocated</th>
          <td>27/06/2018</td>
        </tr>
        <tr>
          <th>Reason for allocation</th>
          <td>Offender moved</td>
        </tr>
        </tbody>
      </table>

      <details className="govuk-details govuk-!-margin-bottom-2" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            Personal circumstances
          </span>
        </summary>
        <div className="govuk-details__text">

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
              <td>Accommodation</td>
              <td>Rental accommodation - private rental</td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>Employment</td>
              <td>Unemployed  <span
                className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(on benefit)</span></td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>Education attainment levels</td>
              <td>Other - No qualification</td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>RAGGING</td>
              <td>Green</td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>Benefit</td>
              <td>Jobseekers allowance</td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>Relationship</td>
              <td>Single</td>
              <td>24/07/2018</td>
            </tr>
            <tr>
              <td>Offender level recording <span
                className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(L)</span></td>
              <td>Agree offender childcare</td>
              <td>24/07/2018</td>
            </tr>
            </tbody>
          </table>

        </div>
      </details>

      <details className="govuk-details" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">
            Next appointment details
          </span>
        </summary>
        <div className="govuk-details__text">

          <table className="govuk-table app-table app-table--split-rows">
            <tbody>
            <tr>
              <th style={ { width: '30%' } }>Contact type</th>
              <td>Planned office visit <span
                className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(NS)</span></td>
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

        </div>
      </details>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

    </Fragment>
  )
}

export default OffenderManager
