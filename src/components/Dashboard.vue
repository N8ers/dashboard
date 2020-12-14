<template>
  <div>
    Hello!
    <Header />
    <Todo />
    <Weather />
  </div>
</template>

<script>
import Header from './Header.vue';
import Todo from './Todo.vue';
import Weather from './Weather.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Todo,
    Weather,
  },
};
</script>
