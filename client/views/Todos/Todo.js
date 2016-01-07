import React from 'react'
// import { Link } from 'react-router'
// import Icon from 'react-icon'
// import shield from 'function-shield'
import Component from 'redux-dgaf'
import style from './style.sass'
import actionsMeta from 'actions'

export class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired
  }
  static initialState = {
    editing: false
  }

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
      let todo = this.props.todo
      todo.text = text
      this.actions.saveTodo(todo)
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
        className={style.edit}
        defaultValue={this.props.todo.get('text')}
        autoFocus='true'
        onBlur={this.editComplete}
        onKeyDown={this.saveTodo} />
    }
    return <div className={style.view}>
      <input
        className={style.toggle}
        type='checkbox'
        checked={this.props.todo.get('completed')}
        onChange={this.toggle} />
      <label onDoubleClick={this.handleDoubleClick}>
        {this.props.todo.get('text')}
      </label>
      <button onClick={this.destroy} className={style.destroy} />
    </div>
  }
  render () {
    return <li className={{completed: this.props.todo.get('completed')}}>
      { this.getContent() }
    </li>
  }
}

export default Component.connect(actionsMeta, Todo)
