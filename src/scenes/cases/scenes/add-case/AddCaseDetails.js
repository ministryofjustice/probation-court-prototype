import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../../shared-components/PageTitle'
import Input from '../../shared-components/Input'
import TextArea from '../../shared-components/TextArea'

function AddCaseDetails (props) {

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
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/add/match" className="govuk-breadcrumbs__link">Match defendant</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Case details</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <PageTitle title="Case details"/>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">

            <form name="ndForm" onSubmit={ e => {
              e.preventDefault()
              props.history.push('/cases/list')
            } }>

              <Input id="offence" label="Offence"/>

              <Input id="contrary" label="Contrary to"/>

              <TextArea id="summary" label="Offence summary"/>

              <div>
                <button type="button" className="govuk-button govuk-button--secondary" data-module="govuk-button">
                  Add another offence
                </button>
              </div>

              <button type="submit" className="govuk-button govuk-!-margin-top-6" data-module="govuk-button">
                Submit new case
              </button>

            </form>

          </div>
          <div className="govuk-grid-column-one-third">
            { ' ' }
          </div>
        </div>

        <Link to="/cases/add/match" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default AddCaseDetails
