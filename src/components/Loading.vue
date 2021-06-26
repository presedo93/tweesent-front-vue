<template>
  <div class="containerLoading">
    <i class="fas fa-circle-notch fa-spin fa-5x"></i>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, computed } from "vue";

export default defineComponent({
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");

.containerLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 30px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
</style>
