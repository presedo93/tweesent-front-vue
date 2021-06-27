<template>
  <Search @search="searched" />
  <div v-if="!showLoading">
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
  </div>
  <Loading v-if="showLoading" />
  <router-view />
</template>

<script lang="ts">
import Search from "@/components/Search.vue"; // @ is an alias to /src
import CardContainer from "@/components/CardContainer.vue"; // @ is an alias to /src
import Tweet from "@/components/Tweet.vue";
import Loading from "@/components/Loading.vue";
import Stats, { Scores } from "@/components/Stats.vue";
import store, { TweetData } from "@/store";

import { defineComponent, ref, onMounted, watch, computed } from "vue";
export default defineComponent({
  components: {
    Search,
    CardContainer,
    Tweet,
    Stats,
    Loading,
  },
  setup(prop) {
    const inputSearch = ref("");
    const showStats = ref(false);

    const tweets = ref<TweetData[]>();
    const scores = ref<Scores>();

    const mode = computed(function () {
      return store.getters.theme;
    });

    const showLoading = computed(function () {
      return store.getters.showLoading;
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
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
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
      showLoading,
      tweets,
      scores,
      keyPress,
      changeMode,
      searched,
    };
  },
});
</script>


<style scoped lang="scss">

</style>
