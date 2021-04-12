<template>
  <div>
    {{ storeCount }}
    <button @click="increment">increment</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    // store count
    const storeCount = computed(() => store.state.counter.count)

    // store count add
    const storeIncrement = (payload: any) =>
      store.commit('counter/INCREMENT', payload)

    const storeIncrementAsync = (payload: any) =>
      store.dispatch('counter/incrementAsync', payload)

    // btn add count
    const increment = () => {
      storeIncrement({ value: 'hello' })
    }

    const incrementAsync = () => {
      storeIncrementAsync({ value: 'hello' })
    }

    return {
      storeCount,
      increment,
      incrementAsync
    }
  }
})
</script>
