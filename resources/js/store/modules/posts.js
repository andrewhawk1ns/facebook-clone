const state = { posts: null, postsStatus: null, postMessage: "" };
const getters = {
    posts: state => {
        return state.posts;
    },
    newsStatus: state => {
        return {
            postsStatus: state.postsStatus
        };
    },
    postMessage: state => {
        return state.postMessage;
    }
};

/*
  axios
      .get("/api/posts")
      .then((res) => {
        this.posts = res.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log("Unable to fetch posts");
        this.loading = false;
      });
      */
const actions = {
    fetchNewsPosts({ commit, state }) {
        commit("setPostsStatus", "loading");

        axios
            .get("/api/posts")
            .then(res => {
                commit("setPosts", res.data);
                commit("setPostsStatus", "success");
            })
            .catch(error => {
                commit("setPostsStatus", "error");
            });
    },
    fetchUserPosts({ commit, dispatch }, userId) {
        commit("setPostsStatus", "loading");
        axios
            .get(`/api/users/${userId}/posts`)
            .then(res => {
                commit("setPosts", res.data);
                commit("setPostsStatus", "success");
            })
            .catch(error => {
                console.log("Unable to fetch posts from the server.");
                commit("setPostsStatus", "error");
            });
    },
    postMessage({ commit, state }) {
        commit("setPostsStatus", "loading");

        axios
            .post("/api/posts", { body: state.postMessage })
            .then(res => {
                commit("pushPost", res.data);
                commit("setPostsStatus", "success");
                commit("updateMessage", "");
            })
            .catch(error => {});
    },
    likePost({ commit, state }, data) {
        axios.post(`/api/posts/${data.postId}/like`).then(res => {
            commit("pushLikes", { likes: res.data, postKey: data.postKey });
        });
    },
    commentPost({ commit, state }, data) {
        axios
            .post(`/api/posts/${data.postId}/comment`, { body: data.body })
            .then(res => {
                commit("pushComments", {
                    comments: res.data,
                    postKey: data.postKey
                });
            });
    }
};
const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostsStatus(state, status) {
        state.postsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.posts.data.unshift(post);
    },
    pushLikes(state, data) {
        state.posts.data[data.postKey].data.attributes.likes = data.likes;
    },
    pushComments(state, data) {
        state.posts.data[data.postKey].data.attributes.comments = data.comments;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
