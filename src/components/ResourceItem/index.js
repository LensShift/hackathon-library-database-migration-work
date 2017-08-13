import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {List, ListItem} from 'material-ui/List';

import './index.css';

const ResourceItem = ({id, resource}) => (
  <div className="OneResourceContainer">
    <List>
      <ListItem primaryText={id} />
      {_.map(resource, (value, fieldName) => (
        <ListItem
          key={fieldName}
          primaryText={value}
          secondaryText={fieldName}/>
      ))}
    </List>
  </div>
);

ResourceItem.propTypes = {
  id: PropTypes.string.isRequired,
  resource: PropTypes.object.isRequired
}

export default ResourceItem;