import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../utils/StateProvider'

function DefendantBanner (props) {

  const currentCase = props.case
  const [{ currentDate }] = useStateValue()

  return (
    <section className="key-details-bar" role="contentinfo" aria-label="Key details">
      <dl className="key-details-bar__key-details">
        <div className="key-details-bar__top-block">

          <dt className="govuk-visually-hidden">Name:</dt>
          <dd className="key-details-bar__name">{ currentCase.defendant.name || `${ currentCase.defendant.forename } ${ currentCase.defendant.surname }` }</dd>

          { !!currentCase.courtRoom && (
            <dd className="key-details-bar__nino">Appearing in Court
              Room { currentCase.courtRoom }, { currentDate.format('dddd D MMMM') }, { moment(currentCase.startTime, 'HH:mm:ss').format('HH:mm') } to { moment(currentCase.endTime, 'HH:mm:ss').format('HH:mm') }</dd>
          ) }

          { currentCase.defendant.deliusStatus && (
            <Fragment>
              <dt className="govuk-visually-hidden">Status from nDelius:</dt>
              <dd className="key-details-bar__status">{ currentCase.defendant.deliusStatus } offender</dd>
            </Fragment>
          ) }

          { !!((currentCase.defendant.risk && currentCase.defendant.risk.length) || currentCase.defendant.breachedConditions) && (
            <Fragment>
              { currentCase.defendant.risk.map((risk, riskIndex) => {
                return (
                  <Fragment key={ riskIndex }>
                    { risk.type === 'RoSH' && (
                      <Fragment>
                        <dt className="govuk-visually-hidden">Status from nDelius:</dt>
                        <dd className="key-details-bar__status govuk-!-margin-right-2">{ risk.status.charAt(0).toUpperCase() + risk.status.slice(1) } Risk
                          of Serious Harm</dd>
                      </Fragment>
                    ) }
                  </Fragment>
                )
              }) }
            </Fragment>
          ) }

        </div>
        <div className="key-details-bar__bottom-block">

          <dt>Date of birth:</dt>
          <dd>{ moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }</dd>

          { !!props.showRecordLink && currentCase.defendant.deliusStatus !== 'Not known' && (
            <p className="govuk-body govuk-!-margin-0 app-!-float-right">
              <Link to={ `/cases/offender/${ props.id }` }
                    className="govuk-link govuk-link--no-visited-state govuk-link--text-colour">View offender
                record</Link>
            </p>
          ) }

          { !!props.showCaseLink && (
            <p className="govuk-body govuk-!-margin-0 app-!-float-right">
              <Link to={ `/cases/details/${ props.id }` }
                    className="govuk-link govuk-link--no-visited-state govuk-link--text-colour">View case details</Link>
            </p>
          ) }

        </div>
      </dl>
    </section>
  )
}

export default DefendantBanner
