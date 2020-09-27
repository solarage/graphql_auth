<template>
  <div id="app">
    <loader :loading="isLoading" />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from './components/Loader';

export default {
  name: 'App',
  components: {
    Loader
  },
  
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('ui', ['isLoading'])
  },

  async mounted() {
    const { check } = this;
    const authorized = await check();

    if (authorized) await this.init();
  },

  methods: {
    ...mapActions('user', ['init']),
    ...mapActions('auth', ['check'])
  } 
}
</script>