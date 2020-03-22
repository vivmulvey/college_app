<template>
  <div>
    <MyNavbar />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
<script>
import MyNavbar from './components/MyNavbar'

export default {
  name: 'app',
  components: {
    MyNavbar
  },
  data() {
    return {

    }
  }
}
</script>
<style>
</style>
