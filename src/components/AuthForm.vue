<template>
  <div class="form-container">
    <form
      :class="`form ${mode}`"
      @submit.prevent="$emit('auth-submit', validateFields(user))"
    >
      <div 
        v-if="isLoginMode"
        class="form-group"
      >
        <input
          v-model.trim="user.login"
          required
          type="text"
          class="form-control"
          :placeholder="'Login'"
        >
        <input
          v-model.trim="user.password"
          required
          type="password"
          class="form-control"
          :placeholder="'Password'"
        >
      </div>
      <div 
        v-if="isEditingMode"
        class="form-group"
      >
        <input
          id="name"
          required
          type="text"
          class="form-control"
          :placeholder="'Name'"
          :value="currentName"
          @change="onChange"
        >
        <input
          id="email"
          required
          type="email"
          class="form-control"
          :placeholder="'Email'"
          :value="currentEmail"
          @change="onChange"
        >
      </div>
      <div class="form-group">
        <button class="submit-btn auth">
          {{ settings.submitBtnTitle }}
        </button>
      </div>
    </form>
    <div
      v-if="errors"
      class="auth-errors"
    >
      <div
        class="auth-error"
      >
        {{ errors }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AuthForm',

  props: {
    mode: {
      type: String,
      default: 'login'
    }
  },

  data() {
    return {
      user: {
        name: null,
        login: null,
        email: null,
        password: null
      }
    };
  },

  computed: {
    ...mapGetters('user', {
      currentName: 'getName',
      currentEmail: 'getEmail',
      currentLogin: 'getLogin',
      currentPassword: 'getPassword'
    }),
    ...mapGetters('auth', { errors: 'getErrors' }),
    ...mapGetters('ui', { settingsList: 'getSettings' }),

    isLoginMode() {
      const { mode } = this;

      return mode === 'login';
    },
    
    isEditingMode() {
      const { mode } = this;

      return mode === 'editing';
    },

    settings() {
      const { settingsList, mode } = this;

      return settingsList[mode];
    }
  },

  mounted() {
    const { user, currentLogin } = this;

    user.login = currentLogin;
  },

  methods: {
    onChange(event) {
      const { user } = this;
      const { target: { id, value } } = event;

      user[id] = value;
    },

    validateFields(user) {
      const { currentName, currentEmail } = this;

      if (!user.name) user.name = currentName;
      if (!user.email) user.email = currentEmail;
    
      return user;
    } 
  }
}
</script>