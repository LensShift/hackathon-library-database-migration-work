import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import _ from 'lodash';

import ResourceItem from '../../components/ResourceItem';
import FlexList from '../../components/FlexList';

class Todos extends Component {
  render() {
    const { resources } = this.props;
    console.info('resources_meta - straight from firebase', resources);

    // Build Todos list if resources exist and are loaded
    const resourcesList = !isLoaded(resources)
      ? 'Loading'
      : isEmpty(resources)
        ? 'resource list is empty'
        : _.map(Object.keys(resources),
            (key) => (
              <ResourceItem key={key} id={key} resource={resources[key]}/>
            )
          )
    const dummyKey = isLoaded(resources)
      ? Object.keys(resources)[0]
      : null
    if (dummyKey) {
      resourcesList.push(<ResourceItem key={Math.random().toString()} id={dummyKey} resource={resources[dummyKey]}/>);
    }

    return (
      <div>
        <h1>Todos</h1>
        <FlexList>
          {resourcesList}
        </FlexList>
        <input type="text" ref="newTodo" />
        <button onClick={this.handleAdd}>
          Add
        </button>
      </div>
    )
  }
}

const wrappedTodos = firebaseConnect([
  '/resource_meta'
])(Todos)

export default connect(
  ({firebase}) => ({
    resources: dataToJS(firebase, 'resource_meta'),
  })
)(wrappedTodos)