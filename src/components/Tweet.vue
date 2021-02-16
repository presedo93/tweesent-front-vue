<template>
  <div>
    <blockquote class="twitter-tweet">
      <a :href="tweet" />
    </blockquote>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    url: String
  },
  setup(props) {
    const tweet = ref<string | undefined>(props.url);

    onMounted(() => {
      const plugin = document.createElement("script");
      plugin.setAttribute(
        "src",
        "https://platform.twitter.com/widgets.js",
      );
      plugin.async = true;
      document.head.appendChild(plugin);
    })

    return { tweet };
  },
});
</script>

<style lang="scss" scoped>
</style>