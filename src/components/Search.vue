<template>
  <div class="search-box" :class="mode">
    <input
      type="text"
      placeholder=" "
      :class="mode"
      v-on:keyup.enter="search"
    /><span v-on:click="remove" :class="mode"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface TweetData {
  id : string,
  name: string,
  text: string,
}

export default defineComponent({
  data() {
    return {
      modeOn: "O",
    };
  },
  props: ["mode"],
  methods: {
    remove(event: any) {
      event.target.previousElementSibling.value = "";
    },
    search(event: any) {
      const path = "http://0.0.0.0:5000/gettweet";
      const tweets : TweetData[] = [{id: "1361094185412100096", name: "elonmusk", text: "Hello"}];

      /*axios
        .post(path, { text: event.target.value })
        .then((answer) => {
          for (let i = 0; i < answer.data.tweets.length; i++)
          {
            tweets.push(answer.data.tweets[i]);
          }
        })
        .catch((error) => {
          console.log("ERROR::", error.response.data);
        });*/
      this.$emit("search", tweets);
    },
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
        right: 10px;
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
    transition: bottom 300ms ease-out 300ms, right 300ms ease-out 300ms;
    &:before,
    &:after {
      content: "";
      height: 25px;
      border-left: solid 2px #7a7a7a;
      position: absolute;
      transform: rotate(-45deg);
    }
    &.dark {
      background: transparent !important;
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
