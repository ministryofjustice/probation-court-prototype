import React, { Fragment } from 'react'
import moment from 'moment'

import dummyData from '../../assets/dummy-data'

import CalendarFilter from './components/CalendarFilter'

function Calendar () {

  const dateObject = moment()
  const weekdaysShort = moment.weekdaysShort()

  function firstDayOfMonth () {
    return moment(dateObject)
      .startOf('month')
      .format('d')
  }

  function blanks () {
    let blanks = []
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<li key={ i } className="app-calendar--item app-calendar--item_empty">&nbsp;</li>)
    }
    return blanks
  }

  function daysInMonth () {
    let days = []
    const today = dateObject.date()
    for (let i = 1, day; i <= dateObject.daysInMonth(); i++) {
      day = parseInt(dateObject.isoWeekday(i).format('d'), 10)
      days.push(
        <li key={ i } className={ `app-calendar--item ${ today === i ? 'app-calendar--item_today' : '' }` }>
          <div className={ `app-calendar--item_day ${ today === i ? 'app-calendar--item_day_today' : '' }` }>{ i }</div>
          { day !== 1 && day !== 2 && (
            <Fragment>
              { i >= today && (<div
                className="hmcts-badge hmcts-badge--green govuk-!-margin-2">{ Math.ceil(Math.random() * 15) + 10 } new</div>) }
              { (i === today || i === (today - 3)) && (<div
                className="hmcts-badge hmcts-badge--red govuk-!-margin-2">{ Math.ceil(Math.random() * 10) } adjourned</div>) }
              { i <= today && (
                <div className="hmcts-badge govuk-!-margin-2">{ Math.ceil(Math.random() * ( i === today ? 1 : 25 )) + 10 } sentenced</div>) }
            </Fragment>
          ) }
        </li>
      )
    }
    return days
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

      <h1 className="govuk-heading-l govuk-!-margin-0">{ dummyData.court }</h1>
      <p className="govuk-body-m govuk-!-font-weight-bold">{ dateObject.format('MMMM, YYYY') }</p>

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

              <CalendarFilter/>

            </div>

          </div>

        </div>

        <div className="hmcts-filter-layout__content">

          <table className="govuk-table moj-table" role="presentation">
            <tbody>
            <tr>
              <td>
                <ul className="hmcts-pagination__list govuk-!-margin-top-2">
                  <li className="hmcts-pagination__item  hmcts-pagination__item--prev">
                    <a className="govuk-body-s hmcts-pagination__link" href="/">May, 2019<span
                      className="govuk-visually-hidden">May, 2019</span></a>
                  </li>
                  <li className="hmcts-pagination__item">&nbsp;|&nbsp;</li>
                  <li className="hmcts-pagination__item  hmcts-pagination__item--next">
                    <a className="govuk-body-s hmcts-pagination__link" href="/">July, 2019<span
                      className="govuk-visually-hidden">July, 2019</span></a>
                  </li>
                </ul>

                <h3 className="hmcts-badge hmcts-badge--red govuk-!-margin-0 moj-!-text-align-center">Filtered view</h3>
              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">

                  <div className="hmcts-action-bar__filter">
                    <button id="filter-button" className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
                    </button>
                  </div>

                  <div className="hmcts-menu">
                    <div className="hmcts-menu__wrapper">

                      <button type="submit"
                              className="govuk-button govuk-button--secondary hmcts-menu__item govuk-!-margin-bottom-0"
                              disabled>Reassign
                      </button>

                      <button type="submit"
                              className="govuk-button govuk-button--secondary hmcts-menu__item govuk-!-margin-bottom-0"
                              disabled>Archive
                      </button>

                    </div>
                  </div>

                </div>
              </td>
            </tr>
            </tbody>
          </table>

          <div className="hmcts-scrollable-pane">

            <div className="hmcts-scrollable-pane__wrapper">

              <ul className="app-calendar">
                { weekdaysShort.map(day => {
                  return (
                    <li key={ day } className="app-calendar--item app-calendar--item_header">{ day }</li>
                  )
                })
                }
                { blanks() }
                { daysInMonth() }
              </ul>

              <p>&nbsp;</p>

            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Calendar