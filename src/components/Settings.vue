<template>
  <div>
    <router-link to="/">
      <button>Back</button>
    </router-link>

    <button @click="logOutUser">LogOut</button>
    <br />

    <button @click="saveChanges">update</button>
    <br />

    {{ user }}

    <div v-if="!user.username">
      continue setting up profile by:
      <ul>
        <li>adding a user name</li>
        <li>setting your location for weather data (don't worry thats all we use it for)</li>
      </ul>
    </div>

    <fieldset>
      <label>User name:</label>
      <input type="text" v-model="username" />
      <button @click="updateUsername">update username</button>

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
      username: null,
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
      const updatedUser = { username: this.username, location: this.updatedLocation };
      this.$store.dispatch('updateUser', updatedUser);
    },
    updateUsername() {
      this.$store.dispatch('updateUsername', this.username);
    },
    logOutUser() {
      this.$router.replace('welcome');
    },
  },
  computed: {
    location() {
      return _clonedeep(this.$store.state.location);
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
    this.$store.dispatch('getUser');
  },
};
</script>

<style>

</style>
