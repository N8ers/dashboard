<template>
  <div class="todo-wrapper green-border">
    <h3 class="m-10">ToDo</h3>
    <div v-for="(todo, index) in userSettings.todo" :key="todo.name" class="todo">
      <div :class="index % 2 === 0 ? 'even-todo': 'odd-todo'" class="row">
        <input type="checkbox" v-model="todo.completed" />
        <span class="ml-10">{{ todo.name }}</span>
      </div>
    </div>
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

<style>
.todo-wrapper {
  width: 400px;
}
.todo {
  text-align: left;
  width: 100%;
}
.even-todo {
  /* make this just a darker gray not black */
  background-color: #333333;
}
.odd-todo {
 background-color: #454545;
}
.row {
  padding: 5px;
}
</style>
