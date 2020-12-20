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
      <input type="text" v-model="userSettings.username" />
      <label>Location:</label>
      <input type="text" v-model="userSettings.location" />
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
    };
  },
};
</script>

<style>

</style>
