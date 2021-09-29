<template>
  <div class="containerStats">
    <br />
    <div class="row">
      <div class="col-md-4">
        <p class="numbers negatives">{{ score.negatives }}%</p>
      </div>
      <div class="col-md-4">
        <p class="numbers neutral">{{ score.neutrals }}%</p>
      </div>
      <div class="col-md-4">
        <p class="numbers positives">{{ score.positives }}%</p>
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
    this.negatives = Math.round((1000 * this.negatives) / len) / 10;
    this.neutrals = Math.round((1000 * this.neutrals) / len) / 10;
    this.positives = Math.round((1000 * this.positives) / len) / 10;
  }
}

export default defineComponent({
  props: {
    scores: {
      type: Scores,
      required: true,
    },
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
@import "../styles/variables.scss";
.letters {
  font-family: "Source Code Pro", monospace;
  font-size: 200%;
}

.containerStats {
  padding: 1.5rem;
}

.numbers {
  font-family: "Source Code Pro", monospace;
  font-size: 500%;
}

.negatives {
  color: $colorNegative;
}

.neutral {
  color: $colorNeutral;
}

.positives {
  color: $colorPositive;
}
</style>
