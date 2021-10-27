import React from 'react';
import Link from 'next/link';
import {
  CONTENT_POLICY_ENDPOINT,
  PRIVACY_POLICY_ENDPOINT,
  TAKEDOWN_POLICY_ENDPOINT,
  TERMS_AND_CONDITIONS_ENDPOINT,
  USER_AGREEMENT_ENDPOINT,
} from '../../constants';

const Footer = () => {
  return (
    <section className="footer-links">
      <div className="links__left">
        <Link href={TERMS_AND_CONDITIONS_ENDPOINT}>
          <a>Terms and Conditions</a>
        </Link>
        <Link href={USER_AGREEMENT_ENDPOINT}>
          <a>User Agreement</a>
        </Link>
        <Link href="mailto:contact@nuzpapr.com">
          <a>Contact Us</a>
        </Link>
      </div>
      <div className="links__right">
        <Link href={PRIVACY_POLICY_ENDPOINT}>
          <a>Privacy Policy</a>
        </Link>
        <Link href={CONTENT_POLICY_ENDPOINT}>
          <a>Content Policy</a>
        </Link>
        <Link href={TAKEDOWN_POLICY_ENDPOINT}>
          <a>Takedown Policy</a>
        </Link>
      </div>
    </section>
  );
};

export default Footer;
