<template>
  <div class="header-wrapper green-border">
    <h1>Welcome to dashboard!</h1>
    <fieldset>
      <label>email</label>
      <input type="email" v-model="returningUser.email" />
      <label>password</label>
      <input type="password" v-model="returningUser.password" />
      <button @click="loginUser">Login!</button>
    </fieldset>
    <hr />
    <fieldset>
      <label>email</label>
      <input type="email" v-model="creatingUser.email" />
      <label>password</label>
      <input type="password" v-model="creatingUser.password" />
      <button @click='createUser'>Signup!</button>
    </fieldset>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  data() {
    return {
      returningUser: {
        email: 'nathanraysheryak@gmail.com',
        password: 'test-123-asfab9972',
      },
      creatingUser: {
        email: 'nathanraysheryak@gmail.com',
        password: 'test-123-asfab9972',
      },
    };
  },
  methods: {
    createUser() {
      console.log('hello!');
      this.$store.dispatch('createUser', this.creatingUser);
    },
    loginUser() {
      this.$store.dispatch('login', this.returningUser);
    },
  },
  computed: {},
};
</script>

<style>

</style>
