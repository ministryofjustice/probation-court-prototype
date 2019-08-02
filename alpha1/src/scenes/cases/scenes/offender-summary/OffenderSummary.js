import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStateValue } from '../../../../utils/StateProvider'
import OffenderRisk from './components/OffenderRisk'
import DefendantDetails from '../../shared-components/DefendantDetails'
import OffenderEvents from './components/OffenderEvents'
import SomethingWrong from '../../shared-components/SomethingWrong'
import OffenderDetails from './components/OffenderDetails'

function OffenderSummary (props) {

  const [{ court, currentDate, currentCase }] = useStateValue()

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
            <Link to={ `/cases/details/${ props.match.params.id }` } className="govuk-breadcrumbs__link">Case
              details</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">
            Offender summary
          </li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l govuk-!-margin-0">Offender summary<span
          className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;from Delius record</span></h1>
        <p className="govuk-body-m govuk-!-font-weight-bold">Appearing
          on { currentDate.format('dddd, Do MMMM YYYY') }<span
            className="govuk-hint govuk-!-display-inline-block">&nbsp;at { court }</span></p>

        { currentCase && currentCase.defendant && (
          <div className="moj-filter-layout">
            <div className="moj-filter-layout__filter">
              <div className="moj-filter">

                <div className="moj-filter__header">
                  <div className="moj-filter__header-title">
                    <h2 className="govuk-heading-m app-!-color-white">Offender details</h2>
                  </div>
                </div>

                <div className="moj-filter__content">

                  <div className="moj-filter__selected">

                    <div className="moj-filter__selected-heading">

                      <DefendantDetails/>

                    </div>
                  </div>

                  <div className="moj-filter__options">

                    <h2 className="govuk-heading-m">Contact details</h2>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Main address</h3>

                    <p className="govuk-body">{ currentCase.defendant.address.line1 }<br/>
                      { currentCase.defendant.address.line2 && (
                        <Fragment>{ currentCase.defendant.address.line2 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.line3 && (
                        <Fragment>{ currentCase.defendant.address.line3 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.line4 && (
                        <Fragment>{ currentCase.defendant.address.line4 }<br/></Fragment>
                      ) }
                      { currentCase.defendant.address.postcode }</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Telephone</h3>

                    <p className="govuk-body">01967 458 260</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Mobile</h3>

                    <p className="govuk-body">07765 765 432</p>

                    <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Email</h3>

                    <p className="govuk-body"><a href={ `/contact/${ props.match.params.id }` }
                                                 className="govuk-link govuk-link--no-visited-state"
                                                 onClick={ e => e.preventDefault() }>user-123456@some-host.com</a>
                    </p>

                    <button data-module="govuk-button"
                            className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0">
                      Edit contact details
                    </button>

                    <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                    { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                      <Fragment>

                        <h2 className="govuk-heading-m">Current order</h2>

                        <p className="govuk-body">155 days community service</p>

                        <h2 className="govuk-heading-s govuk-!-margin-bottom-0">Intervention details<span
                          className="govuk-hint govuk-!-display-inline-block">&nbsp;(active)</span></h2>

                        <p className="govuk-body govuk-!-margin-bottom-0">ES - RAR Programme</p>
                        <p className="govuk-body govuk-!-margin-bottom-0">One to one</p>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    { currentCase.defendant.deliusStatus === 'Current' && (
                      <Fragment>

                        <h2 className="govuk-heading-m">Offender manager</h2>

                        <p className="govuk-body">Sarah Francis<span className="govuk-hint govuk-!-margin-top-0">Allocated on 01/06/2019</span>
                        </p>

                        <p className="govuk-body">{ currentCase.defendant.nps ? 'NPS' : 'CRC' } South Yorkshire<br/>
                          12 Holme Road<br/>
                          Sheffield<br/>
                          South Yorkshire<br/>
                          S7 2TT</p>

                        <p className="govuk-body">
                          Telephone: 0114 276 0760
                        </p>

                        <p className="govuk-body">
                          <a href="/contact" className="govuk-link govuklink--no-visited-state govuk-!-margin-bottom-0"
                             onClick={ e => e.preventDefault() }>Contact offender manager</a>
                        </p>

                        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      </Fragment>
                    ) }

                    <SomethingWrong/>

                  </div>
                </div>

              </div>
            </div>

            <div className="moj-filter-layout__content">

              <OffenderRisk/>
              <OffenderEvents/>
              <OffenderDetails/>

              <h2 className="govuk-heading-m govuk-!-margin-top-2">Notes</h2>

              { !!(currentCase.defendant.deliusStatus === 'Current' && currentCase.defendant.assignment === 'nps') && (
                <Fragment>
                  <p className="govuk-hint">Paul Johnson, SPO. { currentDate.format('dddd, Do MMMM YYYY ') }</p>
                  <p className="govuk-body">Laboris sunt officia ex quis laboris sit exercitation et. Occaecat
                    nulla tempor laborum adipisicing reprehenderit sint cupidatat dolor nulla proident est non
                    ipsum.</p>
                </Fragment>
              ) }

              <button data-module="govuk-button" className="govuk-button govuk-button--secondary">Add note</button>

            </div>
          </div>
        ) }

        <Link to={ `/cases/details/${ props.match.params.id }` } className="govuk-back-link">Back</Link>

        <Link to="#top" className="govuk-link govuk-link--no-visited-state app-back-to-top__link" onClick={ e => {
          e.preventDefault()
          window.scrollTo(0, 0)
        } }>
          <svg role="presentation" focusable="false" className="app-back-to-top__icon"
               xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17">
            <path fill="currentColor" d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"/>
          </svg>
          Back to top
        </Link>

      </main>

    </Fragment>
  )
}

export default OffenderSummary
