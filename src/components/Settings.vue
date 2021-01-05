<template>
  <div>
    <div>
      <router-link to="/">
        <button class="btn-secondary mt-10 cursor-pointer">Back</button>
      </router-link>
      <button @click="logOutUser" class="btn-secondary ml-10 mt-10 cursor-pointer">
        LogOut
        <font-awesome-icon icon="sign-out-alt" />
      </button>
    </div>

    <div class="mt-20">
      <h3>We sent you a confirmation email!</h3>
      <h4>Once you confirm your email, you can sign in.</h4>
      <h5>If you need the email sent again,
        <span class="cursor-pointer green">click here!</span>
      </h5>
    </div>

    <fieldset :class="showDeleteAccountModal && 'opacity-half'">
      <div class="mb-10">
        <input type="text" v-model="displayName" class="form-input" />
        <button @click="updateDisplayName" class="btn-secondary form-btn cursor-pointer">
          Update display name
        </button>
      </div>

      <div>
        <input
          type="text"
          ref="search"
          class="form-input"
          :placeholder="location.address"
          v-model="location.address"
        />
        <button @click="setNewLocation" class="btn-secondary form-btn cursor-pointer">
          Update location
        </button>
      </div>

      <button
        @click="showDeleteAccountModal = !showDeleteAccountModal"
        class="btn-secondary mt-10 cursor-pointer"
      >delete account?</button>
    </fieldset>

    <div v-if="showDeleteAccountModal" class="mt-10">
      <h3 class="m-10">If you delete your account all user data will be destroyed</h3>
      <button
        @click="showDeleteAccountModal = false"
        class="btn-primary form-btn-tall cursor-pointer"
      >No, Don't Delete My Account</button>
      <button
        @click="deleteAccount"
        class="btn-secondary form-btn-tall cursor-pointer"
      >Yes, Delete My Account</button>
    </div>

    <br />
    <br />
    <br />
    <fieldset v-if="appIsInDevelopmentMode">
      <button @click="setTestData">reset test data</button>
      <button @click="sendEmailVerification">send email verification</button>
    </fieldset>
  </div>
</template>

<script>
import _clonedeep from 'lodash.clonedeep';

export default {
  name: 'Settings',
  data() {
    return {
      displayName: null,
      updatedLocation: null,
      showDeleteAccountModal: false,
      testData: {
        todoName: null,
      },
    };
  },
  methods: {
    initLocationSearch() {
      const autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.updatedLocation = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      });
    },
    updateDisplayName() {
      this.$store.dispatch('auth/updateDisplayName', this.displayName);
    },
    logOutUser() {
      this.$store.dispatch('auth/logout');
    },
    sendEmailVerification() {
      this.$store.dispatch('auth/verifyEmail');
    },
    deleteAccount() {
      this.$store.dispatch('auth/deleteAccount');
    },
    setTestData() {
      this.$store.dispatch('db/setDummyData');
    },
    setNewLocation() {
      this.$store.dispatch('db/setNewLocation', this.updatedLocation);
    },
  },
  computed: {
    location() {
      return _clonedeep(this.$store.state.db.location);
    },
    user() {
      return _clonedeep(this.$store.state.auth.user);
    },
    newUserConfirmationEmailSent() {
      return this.$store.state.auth.newUserConfirmationEmailSent;
    },
    appIsInDevelopmentMode() {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  created() {
    this.$store.dispatch('refreshData');
  },
};
</script>
