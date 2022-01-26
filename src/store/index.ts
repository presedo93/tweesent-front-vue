import { createStore } from "vuex";

export interface TweetData {
  id: string;
  created_at: string;
  username: string;
  name: string;
  image: string;
  likes: string;
  retweets: string;
  text: string;
  sentiment: string;
}

export interface CommParams {
  live: boolean;
  // HTTP params
  num_tweets: number;
  retweets: boolean;
  replies: boolean;
  token?: string;
  // WebSockets params
  interval: number;
}

export default createStore({
  state: {
    theme: "dark",
    tweets: [] as TweetData[],
    params: { live: false, num_tweets: 10, retweets: false, replies: false, token: undefined, interval: 1 } as CommParams,
    showLoading: false
  },
  getters: {
    theme: state => state.theme,
    tweets: state => state.tweets,
    params: state => state.params,
    showLoading: state => state.showLoading
  },
  mutations: {
    changeTheme(state) {
      if (state.theme === "dark") {
        state.theme = "light";
      } else {
        state.theme = "dark";
      }
    },
    changeComm(state) {
      state.params.live = !state.params.live;
    },
    addTweet(state, newTweets: TweetData) {
      const a = newTweets as TweetData;
      state.tweets.push(a);
    },
    changeLoading(state) {
      state.showLoading = !state.showLoading;
    }
  },
  actions: {},
  modules: {}
});
