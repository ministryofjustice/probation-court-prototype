import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import OffenderMatch from '../../shared-components/OffenderMatch'
import DefendantBanner from '../../shared-components/DefendantBanner'

function AddCaseMatch (props) {

  const [{ newCase }, dispatch] = useStateValue()

  useEffect(() => {
    document.title = `Match defendant - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [])

  function updateNewCase () {
    dispatch({
      type: 'newCase',
      newCase: {
        ...newCase,
        defendant: {
          ...newCase.defendant,
          deliusStatus: 'Current'
        }
      }
    })
  }

  return (
    <Fragment>

      { newCase && newCase.defendant && (
        <DefendantBanner case={ newCase }/>
      ) }

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <span className="govuk-caption-xl">Step 2 of 3</span>
          <h1 className="govuk-heading-l">
            Match defendant
          </h1>

          <p className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0">1 results found in Delius</p>

          <OffenderMatch case={ newCase } action={ () => {
            updateNewCase()
            props.history.push('/cases/add/details')
          } }/>

          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

          <h2 className="govuk-heading-m">Not known offender?</h2>
          <p className="govuk-body">If the offender is not known to probation and therefore has no matching record in
            Delius; you can continue and create a new offender record.</p>

          <p className="govuk-body">
            <Link to="/" className="govuk-link  govuk-link--no-visited-state govuk-!-margin-bottom-0"
                  onClick={ e => e.preventDefault() }>This is
              a new offender</Link>
          </p>

          <Link to="/cases/add" className="govuk-back-link">Back</Link>

        </main>

      </div>

    </Fragment>
  )
}

export default AddCaseMatch
