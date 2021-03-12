<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-md-4">
        <p class="numbers negatives">{{ score.negatives }}%</p>
        <p class="letters negatives">Negatives</p>
      </div>
      <div class="col-md-4">
        <p class="numbers">{{ score.neutrals }}%</p>
        <p class="letters">Neutral</p>
      </div>
      <div class="col-md-4">
        <p class="numbers positives">{{ score.positives }}%</p>
        <p class="letters positives">Positives</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent, computed } from "vue";

export class Scores {
    negatives = 0;
    neutrals = 0;
    positives = 0;
    perc(len: number) {
      this.negatives = Math.round(1000 * this.negatives / len) / 10;
      this.neutrals = Math.round(1000 * this.neutrals / len) / 10;
      this.positives = Math.round(1000 * this.positives / len) / 10;
    }
}

export default defineComponent({
  props: {
    scores: {
      type: Scores,
      required: true
    }
  },
  setup(props) {
    const score = computed(() => {
      return props.scores;
    });
    return { score };
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
