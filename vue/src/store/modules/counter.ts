import {
  ActionContext,
  MutationTree,
  ActionTree,
  GetterTree,
  Module
} from 'vuex'
export interface State {
  count: number;
}

const factoryState = () => ({
  count: 0
})

const state: State = factoryState()

const mutations: MutationTree<State> = {
  INCREMENT(state: State, payload: any) {
    console.log('payload', payload)
    state.count++
  }
}

const actions: ActionTree<State, any> = {
  incrementAsync(
    context: ActionContext<State, any>,
    payload: { value: string }
  ) {
    console.log('payload', payload)

    setTimeout(() => {
      context.commit('INCREMENT', payload)
    }, 2000)
  }
}

const getters: GetterTree<State, any> = {}

const todoModules: Module<State, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default todoModules
