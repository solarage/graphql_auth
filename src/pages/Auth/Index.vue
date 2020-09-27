<template>
  <div class="auth-wrapper">
    <login />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Login from './Login';

export default {
  name: 'AuthIndex',

  components: {
    Login
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },

  mounted() {
    const { $router: router, isAuthenticated } = this;

    if (isAuthenticated)
      router.push({ name: 'profile.index' });
  },
}
</script>