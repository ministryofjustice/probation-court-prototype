import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { lastMonth as last, nextMonth as next } from '../../utils/DateTools'

import CalendarFilter from './components/CalendarFilter'

function Calendar (props) {

  const [data, setData] = useState({})
  const currentDate = moment()

  if (props.match.params.month && props.match.params.year) {
    currentDate.set('month', parseInt(props.match.params.month, 10) - 1)
    currentDate.set('year', props.match.params.year)
  }

  useEffect(() => {
    async function getData () {
      const response = await fetch('http://localhost:8080/api/calendar')
      const data = await response.json()
      setData(data)
    }

    window.scrollTo(0, 0)
    getData()
  }, [])

  const lastMonth = last(currentDate)
  const nextMonth = next(currentDate)

  function firstDayOfMonth () {
    return moment(currentDate)
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
    const today = currentDate.month() === moment().month() ? currentDate.date() : -1
    const todayDay = currentDate.format('dd')

    for (let i = 1, day; i <= currentDate.daysInMonth(); i++) {
      day = moment(currentDate).date(i).format('dd')
      days.push(
        <li key={ i } className={ `app-calendar--item ${ i === today ? 'app-calendar--item_today' : '' }` }>
          <Link to={ `/cases/list/${ moment().date(i).format('D/M/YYYY') }` } className="app-calendar--link">
            <div className={ `app-calendar--item_day ${ i === today ? 'app-calendar--item_day_today' : '' }` }
                 aria-hidden="true">{ i }</div>
            <div className="govuk-visually-hidden">{ moment().date(i).format('dddd, Do MMMM YYYY') }</div>
            { day !== 'Sa' && day !== 'Su' && (
              <Fragment>
                { i >= today && i <= today + (todayDay === 'Th' || todayDay === 'Fr' ? 4 : 2) && (<div
                  className="hmcts-badge govuk-!-margin-2">{ Math.ceil(Math.random() * 15) + 10 } cases</div>) }
                { i <= today && (
                  <Fragment>
                    <div
                      className="hmcts-badge hmcts-badge--red govuk-!-margin-2">{ Math.ceil(Math.random() * 10) } adjourned
                    </div>
                    <div
                      className="hmcts-badge hmcts-badge--green govuk-!-margin-2">{ Math.ceil(Math.random() * (i === today ? 1 : 25)) + 10 } sentenced
                    </div>
                  </Fragment>
                ) }
              </Fragment>
            ) }
          </Link>
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

      <h1 className="govuk-heading-l govuk-!-margin-0">Calendar</h1>
      <p className="govuk-body-m govuk-!-font-weight-bold">{ currentDate.format('MMMM, YYYY') } <span
        className="govuk-hint moj-util-inline">at { data.court }</span></p>

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
                    <Link to={ `/calendar/${ lastMonth.month + '/' + lastMonth.year }` }
                          className="govuk-body-s hmcts-pagination__link">{ lastMonth.monthName }, { lastMonth.year }</Link>
                  </li>
                  <li className="hmcts-pagination__item">&nbsp;|&nbsp;</li>
                  <li className="hmcts-pagination__item  hmcts-pagination__item--next">
                    <Link to={ `/calendar/${ nextMonth.month + '/' + nextMonth.year }` }
                          className="govuk-body-s hmcts-pagination__link">{ nextMonth.monthName }, { nextMonth.year }</Link>
                  </li>
                </ul>

              </td>
              <td className="moj-!-text-align-right">

                <div className="hmcts-action-bar">

                  <div className="hmcts-menu">
                    <div className="hmcts-menu__wrapper">

                      <button id="filter-button"
                              className="hmcts-menu__item govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
                              type="button"
                              aria-haspopup="true"
                              aria-expanded="false" onClick={ () => toggleFilter() }>Show filter
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
                { moment.weekdaysShort().map((day, index) => {
                  return (
                    <li key={ day } className="app-calendar--item app-calendar--item_header">
                      <span className="govuk-visually-hidden">{ moment.weekdays(index) }</span>
                      <abbr title={ moment.weekdays(index) } aria-hidden="true">{ day }</abbr>
                    </li>
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