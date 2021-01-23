import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import _clonedeep from 'lodash.clonedeep';

Vue.use(Vuex);

export default ({
  namespaced: true,
  state: {
    location: {
      address: null,
      lat: null,
      lng: null,
    },
    todos: [],
    quickLinks: [],
    todosLoading: false,
    quickLinksLoading: false,
    savingLocation: null,
  },
  mutations: {
    setUserData(state, { location, todos, quickLinks }) {
      state.location = location;
      state.todos = todos;
      state.quickLinks = quickLinks;
    },
    clearDataState(state) {
      state.location = {
        address: null,
        lat: null,
        lng: null,
      };
      state.todos = [];
      state.quickLinks = [];
    },
    setTodosLoading(state, bool) {
      state.todosLoading = bool;
    },
    setLinksLoadingLoading(state, bool) {
      state.quickLinksLoading = bool;
    },
    addTodo(state, newTodo) {
      if (!state.todos) {
        state.todos = [];
      }
      const todos = _clonedeep(state.todos);
      todos.push(newTodo);
      state.todos = todos;
    },
    addQuickLink(state, newQuickLink) {
      if (!state.quickLinks) {
        state.quickLinks = [];
      }
      const quickLinks = _clonedeep(state.quickLinks);
      quickLinks.push(newQuickLink);
      state.quickLinks = quickLinks;
    },
    setSavingLocation(state, bool) {
      state.savingLocation = bool;
    },
  },
  actions: {
    setNewLocation(context, location) {
      this.commit('db/setSavingLocation', true);
      const user = firebase.auth().currentUser;
      return firebase.database().ref(`users/${user.uid}`).child('location').set(location)
        .then(() => this.dispatch('db/getUserData'))
        .finally(() => this.commit('db/setSavingLocation', false));
    },
    updateQuickLinks(context, quickLinks) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('quickLinks').set(quickLinks);
      this.dispatch('db/getUserData');
    },
    updateTodos(context, todos) {
      const user = firebase.auth().currentUser;
      firebase.database().ref(`users/${user.uid}`).child('todos').set(todos);
      this.dispatch('db/getUserData');
    },
    getUserData() {
      this.commit('db/setTodosLoading', true);
      this.commit('db/setLinksLoadingLoading', true);
      const user = firebase.auth().currentUser;
      if (user) {
        firebase.database().ref(`users/${user.uid}`).once('value')
          .then((snapshot) => {
            const { location, todos, quickLinks } = snapshot.val();
            this.commit('db/setUserData', { location, todos, quickLinks });
          })
          .catch((err) => console.log('err getUserData ', err))
          .finally(() => {
            this.commit('db/setTodosLoading', false);
            this.commit('db/setLinksLoadingLoading', false);
          });
      }
    },
    onLoadFetchLocation(context, user) {
      return new Promise((resolve, reject) => {
        if (user) {
          firebase.database().ref(`users/${user.uid}`).once('value')
            .then((snapshot) => {
              const { location, todos, quickLinks } = snapshot.val();
              this.commit('db/setUserData', { location, todos, quickLinks });
              resolve(location);
            })
            .catch((err) => reject(err))
            .finally(() => {
              this.commit('db/setTodosLoading', false);
              this.commit('db/setLinksLoadingLoading', false);
            });
        }
      });
    },
  },
});
