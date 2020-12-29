<template>
  <div>
    <router-link to="/settings">
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/17/17789.svg"
        class="gear-icon cursor-pointer"
      />
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
