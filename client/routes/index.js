import React from 'react'
import { Route, IndexRoute } from 'react-router'
import HomeView from 'views/Home'
import AboutView from 'views/About'
import TodosView from 'views/Todos'

export default (
  <Route path='/'>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/todos' component={TodosView} />
  </Route>
)
