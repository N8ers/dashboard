<template>
  <div class='favorite-wrapper'>
    <div class="title h-30">
      <h3 class="inline">Quick Launch</h3>
      <button
        v-if="editMode"
        @click="updateQuickLinks"
        class="btn-primary mb-10 cursor-pointer pull-right"
      >
        <font-awesome-icon icon="save" />
      </button>
      <button
        v-if="!editMode"
        @click="editMode = !editMode"
        class="btn-primary mb-10 cursor-pointer pull-right"
      >
        <font-awesome-icon icon="edit" />
      </button>
    </div>

    <Loading v-if="$store.state.db.quickLinksLoading" />

    <div>
      <div v-if="editMode" class="mb-10">
        <div v-for="(site, index) in clonedQuickLinks" :key="site + index">
          <input v-model="site.name" placeholder="name" class="form-input-sm" />
          <input v-model="site.url" placeholder="url" class="form-input-sm" />
          <button @click="removeQuickLink(index)" class="btn-secondary cursor-pointer">
            <font-awesome-icon icon="trash" />
          </button>
        </div>

        <form @submit.prevent="addQuickLink">
          <h3>add new quick link</h3>
          <input v-model="newLink.name" placeholder="name" class="form-input-sm" />
          <input v-model="newLink.url" placeholder="url" class="form-input-sm" />
          <button class="btn-secondary cursor-pointer">
            <font-awesome-icon icon="plus" />
          </button>
        </form>
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

  </div>
</template>

<script>
import _clonedeep from 'lodash.clonedeep';

import Loading from './Loading.vue';

export default {
  name: 'Favorite',
  components: {
    Loading,
  },
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
