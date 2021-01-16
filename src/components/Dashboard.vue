<template>
  <div>
    <router-link to="/settings">
      <button class="right-align-btn btn-secondary m-10 cursor-pointer">
        Settings
        <font-awesome-icon icon="cog" />
      </button>
    </router-link>

    <Header />
    <Favorite />

    <div class="row columns">
      <Todo class="column" />
      <Weather class="column" />
    </div>
  </div>
</template>

<script>
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
};
</script>
