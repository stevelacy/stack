import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.scss'
import actions from 'actions'

export class HomeView extends Component {
  render () {
    let store = this.getStore()
    let actions = this.getActions()
    let orgs = this.getCollection('organization')

    return (
      <div className={style.home}>
        <Icon glyph='star'/>
        <Title>FactoryX Stack Test Page</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{store.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(actions.increment)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(actions.decrement)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={shield(actions.double)} className={style.actionButton}>
            Double
          </button>
          <button onClick={shield(actions.zero)} className={style.actionButton}>
            Zero (Hose)
          </button>
          <button onClick={shield(actions.getOrgs)} className={style.actionButton}>
            Get Orgs
          </button>
        </div>
        <ul className={style.repoList}>
          <div>{orgs.length} repositories</div>
          {
            orgs.map((org) =>
              <li className={style.repo} key={org.id}>{org.login}</li>
            )
          }
        </ul>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(actions, HomeView)
