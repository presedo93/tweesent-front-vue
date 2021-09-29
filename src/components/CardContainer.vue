<template>
  <div class="container-card">
    <div class="container-header" :class="type">
      <span>{{ type }}</span
      ><i :class="getIcon" class="typeIcon"></i>
    </div>
    <div>
      <ul>
        <li class="tweetCardContainer" v-for="tw in tweets" :key="tw">
          <tweet v-if="tw.sentiment == type" :tweet="tw" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "@/store";
import Tweet from "@/components/Tweet.vue";

export default defineComponent({
  props: ["type"],
  components: {
    Tweet,
  },
  setup(props) {
    const tweets = computed(function () {
      return store.getters.tweets;
    });

    const getIcon = computed(function () {
      return props.type === "positive"
        ? "fas fa-laugh-beam"
        : props.type === "neutral"
        ? "far fa-smile"
        : "far fa-frown";
    });

    return {
      getIcon,
      tweets,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
@import "../styles/variables.scss";

span {
  font-family: "Open Sans", serif;
}

/*.container-card {
  margin-top: 12.5rem;
}*/

.container-header {
  width: 90%;
  display: block;
  margin: auto;
  background-color: #3498db;
  text-shadow: #2084c7 1px 1px 0;
  padding: 1em 0 !important;
  color: white;
  text-align: center;
  margin-top: 1em;
  font-family: "Lato";
  font-size: 1.6em;
  -moz-border-radius-topleft: 0.5rem;
  -webkit-border-top-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  -moz-border-radius-topright: 0.5rem;
  -webkit-border-top-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  position: relative;
  &.negative {
    background-color: $colorNegative;
  }
  &.neutral {
    background-color: $colorNeutral;
  }
  &.positive {
    background-color: $colorPositive;
  }
}

.typeIcon {
  margin-left: $marginCard;
}

.tweetCardContainer {
  margin: $marginCard;
}

ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 0px !important;
  width: 90%;
  height: 100%;
}
</style>
