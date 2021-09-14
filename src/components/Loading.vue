<template>
  <div class="containerLoading">
    <i class="fas fa-circle-notch fa-spin fa-5x"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.containerLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 1.8rem;
  margin-left: -3.2rem;
  width: 6.25rem;
  height: 6.25rem;
}
</style>
