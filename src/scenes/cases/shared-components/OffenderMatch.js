import React, { Fragment } from 'react'
import moment from 'moment'

function OffenderMatch (props) {

  const newCase = props.case

  if (!newCase) {
    return (<Fragment />)
  }

  return (
    <Fragment>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <div className="govuk-!-margin-top-6">
        <div className="app-!-float-left--not-narrow">

          <img src="/assets/images/no-photo.png" className="app-offender-image"
               alt={ `${ newCase.defendant.surname }, ${ newCase.defendant.forename }` }/>
        </div>
        <div className="app-!-float-left--not-narrow app-offender-selection">

          <h1
            className="govuk-heading-m govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ `${ newCase.defendant.surname }, ${ newCase.defendant.forename }` }
            { newCase.defendant.current && (
              <span
                className="moj-badge moj-badge--green govuk-!-margin-left-4">Current offender</span>
            ) }
          </h1>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">

              <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of
                birth</p>
              <p
                className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ moment(newCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }</p>

            </div>
            <div className="govuk-grid-column-one-quarter">

              <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
              <p className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ newCase.defendant.crn }</p>

            </div>
            <div className="govuk-grid-column-one-quarter">

              <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">PNC</p>
              <p
                className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ newCase.defendant.pnc || 'Not available' }</p>

            </div>
            <div className="govuk-grid-column-one-quarter app-!-text-align-right">

              <button data-module="govuk-button" className="govuk-button app-button--interrupt" onClick={ () => {
                props.action()
              }}>Confirm match
              </button>

            </div>
          </div>
        </div>
      </div>

      <table className="govuk-table app-table">
        <tbody>
        <tr>
          <td>

            <p className="govuk-body govuk-!-margin-top-2">
              { newCase.defendant.gender }, { moment().diff(newCase.defendant.dateOfBirth, 'years') } of { newCase.defendant.address.line1 }, { newCase.defendant.address.line2 && newCase.defendant.address.line2 }, { newCase.defendant.address.line3 }. { newCase.defendant.address.postcode }
            </p>

          </td>
          <td className="app-!-text-align-right">

            <a href={ `http://delius/offender/` }
               className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-2"
               onClick={ (e) => e.preventDefault() }>View offender summary</a>

          </td>
        </tr>
        </tbody>
      </table>

    </Fragment>
  )
}

export default OffenderMatch
