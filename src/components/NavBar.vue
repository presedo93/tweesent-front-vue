<template>
  <nav class="navbar navbar-expand-md" :class="themeNavBar">
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#"
        ><span class="icon-logo"></span
      ></a>
    </div>
    <div class="theme" @click="changeTheme">
      <i :class="themeIcon"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, computed } from "vue";

export default defineComponent({
  setup() {
    const theme = computed(function () {
      return store.getters.theme;
    });

    function changeTheme() {
      store.commit("changeTheme");
    }

    const themeNavBar = computed(function () {
      return "navbar-" + theme.value + " bg-" + theme.value;
    });

    const themeIcon = computed(function () {
      if (theme.value === "dark") {
        return "far fa-moon";
      } else {
        return "far fa-sun";
      }
    });

    return {
      changeTheme,
      themeNavBar,
      themeIcon,
      theme,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-logo {
  font-size: 40px;
}

.theme {
  margin-right: 50px;
}

.far:hover {
  font-weight: 900;
}

.bg-light {
  background-color: #a7a8aa !important;
}
</style>
