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
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      modeOn: this.navbarMode
    };
  },
  props: ["navbarMode", "bgMode"],
  methods: {
    changemode() {
      this.$emit("changemode");
    }
  },
  computed: {
    modeClass(): string {
      return "navbar-" + this.navbarMode + " bg-" + this.bgMode;
    },
    modeIcon(): string {
      if(this.navbarMode === "dark"){
        return "far fa-moon";
      }
      else{
        return "far fa-sun";
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-logoCompleto {
  font-size: 40px;
}

.mode{
    margin-right: 50px;
}

.far:hover{
  font-weight: 900;
}

.bg-light {
  background-color: #a7a8aa !important;
}
</style>
