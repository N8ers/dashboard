<template>
  <div>
    <h1 class="pt-100">Welcome to dashboard!</h1>

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
        <button class="btn-primary cursor-pointer" type="submit">Login!</button>
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
        <button class="btn-primary cursor-pointer">Signup!</button>
      </fieldset>
    </form>

    <!-- RECOVER PASSWORD -->
    <form v-if="showRecoverEmail">
      <fieldset class="auth-card">
        <input type="email" v-model="recovery.email" placeholder="email" class="auth-input" />
        <button
          @click='recoverPassword'
          class="btn-primary cursor-pointer"
        >send email to recover your password!</button>
        <div v-if="emailRecoverySent">An email will be sent shortly, check your inbox</div>
      </fieldset>
    </form>

    <!-- TOGGLE BUTTONS -->
    <button
      v-if="!showRecoverEmail"
      @click="toggleSignInSignUp"
      class="auth-button btn-secondary cursor-pointer"
    >
      <span v-if="showSignIn">need to create an account?</span>
      <span v-if="!showSignIn">already have an account?</span>
    </button>

    <button
      @click="showRecoverEmail = !showRecoverEmail"
      class="auth-button btn-secondary cursor-pointer"
    >
      <span v-if="!showRecoverEmail">forgot your password?</span>
      <span v-if="showRecoverEmail">sign in</span>
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
  created() {
    this.$store.dispatch('refreshData');
  },
};
</script>
