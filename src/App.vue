<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  components: {},
  created() {},
};
</script>

<style lang="scss">
@import './scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: white;
  background-color: #454545;
  min-height: 100vh;
  width: 100%;
}

</style>
