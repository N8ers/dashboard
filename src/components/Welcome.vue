<template>
  <div>
    <h1 class="welcome-header">Welcome to dashboard!</h1>

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

    <div v-if="!newUserConfirmationEmailSent">
      <h3>We sent you a confirmation email!</h3>
      <h4>Once you confirm your email, you can sign in.</h4>
      <h5>If you need the email sent again,
        <span class="cursor-pointer green" @click="verifyEmail">click here!</span>
      </h5>
    </div>

    <button @click="toggleSignInSignUp" class="auth-button btn-secondary cursor-pointer">
      <span v-if="showSignIn">need to create an account?</span>
      <span v-if="!showSignIn">already have an account?</span>
    </button>

    <button
      @click="showRecoverEmail = !showRecoverEmail"
      class="auth-button btn-secondary cursor-pointer">
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
    verifyEmail() {
      alert('I\'m not setup yet');
    },
  },
  computed: {
    newUserConfirmationEmailSent() {
      return this.$store.state.auth.newUserConfirmationEmailSent;
    },
  },
  created() {
    this.$store.dispatch('refreshData');
  },
};
</script>

<style>

</style>
