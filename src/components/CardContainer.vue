<template>
  <div class="container-card">
    <div class="container-header" :class="type">
      <span>{{type}}</span><i :class="getIcon" class="margin20"></i>
    </div>
    <div class="container-body">
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      modeOn: this.mode,
      typeOn: this.type
    };
  },
  props: ["mode", "type"],
  methods: {},
  computed: {
    getIcon() : string{
      return this.type === "Positive" ? 'fas fa-laugh-beam' : this.type === "Neutral" ? 'far fa-smile' : 'far fa-frown';
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

span{
   font-family: 'Open Sans',serif;
}

.container-card{
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
  &.Negative {
    background-color: #db3450;
  }
  &.Neutral {
    background-color: #3498db;
  }
  &.Positive {
    background-color: #34db87;
  }
}

.margin20{
  margin-left: 20px;
}

.container-body{
  background-color: #484949;
  height: 800px;
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
</style>
