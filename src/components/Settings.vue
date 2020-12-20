<template>
  <div>
    <router-link to="/">
      <button>Back</button>
    </router-link>

    <button>LogOut</button>
    <br />

    <button @click="saveChanges">update</button>
    <br />

    <fieldset>
      <label>User name:</label>
      <input type="text" />
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
      this.$store.dispatch('updateLocation', this.updatedLocation);
    },
  },
  computed: {
    location() {
      return _clonedeep(this.$store.state.user.location);
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
