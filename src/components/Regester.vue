<template>
  <div>

    <h1>Just a few more steps and you'll be ready</h1>

    <div class="m-10">
      <label>select a display name: </label>
      <input type="text" v-model="displayName" class="form-input" />
      <div v-if="showDisplayNameError" class="error">you need a display name</div>
    </div>

    <div class="m-10">
      <label>select your location: </label>
      <input
          type="text"
          ref="search"
          class="form-input"
          v-model="location.address"
        />
      <div>(we don't do anything with this data, it's just to provide weather)</div>
      <div v-if="showLocationError" class="error">you need a location</div>
    </div>

    <div>
      <h3>we sent you a confirmation email, you'll need to confirm before continuing</h3>
      <h4>need us to sent the email again?</h4>
      <button @click="sendEmailVerification" class="btn-secondary form-btn-tall cursor-pointer">
        resend confirmation email
      </button>
      <div v-if="showEmailConfirmationError" class="error">you need to confirm your email</div>
    </div>

    <div>When you've completed the above steps login in!</div>
    <button @click="attemptSave" class="btn-secondary form-btn cursor-pointer">
      save!
    </button>

  </div>
</template>

<script>
export default {
  name: 'Regester',
  data() {
    return {
      displayName: null,
      location: {
        address: null,
        lat: null,
        lng: null,
      },
      showDisplayNameError: false,
      showLocationError: false,
      showEmailConfirmationError: false,
    };
  },
  methods: {
    initLocationSearch() {
      const autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log({ place });
        this.location = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      });
    },
    async attemptSave() {
      const emailVerified = await this.$store.dispatch('auth/getEmailValidationStatus');

      if (emailVerified && this.displayNameIsValid && this.locationIsValid) {
        const payload = { displayName: this.displayName, location: this.location };
        this.$store.dispatch('auth/completeRegerestration', payload);
      } else {
        this.showDisplayNameError = !this.displayNameIsValid;
        this.showLocationError = !this.locationIsValid;
        this.showEmailConfirmationError = emailVerified;
      }
    },
    sendEmailVerification() {
      this.$store.dispatch('auth/verifyEmail');
    },
  },
  computed: {
    displayNameIsValid() {
      if (this.displayName?.length) {
        return true;
      }
      return false;
    },
    locationIsValid() {
      if (this.location.address && this.location.lat && this.location.lng) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
};
</script>

<style>

</style>
