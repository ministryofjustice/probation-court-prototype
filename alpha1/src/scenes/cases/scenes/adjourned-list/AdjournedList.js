import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getDateFromProps } from '../../../../utils/DateTools'

import CaseListFilter from '../case-list/components/CaseListFilter'

function AdjournedList (props) {

  const [data, setData] = useState({})
  const currentDate = getDateFromProps(props.match.params)

  useEffect(() => {
    async function getData () {
      const response = await fetch('http://localhost:8080/api/adjourned')
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
                  className="moj-sub-navigation__link govuk-link--no-visited-state"
                  aria-current="page">
              Adjourned cases
            </Link>
          </li>

          <li className="moj-sub-navigation__item">
            <Link to={ `/cases/sentenced/${ currentDate.format('DD/MM/YYYY') }` }
                  className="moj-sub-navigation__link govuk-link--no-visited-state">
              Sentenced cases
            </Link>
          </li>

        </ul>

      </nav>

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

          <table className="govuk-table moj-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <h2 className="govuk-heading-l govuk-!-margin-0">Adjourned cases</h2>
                <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('dddd, Do MMMM YYYY') } <span
                  className="govuk-hint moj-util-inline">at { data.court }</span></p>
              </td>
              <td className="moj-!-text-align-right">

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

              <table className="govuk-table moj-table moj-table--split-rows">

                <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Offence</th>
                  <th scope="col">Adjourned at</th>
                  <th scope="col">Adjournment</th>
                  <th scope="col"><p className="moj-!-text-align-right">Court</p></th>
                </tr>
                </thead>

                <tbody>

                { data.cases && data.cases.map((listItem, index) => {
                  return (
                    <tr key={ index }>
                      <th scope="row"><Link
                        to={ `/cases/details/${ listItem.id }` }
                        className="govuk-link govuk-link--no-visited-state">{ listItem.name }</Link>
                      </th>
                      <td>
                        { listItem.offences.map((offence, offenceIndex) => {
                          return <p key={ offenceIndex }>{ offence }</p>
                        }) }
                      </td>
                      <td>10:45</td>
                      <td>
                        { listItem.currentState.label === 'Adjourned' && (
                          <p>{ listItem.currentState.details }</p>
                        ) }
                      </td>
                      <td><p className="moj-!-text-align-right">{ listItem.court }</p>
                      </td>
                    </tr>
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

export default AdjournedList