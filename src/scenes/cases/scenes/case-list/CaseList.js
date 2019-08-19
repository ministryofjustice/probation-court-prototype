import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import Pagination from '../../../../components/Pagination'
import CaseListFilter from './components/CaseListFilter'
// import config from '../../../../config';

function CaseList (props) {

  const [data, setData] = useState({})
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {

    function notInString ($title, $string) {
      return $title.toLowerCase().indexOf($string) === -1
    }

    function configureData ($data) {
      let cases = []
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
            } else if ($case.offences.some(item => { return notInString(item.title, 'speed') && notInString(item.title, 'non-payment') && notInString(item.title, 'television') })) {
              cases.push($case)
            }
          })
        })
      })
      setData({ courtName: $data.courtName, cases: cases, unmatched: unmatched })
    }

    async function getData () {
      // eslint-disable-next-line
      // let wiremockUrl = '';
      // if(process.env.NODE_ENV !== 'production') {
      //   wiremockUrl = 'http://localhost:8080/api/bigcaselist'
      // } else wiremockUrl = config.dataUrl
      const response = await fetch(config.dataUrl);
      const data = await response.json()
      configureData(data)
      dispatch({ type: 'setCourt', setCourt: data.courtName })
    }

    window.scrollTo(0, 0)
    getData()
  }, [dispatch])

  function toggleFilter () {
    const $filter = document.querySelector('.moj-filter')
    const $button = document.querySelector('#filter-button')
    if ($filter && $button) {
      $filter.classList.toggle('moj-hidden')
      const isOpen = !$filter.classList.contains('moj-hidden')
      $button.textContent = isOpen ? 'Hide filter' : 'Show filter'
      $button.setAttribute('aria-expanded', isOpen.toString())
    }
  }

  function fixNameCase ($name) {
    return $name.toLowerCase().replace('miss ', '').replace('mrs ', '').replace('mr ', '').split(' ').map(item => { return item.charAt(0).toUpperCase() + item.slice(1) }).join(' ')
  }

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <nav className="moj-sub-navigation govuk-!-margin-bottom-6" aria-label="Sub navigation">

        <p className="govuk-hint app-!-float-right govuk-!-margin-top-2">&nbsp;Last
          updated { currentDate.format('dddd, Do MMMM YYYY') } at 10:30</p>

        <ul className="moj-sub-navigation__list">

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/list/${ currentDate.format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              { currentDate.format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/list/${ moment(currentDate).add(1, 'd').format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state">
              { moment(currentDate).add(1, 'd').format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/list/${ moment(currentDate).add(2, 'd').format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state">
              { moment(currentDate).add(2, 'd').format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

        </ul>

      </nav>


      <div className="moj-filter-layout">

        <div className="moj-filter-layout__filter">
          <div className="moj-filter moj-hidden">
            <div className="moj-filter__header">

              <div className="moj-filter__header-title">
                <h2 className="govuk-heading-m app-!-color-white">Filter</h2>
              </div>

              <div className="moj-filter__header-action"/>

            </div>

            <div className="moj-filter__content">

              <CaseListFilter/>

            </div>

          </div>

        </div>

        <div className="moj-filter-layout__content">

          <table className="govuk-table app-table govuk-!-margin-bottom-2" role="presentation">
            <tbody>
            <tr>
              <td>
                <h2 className="govuk-heading-l govuk-!-margin-0">Cases<span
                  className="govuk-hint govuk-!-display-inline-block govuk-!-margin-0">&nbsp;matched to offender records in Delius</span>
                </h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') }
                  <span className="govuk-hint govuk-!-display-inline-block">&nbsp;at { data.courtName }</span>
                </p>
              </td>
              <td className="app-!-text-align-right">

                <div className="moj-action-bar">
                  <button data-module="govuk-button" id="filter-button"
                          className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0 govuk-!-margin-right-2"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                  </button>

                  <button data-module="govuk-button"
                          className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                          type="button"
                          aria-expanded="false" onClick={ e => e.preventDefault() }>Show blocks
                  </button>

                  <div className="moj-action-bar__filter"/>

                  <div className="moj-menu">
                    <div className="moj-menu__wrapper">

                      <button data-module="govuk-button" type="button"
                              className="govuk-button app-button--interrupt moj-menu__item"
                              onClick={ () => {
                                props.history.push('/cases/add')
                              } }>
                        Add case
                      </button>

                    </div>
                  </div>

                </div>

              </td>
            </tr>
            </tbody>
          </table>

          <div className="moj-scrollable-pane">

            <div className="moj-scrollable-pane__wrapper govuk-!-margin-top-0">

              { data.unmatched && data.unmatched.length && (
                <div className="app-warning-text app-warning-text--interrupt govuk-!-margin-bottom-4">
                  <p className="govuk-body app-!-float-right govuk-!-margin-0">
                    <Link className="govuk-link govuk-link--no-visited-state" to="/cases/unmatched-list">Match offender
                      records</Link>
                  </p>
                  <p className="govuk-body govuk-!-font-weight-bold govuk-!-margin-0">There
                    are { data.unmatched.length } cases that have not been matched to Delius records</p>
                </div>
              ) }

              <table className="govuk-table app-table app-table--split-rows app-alternate-rows-table">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" style={ { 'width': '40%' } }>Offence</th>
                  <th scope="col">Delius record</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sitting</th>
                  <th scope="col">Court</th>
                </tr>
                </thead>
                <tbody>

                { data.cases && data.cases.map(($case, caseIndex) => {
                  return (
                    caseIndex < 15 && (
                      <tr key={ caseIndex }>
                        <th scope="row"><Link
                          to={ `/cases/details/${ $case.id }` }
                          onClick={ () => {
                            dispatch({ type: 'setCase', setCase: $case })
                          } }
                          className="govuk-link govuk-link--no-visited-state">{ $case.defendant.name }</Link>
                        </th>
                        <td>
                          { $case.offences.length > 1 ? (
                            <ol className="govuk-list govuk-!-margin-left-4">
                              { $case.offences.map((offence, offenceIndex) => {
                                return <li key={ offenceIndex }
                                           className="govuk-list--number app-offence-title">{ offence.title }</li>
                              }) }
                            </ol>
                          ) : (
                            <p className="govuk-body govuk-!-margin-bottom-2">{ $case.offences[0].title }</p>
                          ) }
                        </td>
                        <td>
                          { $case.defendant.breachedConditions && (
                            <div
                              className="moj-badge moj-badge--grey govuk-!-display-block govuk-!-margin-bottom-1">Breach</div>
                          ) }

                          { $case.defendant.ssoAlert && (
                            <div
                              className="moj-badge moj-badge--grey govuk-!-display-block govuk-!-margin-bottom-1">SSO</div>
                          ) }

                          { $case.defendant.deliusStatus }
                          { $case.defendant.assignment && (
                            <span
                              className="govuk-hint govuk-!-margin-0 govuk-!-display-inline-block">&nbsp;({ $case.defendant.assignment })</span>
                          ) }
                        </td>
                        <td>{ $case.listingNumber === '2st' ? '2nd' : $case.listingNumber } listing</td>
                        <td>{ moment($case.startTime, 'HH:mm:ss').format('HH:mm') } - { moment($case.endTime, 'HH:mm:ss').format('HH:mm') }</td>
                        <td>{ $case.courtRoom }</td>
                      </tr>
                    )
                  )
                }) }

                </tbody>
              </table>

            </div>

          </div>

          <Pagination/>

        </div>
      </div>

    </main>
  )
}

export default CaseList
