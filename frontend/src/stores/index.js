// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      projects: []
    };
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    // Add other mutations as needed
  },
  actions: {
    fetchProjects() {
      // Your fetching logic
    },
    // Add other actions as needed
  },
  getters: {
    allProjects: (state) => state.projects,
  }
});

export default store;
