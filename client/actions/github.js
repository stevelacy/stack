import createAPIAction from 'redux-api-actions'
import { Schema } from 'normalizr'

const user = new Schema('user')
const organization = new Schema('organization')
const repository = new Schema('repository')

export const getUser = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}`,
  method: 'GET',
  model: user
})

export const getOrganizations = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/orgs`,
  method: 'GET',
  collection: true,
  model: organization
})

export const getRepositories = createAPIAction({
  endpoint: ({user}) => `https://api.github.com/users/${user}/repos`,
  method: 'GET',
  collection: true,
  model: repository
})
