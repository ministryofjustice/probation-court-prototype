import React, { Fragment } from 'react'

function CaseListFilter () {
  return (
    <Fragment>
      <div className="moj-filter__selected">

        <div className="moj-filter__selected-heading">

          <div className="moj-filter__heading-title">
            <h2 className="govuk-heading-m">Selected filters</h2>
          </div>

          <div className="moj-filter__heading-action">
            <p><a className="govuk-link govuk-link--no-visited-state" href="?filter=clear"
                  onClick={ e => e.preventDefault() }>Clear filters</a></p>
          </div>

        </div>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Court</h3>

        <ul className="moj-filter-tags">

          <li><a className="moj-filter__tag" href="?filter=1&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 1</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 2</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 3</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 4</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 5</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Sitting</h3>

        <ul className="moj-filter-tags">

          <li><a className="moj-filter__tag" href="?filter=1&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> AM</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> PM</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Status</h3>

        <ul className="moj-filter-tags">

          <li><a className="moj-filter__tag" href="?filter=1&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 1st listing</a></li>

          <li><a className="moj-filter__tag" href="?filter=2&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 2nd listing</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Delius record</h3>

        <ul className="moj-filter-tags">

          <li><a className="moj-filter__tag" href="?filter=3&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Current</a></li>

          <li><a className="moj-filter__tag" href="?filter=4&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Known</a></li>

          <li><a className="moj-filter__tag" href="?filter=5&state=0"
                 onClick={ e => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Not known</a></li>

        </ul>

      </div>

      <div className="moj-filter__options">

        <button data-module="govuk-button" type="submit" className="govuk-button">Apply filters</button>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Court</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="court-1" name="court" type="checkbox" value="1"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="court-1">
                  1
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="court-2" name="court" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="court-2">
                  2
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="court-3" name="court" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="court-3">
                  3
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="court-4" name="court" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="court-4">
                  4
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="court-5" name="court" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="court-5">
                  5
                </label>
              </div>

            </div>
          </fieldset>

        </div>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Sitting</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="sitting-1" name="sitting" type="checkbox" value="AM"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="sitting-1">
                  AM
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="sitting-2" name="sitting" type="checkbox" value="PM"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="sitting-2">
                  PM
                </label>
              </div>

            </div>
          </fieldset>

        </div>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Status</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="listing-1" name="listing" type="checkbox" value="1"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="listing-1">
                  1st listing
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="listing-2" name="listing" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="listing-2">
                  2nd listing
                </label>
              </div>

            </div>
          </fieldset>

        </div>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Delius record</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="status-1" name="status" type="checkbox" value="1"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="status-1">
                  Current
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="status-2" name="status" type="checkbox"
                       value="2" defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="status-2">
                  Known
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="status-3" name="status" type="checkbox"
                       value="3" defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="status-3">
                  Not known
                </label>
              </div>

            </div>
          </fieldset>

        </div>

        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

        <h3 className="govuk-heading-m">Pre-filtered list</h3>

        <p className="govuk-body">The overall case list has been pre-filtered in order to ignore cases that are usually
          of no interest to probation.</p>

        <p className="govuk-body">If you wish to view the complete list of cases for this date you can do so by clicking
          the below link.</p>

        <p className="govuk-body"><a href="/cases/list?prefiltered=false"
                                     className="govuk-link govuk-link--no-visited-state"
                                     onClick={ e => {e.preventDefault()} }>View complete case list</a>.</p>

      </div>
    </Fragment>
  )
}

export default CaseListFilter
