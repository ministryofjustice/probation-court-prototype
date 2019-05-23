import React, { Fragment } from 'react'

function Pagination () {
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

          <li className="hmcts-pagination__item hmcts-pagination__item--active">1</li>
          <li className="hmcts-pagination__item"><a className="hmcts-pagination__link" href="/page=2"
                                                    onClick={ (e) => e.preventDefault() }>2</a></li>
          <li className="hmcts-pagination__item"><a className="hmcts-pagination__link" href="/page=3"
                                                    onClick={ (e) => e.preventDefault() }>3</a></li>
          <li className="hmcts-pagination__item"><a className="hmcts-pagination__link" href="/page=4"
                                                    onClick={ (e) => e.preventDefault() }>4</a></li>
          <li className="hmcts-pagination__item"><a className="hmcts-pagination__link" href="/page=5"
                                                    onClick={ (e) => e.preventDefault() }>5</a></li>

          <li className="hmcts-pagination__item  hmcts-pagination__item--next">
            <a className="hmcts-pagination__link" href="/page=1" onClick={ (e) => e.preventDefault() }>Next<span
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