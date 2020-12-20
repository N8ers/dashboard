<template>
  <div>
    <router-link to="/">
      <button>Back</button>
    </router-link>

    <button>LogOut</button>
    <br />

    <fieldset>
      <button>update</button>
      <label>User name:</label>
      <input type="text" v-model="userSettings.user.username" />
      <label>Location:</label>
      <input type="text" v-model="userSettings.user.location.name" />
      <input type="text" ref="search" v-model="location" />
    </fieldset>
  </div>
</template>

<script>
import userSettings from '../../userSettings.json';

export default {
  name: 'Settings',
  data() {
    return {
      userSettings,
      location: null,
    };
  },
  methods: {
    initLocationSearch() {
      const autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const updatedLocation = {
          city: place.address_components[0].long_name,
          state: place.address_components[2].long_name,
          country: place.address_components[3].long_name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lat(),
        };
        this.$store.dispatch('updateLocation', updatedLocation);
      });
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
