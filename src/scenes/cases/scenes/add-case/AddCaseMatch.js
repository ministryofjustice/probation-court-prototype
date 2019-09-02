import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'

import PageTitle from '../../shared-components/PageTitle'
import OffenderMatch from '../../shared-components/OffenderMatch'

function AddCaseMatch (props) {

  const [{ newCase }] = useStateValue()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/add" className="govuk-breadcrumbs__link">Add case</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Match defendant</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <PageTitle title="Match defendant" hint="with an offender record in Delius"/>

        <p className="govuk-body-l govuk-!-margin-bottom-0">1 results found in Delius</p>

        <OffenderMatch case={ newCase } action={ () => {
          props.history.push('/cases/add/details')
        } }/>

        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

        <h2 className="govuk-heading-m">Not known offender?</h2>
        <p className="govuk-body">If the offender is not known to probation and therefore has no matching record in
          Delius; you can continue and create a new offender record.</p>

        <div>
          <button className="govuk-button govuk-button--secondary" onClick={ () => {
            props.history.push('/cases/add/details')
          } }>This is a new offender
          </button>
        </div>

        <Link to="/cases/add" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default AddCaseMatch
