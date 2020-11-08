<template>
  <div class="row" style="margin-top: 100px; width: 100%">
    <div class="col-3"></div>
    <div class="col-6">
      <table :class="modeClass">
        <thead>
          <section id="loading" class="loading-wrapper" hidden>
            <div class="loading gradient" :class="gradientClass"></div>
          </section>
          <tr>
            <th>Tweet</th>
            <th class="c">Subjetividad</th>
            <th class="c">Polaridad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in dataTweet" :key="data.tweet">
            <th>{{ data.tweet }}</th>
            <th class="c">{{ data.subjetividad }}</th>
            <th class="c">{{ data.polaridad }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      modeOn: this.mode,
      dataTweet: [
        {
          tweet: "Prueba",
          subjetividad: "0",
          polaridad: "1"
        },
        {
          tweet: "Otra Prueba",
          subjetividad: "1",
          polaridad: "0"
        }
      ]
    };
  },
  props: ["mode", "search"],
  methods: {
    searchTweet(text: string) {
      this.dataTweet = [];
      document.getElementById("loading")!.hidden = false;
      setTimeout(() => {
        this.dataTweet = [
          {
            tweet: "Prueba de " + this.search,
            subjetividad: "0",
            polaridad: "1"
          },
          {
            tweet: "Otra Prueba de " + this.search,
            subjetividad: "1",
            polaridad: "0"
          }
        ];
        document.getElementById("loading")!.hidden = true;
      }, 5000);
    }
  },
  computed: {
    modeClass(): string {
      return this.mode;
    },
    gradientClass(): string {
      return this.mode + "-" + "gradient";
    }
  },
  watch: {
    search(value: any) {
      this.searchTweet(value);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-wrapper {
  width: 250%;
  .loading {
    width: 250%;
    height: 5px;
    animation: rotate 3s infinite linear;
    -webkit-animation: rotate 3s infinite linear;
  }
}

@-webkit-keyframes rotate {
  from {
    background-position: -3000px;
  }
  to {
    background-position: 0px;
  }
}

@keyframes rotate {
  from {
    background-position: -3000px;
  }
  to {
    background-position: 0px;
  }
}

.gradient {
  background: rgb(48, 255, 144); /* Old browsers */
  background: linear-gradient(
    60deg,
    hsl(224, 100%, 66%),
    hsl(269, 100%, 66%),
    hsl(314, 100%, 66%),
    hsl(359, 100%, 66%),
    hsl(44, 100%, 66%),
    hsl(89, 100%, 66%),
    hsl(134, 100%, 66%),
    hsl(179, 100%, 66%)
  );
}

.dark-gradient {
  background: rgb(48, 255, 144); /* Old browsers */
  background: linear-gradient(
    60deg,
    hsl(224, 85%, 66%),
    hsl(269, 85%, 66%),
    hsl(314, 85%, 66%),
    hsl(359, 85%, 66%),
    hsl(44, 85%, 66%),
    hsl(89, 85%, 66%),
    hsl(134, 85%, 66%),
    hsl(179, 85%, 66%)
  );
}

table {
  border-spacing: 1;
  border-collapse: collapse;
  background: rgb(207, 204, 204);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
  &.dark {
    background: rgb(87, 87, 87) !important;
    color: white;
    & thead tr {
      height: 60px;
      background: #020202;
    }
    & tbody tr:nth-child(even) {
      background-color: #4b4b4b;
    }
  }
  & thead tr {
    height: 60px;
    background: #064ba5cc;
    color: white;
  }
  & tbody tr:nth-child(even) {
    background-color: #a09c9c;
  }
}

table * {
  position: relative;
}

table td,
table th {
  padding-left: 8px;
}

table tbody tr {
  height: 50px;
}
table tbody tr:last-child {
  border: 1px;
}
table td,
table th {
  text-align: left;
}
table td.l,
table th.l {
  text-align: left;
}
table td.c,
table th.c {
  text-align: center;
}
table td.r,
table th.r {
  text-align: right;
}
</style>
