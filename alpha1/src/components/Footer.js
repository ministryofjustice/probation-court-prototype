import React from 'react'

function Footer () {
  return (
    <footer className="hmcts-footer" role="contentinfo">

      <div className="hmcts-footer__container">

        <h2 className="hmcts-footer__heading">Help</h2>
        <ul className="hmcts-footer__list">
          <li className="hmcts-footer__list-item"><a className="hmcts-footer__link"
                                                            href="/feedback" onClick={ (e) => e.preventDefault() }>Submit feedback</a></li>

        </ul>

        <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"/>

        <ul className="hmcts-footer__list hmcts-footer__list--inline">

          <li className="hmcts-footer__list-item">
            <a className="hmcts-footer__link" href="/terms" onClick={ (e) => e.preventDefault() }>Terms and conditions</a>
          </li>

          <li className="hmcts-footer__list-item">
            <a className="hmcts-footer__link" href="/cookies" onClick={ (e) => e.preventDefault() }>Cookies</a>
          </li>

          <li className="hmcts-footer__list-item">
            <a className="hmcts-footer__link" href="/privacy" onClick={ (e) => e.preventDefault() }>Privacy policy</a>
          </li>

        </ul>

      </div>

    </footer>
  )
}

export default Footer
