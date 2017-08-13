import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

const TodoItem = ({id, todo}) => (
  <li>
    <span>{id}||{todo.done.toString()}||{todo.text}</span>
  </li>
)

class Todos extends Component {

  handleAdd = () => {
    const {newTodo} = this.refs
    const { firebase } = this.props
    // Add a new todo to firebase
    firebase.push('/todos', { text: newTodo.value, done: false })
    newTodo.value = ''
  }

  render() {
    const { todos } = this.props;

    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : Object.keys(todos).map(
            (key, id) => (
              <TodoItem key={key} id={id} todo={todos[key]}/>
            )
          )
    console.info(todos);

    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={this.handleAdd}>
          Add
        </button>
      </div>
    )
  }
}

const wrappedTodos = firebaseConnect([
  '/todos'
])(Todos)

export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)(wrappedTodos)