<template>
  <nav class="navbar navbar-expand-md" :class="modeClass">
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#"
        ><span class="icon-logoCompleto"></span
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".dual-collapse2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      modeOn: this.navbarMode
    };
  },
  props: ["navbarMode", "bgMode"],
  methods: {},
  computed: {
    modeClass(): string {
      return "navbar-" + this.navbarMode + " bg-" + this.bgMode;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-logoCompleto {
  font-size: 40px;
}
</style>
