<template>
  <div class='favorite-wrapper green-border'>
    <div>Quick Launch</div>
      <table class="table">
        <tr v-for="(site, index) in userSettings.favoriteSites" :key="site + index">
          <a :href="site.url" target="_blank">{{ site.name }}</a>
        </tr>
      </table>
  </div>
</template>

<script>
import userSettings from '../../userSettings.json';

export default {
  name: 'Header',
  data() {
    return {
      userSettings,
    };
  },
};
</script>

<style>
.favorite-wrapper {
  width: 300px;
  margin: 0 auto;
}

.current {
  border: 1px solid black;
}

.table {
  margin: 0 auto;
  text-align: left;
}

.table td {
  margin-right: 10px;
}
</style>
