import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "dark",
  },
  getters:{
    theme: state => state.theme,
  },
  mutations: {
    changeTheme(state){
      debugger;
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    }
  },
  actions: {},
  modules: {}
});
