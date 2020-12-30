<template>
  <div class='m-20'>
      <h3 class="m-10">Quick Launch</h3>

      <button
        v-if="editMode"
        @click="updateQuickLinks"
        class="btn-primary mb-10 cursor-pointer"
      >
        <font-awesome-icon icon="save" />
      </button>
      <button
        v-if="!editMode"
        @click="editMode = !editMode"
        class="btn-primary mb-10 cursor-pointer"
      >
        <font-awesome-icon icon="edit" />
      </button>

      <div v-if="editMode" class="mb-10">
        <div v-for="(site, index) in clonedQuickLinks" :key="site + index" green-border>
          <input v-model="site.name" placeholder="name" class="form-input-sm" />
          <input v-model="site.url" placeholder="url" class="form-input-sm" />
          <button @click="removeQuickLink(index)" class="btn-secondary cursor-pointer">
            <font-awesome-icon icon="trash" />
          </button>
        </div>

        <div>
          <h3>add new quick link</h3>
          <input v-model="newLink.name" placeholder="name" class="form-input-sm" />
          <input v-model="newLink.url" placeholder="url" class="form-input-sm" />
          <button @click="addQuickLink" class="btn-secondary cursor-pointer">
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>

      <div v-if="!editMode">
        <span
          class="m-10"
          v-for="(site, index) in clonedQuickLinks"
          :key="site + index"
        >
          <button @click="launchFavorite(site.url)" class="btn-secondary cursor-pointer">
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
      this.clonedQuickLinks = _clonedeep(this.$store.state.db.quickLinks) || [];
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

</style>
