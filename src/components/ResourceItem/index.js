import React from 'react';
import PropTypes from 'prop-types';

const ResourceItem = ({id, resource}) => (
  <span>{id}----{JSON.stringify(resource)}</span>
);

ResourceItem.propTypes = {
  id: PropTypes.string.isRequired,
  resource: PropTypes.object.isRequired
}

export default ResourceItem;