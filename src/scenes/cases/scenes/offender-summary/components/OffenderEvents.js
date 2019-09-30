import React, { Fragment } from 'react'

function OffenderEvents () {

  return (
    <Fragment>

      <h2 className="govuk-heading-m govuk-!-margin-top-2">Events <span
        className="govuk-hint govuk-!-display-inline-block govuk-!-margin-top-0">(5)</span></h2>

      <p className="govuk-heading-s govuk-!-margin-bottom-1">
        <a className="govuk-link govuk-link--no-visited-state" href="/delius/events/1"
           onClick={ e => {e.preventDefault()} }>ORA Suspended Sentence Order (24 months)</a>
      </p>

      <table className="govuk-table app-table govuk-!-margin-top-0">
        <tbody>
        <tr>
          <td>Common assault and battery - 10501</td>
          <td style={ { 'width': '125px' } }>27/06/2018</td>
          <td style={ { 'width': '125px' } } className="app-!-color-red govuk-!-font-weight-bold">Breached</td>
        </tr>
        </tbody>
      </table>

      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible"/>

      <p className="govuk-heading-s govuk-!-margin-bottom-1">
        <a className="govuk-link govuk-link--no-visited-state" href="/delius/events/2"
           onClick={ e => {e.preventDefault()} }>CJA Community Order (12 months)</a>
      </p>

      <table className="govuk-table app-table govuk-!-margin-top-0">
        <tbody>
        <tr>
          <td>Assault by beating - CJ88116</td>
          <td style={ { 'width': '125px' } }>18/02/2017</td>
          <td style={ { 'width': '125px' } } className="app-!-color-red">Terminated</td>
        </tr>
        </tbody>
      </table>

      <p className="govuk-body app-!-text-align-center">
        <a className="govuk-link govuk-link--no-visited-state" href="?expand"
           onClick={ e => e.preventDefault() }><em className="app-icon-down"/> Show more <em
          className="app-icon-down"/></a>
      </p>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

    </Fragment>
  )
}

export default OffenderEvents
