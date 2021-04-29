<template>
  <div class="container-card">
    <div class="container-header" :class="type">
      <span>{{ type }}</span
      ><i :class="getIcon" class="margin20"></i>
    </div>
    <div class="container-body">
      <ul>
      <li v-for="tw in tweets" :key="tw">
        <div class="card" v-if="tw.sentiment==type">
          <div class="card-body">{{tw.text}}</div>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: ["type"],
  setup(props) {
    const store = useStore();

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
      tweets
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

span {
  font-family: "Open Sans", serif;
}

.container-card {
  margin-top: 200px;
}
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
  -moz-border-radius-topleft: 8px;
  -webkit-border-top-left-radius: 8px;
  border-top-left-radius: 8px;
  -moz-border-radius-topright: 8px;
  -webkit-border-top-right-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  &.negative {
    background-color: #db3450;
  }
  &.neutral {
    background-color: #3498db;
  }
  &.positive {
    background-color: #34db87;
  }
}

.margin20 {
  margin-left: 20px;
}

.container-body {
  background-color: #484949;
  height: 100%;
  width: 90%;

  width: 90%;
  display: block;
  margin: auto;

  padding: 1em 0 !important;
  color: white;
  text-align: center;
  font-family: "Lato";
  font-size: 1.6em;
  position: relative;
}

.card-body {
  color: black;
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
