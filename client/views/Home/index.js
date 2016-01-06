import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import Title from 'components/Title'
import style from './style.sass'
import actions from 'actions'

export class HomeView extends Component {
  getData (name) {
    var opt = { user: name }
    this.actions.getOrganizations({options: opt, requestId: 'orgs'})
    this.actions.getRepositories({options: opt, requestId: 'repos'})
    this.actions.getUser({options: opt, requestId: 'user'})
  }

  render () {
    var name = 'funkytek'
    var orgs = this.rootState.requests.orgs
    var repos = this.rootState.requests.repos
    var user = this.rootState.requests.user
    var fetching = !orgs || !repos || !user

    return (
      <div className={style.home}>
        <Icon glyph='fort-awesome' className={style.starIcon}/>
        <Title>FactoryX Stack Test Page</Title>
        <div>
          Sample Counter:
          <Title className={style.counter}>{this.rootState.counter}</Title>
        </div>
        <div className={style.buttons}>
          <button onClick={shield(this.actions.incrementCounter)} className={style.actionButton}>
            Increment
          </button>
          <button onClick={shield(this.actions.decrementCounter)} className={style.actionButton}>
            Decrement
          </button>
          <button onClick={this.getData.bind(null, name)} className={style.actionButton}>
            Get GH Data
          </button>
        </div>
        <div className={style.githubData}>
          {
            fetching ? (<Title>No GH Data</Title>) : (
              <div>
                <div className={style.list}>
                  <Title>User Info</Title>
                  <img src={user.avatar_url} className={style.userImage}/>
                  <div className={style.listItem}>{user.name}</div>
                </div>
                <ul className={style.list}>
                  <Title>{orgs.length} organizations</Title>
                  {
                    orgs.map((org) =>
                      <li className={style.listItem} key={org.id}>{org.login}</li>
                    )
                  }
                </ul>
                <ul className={style.list}>
                  <Title>{repos.length} repositories</Title>
                  {
                    repos.map(repo =>
                      <li className={style.listItem} key={repo.id}>{repo.full_name} - Issues: {repo.open_issues}</li>
                    )
                  }
                </ul>
              </div>
            )
          }
        </div>
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default Component.connect(actions, HomeView)
