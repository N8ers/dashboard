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
    <fieldset>
      <div>forget your passowrd?</div>
      <label>email</label>
      <input type="email" v-model="recovery.email" />
      <button @click='recoverPassword'>send email to recover your password!</button>
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
        password: 'newPassword123',
      },
      creatingUser: {
        email: 'nathanraysheryak@gmail.com',
        password: 'newPassword123',
      },
      recovery: {
        email: 'nathanraysheryak@gmail.com',
      },
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch('createUser', this.creatingUser);
    },
    loginUser() {
      this.$store.dispatch('login', this.returningUser);
    },
    recoverPassword() {
      this.$store.dispatch('sendRecoverPasswordEmail', this.recovery.email);
    },
  },
  computed: {},
};
</script>

<style>

</style>
