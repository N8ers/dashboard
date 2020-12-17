<template>
  <div>
    <div>ToDo</div>
    <ul v-for="todo in userSettings.todo" :key="todo.name">
      <li>{{ todo.name }} | done: {{ todo.completed }}</li>
    </ul>
  </div>
</template>

<script>
import userSettings from '../../userSettings.json';

export default {
  name: 'Todo',
  data() {
    return {
      userSettings,
    };
  },
};
</script>
