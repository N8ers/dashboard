<template>
  <div
    class='favorite-wrapper'
    @mouseover="mouseIsOverComponent = true"
    @mouseleave="mouseIsOverComponent = false"
  >
    <div class="title h-30">
      <h3 class="inline">Quick Launch</h3>
      <button
        v-if="editMode"
        @click="updateQuickLinks"
        class="btn-primary mb-10 cursor-pointer right-align-btn"
      >
        <font-awesome-icon icon="save" />
      </button>
      <button
        v-if="!editMode && mouseIsOverComponent"
        @click="editMode = !editMode"
        class="btn-primary mb-10 cursor-pointer right-align-btn"
      >
        <font-awesome-icon icon="edit" />
      </button>
    </div>

    <Spinner v-if="quickLinksLoading" message="LOADING" />

    <div v-if="!quickLinksLoading && !quickLinksLength && !editMode" class="m-10 pt-10">
      <div>looks like you haven't added any quickLinks yet!</div>
      <div>quick links are like bookmarks.</div>
      <div>you set a name and the <b>full</b> url you want to go to.</div>
    </div>

    <div>
      <div v-if="editMode" class="mb-10">
        <div v-for="(site, index) in quickLinks" :key="site + index">
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
          v-for="(site, index) in quickLinks"
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

import Spinner from './Spinner.vue';

export default {
  name: 'Favorite',
  components: {
    Spinner,
  },
  props: {
    quickLinksLoading: {
      type: Boolean,
      required: false,
      default: null,
    },
    quickLinks: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      editMode: false,
      newLink: {
        name: null,
        url: null,
      },
      mouseIsOverComponent: false,
    };
  },
  methods: {
    addQuickLink() {
      const newLink = _clonedeep(this.newLink);
      this.$store.commit('db/addQuickLink', newLink);
      this.newLink.name = null;
      this.newLink.url = null;
    },
    launchFavorite(url) {
      window.open(url, '_blank');
    },
    updateQuickLinks() {
      this.editMode = !this.editMode;
      this.$store.dispatch('db/updateQuickLinks', this.quickLinks);
    },
    removeQuickLink(index) {
      this.quickLinks.splice(index, 1);
    },
  },
  computed: {
    quickLinksLength() {
      return this.quickLinks?.length;
    },
  },
};
</script>
