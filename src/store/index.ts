import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules/index'

export default createStore<any>({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: modules,
  plugins: [
    createPersistedState({
      key: 'vuex_localstorage_simple_counter',
      paths: ['counter.count']
    })
  ]
})
