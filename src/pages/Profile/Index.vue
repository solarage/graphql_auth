<template>
  <Profile :mode="'info'">
    <profile-info />
  </Profile>
</template>

<script>
import Profile from '@/layouts/Profile';
import ProfileInfo from '@/pages/Profile/ProfileInfo';

export default {
  name: 'ProfileIndex',
  components: {
    Profile,
    ProfileInfo
  }
}
</script>