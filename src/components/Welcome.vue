<template>
  <div class="grid-container">

    <div class="grid-item-1">
      <div>
        <h1 v-if="showSignIn" class="pt-100 align-left pl-28">Sign In</h1>
        <h1 v-if="!showSignIn" class="pt-100 align-left pl-28">Sign Up</h1>
        <!-- LOG IN -->
        <form v-if="showSignIn && !showRecoverEmail" @submit.prevent="loginUser">
          <fieldset class="auth-card">
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
            <button class="btn-primary cursor-pointer w-320" type="submit">Login!</button>
            <div v-if="loginErrorMessage" class="error">{{ loginErrorMessage }}</div>
          </fieldset>
        </form>

        <!-- SIGN UP -->
        <form v-if="!showSignIn && !showRecoverEmail" @submit.prevent="createUser">
          <fieldset class="auth-card">
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
            <button class="btn-primary cursor-pointer w-320">Signup!</button>
            <div v-if="signupErrorMessage" class="error">{{ signupErrorMessage }}</div>
          </fieldset>
        </form>

        <!-- RECOVER PASSWORD -->
        <form v-if="showRecoverEmail">
          <fieldset class="auth-card">
            <input type="email" v-model="recovery.email" placeholder="email" class="auth-input" />
            <button
              @click='recoverPassword'
              class="btn-primary cursor-pointer w-320"
            >send email to recover your password!</button>
            <div v-if="emailRecoverySent">An email will be sent shortly, check your inbox</div>
          </fieldset>
        </form>

        <!-- TOGGLE BUTTONS -->
        <button
          v-if="!showRecoverEmail"
          @click="toggleSignInSignUp"
          class="auth-button btn-secondary cursor-pointer w-320"
        >
          <span v-if="showSignIn">Create an account</span>
          <span v-if="!showSignIn">already have an account?</span>
        </button>

        <button
          @click="showRecoverEmail = !showRecoverEmail"
          class="auth-button btn-lite cursor-pointer w-320"
        >
          <span v-if="!showRecoverEmail">forgot your password?</span>
          <span v-if="showRecoverEmail">sign in</span>
        </button>
      </div>
    </div>

    <div class="grid-item-2">
      <h1 class="pt-100">Welcome to dashboard!</h1>
      <p class="welcome-message">
        Dashboard is a landing page to help organize your day! <br>
        You can save your favorite links for fast access, <br>
        keep track of your todos, and get a peek at the weather
      </p>
      <img class="welcome-img" src="../../public/welcome.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  computed: {
    ...mapState('auth', {
      loginErrorMessage: (state) => state.loginErrorMessage,
      signupErrorMessage: (state) => state.signupErrorMessage,
    }),
  },
  created() {
    this.$store.dispatch('refreshData');
  },
};
</script>
