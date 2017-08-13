import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import './index.css';

const ResourceItem = ({id, resource}) => (
  <div className="OneResourceContainer">
    <List>
      <Divider />
      <ListItem primaryText={id} />
      <Divider />
      {_.map(resource, (value, fieldName) => (
        <ListItem
          key={fieldName}
          primaryText={value}
          secondaryText={fieldName}/>
      ))}
      <Divider />
    </List>
  </div>
);

ResourceItem.propTypes = {
  id: PropTypes.string.isRequired,
  resource: PropTypes.object.isRequired
}

export default ResourceItem;