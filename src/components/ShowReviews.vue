<template>
  <v-timeline dense align-top>
    <!-- new review -->
    <v-timeline-item color="blue" fill-dot>
      <v-card color="blue">
        <v-card-title class="title">
          <v-icon>add_comment</v-icon>Add Review
        </v-card-title>
        <v-card-text class="white text--black">
          <v-textarea
            light
            solo
            name="input-7-4"
            label="Solo textarea"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
          <v-btn color="blue" class="mx-0" outline>Add</v-btn>
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <!-- reviews -->
    <v-timeline-item v-for="(item, i) in [1,2,34,2] " :key="i" color="grey darken-3" fill-dot>

    <review/>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import Review from '@/components/Review'
export default {
  components:{
    Review
  },
  data: () => ({})
};
</script>


<style>
.review-body {
  color: black;
}
</style>
