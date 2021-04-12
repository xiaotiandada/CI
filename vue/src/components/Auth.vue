<template>
  <div style="border: 1px solid #333;">
    <h1>Auth</h1>
    <form action="" onsubmit="return false;">
      <div>
        <label for="">
          <input type="text" v-model="account">
        </label>
      </div>
      <div>
        <label for="">
          <input type="text" v-model="password">
        </label>
      </div>
      <button @click="signInEvent">Sign in</button>
    </form>

    <hr>

    <button @click="addEvent">add</button>
    <button @click="removeEvent">remove</button>
    <button @click="fetchPostsEvent">fetchPosts</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { add, remove, fetchPosts, signIn } from '../api/index'

interface StateProps {
  account: string
  password: string
}

export default defineComponent({
  setup() {

    const state: StateProps = reactive({
      account: 'admin',
      password: '1234567'
    })

    const addEvent = async (): Promise<void> => {
      await add({})
    }
    const removeEvent = async (): Promise<void> => {
      await remove({})
    }
    const fetchPostsEvent = async (): Promise<void> => {
      await fetchPosts({})
    }

    const signInEvent = async () => {
      const result = await signIn({
        account: state.account,
        password: state.password
      })
      console.log('result', result)
    }

    const stateRefs = toRefs(state)
    return {
      ...stateRefs,
      addEvent,
      removeEvent,
      fetchPostsEvent,
      signInEvent
    }
  }
})
</script>