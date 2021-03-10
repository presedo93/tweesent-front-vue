<template>
  <div class="container">
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-md-4">
        <p class="numbers negatives">82.7%</p>
        <p class="letters negatives">Negatives</p>
      </div>
      <div class="col-md-4">
        <p class="numbers">0.7%</p>
        <p class="letters">Neutral</p>
      </div>
      <div class="col-md-4">
        <p class="numbers positives">16.6%</p>
        <p class="letters positives">Positives</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");

.letters {
  font-family: "Source Code Pro", monospace;
  font-size: 200%;
}

.numbers {
  font-family: "Source Code Pro", monospace;
  font-size: 500%;
}

.negatives {
  color: #ff3333;
}

.positives {
  color: #9fff33;
}
</style>
