import React, { Fragment } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../../../utils/StateProvider'

function OffenderRisk () {
  const [{ currentCase }] = useStateValue()

  return (
    <Fragment>

      { !!(currentCase.defendant.risk && currentCase.defendant.risk.length) && (
        <div className="moj-identity-bar">
          <div className="moj-identity-bar__container">
            <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Registers and warnings</h2>

              <table className="govuk-table app-table app-table--split-rows">
                <thead>
                <tr>
                  <th style={ { 'width': '220px' } }>Type</th>
                  <th style={ { 'width': '130px' } }>Status</th>
                  <th>Description</th>
                  <th style={ { 'width': '130px' } }>Date</th>
                </tr>
                </thead>
                <tbody>

                { currentCase.defendant.risk.map((risk, riskIndex) => {
                  return (
                    <tr key={ riskIndex }>
                      <td>{ risk.type }</td>
                      <td><span
                        className={ `app-risk-tag app-risk-tag--${ risk.status.toLowerCase().split(' ').join('-') }` }>{ risk.status }</span>
                      </td>
                      <td>{ risk.description }</td>
                      <td>{ moment(risk.date, 'YYYY-MM-DD').format('DD/MM/YYYY') }</td>
                    </tr>
                  )
                }) }

                </tbody>
              </table>

            </div>
          </div>
        </div>
      ) }

    </Fragment>
  )
}

export default OffenderRisk
