<template>
  <div 
    v-show="loading"
    class="loader-wrapper"
  >
    <div class="loader">
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>