import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import { configureCaseData, getCaseData } from '../../../../utils/DataService'

function TodayDashboard () {

  const [data, setData] = useState({})
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {

    window.scrollTo(0, 0)

    getCaseData().then($data => {
      setData(configureCaseData($data))
    })

  }, [dispatch])

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <h1
        className="govuk-heading-l govuk-!-margin-top-6 govuk-!-margin-bottom-1">Today, { currentDate.format('dddd Do MMMM') }
        <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ `at ${ data.courtName }` }</span>
      </h1>

      <div className="govuk-grid-row app-!-display-flex">
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card app-card__primary">
            <h2 className="govuk-heading-xl app-!-color-white govuk-!-margin-bottom-4">42
              <span
                className="govuk-hint govuk-!-font-weight-bold app-!-color-white govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled to appear in court.</span>
            </h2>
            <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">12</span> Defendants
              current to
              Probation.</p>
            <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">24</span> Defendants
              known to
              Probation.</p>
            <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">6</span> Defendants
              not known to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-top-4"><a
              className="govuk-link govuk-link--no-visited-state app-!-color-white app-dashboard-count" href="/"
              onClick={ e => e.preventDefault() }>View
              case list</a></p>
          </div>

        </div>
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card app-card__secondary">
            <h2 className="govuk-heading-xl app-!-color-white govuk-!-margin-bottom-4">3
              <span
                className="govuk-hint govuk-!-font-weight-bold app-!-color-white govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;of those cases require attention.</span>
            </h2>

            <table role="presentation" className="govuk-!-width-full">
              <tbody>
              <tr>
                <td>
                  <p className="govuk-body app-!-color-white govuk-!-margin-0"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">1</span> Offender
                    Manager
                    updates outstanding.</p>
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
                    className="govuk-body-l govuk-!-font-weight-bold app-!-color-white app-dashboard-count">2</span> Callout
                    logs required
                    from the police for DV cases.</p>
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

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <h1
        className="govuk-heading-m govuk-!-margin-bottom-1">{ moment(currentDate).add(1, 'days').format('dddd Do MMMM') }
        <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ `at ${ data.courtName }` }</span>
      </h1>

      <div className="govuk-grid-row app-!-display-flex">
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4">49
              <span
                className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled to appear in court.</span>
            </h2>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">15</span> Defendants current to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">29</span> Defendants known to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">3</span> Defendants not known to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-top-4"><a className="govuk-link govuk-link--no-visited-state"
                                                              href="/" onClick={ e => e.preventDefault() }>View case
              list</a></p>
          </div>

        </div>
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card app-card__secondary app-card--muted">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4">15
              <span
                className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;of those cases require attention.</span>
            </h2>

            <table role="presentation" className="govuk-!-width-full">
              <tbody>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0 app-!-color-red"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-!-color-red app-dashboard-count">2</span> Defendants
                    not matched to offender
                    records.</p>
                </td>
                <td className="app-!-text-align-right">
                  <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                href="/" onClick={ e => e.preventDefault() }>Match
                    records</a></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">2</span> Cases missing aCPS
                    pack.</p>
                </td>
                <td className="app-!-text-align-right">
                  <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                href="/" onClick={ e => e.preventDefault() }>Request CPS
                    packs</a></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">4</span> Offender Manager
                    updates outstanding.</p>
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
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">7</span> Callout logs required
                    from the police for
                    DV cases.</p>
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

      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

      <h1
        className="govuk-heading-m govuk-!-margin-bottom-1">{ moment(currentDate).add(2, 'days').format('dddd Do MMMM') }
        <span className="govuk-hint govuk-!-display-inline-block">&nbsp;{ `at ${ data.courtName }` }</span>
      </h1>

      <div className="govuk-grid-row app-!-display-flex govuk-!-margin-bottom-8">
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4">53
              <span
                className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;Cases scheduled to appear in court.</span>
            </h2>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">22</span> Defendants current to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">19</span> Defendants known to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-0"><span
              className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">8</span> Defendants not known to
              Probation.</p>
            <p className="govuk-body govuk-!-margin-top-4"><a className="govuk-link govuk-link--no-visited-state"
                                                              href="/" onClick={ e => e.preventDefault() }>View case
              list</a></p>
          </div>

        </div>
        <div className="govuk-grid-column-one-half app-!-display-flex--1">

          <div className="app-card app-card__secondary app-card--muted">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-4">24
              <span
                className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 govuk-!-display-inline-block">&nbsp;of those cases require attention.</span>
            </h2>

            <table role="presentation" className="govuk-!-width-full">
              <tbody>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0 app-!-color-red"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-!-color-red app-dashboard-count">4</span> Defendants
                    not matched to offender
                    records.</p>
                </td>
                <td className="app-!-text-align-right">
                  <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                href="/" onClick={ e => e.preventDefault() }>Match
                    records</a></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">1</span> Cases missing aCPS
                    pack.</p>
                </td>
                <td className="app-!-text-align-right">
                  <p className="govuk-body govuk-!-margin-0"><a className="govuk-link govuk-link--no-visited-state"
                                                                href="/" onClick={ e => e.preventDefault() }>Request CPS
                    packs</a></p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="govuk-body govuk-!-margin-0"><span
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">9</span> Offender Manager
                    updates outstanding.</p>
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
                    className="govuk-body-l govuk-!-font-weight-bold app-dashboard-count">10</span> Callout logs
                    required from the police
                    for DV cases.</p>
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

    </main>
  )
}

export default TodayDashboard