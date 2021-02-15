import client from './client'

export function add(params: any) {
  return client.get('/add', { params })
}

export function remove(params: any) {
  return client.get('/remove', { params })
}

export function fetchPosts(params: any) {
  return client.get('/fetchPosts', { params })
}

export function signIn(data: any) {
  return client.post('/signIn', data)
}
