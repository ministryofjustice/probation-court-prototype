import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'

import { configureCaseData, getCaseData } from '../../../../utils/DataService'
import PageTitle from '../../../cases/shared-components/PageTitle'

function TodayDashboard () {

  const [data, setData] = useState({})
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {

    document.title = `Dashboard - ${ AppTitle }`
    window.scrollTo(0, 0)

    getCaseData().then($data => {
      setData(configureCaseData($data))
    })

  }, [dispatch])

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <section>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">

            <PageTitle title={ currentDate.format('dddd D MMMM') } hint={ `at ${ data.courtName }` }/>

          </div>
          <div className="govuk-grid-column-one-half app-!-text-align-right">

            <p className="govuk-body govuk-!-margin-top-6">
              <Link to="/cases/list"
                    className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-0 govuk-!-margin-bottom-4">View
                case list</Link>
            </p>

          </div>
        </div>

        <div className="govuk-grid-row app-!-display-flex govuk-!-margin-top-2">
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card app-card__primary">

              <h2 className="govuk-heading-xl app-!-color-white govuk-!-margin-bottom-4">42
                <span
                  className="govuk-hint govuk-!-font-weight-bold app-!-color-white govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled</span>
              </h2>

              <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">12</span> Defendants
                current to Probation</p>
              <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">24</span> Defendants
                previously known to Probation</p>
              <p className="govuk-body app-!-color-white govuk-!-margin-top-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">6</span> Defendants
                not known to Probation</p>
            </div>

          </div>
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card app-card__secondary">
              <h2 className="govuk-heading-xl app-!-color-white govuk-!-margin-bottom-4">3
                <span
                  className="govuk-hint govuk-!-font-weight-bold app-!-color-white govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases need attention</span>
              </h2>

              <table role="presentation" className="govuk-!-width-full">
                <tbody>
                <tr>
                  <td>
                    <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">1</span> Offender
                      Manager
                      updates outstanding</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a
                      className="govuk-link govuk-link--no-visited-state app-!-color-white" href="/"
                      onClick={ e => e.preventDefault() }>Request updates</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">2</span> Police
                      callout logs needed (for DV cases)</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a
                      className="govuk-link govuk-link--no-visited-state app-!-color-white" href="/"
                      onClick={ e => e.preventDefault() }>Request logs</a></p>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>

        <div className="moj-banner govuk-!-margin-top-4">

        <span className="govuk-body app-!-float-right">
          <Link to="/cases/yesterday" className="govuk-link govuk-link--no-visited-state"
                onClick={ e => e.preventDefault() }>View cases from yesterday</Link>
        </span>

          <svg className="moj-banner__icon" fill="currentColor" role="presentation" focusable="false"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25">
            <path d="M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8
C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"/>
          </svg>

          <div className="moj-banner__message">
            <h2 className="govuk-heading-m">There are 4 cases from yesterday that require action</h2>
          </div>

        </div>

        {
          /*
          <div className="app-card app-card__secondary app-card--muted govuk-!-margin-top-4">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4">2
              <span
                className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases from yesterday remain open.</span>
            </h2>
          </div>
           */
        }

      </section>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <section>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">

            <h1
              className="govuk-heading-m govuk-!-margin-bottom-1">{ moment(currentDate).add(1, 'days').format('dddd D MMMM') }
              <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ `at ${ data.courtName }` }</span>
            </h1>

          </div>
          <div className="govuk-grid-column-one-half app-!-text-align-right">

            <p className="govuk-body">
              <Link to="/cases/list"
                    className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-0 govuk-!-margin-bottom-4">View
                case list</Link>
            </p>

          </div>
        </div>

        <div className="govuk-grid-row app-!-display-flex">
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card">

              <h2 className="govuk-heading-xl govuk-!-margin-bottom-4">49
                <span
                  className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled</span>
              </h2>

              <p className="govuk-body govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">15</span> Defendants current to
                Probation</p>
              <p className="govuk-body govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">29</span> Defendants previously
                known to Probation</p>
              <p className="govuk-body govuk-!-margin-top-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">3</span> Defendants not known to
                Probation</p>

            </div>

          </div>
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card app-card__secondary app-card--muted">
              <h2 className="govuk-heading-l govuk-!-margin-bottom-4">15
                <span
                  className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases need attention</span>
              </h2>

              <table role="presentation" className="govuk-!-width-full">
                <tbody>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0 app-!-color-red govuk-!-font-weight-bold"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-!-color-red app-dashboard-count">2</span> Defendants
                      not matched to nDelius offender
                      records</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><Link className="govuk-link govuk-link--no-visited-state"
                                                                     to="/cases/unmatched-list">Match
                      records</Link></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">2</span> Cases missing aCPS
                      pack</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                  href="/" onClick={ e => e.preventDefault() }>Request
                      CPS
                      packs</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">4</span> Offender Manager
                      updates outstanding</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0">
                      <a className="govuk-link govuk-link--no-visited-state" href="/"
                         onClick={ e => e.preventDefault() }>Request
                        updates</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-top-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">7</span> Police callout
                      logs needed (for DV cases)</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                  href="/" onClick={ e => e.preventDefault() }>Request
                      logs</a></p>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>

      </section>

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <section>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">

            <h1
              className="govuk-heading-m govuk-!-margin-bottom-1">{ moment(currentDate).add(2, 'days').format('dddd D MMMM') }
              <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ `at ${ data.courtName }` }</span>
            </h1>

          </div>
          <div className="govuk-grid-column-one-half app-!-text-align-right">

            <p className="govuk-body">
              <Link to="/cases/list"
                    className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-0 govuk-!-margin-bottom-4">View
                case list</Link>
            </p>

          </div>
        </div>

        <div className="govuk-grid-row app-!-display-flex govuk-!-margin-bottom-8">
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card">

              <h2 className="govuk-heading-xl govuk-!-margin-bottom-4">53
                <span
                  className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled</span>
              </h2>

              <p className="govuk-body govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">22</span> Defendants current to
                Probation</p>
              <p className="govuk-body govuk-!-margin-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">19</span> Defendants previously
                known to Probation</p>
              <p className="govuk-body govuk-!-margin-top-0"><span
                className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">8</span> Defendants not known to
                Probation</p>

            </div>
          </div>
          <div className="govuk-grid-column-one-half app-!-display-flex--1">

            <div className="app-card app-card__secondary app-card--muted">
              <h2 className="govuk-heading-l govuk-!-margin-bottom-4">24
                <span
                  className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases need attention</span>
              </h2>

              <table role="presentation" className="govuk-!-width-full">
                <tbody>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0 app-!-color-red govuk-!-font-weight-bold"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-!-color-red app-dashboard-count">4</span> Defendants
                      not matched to nDelius offender
                      records</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><Link className="govuk-link govuk-link--no-visited-state"
                                                                     to="/cases/unmatched-list">Match
                      records</Link></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">1</span> Cases missing aCPS
                      pack</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                  href="/" onClick={ e => e.preventDefault() }>Request
                      CPS
                      packs</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">9</span> Offender Manager
                      updates outstanding</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                  href="/" onClick={ e => e.preventDefault() }>Request
                      updates</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="govuk-body govuk-!-margin-0"><span
                      className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">10</span> Police callout
                      logs needed (for DV cases)</p>
                  </td>
                  <td className="app-!-text-align-right">
                    <p className="govuk-body govuk-!-margin-top-0"><a
                      className="govuk-link govuk-link--no-visited-state"
                      href="/" onClick={ e => e.preventDefault() }>Request
                      logs</a></p>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>

      </section>

    </main>
  )
}

export default TodayDashboard
