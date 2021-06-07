import { createStore } from "vuex";

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

export default createStore({
  state: {
    theme: "dark",
    tweets: [] as TweetData[]
  },
  getters:{
    theme: state => state.theme,
    tweets: state => state.tweets
  },
  mutations: {
    changeTheme(state){
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    addTweet(state, newTweets : TweetData){
      const a = newTweets as TweetData;
      state.tweets.push(a);
    }
  },
  actions: {},
  modules: {}
});
