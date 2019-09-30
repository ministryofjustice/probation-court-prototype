import React, { Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

function CurrentOrder () {
  return (
    <Fragment>

      <h2 className="govuk-heading-m govuk-!-margin-top-6 govuk-!-margin-bottom-2">National Standards (NS) summary</h2>

      <p className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">Current order: ORA Suspended Sentence Order (24
        months)</p>

      <table className="govuk-table app-table app-table--split-rows govuk-!-margin-top-4">
        <tbody>
        <tr>
          <th style={ { width: '30%' } }>Status</th>
          <td className="app-!-color-red govuk-!-font-weight-bold" colSpan="2">Breached</td>
        </tr>
        <tr>
          <th>Weeks</th>
          <td colSpan="2">84</td>
        </tr>
        <tr>
          <th>Next appointment</th>
          <td colSpan="2">{ moment().add(2, 'weeks').format('DD/MM/YYYY') }</td>
        </tr>
        <tr>
          <th>Last appointment</th>
          <td colSpan="2">{ moment().subtract(2, 'weeks').format('DD/MM/YYYY') }</td>
        </tr>
        <tr>
          <th>Last home visit</th>
          <td colSpan="2">None available</td>
        </tr>
        <tr>
          <th>Last OASys assessment</th>
          <td>{ moment().subtract(1, 'years').format('DD/MM/YYYY') }</td>
          <td className="app-!-text-align-right">
            <Link to="/oasys" className="govuk-link govuk-link--no-visited-state" onClick={ e => e.preventDefault() }>View</Link>
          </td>
        </tr>
        <tr>
          <th>Breaches initiated</th>
          <td colSpan="2">3</td>
        </tr>
        <tr>
          <th>Failures to comply <span
            className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">since 27/06/2018</span></th>
          <td colSpan="2">20</td>
        </tr>
        <tr>
          <th>Offered</th>
          <td colSpan="2">110</td>
        </tr>
        <tr>
          <th>Attended OK</th>
          <td colSpan="2">19</td>
        </tr>
        <tr>
          <th>Attended failed to comply</th>
          <td colSpan="2">0</td>
        </tr>
        <tr>
          <th>Failed to attend <span
            className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(AA)</span></th>
          <td colSpan="2">70</td>
        </tr>
        <tr>
          <th>Failed to attend <span
            className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">(UA)</span></th>
          <td colSpan="2">20</td>
        </tr>
        <tr>
          <th>Hours offered</th>
          <td colSpan="2">515:45</td>
        </tr>
        <tr>
          <th>Hours credited</th>
          <td colSpan="2">44:15</td>
        </tr>
        </tbody>
      </table>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

    </Fragment>
  )
}

export default CurrentOrder
