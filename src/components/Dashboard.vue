<template>
  <div>
    <router-link to="/settings">
      <button class="right-align-btn btn-secondary m-10 cursor-pointer">
        Settings
        <font-awesome-icon icon="cog" />
      </button>
    </router-link>

    <Header :displayName="user.displayName" />

    <Favorite :quickLinksLoading='quickLinksLoading' :quickLinks='quickLinks' />

    <div class="row columns">
      <Todo :todosLoading='todosLoading' :todos="todos" class="column" />
      <Weather :location="location" class="column" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Header from './Header.vue';
import Todo from './Todo.vue';
import Weather from './Weather.vue';
import Favorite from './Favorite.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Todo,
    Weather,
    Favorite,
  },
  methods: {},
  computed: {
    ...mapState('db', {
      location: (state) => state.location,
      todos: (state) => state.todos,
      todosLoading: (state) => state.todosLoading,
      quickLinks: (state) => state.quickLinks,
      quickLinksLoading: (state) => state.quickLinksLoading,
    }),
    ...mapState('auth', {
      user: (state) => state.user,
    }),
  },
  created() {
    if (!this.location?.address || !this.user?.displayName) {
      this.$router.replace('settings');
    }
  },
};
</script>
