import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'
import { getAge } from '../../../../utils/DateTools'

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
        $case.defendant.crn = `DX1234${ i }A`
        $case.defendant.pnc = `A123456${ i }BA`
        $case.defendant.current = i === 1
        switch (i) {
          case 0 :
            $case.defendant.address.line1 = 'No fixed abode'
            $case.defendant.address.line2 = void 0
            $case.defendant.address.line3 = void 0
            $case.defendant.address.line4 = void 0
            $case.defendant.address.line5 = void 0
            $case.defendant.address.postcode = void 0
            $case.defendant.dateOfBirth = moment($case.defendant.dateOfBirth, 'YYYY-MM-DD').subtract(1, 'years').format('YYYY-MM-DD')
            break
          case 2 :
            $case.defendant.dateOfBirth = moment($case.defendant.dateOfBirth, 'YYYY-MM-DD').add(3, 'months').format('YYYY-MM-DD')
            $case.defendant.address.line1 = '10'
            $case.defendant.address.line2 = 'King Road'
            $case.defendant.address.postcode = 'S12 5GH'
            $case.defendant.pnc = 'Not recorded'
            break
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
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Match record</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Match record <span
          className="govuk-hint moj-util-inline">in Delius</span></h1>

        <div className="hmcts-filter-layout">

          <div className="hmcts-filter-layout__filter">

            <div className="hmcts-filter">

              <div className="hmcts-filter__header">

                <div className="hmcts-filter__header-title">
                  { currentCase.defendant && (
                    <h2 className="govuk-heading-m">{ currentCase.defendant.name }</h2>
                  ) }
                </div>
              </div>

              { currentCase.defendant && (

                <div className="hmcts-filter__content">
                  <div className="hmcts-filter__selected">

                    <div className="hmcts-filter__selected-heading">

                      <table className="govuk-table moj-table">
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

                  <div className="hmcts-filter__options">

                    <div className="hmcts-search govuk-!-margin-bottom-6">

                      <form id="ndForm" onSubmit={ e => { e.preventDefault() } }>

                        <div className="govuk-form-group">
                          <label className="govuk-label hmcts-search__label govuk-label--m"
                                 htmlFor="offender-search">Record not listed?</label>

                          <span id="offender-search-hint" className="govuk-hint hmcts-search__hint">You can search for an offender record using multiple terms</span>
                          <input className="govuk-input hmcts-search__input" id="offender-search" name="offender-search"
                                 type="search"
                                 aria-describedby="offender-search-hint"/>
                        </div>

                        <button type="submit" className="govuk-button hmcts-search__button ">
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

                    <button className="govuk-button govuk-button--secondary">Offender not known</button>

                  </div>

                </div>
              ) }

            </div>

          </div>

          <div className="hmcts-filter-layout__content">

            <div className="hmcts-scrollable-pane">

              <div className="hmcts-scrollable-pane__wrapper">

                <div className="govuk-warning-text moj-warning-text moj-warning-text--critical">
                  <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                  <strong className="govuk-warning-text__text">
                    <span className="govuk-warning-text__assistive">Warning</span>
                    A positive identification was not possible due to missing data, please manually match the offender
                    record.
                  </strong>
                </div>

                { data.potentialMatches.map((offenderItem, index) => {
                  return offenderItem.defendant && (
                    <div key={ index }>
                      <div className="govuk-grid-row">
                        <div className="govuk-grid-column-full">
                          <div className="moj-!-float-left--not-narrow">

                            <img src="/assets/images/no-photo.png" width="82" height="102"
                                 alt={ `${ offenderItem.defendant.name }` }
                                 className="app-offender-image"/>
                          </div>
                          <div className="moj-!-float-left--not-narrow app-offender-selection">

                            <h1
                              className="govuk-heading-m govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ offenderItem.defendant.name }
                              { offenderItem.defendant.current && (
                                <span
                                  className="hmcts-badge hmcts-badge--green govuk-!-margin-left-4">Current offender</span>
                              ) }
                            </h1>

                            <div className="govuk-grid-row">
                              <div className="govuk-grid-column-one-quarter">

                                { offenderItem.defendant.dateOfBirth && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of birth</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ moment(offenderItem.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-quarter">

                                { offenderItem.defendant.crn && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.defendant.crn }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-quarter">

                                <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">PNC</p>
                                <p
                                  className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.defendant.pnc }</p>

                              </div>
                              <div className="govuk-grid-column-one-quarter moj-!-text-align-right">

                                <button className="govuk-button govuk-button--secondary">Match</button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <table className="govuk-table moj-table">
                        <tbody>
                        <tr>
                          <td>

                            <p className="govuk-body govuk-!-margin-top-2">
                              { offenderItem.defendant.gender }, { offenderItem.defendant.age } of { offenderItem.defendant.address.line1 } { offenderItem.defendant.address.line2 && offenderItem.defendant.address.line2 } { offenderItem.defendant.address.line3 } { offenderItem.defendant.address.postcode }
                            </p>

                          </td>
                          <td className="moj-!-text-align-right">

                            <a href={ `http://delius/offender/` }
                               className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-2"
                               onClick={ (e) => e.preventDefault() }>View Delius record</a>

                          </td>
                        </tr>
                        </tbody>
                      </table>

                      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                    </div>
                  )
                }) }

              </div>

            </div>
          </div>
        </div>

        <Link to="/" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default OffenderSelection