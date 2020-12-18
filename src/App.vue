<template>
  <div id="app">
    <div class="green">hi, green #19e0a3</div>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';

export default {
  components: {
    Dashboard,
  },
};
</script>

<style>
* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: white;
  background-color: #454545;
  min-height: 100vh;
  width: 100%;
}

.green {
  color: #19e0a3;
}

.green-border {
  border: 1px solid #19e0a3;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
