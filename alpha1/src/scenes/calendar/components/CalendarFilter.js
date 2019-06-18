import React, { Fragment } from 'react'

function CalendarFilter() {
  return (
    <Fragment>
      <div className="hmcts-filter__selected">

        <div className="hmcts-filter__selected-heading">

          <div className="hmcts-filter__heading-title">
            <h2 className="govuk-heading-m">Selected filters</h2>
          </div>

          <div className="hmcts-filter__heading-action">
            <p><a className="govuk-link govuk-link--no-visited-state" href="?filter=clear"
                  onClick={ (e) => e.preventDefault() }>Clear filters</a></p>
          </div>

        </div>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Informant / prosecutor</h3>

        <ul className="hmcts-filter-tags">

          <li><a className="hmcts-filter__tag" href="?filter=3&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> All</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Status</h3>

        <ul className="hmcts-filter-tags">

          <li><a className="hmcts-filter__tag" href="?filter=3&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Current</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=4&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Known</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=5&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Not known</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Plea</h3>

        <ul className="hmcts-filter-tags">

          <li><a className="hmcts-filter__tag" href="?filter=1&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Guilty</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=2&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> Not Guilty</a></li>

        </ul>

        <h3 className="govuk-heading-s govuk-!-margin-bottom-0">Court</h3>

        <ul className="hmcts-filter-tags">

          <li><a className="hmcts-filter__tag" href="?filter=1&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 1</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=2&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 2</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=2&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 3</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=2&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 4</a></li>

          <li><a className="hmcts-filter__tag" href="?filter=2&state=0"
                 onClick={ (e) => e.preventDefault() }><span
            className="govuk-visually-hidden">Remove this filter</span> 5</a></li>

        </ul>

      </div>

      <div className="hmcts-filter__options">

        <button type="submit" className="govuk-button">Apply filters</button>

        <div className="govuk-form-group">
          <label className="govuk-label govuk-label--m" htmlFor="sort">
            Informant / prosecutor
          </label>
          <select className="govuk-select" id="sort" name="sort">
            <option value="1" defaultValue="all">All</option>
            <option value="2">Police</option>
            <option value="3">CPS</option>
            <option value="4">HMRC</option>
          </select>
        </div>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Status</legend>

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

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Plea</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-1" name="type" type="checkbox" value="1"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-1">
                  Guilty
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-2" name="type" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-2">
                  Not Guilty
                </label>
              </div>

            </div>
          </fieldset>

        </div>

        <div className="govuk-form-group">

          <fieldset className="govuk-fieldset">

            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">Court</legend>

            <div className="govuk-checkboxes govuk-checkboxes--small">

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-1" name="type" type="checkbox" value="1"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-1">
                  1
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-2" name="type" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-2">
                  2
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-2" name="type" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-2">
                  3
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-2" name="type" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-2">
                  4
                </label>
              </div>

              <div className="govuk-checkboxes__item">
                <input className="govuk-checkboxes__input" id="type-2" name="type" type="checkbox" value="2"
                       defaultChecked/>
                <label className="govuk-label govuk-checkboxes__label" htmlFor="type-2">
                  5
                </label>
              </div>

            </div>
          </fieldset>

        </div>

      </div>
    </Fragment>
  )
}

export default CalendarFilter
