<template>
  <div>
    <transition appear
    @before-enter="beforeEnter"
    :css="false">
    <div>
    <blockquote class="twitter-tweet" data-height="300px" data-conversation="none" data-cards="hidden" data-theme="dark">
      <a :href="url"/>
    </blockquote>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import gsap from "gsap";

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

    function beforeEnter(el : any) {
      const tl = gsap.timeline(); //create the timeline
      tl.fromTo(el, { duration: 10, x:0 }, {
        duration: 5,
        opacity: 1,
        x: 500,
      }).to(el, {
        duration: 5,
        opacity: 0.2,
        y: 500,
      })
    }

    function enter(el : any, done: any) {
      gsap.to(el, {
        duration: 5,
        scaleX: 1.5,
        scaleY: 0.7,
        opacity: 1,
        x: 150,
        ease: 'elastic.inOut(2.5, 1)',
        onComplete: done
      })
    }

    function leave(el : any, done: any) {
      gsap.to(el, {
        duration: 0.7,
        scaleX: 1,
        scaleY: 1,
        x: 300,
        ease: 'elastic.inOut(2.5, 1)'
      })
      gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done
      })
    }

    return { url, beforeEnter, enter, leave };
  },
});
</script>

<style lang="scss" scoped>
</style>