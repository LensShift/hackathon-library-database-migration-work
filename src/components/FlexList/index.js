import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const FlexList = ({children}) => (
  <div className="FlexList">
    {children}
  </div>
);

FlexList.propTypes = {
  children: PropTypes.node.isRequired
}

export default FlexList;