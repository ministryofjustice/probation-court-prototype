import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'
import { getAge } from '../../../../utils/DateTools'
import OffenderMatch from '../../shared-components/OffenderMatch'

function OffenderSelection () {

  const [{ currentCase }] = useStateValue()
  const [data, setState] = useState({ potentialMatches: [] })

  useEffect(() => {
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

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/unmatched-list" className="govuk-breadcrumbs__link">Unmatched cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Match record</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Match record <span
          className="govuk-hint govuk-!-display-inline-block">in Delius</span></h1>

        <div className="moj-filter-layout">

          <div className="moj-filter-layout__filter">

            <div className="moj-filter">

              <div className="moj-filter__header">

                <div className="moj-filter__header-title">
                  <h2 className="govuk-heading-m app-!-color-white">Defendant details</h2>
                </div>
              </div>

              { currentCase.defendant && (

                <div className="moj-filter__content">
                  <div className="moj-filter__selected">

                    <div className="moj-filter__selected-heading">

                      { currentCase.defendant && (
                        <p className="govuk-heading-s">{ currentCase.defendant.name }</p>
                      ) }

                      <table className="govuk-table app-table app-table__50-50">
                        <tbody>
                        <tr>
                          <td className="govuk-body govuk-!-font-weight-bold">PNC:</td>
                          <td className="govuk-body">{ data.pnc }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Date of birth:</td>
                          <td>{ moment(currentCase.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Age:</td>
                          <td>{ currentCase.defendant.age }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Gender:</td>
                          <td>{ currentCase.defendant.gender === 'M' ? 'Male' : 'Female' }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Address:</td>
                          <td>

                            <p
                              className="govuk-body govuk-!-margin-bottom-0">{ currentCase.defendant.address.line1 }</p>
                            { currentCase.defendant.address.line2 && (
                              <p
                                className="govuk-body govuk-!-margin-bottom-0">{ currentCase.defendant.address.line2 }</p>
                            ) }
                            { currentCase.defendant.address.line3 && (
                              <p
                                className="govuk-body govuk-!-margin-bottom-0">{ currentCase.defendant.address.line3 }</p>
                            ) }
                            { currentCase.defendant.address.line4 && (
                              <p
                                className="govuk-body govuk-!-margin-bottom-0">{ currentCase.defendant.address.line4 }</p>
                            ) }
                            <p
                              className="govuk-body govuk-!-margin-bottom-0">{ currentCase.defendant.address.postcode }</p>

                          </td>
                        </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>

                  <div className="moj-filter__options">

                    <div className="moj-search govuk-!-margin-bottom-6">

                      <form id="ndForm" onSubmit={ e => { e.preventDefault() } }>

                        <div className="govuk-form-group">
                          <label className="govuk-label moj-search__label govuk-label--m"
                                 htmlFor="offender-search">Record not listed?</label>

                          <span id="offender-search-hint" className="govuk-hint moj-search__hint">You can search for an offender record using multiple terms</span>
                          <input className="govuk-input moj-search__input" id="offender-search" name="offender-search"
                                 type="search"
                                 aria-describedby="offender-search-hint"/>
                        </div>

                        <button data-module="govuk-button" type="submit" className="govuk-button moj-search__button ">
                          Search
                        </button>

                      </form>

                    </div>

                    <hr
                      className="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-0"/>

                    <h2 className="govuk-heading-m">Offender not known?</h2>

                    <p className="govuk-body">Confirm that you have determined that the offender is not currently known
                      to
                      probation.</p>

                    <button
                      className="govuk-button govuk-button--secondary govuk-!-width-full govuk-!-margin-bottom-0">Offender
                      not known
                    </button>

                  </div>

                </div>
              ) }

            </div>

          </div>

          <div className="moj-filter-layout__content">

            <div className="moj-scrollable-pane">

              <div className="moj-scrollable-pane__wrapper">

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

                      <OffenderMatch case={ offenderItem } action={ () => {} } />

                    </Fragment>
                  )
                }) }

              </div>

            </div>
          </div>
        </div>

        <Link to="/cases/list" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default OffenderSelection