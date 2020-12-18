<template>
  <div>
    <Header />
    <Favorite />

    <div class="row columns">
      <Todo />
      <Weather />
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
};
</script>

<style>
.columns {
  display: flex;
  justify-content: space-evenly;
}
</style>
