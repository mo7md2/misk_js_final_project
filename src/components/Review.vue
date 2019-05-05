<template>
  <v-card>
    <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
    <v-card-text class="white review-body">
      <!-- text of review -->
      <p
        v-if="!edit"
      >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
      <!-- edit of review -->
      <v-textarea
        v-else
        light
        solo
        name="input-7-4"
        label="Solo textarea"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
      <!--  -->
      <template>
        <v-btn :color="!edit?'black':'green'" @click="onEditClick" outline icon>
          <v-icon>{{!edit?'edit':'done'}}</v-icon>
        </v-btn>
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
    review: Object
  },
  data() {
    return {
      edit: false
    };
  },
  methods: {
    onEditClick: function() {},
    onDeleteClick: function() {}
  }
};
</script>

<style>
</style>
