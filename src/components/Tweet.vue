<template>
  <div>
    <blockquote class="twitter-tweet">
      <a :href="url" />
    </blockquote>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";

export interface TweetData {
  id: string;
  name: string;
  text: string;
  sentiment: string;
  confidence: string
}

export default defineComponent({
  props: {
    tweet: {
      type : Object as PropType<TweetData>,
      required : true
    },
  },
  setup(props) {
    const url = ref<string>("https://twitter.com/" + props.tweet.name + "/status/" + props.tweet.id);

    onMounted(() => {
      const plugin = document.createElement("script");
      plugin.setAttribute(
        "src",
        "https://platform.twitter.com/widgets.js",
      );
      plugin.async = true;
      document.head.appendChild(plugin);
    })

    return { url };
  },
});
</script>

<style lang="scss" scoped>
</style>