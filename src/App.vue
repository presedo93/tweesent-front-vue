<template>
  <div :class="mode">
    <NavBar :navbarMode="mode" :bgMode="mode" @changemode="changeMode" />
    <Search :mode="mode" @search="searchTweet($event)" />
    <Table :mode="mode" :search="inputSearch" />
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import Table from "@/components/Table.vue"; // @ is an alias to /src

import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      mode: "dark",
      inputSearch: ""
    };
  },
  methods: {
    keyPress(event: any) {
      if (event.key === "m" && event.ctrlKey === true) {
        this.changeMode();
      }
    },
    changeMode() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
    searchTweet(inputSearch: string) {
      this.inputSearch = inputSearch;
    }
  },
  watch: {
    mode(value: any) {
      if (value == "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  },
  components: {
    NavBar,
    Search,
    Table
  },
  mounted() {
    window.addEventListener("keyup", this.keyPress);
    document.body.classList.add("dark");
  }
});
</script>


<style lang="scss">
@import "./fonts/style.css";
@import "./styles/variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dark {
  background: $colorDark !important;
  color: white !important;
}
</style>
