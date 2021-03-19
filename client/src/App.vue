<template>
  <div id="app" class="d-flex">
    <Home />
    <!-- <Login /> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
import Home from './views/Home'
// import Login from './views/Login'
export default {
  components: {
    Home
    // Login
  }
}
</script>

<style>

</style>
