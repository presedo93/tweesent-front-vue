<template>
  <div class="container">
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-md-4">
        <p class="numbers negatives">{{ negative }}%</p>
        <p class="letters negatives">Negatives</p>
      </div>
      <div class="col-md-4">
        <p class="numbers">{{ neutral }}%</p>
        <p class="letters">Neutral</p>
      </div>
      <div class="col-md-4">
        <p class="numbers positives">{{ positive }}%</p>
        <p class="letters positives">Positives</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    positive: {
      type: Number,
      required: true
    },
    neutral: {
      type: Number,
      required: true
    },
    negative: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const pos = ref<number>(props.positive);
    const neu = ref<number>(props.neutral);
    const neg = ref<number>(props.negative);

    return { pos, neu, neg };
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
