/**
 *
 * OrderDetailContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOrderDetailContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export function OrderDetailContainer() {
  useInjectReducer({ key: 'orderDetailContainer', reducer });
  useInjectSaga({ key: 'orderDetailContainer', saga });

  return <div />;
}

OrderDetailContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  orderDetailContainer: makeSelectOrderDetailContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderDetailContainer);
