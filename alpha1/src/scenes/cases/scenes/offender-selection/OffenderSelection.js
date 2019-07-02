import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAge } from '../../../../utils/DateTools'

function OffenderSelection (props) {

  const [data, setData] = useState({})
  const id = props.match.params.id

  useEffect(() => {
    window.scrollTo(0, 0)
    async function getData () {
      const response = await fetch(`http://localhost:8080/api/cases/details/${ id }`)
      const data = await response.json()
      setData(data.details)
    }
    getData()
  }, [id])

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Match offender record</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Match offender record <span
          className="govuk-hint moj-util-inline">in Delius</span></h1>

        <div className="hmcts-filter-layout">

          <div className="hmcts-filter-layout__filter">

            <div className="hmcts-filter">

              <div className="hmcts-filter__header">

                <div className="hmcts-filter__header-title">
                  <h2 className="govuk-heading-m">Offender data</h2>
                </div>
              </div>

              { data.name && (

                <div className="hmcts-filter__content">
                  <div className="hmcts-filter__selected">

                    <div className="hmcts-filter__selected-heading">

                      <div className="hmcts-filter__heading-title">
                        <h2 className="govuk-heading-m">{ data.name }</h2>
                      </div>

                      <table className="govuk-table moj-table">
                        <tbody>
                        <tr>
                          <td className="govuk-body govuk-!-font-weight-bold">PNC:</td>
                          <td className="govuk-body">{ data.pnc }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Date of birth:</td>
                          <td>{ data.dateOfBirth }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Age:</td>
                          <td>{ getAge(data.dateOfBirth) }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Gender:</td>
                          <td>{ data.gender }</td>
                        </tr>
                        <tr>
                          <td className="govuk-!-font-weight-bold">Address:</td>
                          <td>

                            <p className="govuk-body govuk-!-margin-bottom-0">{ data.address.line1 }</p>
                            { data.address.line2 && (
                              <p className="govuk-body govuk-!-margin-bottom-0">{ data.address.line2 }</p>
                            ) }
                            <p className="govuk-body govuk-!-margin-bottom-0">{ data.address.city }</p>
                            <p className="govuk-body govuk-!-margin-bottom-0">{ data.address.postcode }</p>

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

                { data.status && data.status.matches.map((offenderItem, index) => {
                  return (
                    <div key={ index }>
                      <div className="govuk-grid-row">
                        <div className="govuk-grid-column-full">
                          <div className="moj-!-float-left--not-narrow">

                            <img src="/assets/images/no-photo.png" width="82" height="102"
                                 alt={ `${ offenderItem.name }` }
                                 className="app-offender-image"/>
                          </div>
                          <div className="moj-!-float-left--not-narrow app-offender-selection">

                            <h1
                              className="govuk-heading-m govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ offenderItem.name }
                              { offenderItem.current && (
                                <span
                                  className="hmcts-badge hmcts-badge--green govuk-!-margin-left-4">Current offender</span>
                              ) }
                            </h1>

                            <div className="govuk-grid-row">
                              <div className="govuk-grid-column-one-quarter">

                                { offenderItem.dateOfBirth && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of birth</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.dateOfBirth }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-quarter">

                                { offenderItem.crn && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.crn }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-quarter">

                                <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">PNC</p>
                                <p
                                  className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.pnc }</p>

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
                              { offenderItem.gender }, { getAge(offenderItem.dateOfBirth) } of { offenderItem.address.line1 } { offenderItem.address.line2 && offenderItem.address.line2 } { offenderItem.address.city } { offenderItem.address.postcode }
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