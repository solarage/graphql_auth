<template>
  <Profile :mode="'editing'">
    <auth-form
      :mode="'editing'"
      @auth-submit="updateUser"
    />
  </Profile>
</template>

<script>
import { mapActions } from 'vuex';

import Profile from '@/layouts/Profile';
import AuthForm from '@/components/AuthForm';

export default {
  name: 'EditProfile',

  components: {
    Profile,
    AuthForm
  },

  methods: {
    ...mapActions('user', ['updateUser'])
  }
}
</script>
