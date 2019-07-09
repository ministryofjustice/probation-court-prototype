import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { useStateValue } from '../../../../utils/StateProvider'

import Pagination from '../../../../components/Pagination'
import CaseListFilter from './components/CaseListFilter'

function CaseList () {

  const [data, setData] = useState({})
  const [{ currentDate }, dispatch] = useStateValue()

  useEffect(() => {
    async function getData () {
      const response = await fetch('http://localhost:8080/api/bigcaselist')
      const data = await response.json()
      configureData(data)
      dispatch({ type: 'setCourt', setCourt: data.courtName })
    }

    window.scrollTo(0, 0)
    getData()
  }, [dispatch])

  function configureData ($data) {
    let cases = []
    $data.sessions.forEach($session => {
      $session.blocks.forEach($block => {
        $block.cases.forEach($case => {
          let hasOrder = $case.offences.filter($offence => { return $offence.title.indexOf('order') !== -1 || $offence.title.indexOf('Assault') !== -1 }).length
          $case.defendant.deliusStatus = hasOrder ? 'Current' : 'Known'
          $case.defendant.nps = $case.defendant.deliusStatus === 'Current' && $case.offences.filter($offence => { return $offence.title.indexOf('Assault') !== -1 }).length
          $case.courtRoom = parseInt($session.courtRoom, 10)
          $case.startTime = $block.startTime
          $case.endTime = $block.endTime
          $case.noMatch = $case.offences.filter($offence => { return $offence.title.indexOf('emergency worker') !== -1 }).length
          if ($block.description.indexOf('Fine') === -1 && $block.description.indexOf('Non-CPS') === -1 && $block.description.indexOf('Vary') === -1) {
            cases.push($case)
          }
        })
      })
    })

    setData({ courtName: $data.courtName, cases: cases })
  }

  function toggleFilter () {
    const $filter = document.querySelector('.hmcts-filter')
    const $button = document.querySelector('#filter-button')
    if ($filter && $button) {
      $filter.classList.toggle('hmcts-hidden')
      const isOpen = !$filter.classList.contains('hmcts-hidden')
      $button.textContent = isOpen ? 'Hide filter' : 'Show filter'
      $button.setAttribute('aria-expanded', isOpen.toString())
    }
  }

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <nav className="hmcts-sub-navigation" aria-label="Sub navigation">

        <ul className="hmcts-sub-navigation__list">

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/list/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              { currentDate.format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/list/${ moment(currentDate).add(1, 'd').format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              { moment(currentDate).add(1, 'd').format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/list/${ moment(currentDate).add(2, 'd').format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              { moment(currentDate).add(2, 'd').format('dddd, Do MMMM YYYY') }
            </Link>
          </li>

        </ul>

      </nav>

      { data.cases && data.cases.some($case => { return $case.noMatch }) && (
        <Fragment>

          <div className="govuk-warning-text moj-warning-text moj-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There are 3 cases that have not been matched to
              offender records in Delius.</strong>
          </div>

          <div className="hmcts-identity-bar app-identity-bar-warning govuk-!-margin-bottom-6">
            <div className="hmcts-identity-bar__container">
              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <table className="govuk-table moj-table moj-table--split-rows">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Offence</th>
                    <th scope="col">Delius record</th>
                    <th scope="col">Status</th>
                    <th scope="col">Sitting</th>
                    <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                  </tr>
                  </thead>
                  <tbody>

                  { data.cases && data.cases.map(($case, index) => {
                    return $case.noMatch ? (
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
                        <td><p className="moj-!-text-align-right">{ $case.courtRoom }</p></td>
                      </tr>
                    ) : (<Fragment key={ index }/>)
                  }) }

                  </tbody>
                </table>
              </div>

              <p className="govuk-body moj-!-text-align-center">
                <a className="govuk-link govuk-link--no-visited-state" href="?expand"
                   onClick={ e => e.preventDefault() }><em className="app-icon-down"/> Show more <em
                  className="app-icon-down"/></a>
              </p>

            </div>
          </div>
        </Fragment>
      ) }

      <div className="hmcts-filter-layout">

        <div className="hmcts-filter-layout__filter">
          <div className="hmcts-filter hmcts-hidden">
            <div className="hmcts-filter__header">

              <div className="hmcts-filter__header-title">
                <h2 className="govuk-heading-m">Filter</h2>
              </div>

              <div className="hmcts-filter__header-action">

              </div>

            </div>

            <div className="hmcts-filter__content">

              <CaseListFilter/>

            </div>

          </div>

        </div>

        <div className="hmcts-filter-layout__content">

          <table className="govuk-table moj-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <h2 className="govuk-heading-l govuk-!-margin-0">Cases</h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') }
                  <span className="govuk-hint moj-util-inline">&nbsp;at { data.courtName }</span></p>
              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">
                  <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                  </button>

                  <div className="hmcts-action-bar__filter"/>

                  <div className="hmcts-menu">
                    <div className="hmcts-menu__wrapper">

                      <button type="submit" className="govuk-button govuk-button--secondary hmcts-menu__item">
                        Add case
                      </button>

                    </div>
                  </div>

                </div>

              </td>
            </tr>
            </tbody>
          </table>

          <div className="hmcts-scrollable-pane">

            <div className="hmcts-scrollable-pane__wrapper govuk-!-margin-top-0">

              <table className="govuk-table moj-table moj-table--split-rows">
                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col" style={ { 'width': '40%' } }>Offence</th>
                  <th scope="col">Delius record</th>
                  <th scope="col">Status</th>
                  <th scope="col">Sitting</th>
                  <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                </tr>
                </thead>
                <tbody>

                { data.cases && data.cases.map(($case, caseIndex) => {
                  return (
                    caseIndex < 10 && (
                      <tr key={ caseIndex }>
                        <th scope="row"><Link
                          to={ `/cases/details/${ $case.id }` }
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
                        <td>
                          { $case.defendant.deliusStatus } <span className="govuk-hint app-!-inline">{ $case.defendant.nps ? '(nps)' : '(crc)' }</span>
                        </td>
                        <td>{ $case.listingNumber === '2st' ? '2nd' : $case.listingNumber } listing</td>
                        <td>{ moment($case.startTime, 'HH:mm:ss').format('HH:mm') } - { moment($case.endTime, 'HH:mm:ss').format('HH:mm') }</td>
                        <td><p className="moj-!-text-align-right">{ $case.courtRoom }</p>
                        </td>
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