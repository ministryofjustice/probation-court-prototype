import React, { Fragment } from 'react'

function Pagination (props) {
  return (
    <Fragment>
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-0"/>

      <nav className="hmcts-pagination" id="pagination-label">

        <p className="govuk-visually-hidden" aria-labelledby="pagination-label">Pagination navigation</p>

        <ul className="hmcts-pagination__list">

          <li className="hmcts-pagination__item  hmcts-pagination__item--prev">
            <a className="hmcts-pagination__link" href="/page=1" onClick={ (e) => e.preventDefault() }>Previous<span
              className="govuk-visually-hidden"> set of pages</span></a>
          </li>

          { [...Array(props.pageCount || 5)].map((e, i) => {
            return <li key={ i } className="hmcts-pagination__item">
              <a className={ `hmcts-pagination__link${ i === 0 ? ' hmcts-pagination__item--active' : '' }` }
                 href={ `/page=${ i + 1 }` }
                 onClick={ (e) => e.preventDefault() }>{ i + 1 }</a>
            </li>
          }) }

          <li className="hmcts-pagination__item  hmcts-pagination__item--next">
            <a className="hmcts-pagination__link" href="/page=2" onClick={ (e) => e.preventDefault() }>Next<span
              className="govuk-visually-hidden"> set of pages</span></a>
          </li>

        </ul>

        <p
          className="hmcts-pagination__results">Showing <strong>1</strong> to <strong>10</strong> of <strong>49</strong> results
        </p>

      </nav>
    </Fragment>
  )
}

export default Pagination
