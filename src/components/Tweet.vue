<template>
  <div>
    <div :id="identificador" class="card" :class="identificador">
      <div class="card-body">
        <div class="row">
          <div class="col-2 text-sm-start">
            <img class="avator" :src="props.tweet.img" />
          </div>
          <div class="col text-sm-start name-user">
            <h6 class="name">{{ props.tweet.name }}</h6>
            <p class="user">@{{ props.tweet.user }}</p>
          </div>
          <div class="col text-sm-end">
            <i class="fab fa-twitter"></i>
          </div>
        </div>
        <div class="card-text text-sm-start">{{ props.tweet.text }}</div>
        <div class="text-sm-start created">{{ props.tweet.created }}</div>
        <hr />
        <div class="row">
          <div class="col-md-3 offset-sm-1 text-sm-start">
            <div class="row">
              <div class="col">
                <i class="far fa-heart"></i>
              </div>
              <div class="col">
                <p>{{ props.tweet.likes }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 text-sm-start">
            <div class="row">
              <div class="col">
                <i class="far fa-comment-alt"></i>
              </div>
              <div class="col">
                <p>{{ props.tweet.retweets }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import gsap from "gsap";
import { useStore } from "vuex";

export interface TweetData {
  id: string;
  created: string;
  name: string;
  user: string;
  img: string;
  likes: string;
  retweets: string;
  text: string;
  sentiment: string;
  confidence: string;
}

export default defineComponent({
  props: {
    tweet: {
      type: Object as PropType<TweetData>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const url = ref<string>(
      "https://twitter.com/" + props.tweet.name + "/status/" + props.tweet.id
    );
    const texto = ref<string>(props.tweet.text);
    const identificador = ref<string>(props.tweet.id);
    const sentiment = ref<string>(props.tweet.sentiment);

    function removeElement(elementToDelete: any) {
      elementToDelete = document.getElementById(elementToDelete);
      return function () {
        debugger;
        elementToDelete.parentElement.parentElement.remove();
        store.commit("addTweet", props.tweet);
      };
    }

    function animationCard(el: any) {
      let positionX = 0;
      const positionY = 500;
      if (sentiment.value == "positive") {
        positionX = 500;
      } else if (sentiment.value == "negative") {
        positionX = -500;
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
        .call(removeElement(identificador.value));
    }

    onMounted(() => {
      const element = document.getElementById(identificador.value);
      animationCard(element);
    });

    console.log(props.tweet.img);

    return {
      props,
      url,
      texto,
      identificador,
      animationCard,
      removeElement,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Asap");
@import url("https://fonts.googleapis.com/css?family=Roboto");

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

.name {
  font-size: 0.88rem;
  font-weight: bold;
  margin-top: 0.4rem;
  margin-bottom: 0rem;
}

.user {
  font-size: 0.84rem;
  color: gray;
}

.created {
  font-size: 0.8rem;
  color: gray;
}

.avator {
  border-radius: 100px;
  width: 48px;
}
</style>