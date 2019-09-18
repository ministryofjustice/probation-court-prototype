import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'
import { getAge } from '../../../../utils/DateTools'
import OffenderMatch from '../../shared-components/OffenderMatch'
import DefendantBanner from '../../shared-components/DefendantBanner'
import { AppTitle } from '../../../../utils/Title'

function OffenderSelection (props) {

  const [{ currentCase }] = useStateValue()
  const [data, setState] = useState({ potentialMatches: [] })

  useEffect(() => {
    document.title = `Match with offender record - ${ AppTitle }`
    window.scrollTo(0, 0)

    // Create some potential matches from the current defendant data
    let potentialMatches = []
    for (let i = 0, len = 3, $case; i < len; i++) {
      $case = JSON.parse(JSON.stringify(currentCase))
      if ($case.hasOwnProperty('defendant')) {
        $case.defendant.forename = $case.defendant.name.substr(0, $case.defendant.name.indexOf(' '))
        $case.defendant.surname = $case.defendant.name.substr($case.defendant.name.indexOf(' ') + 1)
        $case.defendant.crn = `DX1234${ i }A`
        $case.defendant.pnc = `A123456${ i }BA`
        $case.defendant.current = i === 1
        switch (i) {
          case 0 :
            $case.defendant.address.line1 = 'No fixed abode'
            $case.defendant.address.line2 = void 0
            $case.defendant.address.line3 = void 0
            $case.defendant.address.postcode = void 0
            $case.defendant.dateOfBirth = moment($case.defendant.dateOfBirth, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM-DD')
            break
          case 2 :
            $case.defendant.dateOfBirth = moment($case.defendant.dateOfBirth, 'YYYY-MM-DD').add(3, 'months').format('YYYY-MM-DD')
            $case.defendant.address.line1 = '10'
            $case.defendant.address.line2 = 'King Road'
            $case.defendant.address.line3 = 'Southey'
            $case.defendant.address.postcode = 'S12 5GH'
            $case.defendant.pnc = 'Not recorded'
            break
          default:

        }
        $case.defendant.age = getAge($case.defendant.dateOfBirth)
        potentialMatches.push($case)
      }
    }
    setState({ potentialMatches: potentialMatches })
  }, [currentCase])

  return (
    <Fragment>

      { currentCase && currentCase.defendant && (
        <DefendantBanner case={ currentCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l">Match with offender record</h1>

          <div
            className="govuk-warning-text app-warning-text app-warning-text--interrupt govuk-!-margin-bottom-4">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text">
              <span className="govuk-warning-text__assistive">Warning</span>
              A positive identification was not possible due to missing data, please manually match the offender
              record.
            </strong>
          </div>

          { data.potentialMatches.map((offenderItem, index) => {
            return offenderItem.defendant && (
              <Fragment key={ index }>

                <OffenderMatch case={ offenderItem } id={ props.match.params.id } action={ () => {} }/>

              </Fragment>
            )
          }) }

          <Link to="/cases/list" className="govuk-back-link">Back</Link>

        </main>

      </div>

    </Fragment>
  )
}

export default OffenderSelection
