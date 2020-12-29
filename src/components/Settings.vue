<template>
  <div>
    <div>
      <router-link to="/"><button class="btn-secondary mt-10">Back</button></router-link>
      <button @click="logOutUser" class="btn-secondary ml-10 mt-10">LogOut</button>
    </div>

    <fieldset>
      <div class="mb-10">
        <input type="text" v-model="user.displayName" class="form-input" />
        <button @click="updateDisplayName" class="btn-secondary form-btn">
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
        <button @click="setNewLocation" class="btn-secondary form-btn">Update location</button>
      </div>
    </fieldset>

    <button @click="deleteAccount" class="btn-secondary">delete account?</button>

    <br />
    <br />
    <br />
    <fieldset>
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
  },
  mounted() {
    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  created() {
    this.$store.dispatch('refreshData');
  },
};
</script>

<style>

</style>
