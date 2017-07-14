import React from 'react';
import PropTypes from 'prop-types';
import GoogleAnalytics from 'react-ga';
import config from 'config';

GoogleAnalytics.initialize(config.GA_ANALYTICS.TRACKING_ID, {
  debug: config.GA_ANALYTICS.DEBUG
});

const withGATracker = (WrappedComponent) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  const HOC = (props) => {
    const page = props.location.pathname + window.location.search;
    trackPage(page);

    return (
      <WrappedComponent {...props} />
    );
  };

  return HOC;
};

GoogleAnalytics.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withGATracker;
