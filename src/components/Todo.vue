<template>
  <div class="todo-wrapper green-border">

    <h3 class="m-10">ToDo</h3>
    <button v-if="editMode" @click="editMode = !editMode">Save</button>
    <button v-if="!editMode" @click="editMode = !editMode">Edit</button>

    <div v-for="(todo, index) in userSettings.todo" :key="todo.index" class="todo">
      <div :class="index % 2 === 0 ? 'even-todo': 'odd-todo'" class="row">
        <input type="checkbox" v-model="todo.completed" />
        <input v-if="editMode" class="ml-10" type="text" v-model="todo.name" />
        <span v-if="!editMode" class="ml-10">{{ todo.name }}</span>
        <button v-if="editMode" @click="removeTodo(index)">remove</button>
      </div>
    </div>

    <div>
      <input type="text" v-model="newTodo" />
      <button @click="addTodo">add</button>
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
      editMode: false,
      newTodo: null,
    };
  },
  methods: {
    addTodo() {
      userSettings.todo.push({ completed: false, name: this.newTodo });
      this.newTodo = null;
    },
    removeTodo(todoIndex) {
      userSettings.todo.splice(todoIndex, 1);
    },
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
