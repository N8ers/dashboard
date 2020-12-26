<template>
  <div>
    <router-link to="/">
      <button>Back</button>
    </router-link>

    <button @click="logOutUser">LogOut</button>
    <br />

    <button @click="saveChanges">update</button>
    <br />

    <button @click="sendEmailVerification">send email verification</button>
    <br />

    <button @click="deleteAccount">delete account</button>
    <br />

    {{ user }}

    <div v-if="!user.displayName">
      continue setting up profile by:
      <ul>
        <li>adding a user name</li>
        <li>setting your location for weather data (don't worry thats all we use it for)</li>
      </ul>
    </div>

    <fieldset>
      <label>User name:</label>
      <input type="text" v-model="displayName" />
      <button @click="updateDisplayName">update display name</button>

      <label>Location:</label>
      <input
        type="text"
        ref="search"
        :placeholder="location.address"
        v-model="location.address"
      />
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
          lng: place.geometry.location.lat(),
        };
      });
    },
    saveChanges() {
      // this.$store.dispatch('updateLocation', this.updatedLocation);
      // const updatedUser = { displayName: this.displayName, location: this.updatedLocation };
      // this.$store.dispatch('updateUser', updatedUser);
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
  },
  computed: {
    location() {
      return _clonedeep(this.$store.state.location);
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
};
</script>

<style>

</style>
