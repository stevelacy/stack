import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import classNames from 'classnames'
import './index.sass'

export class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired
  };

  static defaultState = {
    editing: false
  };

  destroy () {
    this.actions.deleteTodo(this.props.todo)
  }

  handleDoubleClick () {
    this.setState({editing: true})
  }

  toggle () {
    this.actions.toggleTodo(this.props.todo)
  }

  saveTodo (e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.actions.saveTodo(this.props.todo.set('text', text))
      this.editComplete()
    }
  }

  editComplete () {
    this.setState({editing: false})
  }

  getContent () {
    if (this.state.editing) {
      return <input
        ref='todo'
        className='edit'
        defaultValue={this.props.todo.get('text')}
        autoFocus='true'
        onBlur={this.editComplete}
        onKeyDown={this.saveTodo} />
    }
    return <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={this.props.todo.get('completed')}
        onChange={this.toggle} />
      <label onDoubleClick={this.handleDoubleClick}>
        {this.props.todo.get('text')}
      </label>
      <button onClick={this.destroy} className='destroy' />
    </div>
  }
  render () {
    var className = classNames({
      completed: this.props.todo.get('completed')
    })
    return <li className={className}>
      {this.getContent()}
    </li>
  }
}

export default Component.connect(Todo, require('core/actions'))
