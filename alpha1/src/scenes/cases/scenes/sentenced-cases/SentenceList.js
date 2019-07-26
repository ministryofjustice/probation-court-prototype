import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CaseListFilter from '../case-list/components/CaseListFilter'
import { getDateFromProps } from '../../../../utils/DateTools'

function SentencedList (props) {

  const [data, setData] = useState({})
  const currentDate = getDateFromProps(props.match.params)

  useEffect(() => {
    async function getData () {
      const response = await fetch('http://localhost:8080/api/sentenced')
      const data = await response.json()
      setData(data)
    }

    window.scrollTo(0, 0)
    getData()
  }, [])

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

  return (
    <main id="main-content" role="main" className="govuk-main-wrapper">

      <nav className="moj-sub-navigation" aria-label="Sub navigation">

        <ul className="moj-sub-navigation__list">

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/list/${ currentDate.format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state">
              Cases
            </Link>
          </li>

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/adjourned/${ currentDate.format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state">
              Adjourned cases
            </Link>
          </li>

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/sentenced/${ currentDate.format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              Sentenced cases
            </Link>
          </li>

        </ul>

      </nav>

      { data.cases && data.cases.some(listItem => { return listItem.deliusUpdated === 'N' }) && (
        <Fragment>

          <div className="govuk-warning-text app-warning-text app-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There is 1 case where the sentence has not been
              recorded in Delius.</strong>
          </div>

          <div className="moj-identity-bar app-identity-bar-warning govuk-!-margin-bottom-6">
            <div className="moj-identity-bar__container">
              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <table className="govuk-table app-table app-table--split-rows">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Offence</th>
                    <th scope="col">Sentence</th>
                    <th scope="col">Recorded in Delius</th>
                    <th scope="col"><p className="app-!-text-align-right">Court</p></th>
                  </tr>
                  </thead>
                  <tbody>

                  { data.cases && data.cases.map((listItem, index) => {
                    return listItem.deliusUpdated === 'N' ? (
                      <Fragment key={ index }>
                        { listItem.currentState.type === 'Sentenced' && (
                          <tr>
                            <th scope="row"><Link to={ `/cases/details/${ listItem.id }` }
                                                  className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                            </th>
                            <td>
                              { listItem.offences.map((offence, offenceIndex) => {
                                return <p key={ offenceIndex } className="govuk-body">{ offence }</p>
                              }) }
                            </td>
                            <td>
                              { listItem.sentence.map((sentence, sentenceIndex) => {
                                return <p key={ sentenceIndex } className="govuk-body">{ sentence }</p>
                              }) }
                            </td>
                            <td>
                              <p>{ listItem.deliusUpdated === 'N' ? 'No' : 'Yes' }</p>
                            </td>
                            <td><p className="app-!-text-align-right">{ listItem.court }</p>
                            </td>
                          </tr>
                        ) }
                      </Fragment>
                    ) : (<Fragment key={ index }/>)
                  }) }

                  </tbody>
                </table>
              </div>

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

              <div className="moj-filter__header-action">

              </div>

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
                <h2 className="govuk-heading-l govuk-!-margin-0">Sentenced cases </h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') } <span
                  className="govuk-hint govuk-!-display-inline-block">at { data.court }</span></p>
              </td>
              <td className="app-!-text-align-right">

                <div className="moj-action-bar">
                  <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                  </button>
                </div>

              </td>
            </tr>
            </tbody>
          </table>

          <div className="moj-scrollable-pane">

            <div className="moj-scrollable-pane__wrapper">

              <table className="govuk-table app-table app-table--split-rows">

                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Sentence</th>
                  <th scope="col">Recorded in Delius</th>
                  <th scope="col"><p className="app-!-text-align-right">Court</p></th>
                </tr>
                </thead>

                <tbody>

                { data.cases && data.cases.map((listItem, index) => {
                  return (
                    <Fragment key={ index }>
                      { listItem.deliusUpdated === 'Y' && (
                        <tr>
                          <th scope="row"><Link to={ `/cases/details/${ listItem.id }` }
                                                className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                          </th>
                          <td>
                            { listItem.offences.map((offence, offenceIndex) => {
                              return <p key={ offenceIndex }
                                        className="govuk-body govuk-!-margin-bottom-2">{ offence }</p>
                            }) }
                          </td>
                          <td>
                            { listItem.sentence.map((sentence, sentenceIndex) => {
                              return <p key={ sentenceIndex }
                                        className="govuk-body govuk-!-margin-bottom-2">{ sentence }</p>
                            }) }
                          </td>
                          <td>
                            <p>{ listItem.deliusUpdated === 'N' ? 'No' : 'Yes' }</p>
                          </td>
                          <td><p className="app-!-text-align-right">{ listItem.court }</p>
                          </td>
                        </tr>
                      ) }
                    </Fragment>
                  )
                }) }

                </tbody>
              </table>

            </div>

          </div>

        </div>
      </div>

    </main>
  )
}

export default SentencedList