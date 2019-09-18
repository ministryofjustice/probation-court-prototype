import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import OffenderRisk from './components/OffenderRisk'
import OffenderEvents from './components/OffenderEvents'
import OffenderDetails from './components/OffenderDetails'
import DefendantBanner from '../../shared-components/DefendantBanner'

function OffenderSummary (props) {

  const [{ currentDate, currentCase }] = useStateValue()

  useEffect(() => {
    document.title = `Offender record - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase } id={ props.match.params.id } showCaseLink={ true }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l">Offender record</h1>

          { currentCase && currentCase.defendant && (
            <Fragment>
              <OffenderRisk/>
              <OffenderEvents/>
              <OffenderDetails/>

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Notes</h2>

              { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                <Fragment>
                  <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd Do MMMM ') }</p>
                  <p className="govuk-body">Laboris sunt officia ex quis laboris sit exercitation et. Occaecat
                    nulla tempor laborum adipisicing reprehenderit sint cupidatat dolor nulla proident est non
                    ipsum.</p>
                </Fragment>
              ) }

              <p className="govuk-body">
                <Link to="/" className="govuk-link govuk-link--no-visited-state">Add note</Link>
              </p>
            </Fragment>
          ) }

        </main>

      </div>

    </Fragment>
  )
}

export default OffenderSummary
