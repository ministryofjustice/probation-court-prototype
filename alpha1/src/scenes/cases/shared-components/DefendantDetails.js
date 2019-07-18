import React, { Fragment } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../utils/StateProvider'

function DefendantDetails () {

  const [{ currentCase }] = useStateValue()

  return (
    <Fragment>

      <div
        className={ `moj-badge moj-badge ${ currentCase.defendant.deliusStatus === 'Current' ? 'moj-badge-error' : currentCase.defendant.deliusStatus === 'Known' ? 'moj-badge-known' : '' } govuk-!-margin-bottom-4 app-full-width` }>{ currentCase.defendant.deliusStatus } offender
      </div>

      <div className="app-!-float-left">
        <img src="/assets/images/no-photo.png" width="82" height="102"
             alt={ `${ currentCase.defendant.name }` }
             className="app-offender-image"/>
      </div>
      <div className="app-!-float-left">

        <p className="govuk-body govuk-!-margin-bottom-0">
          <strong>DOB:</strong> { moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }
        </p>
        <p className="govuk-body govuk-!-margin-bottom-0"><strong>CRN:</strong> X612323A</p>
        <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> 2004/123456B</p>
        <p className="govuk-body govuk-!-margin-bottom-0"><strong>Court store:</strong> { currentCase.caseNumber }</p>

      </div>

    </Fragment>
  )
}

export default DefendantDetails