<template>
  <div :class="$store.getters.theme">
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue"; // @ is an alias to /src

export default defineComponent({
  components: {
    NavBar
  },
  setup() {
    return { }
  },
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

.light {
  background-color: #cbccd1;
}

ul.principal {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 0px !important;
}
li.principal {
  margin: 0;
  padding: 0;
  height: 200px;
  width: 400px;
  margin-bottom: -150px;
  clear: both;
}
li.principal:last-child {
  margin-bottom: 0;
}
/*
li:last-child .animation {
  position: relative;
  animation: kfpositive 5s both 5s;
}
@keyframes kfpositive {
  0%   {left:0px; top:0px;}
  50%  {left:110%; top:0px; opacity: 0.5;}
  100% {left:110%; top:150%; opacity: 0;}
}*/
</style>
