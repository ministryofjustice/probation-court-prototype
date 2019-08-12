import React, { Fragment } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../utils/StateProvider'

function DefendantDetails () {

  const [{ currentCase }] = useStateValue()

  return (
    <Fragment>

      <p className="govuk-heading-s">{ currentCase.defendant.name }</p>

      <table role="presentation">
        <tbody>
        <tr>
          <td style={ { 'width': 92 } }>
            <img src="/assets/images/no-photo.png" width="82" height="102"
                 alt={ `${ currentCase.defendant.name }` }
                 className="app-offender-image"/>
          </td>
          <td>
            <p className="govuk-body govuk-!-margin-bottom-0">
              <strong>Status:</strong> { currentCase.defendant.deliusStatus }</p>
            <p className="govuk-body govuk-!-margin-bottom-0">
              <strong>DOB:</strong> { moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }
            </p>
            <p className="govuk-body govuk-!-margin-bottom-0">
              <strong>CRN:</strong> { currentCase.defendant.deliusStatus !== 'Not known' && (
              <Fragment>X612323A</Fragment>) }</p>
            <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> 2004/123456B</p>
          </td>
        </tr>
        </tbody>
      </table>

    </Fragment>
  )
}

export default DefendantDetails