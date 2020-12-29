<template>
  <div class='favorite-wrapper green-border'>
      <h3 class="m-10">Quick Launch</h3>

      <button v-if="editMode" @click="updateQuickLinks" class="btn-primary mb-10">
        <font-awesome-icon icon="save" class="cursor-pointer" />
      </button>
      <button v-if="!editMode" @click="editMode = !editMode" class="btn-primary mb-10">
        <font-awesome-icon icon="edit" class="cursor-pointer" />
      </button>

      <div v-if="editMode" class="mb-10">
        <div v-for="(site, index) in clonedQuickLinks" :key="site + index" green-border>
          <label>name: </label>
          <input v-model="site.name" />
          <label>url: </label>
          <input v-model="site.url" />
          <button @click="removeQuickLink(index)" class="btn-secondary">
            <font-awesome-icon icon="trash" class="cursor-pointer" />
          </button>
        </div>
        <div>
          <h3>add new quick link</h3>
          <label>name: </label>
          <input v-model="newLink.name" />
          <label>url: </label>
          <input v-model="newLink.url" />
          <button @click="addQuickLink" class="btn-secondary">
            <font-awesome-icon icon="plus" class="cursor-pointer" />
          </button>
        </div>
      </div>

      <div v-if="!editMode">
        <span
          class="green-border quick-link"
          v-for="(site, index) in clonedQuickLinks"
          :key="site + index"
        >
          <button @click="launchFavorite(site.url)" class="btn-secondary">
            {{ site.name }}
          </button>
        </span>
      </div>

  </div>
</template>

<script>
import _clonedeep from 'lodash.clonedeep';

export default {
  name: 'Favorite',
  data() {
    return {
      editMode: false,
      clonedQuickLinks: [],
      newLink: {
        name: null,
        url: null,
      },
    };
  },
  methods: {
    addQuickLink() {
      const newLink = _clonedeep(this.newLink);
      this.clonedQuickLinks.push(newLink);
      this.newLink.name = null;
      this.newLink.url = null;
    },
    launchFavorite(url) {
      window.open(url, '_blank');
    },
    updateQuickLinks() {
      this.editMode = !this.editMode;
      this.$store.dispatch('db/updateQuickLinks', this.clonedQuickLinks);
    },
    removeQuickLink(index) {
      this.clonedQuickLinks.splice(index, 1);
    },
    setClonedQuickLinks() {
      this.clonedQuickLinks = _clonedeep(this.$store.state.db.quickLinks);
    },
  },
  computed: {},
  created() {
    this.setClonedQuickLinks();
  },
  watch: {
    '$store.state.db.quickLinks': function () {
      this.setClonedQuickLinks();
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
