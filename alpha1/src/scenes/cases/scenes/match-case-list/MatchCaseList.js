import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

function MatchCaseList() {

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

    async function getData () {
      const response = await fetch('http://localhost:8080/api/bigcaselist')
      const data = await response.json()
      configureData(data)
      dispatch({ type: 'setCourt', setCourt: data.courtName })
    }

    window.scrollTo(0, 0)
    getData()
  }, [dispatch])

  return (
    <Fragment>
      { data.unmatched && data.unmatched.length && (
        <Fragment>

          <div className="govuk-warning-text app-warning-text app-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There are 3 cases that have not been matched to
              offender records in Delius.</strong>
          </div>

          <div className="moj-identity-bar app-identity-bar--warning govuk-!-margin-bottom-6">
            <div className="moj-identity-bar__container">
              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <table className="govuk-table app-table app-table--split-rows govuk-!-margin-bottom-0">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Offence</th>
                    <th scope="col">Delius record</th>
                    <th scope="col">Status</th>
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
                        <td>Not identified</td>
                        <td>{ $case.listingNumber === '2st' ? '2nd' : $case.listingNumber } listing</td>
                        <td>{ moment($case.startTime, 'HH:mm:ss').format('HH:mm') } - { moment($case.endTime, 'HH:mm:ss').format('HH:mm') }</td>
                        <td>{ $case.courtRoom }</td>
                      </tr>
                    )
                  }) }

                  </tbody>
                </table>
              </div>

              <p className="govuk-body app-!-text-align-center">
                <a className="govuk-link govuk-link--no-visited-state" href="?expand"
                   onClick={ e => e.preventDefault() }><em className="app-icon-down"/> Show more <em
                  className="app-icon-down"/></a>
              </p>

            </div>
          </div>
        </Fragment>
      ) }
    </Fragment>
  )
}

export default MatchCaseList
