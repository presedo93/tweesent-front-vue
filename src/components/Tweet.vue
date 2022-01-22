<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" :id="props.tweet.id" class="card text-decoration-none" :class="$store.getters.theme">
    <div class="card-body">
      <div class="row">
        <div class="col-2 text-sm-start">
          <img class="avator" :src="props.tweet.image" />
        </div>
        <div class="col text-sm-start name-user">
          <h6 class="user">{{ props.tweet.name }}</h6>
          <p class="name">@{{ props.tweet.username }}</p>
        </div>
        <div class="col text-sm-end">
          <i class="fab fa-twitter"></i>
        </div>
      </div>
      <div class="card-text text-sm-start">{{ props.tweet.text }}</div>
      <div class="text-sm-start created">{{ props.tweet.created_at }}</div>
      <hr />
      <div class="row icons">
        <div class="col-md-3 text-sm-start">
          <div class="row">
            <div class="col">
              <i class="far fa-heart"></i>
            </div>
            <div class="col numbers">
              <p>{{ props.tweet.likes }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 text-sm-start">
          <div class="row">
            <div class="col">
              <i class="far fa-comment-alt"></i>
            </div>
            <div class="col numbers">
              <p>{{ props.tweet.retweets }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import gsap from "gsap";
import store, { TweetData } from "@/store";

export default defineComponent({
  props: {
    tweet: {
      type: Object as PropType<TweetData>,
      required: true,
    },
    animation: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const url = ref<string>(
      "https://twitter.com/" + props.tweet.name + "/status/" + props.tweet.id
    );
    const identificador = ref<string>(props.tweet.id);

    function removeElement(elementToDelete: any) {
      elementToDelete = document.getElementById(elementToDelete);
      return function () {
        elementToDelete.parentElement.parentElement.remove();
        store.commit("addTweet", props.tweet);
      };
    }

    function animationCard(el: any) {

      // Calculate the difference (dynamically)

      const pointNegative = document.getElementsByClassName("container-header negative")[0] as HTMLElement;
      const pointPositive = document.getElementsByClassName("container-header positive")[0] as HTMLElement;
      const pointNeutral = document.getElementsByClassName("container-header neutral")[0] as HTMLElement;

      let positionX = 0;
      const positionY = 500;
      if (props.tweet.sentiment == "positive") {
        positionX = pointPositive.offsetLeft - pointNeutral.offsetLeft;
      } else if (props.tweet.sentiment == "negative") {
        positionX = pointNegative.offsetLeft - pointNeutral.offsetLeft;
      } else {
        positionX = 0;
      }

      const tl = gsap.timeline(); //create the timeline
      tl.fromTo(
        el,
        { duration: 10, x: 0 },
        {
          duration: 5,
          opacity: 1,
          x: positionX,
        }
      )
        .to(el, {
          duration: 5,
          opacity: 0,
          y: positionY,
        })
        .call(removeElement(props.tweet.id));
    }

    onMounted(() => {
      if (props.animation) {
        const element = document.getElementById(props.tweet.id);
        animationCard(element);
      }
    });

    return {
      props,
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Asap");
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "../styles/variables.scss";

img {
  max-width: 100%;
}

hr {
  color: #a5aeb3;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}

.card {
  max-width: 32rem;
  background: #e6ecf0;
  color: black;
  border-radius: 12px;
}

.card-body {
  padding-bottom: 0.1rem;
}

.card-text {
  font-family: "Asap", sans-serif;
  font-family: "Roboto", sans-serif;
}

.name-user {
  position: relative;
  margin-left: -1.5rem;
}

.fa-twitter {
  position: relative;
  margin-top: -1rem;
  margin-right: -0.2rem;
  font-size: 1.5rem;
  color: #1da0f2;
}

.user {
  font-size: 0.88rem;
  font-weight: bold;
  margin-top: 0.4rem;
  margin-bottom: 0rem;
}

.name {
  font-size: 0.84rem;
  color: #a5aeb3;
}

.icons {
  margin-top: 1rem;
}

.numbers {
  position: relative;
  margin-left: -3rem;
}

.created {
  font-size: 0.8rem;
  color: #a5aeb3;
}

.avator {
  border-radius: 100px;
  width: 48px;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.dark{
  background-color: $colorDarkMedium !important;
}
</style>