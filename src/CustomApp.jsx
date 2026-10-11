import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectors } from 'data/redux';

import DemoWarning from 'containers/DemoWarning';
import ListView from 'containers/ListView';
import { MathJaxContext } from 'better-react-mathjax';

import './App.scss';
import Head from './components/Head';
import CustomCourseHeader from './components/CustomCourseHeader';
import { mathJaxConfig } from './utils';

export const App = ({ courseMetadata, isEnabled }) => (
  <div>
    <Head />
    <CustomCourseHeader courseTitle={courseMetadata.title} />
    {!isEnabled && <DemoWarning />}
    <main id="main" data-testid="main" tabIndex={-1}>
      <MathJaxContext config={mathJaxConfig}>
        <ListView />
      </MathJaxContext>
    </main>
  </div>
);
App.defaultProps = {
  courseMetadata: {
    title: '',
    number: null,
    org: '',
  },
};
App.propTypes = {
  courseMetadata: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.string,
    org: PropTypes.string,
  }),
  isEnabled: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => ({
  courseMetadata: selectors.app.courseMetadata(state),
  isEnabled: selectors.app.isEnabled(state),
});

export default connect(mapStateToProps)(App);
