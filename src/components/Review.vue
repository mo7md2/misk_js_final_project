<template>
  <v-card>
    <v-card-title class="title">Review</v-card-title>
    <v-card-text class="white review-body">
      <!-- text of review -->
      <p >{{showWithReview.val().review}}</p>
      <!--  -->
      <template v-if="userId==showWithReview.val().userId">

        <v-btn @click="onDeleteClick" color="red" outline icon>
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    showWithReview: Object,
    userId: String
  },
  data() {
    return {
    };
  },
  methods: {
    onDeleteClick: function() {
      
      this.showWithReview.getRef().update({
        review: ""
      });
    }
  }
};
</script>

<style>
</style>
