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
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: ["navbarMode", "bgMode"],
  setup(prop, context) {
    function changemode() {
      context.emit("changemode");
    }

    const modeClass = computed(function () {
      return "navbar-" + prop.navbarMode + " bg-" + prop.bgMode;
    });

    const modeIcon = computed(function () {
      if (prop.navbarMode === "dark") {
        return "far fa-moon";
      } else {
        return "far fa-sun";
      }
    });

    return {
      changemode,
      modeClass,
      modeIcon,
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
