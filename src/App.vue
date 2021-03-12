<template>
  <div :class="mode">
    <NavBar :navbarMode="mode" :bgMode="mode" @changemode="changeMode" />
    <Search :mode="mode" @search="searched" />
    <stats v-if="showStats" :scores="scores" />
    <div class="row">
      <ul>
        <li v-for="tw in tweets" :key="tw">
          <tweet :tweet="tw" />
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-4"><CardContainer :mode="mode" :type="'Negative'" /></div>
      <div class="col-4"><CardContainer :mode="mode" :type="'Neutral'" /></div>
      <div class="col-4"><CardContainer :mode="mode" :type="'Positive'" /></div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import CardContainer from "@/components/CardContainer.vue"; // @ is an alias to /src
import Tweet, { TweetData } from "@/components/Tweet.vue";
import Stats, { Scores } from "@/components/Stats.vue";

import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      mode: "dark",
      inputSearch: "",
      showStats: false as boolean,
      tweets: [] as TweetData[],
      scores: new Scores() as Scores
    };
  },
  methods: {
    keyPress(event: any) {
      if (event.key === "m" && event.ctrlKey === true) {
        this.changeMode();
      }
    },
    changeMode() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
    searched(tweets: TweetData[], scores: Scores) {
      this.tweets = tweets;
      this.scores = scores;
      this.showStats = true;
    },
  },
  watch: {
    mode(value: any) {
      if (value == "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    },
  },
  components: {
    NavBar,
    Search,
    CardContainer,
    Tweet,
    Stats
  },
  mounted() {
    window.addEventListener("keyup", this.keyPress);
    document.body.classList.add("dark");
  },
});
</script>


<style lang="scss">
@import "./fonts/style.css";
@import "./styles/variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dark {
  background: $colorDark !important;
  color: white !important;
}

.light {
  background-color: #cbccd1;
}
</style>
