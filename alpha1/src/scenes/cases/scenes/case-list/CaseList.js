import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import Pagination from '../../../../components/Pagination'
import CaseListFilter from './components/CaseListFilter'

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
              noMatch: $case.offences.some($offence => { return !notInString($offence.title, 'emergency worker') })
            }

            $case.defendant = { ...$case.defendant, name: fixNameCase($case.defendant.name) }

            if ($case.noMatch) {
              unmatched.push($case)
            } else if ($case.offences.some(item => { return notInString(item.title, 'speed') && notInString(item.title, 'non-payment') && notInString(item.title, 'television') })) {
              cases.push($case)
              console.info($case)
            }
          })
        })
      })
      setData({ courtName: $data.courtName, cases: cases, unmatched: unmatched })
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

      <nav className="moj-sub-navigation" aria-label="Sub navigation">

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

      { data.unmatched && data.unmatched.length && (
        <Fragment>

          <div className="govuk-warning-text app-warning-text app-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There are 3 cases that have not been matched to
              offender records in Delius.</strong>
          </div>

          <div className="moj-identity-bar app-identity-bar-warning govuk-!-margin-bottom-6">
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

      <div className="moj-filter-layout">

        <div className="moj-filter-layout__filter">
          <div className="moj-filter moj-hidden">
            <div className="moj-filter__header">

              <div className="moj-filter__header-title">
                <h2 className="govuk-heading-m">Filter</h2>
              </div>

              <div className="moj-filter__header-action" />

            </div>

            <div className="moj-filter__content">

              <CaseListFilter/>

            </div>

          </div>

        </div>

        <div className="moj-filter-layout__content">

          <table className="govuk-table app-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <h2 className="govuk-heading-l govuk-!-margin-0">Cases</h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') }
                  <span className="govuk-hint app-!-inline">&nbsp;at { data.courtName }</span>
                </p>
              </td>
              <td className="app-!-text-align-right">

                <div className="moj-action-bar">
                  <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                  </button>

                  <div className="moj-action-bar__filter"/>

                  <div className="moj-menu">
                    <div className="moj-menu__wrapper">

                      <button id="filter-button" className="govuk-button app-button--interrupt moj-menu__item"
                              type="button">Search
                      </button>

                      <button type="submit" className="govuk-button app-button--interrupt moj-menu__item"
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
                          { $case.defendant.deliusStatus }
                          { $case.defendant.assignment && (
                            <span className="govuk-hint app-!-inline">&nbsp;({ $case.defendant.assignment })</span>
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