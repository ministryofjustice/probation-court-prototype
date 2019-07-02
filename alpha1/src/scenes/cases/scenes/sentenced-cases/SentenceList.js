import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CourtListFilter from '../court-list/components/CourtListFilter'
import { getDateFromProps } from '../../../../utils/DateTools'

function SentencedList (props) {

  const [data, setData] = useState({})
  const currentDate = getDateFromProps(props.match.params)

  useEffect(() => {
    async function getData() {
      const response = await fetch('http://localhost:3000/assets/dummy-data.json');
      const data = await response.json();
      setData(data);
    }
    window.scrollTo(0, 0)
    getData()
  }, [])

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
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              Cases
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/adjourned/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state">
              Adjourned cases
            </Link>
          </li>

          <li className="hmcts-sub-navigation__item">
            <Link to={ `/cases/sentenced/${ currentDate.format('DD/MM/YYYY') }` }
                  className="hmcts-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              Sentenced cases
            </Link>
          </li>

        </ul>

      </nav>

      { data.cases && data.cases.some(listItem => { return listItem.deliusUpdated === 'N' }) && (
        <Fragment>

          <div className="govuk-warning-text moj-warning-text moj-warning-text--interrupt govuk-!-margin-0">
            <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
            <strong className="govuk-warning-text__text"><span
              className="govuk-warning-text__assistive">Warning</span>There is 1 case where the sentence has not been
              recorded in Delius.</strong>
          </div>

          <div className="hmcts-identity-bar app-identity-bar-warning govuk-!-margin-bottom-6">
            <div className="hmcts-identity-bar__container">
              <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                <table className="govuk-table moj-table moj-table--split-rows">
                  <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Offence</th>
                    <th scope="col">Sentence</th>
                    <th scope="col">Recorded in Delius</th>
                    <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                  </tr>
                  </thead>
                  <tbody>

                  { data.cases && data.cases.map((listItem, index) => {
                    return listItem.deliusUpdated === 'N' ? (
                      <Fragment key={ index }>
                        { listItem.currentState.type === 'Sentenced' && (
                          <tr>
                            <th scope="row"><Link to={ `/cases/details/${ index }` }
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
                            <td><p className="moj-!-text-align-right">{ listItem.court }</p>
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

              <CourtListFilter/>

            </div>

          </div>

        </div>

        <div className="hmcts-filter-layout__content">

          <table className="govuk-table moj-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <h2 className="govuk-heading-l govuk-!-margin-0">Sentenced cases </h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') } <span
                  className="govuk-hint moj-util-inline">at { data.court }</span></p>
              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">
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

          <div className="hmcts-scrollable-pane">

            <div className="hmcts-scrollable-pane__wrapper">

              <table className="govuk-table moj-table moj-table--split-rows">

                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Sentence</th>
                  <th scope="col">Recorded in Delius</th>
                  <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                </tr>
                </thead>

                <tbody>

                { data.cases && data.cases.map((listItem, index) => {
                  return (
                    <Fragment key={ index }>
                      { listItem.currentState.type === 'Sentenced' && (
                        <tr>
                          <th scope="row"><Link to={ `/cases/details/${ index }` }
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
                          <td><p className="moj-!-text-align-right">{ listItem.court }</p>
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