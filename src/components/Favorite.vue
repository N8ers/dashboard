<template>
  <div class='favorite-wrapper green-border'>
      <h3 class="m-10">Quick Launch</h3>

      <button v-if="editMode" @click="editMode = !editMode">Save</button>
      <button v-if="!editMode" @click="editMode = !editMode">Edit</button>

      <div v-if="editMode">
        <div v-for="(site, index) in userSettings.favoriteSites" :key="site + index" green-border>
          <label>name: </label>
          <input v-model="site.name" />
          <label>url: </label>
          <input v-model="site.url" />
        </div>
      </div>

      <div v-if="!editMode">
        <span
          class="green-border quick-link"
          v-for="(site, index) in userSettings.favoriteSites"
          :key="site + index"
        >
          <button @click="launchFavorite(site.url)">
            {{ site.name }}
          </button>
        </span>
      </div>

  </div>
</template>

<script>
import userSettings from '../../userSettings.json';

export default {
  name: 'Header',
  data() {
    return {
      editMode: false,
      userSettings,
    };
  },
  methods: {
    launchFavorite(url) {
      window.open(url, '_blank');
    },

  },
};
</script>

<style>
.favorite-wrapper {
  margin: 20px;
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

.quick-link {
  margin: 10px;
}

button {
  background-color: #454545;
  color:#19e0a3;
  text-align: center;
  text-decoration: none;
}

button:hover {
  cursor: pointer;
}
</style>
