import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AppTitle } from '../../../../utils/Title'
import { useStateValue } from '../../../../utils/StateProvider'
import { getCaseData } from '../../../../utils/DataService'

function MatchCaseList () {

  const [data, setData] = useState({ courtName: '', unmatched: [] })
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {

    function fixNameCase ($name) {
      return $name.toLowerCase().replace('miss ', '').replace('mrs ', '').replace('mr ', '').split(' ').map(item => { return item.charAt(0).toUpperCase() + item.slice(1) }).join(' ')
    }

    function configureData ($data) {
      let unmatched = []
      $data.sessions.forEach($session => {
        $session.blocks.forEach($block => {
          $block.cases.forEach($case => {

            $case = {
              ...$case,
              courtRoom: parseInt($session.courtRoom, 10),
              startTime: $block.startTime,
              endTime: $block.endTime,
              noMatch: $case.defendant.deliusStatus === 'NO_MATCH'
            }

            $case.defendant = { ...$case.defendant, name: fixNameCase($case.defendant.name) }

            if ($case.noMatch) {
              unmatched.push($case)
            }
          })
        })
      })
      setData({ courtName: $data.courtName, unmatched: unmatched })
    }

    getCaseData().then($data => {
      configureData($data)
      dispatch({ type: 'setCourt', setCourt: $data.courtName })
    })

    document.title = `Unmatched cases - ${ AppTitle }`
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <Fragment>

      <div className="govuk-width-container">

        <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-padding-top-6">

          <h1 className="govuk-heading-l govuk-!-margin-0">Unmatched cases</h1>
          <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd D MMMM') }
            <span className="govuk-hint govuk-!-display-inline-block">&nbsp;at { data.courtName }</span></p>

          { data.unmatched && data.unmatched.length && (
            <Fragment>

              <p className="govuk-body govuk-!-margin-top-0">Select a name to find possible matching records in
                nDelius</p>

              <table className="govuk-table app-table app-table--split-rows govuk-!-margin-bottom-0">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Sitting</th>
                  <th scope="col">Court</th>
                </tr>
                </thead>
                <tbody>

                { data.unmatched && data.unmatched.map(($case, index) => {
                  return (
                    <tr key={ index }>
                      <th scope="row"><Link
                        to={ `/cases/match/${ $case.id }` }
                        onClick={ () => {
                          dispatch({ type: 'setCase', setCase: $case })
                        } }
                        className="govuk-link govuk-link--no-visited-state">{ $case.defendant.name }</Link>
                      </th>
                      <td>
                        <ol className="govuk-list">
                          { $case.offences.map((offence, offenceIndex) => {
                            return <li key={ offenceIndex }
                                       className="govuk-list--number app-offence-title">{ offence.title }</li>
                          }) }
                        </ol>
                      </td>
                      <td>{ moment($case.startTime, 'HH:mm:ss').format('HH:mm') } to { moment($case.endTime, 'HH:mm:ss').format('HH:mm') }</td>
                      <td>{ $case.courtRoom }</td>
                    </tr>
                  )
                }) }

                </tbody>
              </table>

            </Fragment>
          ) }

        </main>
      </div>
    </Fragment>
  )
}

export default MatchCaseList
