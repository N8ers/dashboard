<template>
  <div class="green-border">
    <h1>Welcome to dashboard!</h1>

    <fieldset v-if="showSignIn && !showRecoverEmail" @submit.prevent="loginUser" class="auth-card">
      <input
        type="email"
        v-model="returningUser.email"
        placeholder="email"
        class="auth-input"
      />
      <input
        type="password"
        v-model="returningUser.password"
        placeholder="password"
        class="auth-input"
      />
      <button class="btn-primary">Login!</button>
    </fieldset>

    <fieldset
      v-if="!showSignIn && !showRecoverEmail"
      @submit.prevent="createUser"
      class="auth-card"
    >
      <input
        type="email"
        v-model="creatingUser.email"
        placeholder="email"
        class="auth-input"
      />
      <input
        type="password"
        v-model="creatingUser.password"
        placeholder="password"
        class="auth-input"
      />
      <button class="btn-primary">Signup!</button>
    </fieldset>

    <fieldset v-if="showRecoverEmail" class="auth-card">
      <input type="email" v-model="recovery.email" placeholder="email" class="auth-input" />
      <button
        @click='recoverPassword'
        class="btn-primary"
      >send email to recover your password!</button>
      <div v-if="emailRecoverySent">An email will be sent shortly, check your inbox</div>
    </fieldset>

    <button @click="toggleSignInSignUp" class="auth-button btn-secondary">
      <span v-if="showSignIn">need to create an account?</span>
      <span v-if="!showSignIn">already have an account?</span>
    </button>

    <button @click="showRecoverEmail = !showRecoverEmail" class="auth-button btn-secondary">
      forget your password?
    </button>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  data() {
    return {
      showSignIn: true,
      showRecoverEmail: false,
      emailRecoverySent: false,
      returningUser: {
        email: null,
        password: null,
      },
      creatingUser: {
        email: null,
        password: null,
      },
      recovery: {
        email: null,
      },
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch('auth/createUser', this.creatingUser);
    },
    loginUser() {
      this.$store.dispatch('auth/login', this.returningUser);
    },
    recoverPassword() {
      this.$store.dispatch('auth/sendRecoverPasswordEmail', this.recovery.email);
      this.emailRecoverySent = true;
    },
    toggleSignInSignUp() {
      this.showSignIn = !this.showSignIn;
    },
  },
  computed: {},
};
</script>

<style>
.auth-card {
  margin: 0 auto;
  border: 1px solid black;
  width: 500px;
}

.auth-input {
  margin: 10px auto;
  display: block;
  width: 300px;
}

.auth-button {
  margin: 10px auto;
  display: block;
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
</style>
