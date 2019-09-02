import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import config from '../../../../config'
import { useStateValue } from '../../../../utils/StateProvider'

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

    async function getData () {
      const response = await fetch(process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api/bigcaselist' : config.dataUrl)
      const data = await response.json()
      configureData(data)
      dispatch({ type: 'setCourt', setCourt: data.courtName })
    }

    window.scrollTo(0, 0)
    getData()
  }, [dispatch])

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Unmatched cases</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h2 className="govuk-heading-l govuk-!-margin-0">Match cases<span
          className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;to offender records in Delius</span>
        </h2>
        <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd Do MMMM') }
          <span className="govuk-hint govuk-!-display-inline-block">&nbsp;at { data.courtName }</span></p>

        { data.unmatched && data.unmatched.length && (
          <Fragment>

            <p className="govuk-body govuk-!-margin-0">The below defendants have not been successfully matched with offender records in
              Delius.</p>

            <p className="govuk-body">Please action each to find the correct offender record within Delius or to confirm that
              the defendant is not currently known to Probation.</p>

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

          </Fragment>
        ) }

      </main>
    </Fragment>
  )
}

export default MatchCaseList
