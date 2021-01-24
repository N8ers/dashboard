<template>
  <div
    class="todo-wrapper"
    @mouseover="mouseIsOverComponent = true"
    @mouseleave="mouseIsOverComponent = false"
  >
    <div class="title h-30">
      <h3 class="inline p-5">ToDo</h3>
      <button
        v-if="editMode"
        @click="updateTodos"
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

    <Spinner v-if="todosLoading" message="LOADING" />

    <div v-if="!todosLoading && !todosLength && !editMode" class="m-10 pt-10">
      <div>looks like you haven't added and todos yet!
         try clicking the pencil icon to add a new todo!</div>
    </div>

    <div v-for="(todo, index) in todos" :key="todo.index" class="todo">
      <div :class="index % 2 === 0 ? 'even-todo': 'odd-todo'" class="row">
        <input
          v-if="!editMode"
          type="checkbox"
          class="cursor-pointer m-8"
          v-model="todo.completed"
          @change="updateTodos"
        />
        <span
          v-if="!editMode"
          class="ml-10 cursor-pointer"
          @click="toggleCompleted(todo)"
          :class="todo.completed && 'completed-todo'"
        >{{ todo.name }}</span>

        <input v-if="editMode" class="ml-10 form-input-sm" type="text" v-model="todo.name" />
        <button
          v-if="editMode"
          @click="removeTodo(index)"
          class="btn-secondary cursor-pointer ml-4">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>

    <form v-if="editMode" class="todo row" @submit.prevent="addTodo">
      <input
        type="text"
        v-model="newTodo"
        class="ml-10 form-input-sm"
        placeholder="new todo..." />
      <button class="btn-secondary cursor-pointer ml-4">
        <font-awesome-icon icon="plus" />
      </button>
    </form>

  </div>
</template>

<script>
import _clonedeep from 'lodash.clonedeep';

import Spinner from './Spinner.vue';

export default {
  name: 'Todo',
  props: {
    todosLoading: {
      type: Boolean,
      required: false,
      default: null,
    },
    todos: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  components: {
    Spinner,
  },
  data() {
    return {
      editMode: false,
      newTodo: null,
      mouseIsOverComponent: false,
    };
  },
  methods: {
    addTodo() {
      const newTodo = { name: _clonedeep(this.newTodo), completed: false };
      this.$store.commit('db/addTodo', newTodo);
      this.newTodo = null;
    },
    removeTodo(todoIndex) {
      this.todos.splice(todoIndex, 1);
    },
    updateTodos() {
      this.editMode = false;
      this.$store.dispatch('db/updateTodos', this.todos);
    },
    toggleCompleted(completedTodo) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].name === completedTodo.name) {
          this.todos[i].completed = !completedTodo.completed;
        }
      }
    },
  },
  computed: {
    todosLength() {
      return this.todos?.length;
    },
  },
};
</script>
