<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Counter />
    <Auth />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Counter from '@/components/Counter.vue' // @ is an alias to /src
import Auth from '@/components/Auth.vue' // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
    Counter,
    Auth
  }
})
export default class Home extends Vue {}
</script>
