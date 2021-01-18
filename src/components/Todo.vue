<template>
  <div class="todo-wrapper">
    <div class="title h-30">
      <h3 class="inline">ToDo</h3>
      <button
        v-if="editMode"
        @click="updateTodos"
        class="btn-primary mb-10 cursor-pointer right-align-btn"
      >
        <font-awesome-icon icon="save" />
      </button>
      <button
        v-if="!editMode"
        @click="editMode = !editMode"
        class="btn-primary mb-10 cursor-pointer right-align-btn"
      >
        <font-awesome-icon icon="edit" />
      </button>
    </div>

    <Loading v-if="todosLoading" />

    <div v-if="!todosLoading && !todosLength && !editMode" class="m-10 pt-10">
      <div>looks like you haven't added and todos yet!
         try clicking the pencil icon to add a new todo!</div>
    </div>

    <div v-for="(todo, index) in todos" :key="todo.index" class="todo">
      <div :class="index % 2 === 0 ? 'even-todo': 'odd-todo'" class="row">
        <input
          v-if="!editMode"
          type="checkbox"
          class="cursor-pointer"
          v-model="todo.completed"
          @change="updateTodos"
        />
        <span
          v-if="!editMode"
          class="ml-10"
          :class="todo.completed && 'completed-todo'"
        >{{ todo.name }}</span>

        <input v-if="editMode" class="ml-10 form-input-sm w-300" type="text" v-model="todo.name" />
        <button v-if="editMode" @click="removeTodo(index)" class="btn-secondary cursor-pointer">
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </div>

    <form v-if="editMode" class="todo row" @submit.prevent="addTodo">
      <input
        type="text"
        v-model="newTodo"
        class="ml-10 form-input-sm w-300"
        placeholder="new todo..." />
      <button class="btn-secondary cursor-pointer">
        <font-awesome-icon icon="plus" />
      </button>
    </form>

  </div>
</template>

<script>
import _clonedeep from 'lodash.clonedeep';

import Loading from './Loading.vue';

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
    Loading,
  },
  data() {
    return {
      editMode: false,
      newTodo: null,
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
  },
  computed: {
    todosLength() {
      return this.todos?.length;
    },
  },
};
</script>
