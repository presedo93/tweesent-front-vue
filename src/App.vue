<template>
  <div :class="mode">
    <NavBar :navbarMode="mode" :bgMode="mode" @changemode="changeMode" />
    <Search :mode="mode" @search="searched" />
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
      <ul>
        <li v-for="tweet in tweetsUrl" :key="tweet">
          <tweet class="animation" :url="tweet" />
        </li>
      </ul>
      </div>
      <div class="col-4"></div>
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
import Tweet from "@/components/Tweet.vue";

import { defineComponent } from "vue";

interface TweetData {
  id : string,
  name: string,
  text: string,
}

export default defineComponent({
  data() {
    return {
      mode: "dark",
      inputSearch: "",
      tweetsUrl: [] as string[],
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
    searched(tweets: Array<TweetData>) {
      for (let i = 0; i < tweets.length; i++)
      {
        const tw = tweets[i];
        this.tweetsUrl.push("https://twitter.com/" + tw.name + "/status/" + tw.id);
      }
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

ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 0px !important; 
}
li {
  margin: 0;
  padding: 0;
  height: 200px;
  width: 400px;
  margin-bottom: -150px;
  clear: both;
}
li:last-child {
  margin-bottom: 0;
}
/*
li:last-child .animation {
  position: relative;
  animation: kfpositive 5s both 5s;
}
@keyframes kfpositive {
  0%   {left:0px; top:0px;}
  50%  {left:110%; top:0px; opacity: 0.5;}
  100% {left:110%; top:150%; opacity: 0;}
}*/
</style>
