import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import IPropTypes from 'immutable-props'
import Component from 'redux-dgaf'
import jif from 'jif'
import Todo from './Todo'
import shield from 'function-shield'
import classNames from 'classnames'
import './index.sass'

const ascending = (a, b) => a - b
const filters = {
  All: () => true,
  Active: (i) => !i.get('completed'),
  Completed: (i) => i.get('completed')
}

export class TodosView extends Component {
  static displayName = 'TodosView';
  static defaultState = {
    addError: false
  };
  static propTypes = {
    params: PropTypes.object.isRequired,
    todos: IPropTypes.Map.isRequired,
    toggled: PropTypes.bool.isRequired
  };
  static cursors = {
    todos: 'todomvc.items',
    toggled: 'todomvc.toggle'
  };

  addTodo (e) {
    var el = this.refs.todoInput

    if (e.keyCode === 13) {
      let val = el.value.trim()
      if (val === '') {
        return this.setState({addError: true})
      }

      this.actions.addTodo(val)
      el.value = ''
      el.focus()
      this.setState({addError: false})
    }
  }

  resetErrors () {
    this.setState({addError: false})
  }

  render () {
    var filterFn = filters[this.props.params.filter || 'All']
    return (
      <div className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className={
              classNames('new-todo', {
                'input-error': this.state.addError
              })
            }
            ref='todoInput'
            onKeyDown={this.addTodo}
            onBlur={this.resetErrors}
            type='text'
            placeholder='What needs to be done?' />
        </header>
        <section className='main'>
          {
            jif(this.props.todos.size, () =>
              <input
                className='toggle-all'
                type='checkbox'
                onChange={this.actions.toggleAllTodos} />
            )
          }
          <ul className='todo-list'>
            {
              this.props.todos
                .filter(filterFn)
                .sort(i => i.get('created'), ascending)
                .map((todo, id) =>
                  <Todo todo={todo} key={id} />
                ).toArray()
            }
          </ul>
        </section>
        {
          jif(this.props.todos.size, () =>
            <footer className='footer'>
              <span className='todo-count'>
                {this.props.todos.filter(filters.Active).size} items left
              </span>
              <ul className='filters'>
              {
                Object.keys(filters).map((k) =>
                  <li key={k}>
                    <Link
                      to={`/todos/${k}`}
                      className={
                        classNames({
                          selected: this.props.params.filter === k
                        })
                      }>{k}</Link>
                  </li>
                )
              }
              </ul>
              {
                jif(this.props.todos.filter(filters.Completed).size, () =>
                  <button
                    onClick={shield(this.actions.clearCompletedTodos)}
                    className='clear-completed'>
                    Clear completed
                  </button>
                )
              }
            </footer>
          )
        }
      </div>
    )
  }

}

export default Component.connect(TodosView, require('core/actions'))
