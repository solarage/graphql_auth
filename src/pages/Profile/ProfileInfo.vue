<template>
  <div class="info-container">
    <div class="info-list-container">
      <ul class="info-list">
        <li class="info-list-item login">
          Login: {{ login }}
        </li>
        <li class="info-list-item name">
          Name: {{ name }}
        </li>
        <li class="info-list-item email">
          Email: {{ email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileInfo',
  
  computed: {
    ...mapGetters('user', {
      login: 'getLogin',
      name: 'getName',
      email: 'getEmail'
    })
  }
}
</script>