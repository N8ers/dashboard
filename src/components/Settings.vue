<template>
  <div>
    <router-link to="/">
      <button>Back</button>
    </router-link>

    <button>LogOut</button>

    <fieldset>
      <div>Name:</div>
      <div>Email:</div>
      <div>Change location:</div>
    </fieldset>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  components: {
  },
};
</script>

<style>

</style>
