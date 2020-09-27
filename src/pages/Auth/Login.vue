<template>
  <div class="auth-container">
    <div class="section-title">
      <h2>{{ settings.title }}</h2>
    </div>
  
    <auth-form
      :mode="'login'"
      @auth-submit="login"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AuthForm from '@/components/AuthForm'

export default {
  name: 'Login',

  components: {
    AuthForm
  },

  computed: {
    ...mapGetters('ui', { settings: 'getLoginSettings' })
  },

  methods: {
    ...mapActions('auth', ['login'])
  }
}
</script>