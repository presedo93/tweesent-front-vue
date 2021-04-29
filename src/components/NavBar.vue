<template>
  <nav class="navbar navbar-expand-md" :class="modeClass">
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#"
        ><span class="icon-logoCompleto"></span
      ></a>
    </div>
    <div class="mode" @click="changemode">
      <i :class="modeIcon"></i>
    </div>
  </nav>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, computed } from "vue";
import { useStore} from "vuex";

export default defineComponent({
  setup(prop, context) {

    const store = useStore();

    const mode = computed(function(){
      return store.getters.theme;
    });

    function changemode() {
      store.commit("changeTheme");
    }

    const modeClass = computed(function () {
      return "navbar-" + mode.value + " bg-" + mode.value;
    });

    const modeIcon = computed(function () {
      if (mode.value === "dark") {
        return "far fa-moon";
      } else {
        return "far fa-sun";
      }
    });

    return {
      changemode,
      modeClass,
      modeIcon,
      mode
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-logoCompleto {
  font-size: 40px;
}

.mode {
  margin-right: 50px;
}

.far:hover {
  font-weight: 900;
}

.bg-light {
  background-color: #a7a8aa !important;
}
</style>
