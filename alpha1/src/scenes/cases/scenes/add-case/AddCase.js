import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../../../utils/StateProvider'
import moment from 'moment'

function AddCase () {

  const [{ currentDate }] = useStateValue()
  const [data, setData] = useState({
    defendant: {
      name: '',
      dateOfBirth: '',
      age: '43',
      pnc: '',
      crn: 'X612323A',
      address: '10 King Road Sheffield S12 5GH',
      gender: 'M'
    },
    selectOffender: false,
    offenderMatch: false,
    offences: []
  })

  function configureSelection () {
    function getValue ($id) {
      return document.getElementById($id).value
    }

    const pnc = getValue('pnc') || '2007/332941B'
    const name = `${ getValue('name') } ${ getValue('surname') }`
    const dob = `${ getValue('dob-year') }-${ getValue('dob-month') }-${ getValue('dob-day') }`
    setData({ defendant: { ...data.defendant, name: name, dateOfBirth: dob, pnc: pnc }, selectOffender: true })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>

      <div className="govuk-breadcrumbs">
        <ol className="govuk-breadcrumbs__list">
          <li className="govuk-breadcrumbs__list-item">
            <Link to="/cases/list" className="govuk-breadcrumbs__link">Cases</Link>
          </li>
          <li className="govuk-breadcrumbs__list-item" aria-current="page">Add case</li>
        </ol>
      </div>

      <main id="main-content" role="main" className="govuk-main-wrapper govuk-!-margin-top-0 govuk-!-padding-top-0">

        <h1 className="govuk-heading-l">Add case <span
          className="govuk-hint govuk-!-display-inline-block">for { currentDate.format('dddd, Do MMMM YYYY') }</span>
        </h1>

        <div className="moj-filter-layout">

          <div className="moj-filter-layout__filter">

            <div className="moj-filter">

              <div className="moj-filter__header app-filter__header--blue">

                <div className="moj-filter__header-title">
                  <h2 className="govuk-heading-m">
                    { !data.offenderMatch && (
                      <Fragment>Defendant details</Fragment>
                    ) }
                    { data.offenderMatch && (
                      <Fragment>{ data.defendant.name }</Fragment>
                    ) }
                  </h2>
                </div>
              </div>

              <div className="moj-filter__content">
                <div className="moj-filter__selected">

                  <div className="moj-filter__selected-heading">

                    { !data.offenderMatch && (
                      <form name="defendantForm">
                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="name">PNC</label>
                          <input className="govuk-input" id="pnc" name="pnc" type="text"/>
                        </div>

                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="surname">Surname</label>
                          <input className="govuk-input" id="surname" name="surname" type="text"/>
                        </div>

                        <div className="govuk-form-group">
                          <label className="govuk-label" htmlFor="name">Forename</label>
                          <input className="govuk-input" id="name" name="name" type="text"/>
                        </div>

                        <div className="govuk-form-group">
                          <fieldset className="govuk-fieldset" aria-describedby="dob-hint" role="group">
                            <legend className="govuk-fieldset__legend">Date of birth</legend>
                            <span id="dob-hint" className="govuk-hint">For example, 12 11 1997</span>
                            <div className="govuk-date-input" id="dob">
                              <div className="govuk-date-input__item">
                                <div className="govuk-form-group">
                                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
                                    Day
                                  </label>
                                  <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                         id="dob-day" name="dob-day" type="number"
                                         pattern="[0-9]*"/>
                                </div>
                              </div>
                              <div className="govuk-date-input__item">
                                <div className="govuk-form-group">
                                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
                                    Month
                                  </label>
                                  <input className="govuk-input govuk-date-input__input govuk-input--width-2"
                                         id="dob-month" name="dob-month" type="number"
                                         pattern="[0-9]*"/>
                                </div>
                              </div>
                              <div className="govuk-date-input__item">
                                <div className="govuk-form-group">
                                  <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
                                    Year
                                  </label>
                                  <input className="govuk-input govuk-date-input__input govuk-input--width-4"
                                         id="dob-year" name="dob-year" type="number"
                                         onKeyUp={ e => {
                                           if (e.target.value.length === 4) {
                                             configureSelection()
                                           }
                                         } }
                                         pattern="[0-9]*"/>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </form>
                    ) }

                    { data.offenderMatch && (
                      <Fragment>

                        <div className="app-!-float-left">

                          <img src="/assets/images/no-photo.png" width="82" height="102"
                               alt={ `${ data.defendant.name }` }
                               className="app-offender-image"/>
                        </div>
                        <div className="app-!-float-left">

                          <p className="govuk-body govuk-!-margin-bottom-0">
                            <strong>DOB:</strong> { moment(data.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }
                          </p>
                          <p className="govuk-body govuk-!-margin-bottom-0"><strong>CRN:</strong> X612323A</p>
                          <p className="govuk-body govuk-!-margin-bottom-0"><strong>PNC:</strong> { data.defendant.pnc }
                          </p>

                        </div>

                        <div
                          className={ `moj-badge moj-badge ${ data.defendant.deliusStatus === 'Current' ? 'moj-badge-error' : data.defendant.deliusStatus === 'Known' ? 'moj-badge-known' : '' } govuk-!-margin-top-4 govuk-!-width-full` }>Not
                          known offender
                        </div>

                      </Fragment>
                    ) }

                  </div>
                </div>

                <div className="moj-filter__options">

                  <h2 className="govuk-heading-m">Contact details</h2>

                  <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Address</h3>

                  <p className="govuk-body">MILES DANTON<br/>368 London Road<br/>Broomhill<br/>S65 7HG</p>

                  <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Telephone</h3>

                  <p className="govuk-body">07765 765 432</p>

                  <h3 className="govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-2">Email</h3>

                  <p className="govuk-body"><a href="mailto:user-123456@some-host.com"
                                               className="govuk-link govuk-link--no-visited-state"
                                               onClick={ e => e.preventDefault() }>user-123456@some-host.com</a>
                  </p>

                  { !data.offenderMatch && (
                    <Fragment>

                      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

                      <h2 className="govuk-heading-m">Offender not known?</h2>

                      <p className="govuk-body">Confirm that you have determined that the offender is not currently
                        known
                        to
                        probation.</p>

                      <button className="govuk-button govuk-button--secondary">Offender not known</button>

                    </Fragment>
                  ) }

                </div>
              </div>
            </div>
          </div>

          <div className="moj-filter-layout__content">
            <div className="moj-scrollable-pane">
              <div className="moj-scrollable-pane__wrapper">

                { !data.offenderMatch && (
                  <Fragment>

                    { data.offences && !data.offences.length && (
                      <div className="govuk-warning-text app-warning-text app-warning-text--interrupt">
                        <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
                        <strong className="govuk-warning-text__text">
                          <span className="govuk-warning-text__assistive">Warning</span>
                          As you enter details, potential matches with Delius records will be displayed here.
                        </strong>
                      </div>
                    ) }

                    { data.selectOffender && !data.offenderMatch && (
                      <div className="moj-identity-bar govuk-!-margin-bottom-4">
                        <div className="moj-identity-bar__container">
                          <div className="govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-2">

                            <div className="govuk-grid-row">
                              <div className="govuk-grid-column-full">
                                <div className="app-!-float-left--not-narrow">

                                  <img src="/assets/images/no-photo.png" width="82" height="102"
                                       alt={ `${ data.defendant.name }` }
                                       className="app-offender-image"/>
                                </div>
                                <div className="app-!-float-left--not-narrow app-offender-selection">

                                  <h1
                                    className="govuk-heading-m govuk-!-margin-0 govuk-!-margin-top-1 govuk-!-padding-0">{ data.defendant.name }
                                    { data.defendant.current && (
                                      <span
                                        className="moj-badge moj-badge--green govuk-!-margin-left-4">Current offender</span>
                                    ) }
                                  </h1>

                                  <div className="govuk-grid-row">
                                    <div className="govuk-grid-column-one-quarter">

                                      { data.defendant.dateOfBirth && (
                                        <Fragment>
                                          <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">Date of
                                            birth</p>
                                          <p
                                            className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ moment(data.defendant.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY') }</p>
                                        </Fragment>
                                      ) }

                                    </div>
                                    <div className="govuk-grid-column-one-quarter">

                                      { data.defendant.crn && (
                                        <Fragment>
                                          <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">CRN</p>
                                          <p
                                            className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ data.defendant.crn }</p>
                                        </Fragment>
                                      ) }

                                    </div>
                                    <div className="govuk-grid-column-one-quarter">

                                      <p className="govuk-body govuk-!-margin-0 govuk-!-margin-top-2">PNC</p>
                                      <p
                                        className="govuk-heading-m govuk-!-margin-0 govuk-!-padding-0">{ data.defendant.pnc }</p>

                                    </div>
                                    <div className="govuk-grid-column-one-quarter app-!-text-align-right">

                                      <button className="govuk-button govuk-button--secondary" onClick={ e => {
                                        setData({ ...data, offenderMatch: true })
                                      } }>Match
                                      </button>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <table className="govuk-table app-table">
                              <tbody>
                              <tr>
                                <td>

                                  <p className="govuk-body govuk-!-margin-top-2">
                                    { data.defendant.gender }, { data.defendant.age } of { data.defendant.address }
                                  </p>

                                </td>
                                <td className="app-!-text-align-right">

                                  <a href={ `http://delius/offender/` }
                                     className="govuk-link govuk-link--no-visited-state govuk-!-margin-top-2"
                                     onClick={ e => e.preventDefault() }>View offender summary</a>

                                </td>
                              </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>
                      </div>
                    ) }

                  </Fragment>
                ) }

                { data.offenderMatch && (
                  <form name="caseForm">
                    <div className="moj-identity-bar">
                      <div className="moj-identity-bar__container">
                        <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                          <h2 className="govuk-heading-m govuk-!-margin-top-2 govuk-!-margin-bottom-1">Appearing in
                            Court</h2>
                          <span
                            className="govuk-hint govuk-!-margin">On { currentDate.format('dddd, Do MMMM YYYY') }.</span>

                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="room">Court room</label>
                            <input className="govuk-input govuk-input--width-2" id="room" name="room" type="text"/>
                          </div>

                          <div className="govuk-form-group">
                            <label className="govuk-label" htmlFor="sitting">Sitting</label>
                            <input className="govuk-input govuk-input--width-10" id="sitting" name="sitting"
                                   type="text"/>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="moj-identity-bar">
                      <div className="moj-identity-bar__container">
                        <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                          <h2 className="govuk-heading-m govuk-!-margin-top-2">Offence</h2>

                          <div className="govuk-grid-row">
                            <div className="govuk-grid-column-two-thirds">

                              <div className="govuk-form-group">
                                <label className="govuk-label" htmlFor="offence">Offence</label>
                                <input className="govuk-input" id="offence" name="offence" type="text"/>
                              </div>

                              <div className="govuk-form-group">
                                <label className="govuk-label" htmlFor="contrary">Contrary to</label>
                                <input className="govuk-input" id="contrary" name="contrary" type="text"/>
                              </div>

                              <div className="govuk-form-group">
                                <label className="govuk-label" htmlFor="more-detail">
                                  Offence summary
                                </label>
                                <textarea className="govuk-textarea" id="more-detail" name="more-detail" rows="5"
                                          aria-describedby="more-detail-hint"/>
                              </div>

                              <div className="govuk-form-group">
                                <label className="govuk-label" htmlFor="code">Code</label>
                                <span className="govuk-hint">If known</span>
                                <input className="govuk-input govuk-input--width-5" id="code" name="code" type="text"/>
                              </div>

                              <button className="govuk-button govuk-button--secondary"
                                      onClick={ e => {e.preventDefault()} }>Add another offence
                              </button>

                            </div>
                            <div className="govuk-grid-column-one-third">
                              &nbsp;
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="moj-identity-bar">
                      <div className="moj-identity-bar__container">
                        <div className="govuk-!-padding-left-4 govuk-!-padding-right-4">

                          <div className="govuk-grid-row">
                            <div className="govuk-grid-column-two-thirds">

                              <div className="govuk-form-group govuk-!-margin-top-2">
                                <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
                                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                                    <p className="govuk-fieldset__heading">Markers</p>
                                  </legend>
                                  <span id="waste-hint" className="govuk-hint">Select all that apply.</span>
                                  <div className="govuk-checkboxes">
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-1" name="waste"
                                             type="checkbox" value="carcasses"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-1">
                                        Domestic violence
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-2" name="waste"
                                             type="checkbox" value="mines"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-2">
                                        Violent
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-3" name="waste"
                                             type="checkbox" value="farm"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-3">
                                        Escape risk
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-4" name="waste"
                                             type="checkbox" value="farm"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-4">
                                        Suicide / Self harm
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-5" name="waste"
                                             type="checkbox" value="farm"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-5">
                                        Medical needs
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-6" name="waste"
                                             type="checkbox" value="farm"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-6">
                                        Special transport needs
                                      </label>
                                    </div>
                                    <div className="govuk-checkboxes__item">
                                      <input className="govuk-checkboxes__input" id="waste-7" name="waste"
                                             type="checkbox" value="farm"/>
                                      <label className="govuk-label govuk-checkboxes__label" htmlFor="waste-7">
                                        Segregation
                                      </label>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>

                            </div>
                            <div className="govuk-grid-column-one-third app-!-text-align-right">&nbsp;</div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <p className="app-!-text-align-right">
                      <button className="govuk-button">Add case</button>
                    </p>

                  </form>
                ) }

              </div>

            </div>
          </div>
        </div>

        <Link to="/" className="govuk-back-link">Back</Link>

      </main>

    </Fragment>
  )
}

export default AddCase