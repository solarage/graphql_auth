<template>
  <div class="profile-wrapper">
    <header class="profile-header">
      <div class="user-name">
        {{ userName }}
      </div>
      <button 
        type="button" 
        class="logout-btn"
        @click="logout"
      >
        {{ logoutBtnTitle }}
      </button>
    </header>
    <div class="profile-container">
      <div class="section-title">
        <h2>{{ settings.title }}</h2>
      </div>

      <slot />

      <div class="btn-container">
        <router-link
          :to="navRoute"
          class="navigation-btn"
          tag="a"
        >
          {{ settings.navBtnTitle }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',

  props: {
    mode: {
      type: String,
      default: 'info'
    }
  },

  computed: {
    ...mapGetters('ui', {
      settingsList: 'getSettings',
      logoutBtnTitle: 'getLogoutBtnTitle'
    }),
    ...mapGetters('user', {
      userName: 'getName'
    }),

    settings() {
      const { settingsList, mode } = this;

      return settingsList[mode];
    },

    navRoute() {
      const { mode } = this;
      const route = (mode === 'info')
        ? { name: 'profile.edit' }
        : { name: 'profile.index' };
      
      return route;
    }
  },

  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>