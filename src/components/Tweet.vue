<template>
  <div>
    <blockquote class="twitter-tweet">
      <a :href="tweet" />
    </blockquote>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    url: String
  },
  setup(props) {
    const tweet = ref<string | undefined>(props.url);
    return { tweet };
  },
});
</script>

<style lang="scss" scoped>
</style>