import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import currentCourtList from '../../assets/dummy-data'

function OffenderSelection (props) {

  const offenderData = currentCourtList[props.match.params.id]

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/" className="govuk-breadcrumbs__link">Court list</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Match offender record</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Match offender record</h1>

        <div className="hmcts-filter-layout">

          <div className="hmcts-filter-layout__filter">

            <div className="hmcts-filter">

              <div className="hmcts-filter__header">

                <div className="hmcts-filter__header-title">
                  <h2 className="govuk-heading-m">Offender data</h2>
                </div>
              </div>

              <div className="hmcts-filter__content">

                <div className="hmcts-filter__selected">

                  <div className="hmcts-filter__selected-heading">

                    <div className="hmcts-filter__heading-title">
                      <h2 className="govuk-heading-m">{ offenderData.name }</h2>
                    </div>

                    <p className="govuk-body"><strong>DOB:</strong> { offenderData.dateOfBirth }</p>

                  </div>

                </div>

                <div className="hmcts-filter__options">

                  <div className="hmcts-search govuk-!-margin-bottom-6">

                    <form id="ndForm" onSubmit={ (event) => { event.preventDefault() } }>

                      <div className="govuk-form-group">
                        <label className="govuk-label hmcts-search__label govuk-label--m"
                               htmlFor="offender-search">Search</label>

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

                  <h2 className="govuk-heading-m">Offender not known</h2>

                  <p className="govuk-body">If you have determined that the offender is, in fact not currently known you
                    can
                    create a new offender record.</p>

                  <button className="govuk-button govuk-button--secondary">Create offender record</button>

                </div>

              </div>

            </div>

          </div>

          <div className="hmcts-filter-layout__content">

            <div className="hmcts-action-bar">

              <div className="hmcts-action-bar__filter">&nbsp;</div>

              <div className="hmcts-menu">
                <div className="hmcts-menu__wrapper">

                  Menu stuff

                </div>
              </div>

            </div>

            <div className="hmcts-scrollable-pane">

              <div className="hmcts-scrollable-pane__wrapper">

                { offenderData.status.matches.map((offenderItem, index) => {
                  return (
                    <div key={ index }>
                      <div className="govuk-grid-row">
                        <div className="govuk-grid-column-full">
                          <div className="moj-!-float-left--not-narrow">

                            <img src="/assets/images/no-photo.png" width="82" height="102"
                                 alt={ `${ offenderItem.name }` }
                                 className="app-offender-image"/>
                          </div>
                          <div className="moj-!-float-left--not-narrow app-offender-header">

                            <h1
                              className="govuk-heading-m govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ offenderItem.name }</h1>

                            <div className="govuk-grid-row">
                              <div className="govuk-grid-column-one-third">

                                { offenderItem.dateOfBirth && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of birth</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.dateOfBirth }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-third">

                                { offenderItem.crn && (
                                  <Fragment>
                                    <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
                                    <p
                                      className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ offenderItem.crn }</p>
                                  </Fragment>
                                ) }

                              </div>
                              <div className="govuk-grid-column-one-third">

                                <button className="govuk-button govuk-button--secondary">Confirm match</button>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

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