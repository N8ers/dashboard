<template>
  <div class="pt-100">
    <h3>we sent you a confirmation email, you'll need to confirm before continuing</h3>

    <div>
      <h4>need us to sent the email again?</h4>
      <button @click="sendEmailVerification" class="btn-secondary form-btn-tall cursor-pointer">
        resend confirmation email
      </button>
    </div>

    <div>Once you've confirmed your email, try loging in!</div>
    <router-link to="/welcome">
      <button class="btn-secondary m-10 cursor-pointer">
        <font-awesome-icon icon="arrow-left" />
        Login
      </button>
    </router-link>

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
    };
  },
  methods: {
    initLocationSearch() {
      const autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.location = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      });
    },
    sendEmailVerification() {
      this.$store.dispatch('auth/sendVerifcationEmail');
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
