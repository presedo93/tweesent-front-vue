<template>
  <div :class="$store.getters.theme">
    <NavBar />
    <Search @search="searched" />
    <stats v-if="showStats" :scores="scores" />
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <ul class="principal">
          <li class="principal" v-for="tw in tweets" :key="tw">
            <tweet :animation="true" :tweet="tw" />
          </li>
        </ul>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col-4"><CardContainer :type="'negative'" /></div>
      <div class="col-4"><CardContainer :type="'neutral'" /></div>
      <div class="col-4"><CardContainer :type="'positive'" /></div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue"; // @ is an alias to /src
import Search from "@/components/Search.vue"; // @ is an alias to /src
import CardContainer from "@/components/CardContainer.vue"; // @ is an alias to /src
import Tweet from "@/components/Tweet.vue";
import Stats, { Scores } from "@/components/Stats.vue";
import store, { TweetData } from "@/store";

import {
  defineComponent,
  ref,
  onMounted,
  watch,
  computed,
} from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    NavBar,
    Search,
    CardContainer,
    Tweet,
    Stats,
  },
  setup(prop) {
    const inputSearch = ref("");
    const showStats = ref(false);
    const tweets = ref<TweetData[]>();
    const scores = ref<Scores>();

    const mode = computed(function () {
      return store.getters.theme;
    });

    function changeMode() {
      store.commit("changeTheme");
    }

    function keyPress(event: any) {
      if (event.key === "m" && event.ctrlKey === true) {
        changeMode();
      }
    }

    function searched(newTweets: TweetData[], newScores: Scores) {
      tweets.value = newTweets;
      scores.value = newScores;
      showStats.value = true;
    }

    watch(mode, (newValue, oldValue) => {
      if (newValue == "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });

    onMounted(() => {
      window.addEventListener("keyup", keyPress);
      document.body.classList.add("dark");
    });

    return {
      mode,
      inputSearch,
      showStats,
      tweets,
      scores,
      keyPress,
      changeMode,
      searched,
    };
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

ul.principal {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-left: 0px !important;
}
li.principal {
  margin: 0;
  padding: 0;
  height: 200px;
  width: 400px;
  margin-bottom: -150px;
  clear: both;
}
li.principal:last-child {
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
