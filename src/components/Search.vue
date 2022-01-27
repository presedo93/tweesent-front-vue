<template>
  <div class="search-box" :class="theme">
    <input type="text" placeholder=" " :class="theme" v-on:keyup.enter="search" />
    <span v-on:click="remove" :class="theme"></span>
  </div>
</template>

<script lang="ts">
import { onUnmounted, defineComponent, computed, watch, } from "vue";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Scores } from "@/components/Stats.vue";
import store from "@/store";

export default defineComponent({
  setup(_, context) {
    let websocket: any | WebSocket = null;

    const theme = computed(function () {
      return store.getters.theme;
    });

    function remove(event: any) {
      event.target.previousElementSibling.value = "";
    }

    /**
     * Callback method every time new data is received from the backend's websocket.
     * @param event keyup enter event that will contain the query to search.
     */
    function onMessage(event: MessageEvent): any {
      const tweet: any = JSON.parse(event.data);
      if (tweet != undefined && "text" in tweet) {
        context.emit("search", tweet, new Scores());
      }
    }

    /**
     * WebSocket starting method. It returns the ws object so it can be closed later on.
     * @param event keyup enter event that will contain the query to search.
     */
    function webSearch(event: any): WebSocket {
      const path = "ws://127.0.0.1:8000/stream/" + store.getters.params.interval + "/" + event.target.value;
      const ws = new WebSocket(path);
      ws.onmessage = onMessage;
      return ws;
    }

    watch(() => store.getters.params.live, function() {
      if (!store.getters.params.live) {
        websocket.close();
      }
    });

    /**
     * HTTP Requests method to communicate with the backend.
     * @param event keyup enter event that will contain the query to search.
     */
    function httpSearch(event: any) {
      const path = "http://127.0.0.1:8000/search_tweets";
      const score: Scores = new Scores();

      store.commit("changeLoading");

      axios
        .post(path, {
          query: event.target.value,
          max_results: store.getters.params.num_tweets,
          allow_retweets: store.getters.params.retweets,
          allow_replies: store.getters.params.replies,
          token: store.getters.params.token,
        })
        .then((answer: AxiosResponse) => {
          const tweets = answer.data.tweets;
          const len = tweets.length;
          for (let i = 0; i < len; i++) {
            // tweets.push([i]);
            if (tweets[i].sentiment === "negative") {
              score.negatives += 1;
            } else if (tweets[i].sentiment === "neutral") {
              score.neutrals += 1;
            } else {
              score.positives += 1;
            }
            context.emit("search", tweets[i], score);
          }
          // score.perc(len);
          // context.emit("search", tweets, score);
          store.commit("changeLoading");
        })
        .catch((error: AxiosError) => {
          console.log("ERROR::", error);
        });
    }

    function search(event: any) {
      if (store.getters.params.live) {
        websocket = webSearch(event);
      } else {
        httpSearch(event);
      }
    }

    onUnmounted(() => {
      if (store.getters.params.live && websocket != null) {
        websocket.close();
      }
    });

    return {
      remove,
      search,
      theme,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

.search-box {
  margin-top: 50px;
}

.dark {
  border-color: white !important;
}

.light {
  border-color: #7a7a7a !important;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-box {
  margin-top: 7rem;
  border: solid 2px black;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  input[type="text"] {
    font-family: Raleway, sans-serif;
    font-size: 20px;
    color: #7a7a7a;
    width: 50px;
    height: 50px;
    padding: 5px 40px 5px 10px;
    border: none;
    box-sizing: border-box;
    border-radius: 50px;
    transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 0.5) 600ms;
    &:focus {
      outline: none;
    }
    &:focus,
    &:not(:placeholder-shown) {
      width: 300px;
      transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 1.5);
      + span {
        bottom: 13px;
        right: 10px;
        transition: bottom 300ms ease-out 800ms, right 300ms ease-out 800ms;
      }
      + span:after {
        top: 0;
        right: 12px;
        opacity: 1;
        transition: top 300ms ease-out 1100ms, right 300ms ease-out 1100ms,
          opacity 300ms ease 1100ms;
      }
    }
  }
  span {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -13px;
    right: -15px;
    background: transparent !important;
    transition: bottom 300ms ease-out 300ms, right 300ms ease-out 300ms;
    &:before,
    &:after {
      content: "";
      height: 25px;
      border-left: solid 2px #7a7a7a;
      position: absolute;
      transform: rotate(-45deg);
    }
    &.dark:before,
    &.dark:after {
      border-left: solid 2px white;
      border-color: white !important;
    }
    &:after {
      transform: rotate(45deg);
      border-color: #7a7a7a !important;
      opacity: 0;
      top: -20px;
      right: -10px;
      transition: top 300ms ease-out, right 300ms ease-out,
        opacity 300ms ease-out;
    }
  }
}
</style>
