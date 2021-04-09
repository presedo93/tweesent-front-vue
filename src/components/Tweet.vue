<template>
  <div>
    <div :id="identificador" class="card" :class="identificador">
      <div class="card-body">{{ identificador }}{{ texto }}</div>
    </div>
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
  confidence: string;
}

export default defineComponent({
  props: {
    tweet: {
      type: Object as PropType<TweetData>,
      required: true,
    },
  },

  setup(props) {
    const url = ref<string>(
      "https://twitter.com/" + props.tweet.name + "/status/" + props.tweet.id
    );
    const texto = ref<string>(props.tweet.text);
    const identificador = ref<string>(props.tweet.id);
    const sentiment = ref<string>(props.tweet.sentiment);

    function removeElement(elementToDelete: any) {
      elementToDelete = document.getElementById(elementToDelete);
      return function () {
        debugger;
        elementToDelete.parentElement.parentElement.remove();
      };
    }

    function animationCard(el: any) {
      let positionX = 0;
      const positionY = 500;
      if (sentiment.value == "positive") {
        positionX = 500;
      } else if (sentiment.value == "negative") {
        positionX = -500;
      } else {
        positionX = 0;
      }

      const tl = gsap.timeline(); //create the timeline
      tl.fromTo(
        el,
        { duration: 10, x: 0 },
        {
          duration: 5,
          opacity: 1,
          x: positionX,
        }
      )
        .to(el, {
          duration: 5,
          opacity: 0,
          y: positionY,
        })
        .call(removeElement(identificador.value));
    }

    onMounted(() => {
      const element = document.getElementById(identificador.value);
      animationCard(element);
    });

    return {
      url,
      texto,
      identificador,
      animationCard,
      removeElement,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-body {
  color: black;
}
</style>