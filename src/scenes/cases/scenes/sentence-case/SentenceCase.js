import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import PageTitle from '../../shared-components/PageTitle'
import { useStateValue } from '../../../../utils/StateProvider'
import moment from 'moment'

function SentenceCase (props) {

  const [{ currentDate, currentCase }] = useStateValue()
  const backLink = `/cases/details/${ props.match.params.id }`

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item">
            <Link to={ backLink } className="govuk-breadcrumbs__link">Case
              details</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Record sentence</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <PageTitle title="Record sentence"/>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">

            <p className="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">
              <strong>Defendant:</strong> { currentCase.defendant ? currentCase.defendant.name : '' }.</p>
            <p className="govuk-body govuk-!-margin-top-0"><strong>Appearing
              on:</strong> { currentDate.format('dddd D MMMM') } at { moment(currentCase.startTime, 'HH:mm:ss').format('HH:mm') } - { moment(currentCase.endTime, 'HH:mm:ss').format('HH:mm') }.
            </p>

            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

            <form name="ndForm">

              <table className="govuk-table app-table app-table--split-rows">
                <thead>
                <tr>
                  <th colSpan="2">Offence</th>
                </tr>
                </thead>
                <tbody>

                { currentCase.offences && currentCase.offences.map((offence, offenceIndex) => {
                  return (
                    <tr key={ offenceIndex }>
                      <td>{ offence.title }</td>
                      <td>
                        <button data-module="govuk-button" className="govuk-button govuk-button--secondary govuk-!-margin-0">Remove</button>
                      </td>
                    </tr>
                  )
                }) }

                </tbody>
              </table>

              <div className="moj-button-action">

                <button data-module="govuk-button" type="submit"
                        className="govuk-button govuk-button--secondary moj-add-another__add-button govuk-!-margin-bottom-4">
                  Add another offence
                </button>

              </div>

              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
                  <legend className="govuk-fieldset__legend">
                    <h1 className="govuk-fieldset__heading">Is this a custodial sentence?</h1>
                  </legend>

                  <div className="govuk-radios govuk-radios--inline">
                    <div className="govuk-radios__item">
                      <input className="govuk-radios__input" id="changed-name" name="changed-name" type="radio"
                             value="yes"/>
                      <label className="govuk-label govuk-radios__label" htmlFor="changed-name">Yes</label>
                    </div>
                    <div className="govuk-radios__item">
                      <input className="govuk-radios__input" id="changed-name-2" name="changed-name" type="radio"
                             value="no"/>
                      <label className="govuk-label govuk-radios__label" htmlFor="changed-name-2">No</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="width-20">Sentence</label>
                <input className="govuk-input govuk-!-width-three-quarters" id="width-20" name="width-20" type="text"/>
              </div>

              <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="more-detail">Sentence details</label>
                <textarea className="govuk-textarea govuk-!-width-three-quarters" id="more-detail" name="more-detail"
                          rows="5"/>
              </div>

              <button data-module="govuk-button" type="button"
                      className="govuk-button govuk-!-margin-right-2"
                      onClick={ e => e.preventDefault() }>Record sentence
              </button>

            </form>


          </div>
          <div className="govuk-grid-column-one-third">
            { ' ' }
          </div>
        </div>

        <Link to={ backLink } className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default SentenceCase
