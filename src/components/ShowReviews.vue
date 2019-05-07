<template>
<div>

  <v-timeline dense align-top v-if="currentUser">
    <!-- new review -->
    <v-timeline-item v-if="!userReview" color="blue" fill-dot>
      <v-card color="blue">
        <v-card-title class="title">
          <v-icon>add_comment</v-icon>Add Review
        </v-card-title>
        <v-card-text class="white text--black">
          <v-textarea light solo name="input-7-4" label="Solo textarea" v-model="f_review"></v-textarea>
          <v-btn @click="onAddReviewClick" color="blue" class="mx-0" outline>Add</v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <!-- reviews -->
    <v-timeline-item v-for="(show, i) in showsWithReview " :key="i" color="grey darken-3" fill-dot>
      <review :showWithReview="show" :userId="currentUser.userId"/>
    </v-timeline-item>
  </v-timeline>
  
</div>
</template>

<script>
import Review from "@/components/Review";
const fb = require("@/Firebase.js");

export default {
  components: {
    Review
  },
  props: {
    userShows: Array,
    currentUser: Object,
    showId: Number
  },
  data: () => ({
    f_review: ""
  }),
  computed: {
    showsWithReview: function() {
      let reviews = [];
      this.userShows.forEach(show => {
        if (show.val().review && show.val().id == this.showId) {
          reviews.push(show);
        }
      });
      return reviews;
    },
    userShow: function() {
      if (!this.currentUser) return null;

      let userShow = this.userShows.find(show => {
        return (
          show.val().id == this.showId &&
          show.val().userId == this.currentUser.userId
        );
      });
      if (!userShow) return null;
      return userShow;
    },
    userReview: function() {
      if (!this.userShow) return null;
      return this.userShow.val().review;
    }
  },
  methods: {
    onAddReviewClick: function() {
      if (this.userShow) {
        this.userShow.getRef().update({
          review: this.f_review
        });
      } else {
        fb.db
          .ref("/shows/")
          .push({
            id: this.showId,
            review: this.f_review,
            userId: this.currentUser.userId
          })
          .then(() => {});
      }
    }
  }
};
</script>


<style>
.review-body {
  color: black;
}
</style>
