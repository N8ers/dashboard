<template>
  <div id="app">
    <!-- <div class="green">hi, green #19e0a3</div> -->
    <!-- <div class="gray green-background">hey, gray #454545</div> -->
    <router-view />
  </div>
</template>

<script>

export default {
  components: {},
  created() {},
};
</script>

<style>
* {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
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
.gray {
  color: #454545;;
}

.green-border {
  border: 1px solid #19e0a3;
}

.green-background {
  background-color: #19e0a3;
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

.ml-10 {
  margin-left: 10px;
}

.m-10 {
  margin: 10px;
}

.mt-10 {
  margin-top: 10px;
}

.mb-10 {
  margin-bottom: 10px;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: left;
}

.columns {
  display: flex;
  justify-content: space-evenly;
}

.column {
  margin: 20px;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 16px;
}

.btn-secondary {
  background-color: #2c3e50;
  color: #42b983;
  border: none;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 16px;
}

.gear-icon {
  height: 20px;
  width: 20px;
  float: right;
}

.cursor-pointer:hover {
  cursor: pointer;
}

</style>
