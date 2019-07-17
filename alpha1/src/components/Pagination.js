import React, { Fragment } from 'react'

function Pagination (props) {
  return (
    <Fragment>
      <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-0"/>

      <nav className="moj-pagination" id="pagination-label">

        <p className="govuk-visually-hidden" aria-labelledby="pagination-label">Pagination navigation</p>

        <ul className="moj-pagination__list">

          <li className="moj-pagination__item  moj-pagination__item--prev">
            <a className="moj-pagination__link" href="/page=1" onClick={ e => e.preventDefault() }>Previous<span
              className="govuk-visually-hidden"> set of pages</span></a>
          </li>

          { [...Array(props.pageCount || 5)].map((item, i) => {
            return <li key={ i } className="moj-pagination__item">
              <a className={ `moj-pagination__link${ i === 0 ? ' moj-pagination__item--active' : '' }` }
                 href={ `/page=${ i + 1 }` }
                 onClick={ e => e.preventDefault() }>{ i + 1 }</a>
            </li>
          }) }

          <li className="moj-pagination__item  moj-pagination__item--next">
            <a className="moj-pagination__link" href="/page=2" onClick={ e => e.preventDefault() }>Next<span
              className="govuk-visually-hidden"> set of pages</span></a>
          </li>

        </ul>

        <p
          className="moj-pagination__results">Showing <strong>1</strong> to <strong>10</strong> of <strong>49</strong> results
        </p>

      </nav>
    </Fragment>
  )
}

export default Pagination
