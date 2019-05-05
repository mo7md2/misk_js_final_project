<template>
  <!-- header -->
  <div class="flex infoBar">
    <!-- title -->
    <span class="show-title">{{title}}</span>
    <!-- date -->
    <v-chip
      class="flex"
      color="rgba(255,0,0,0.25)"
      text-color="white"
    >
      <div class="">
        <v-icon color="red">date_range</v-icon>
      </div>
      <div>{{release_date.slice(0,4)}}</div>
    </v-chip>
    <!-- rate -->
    <template v-if="vote_average">
      <v-chip
        class="flex flex-none w-auto justify-between"
        color="rgba(255,255,0,0.2)"
        text-color="white"
      >
        <div class="-ml-2">
          <v-icon color="yellow">star</v-icon>
        </div>
        <div>{{vote_average}}</div>
      </v-chip>
    </template>
    <!-- runtime -->
    <template v-if="runtime">
      <v-chip
        class="flex flex-none w-auto justify-between"
        color="rgba(0,255,0,0.2)"
        text-color="white"
      >
        <div class="-ml-2">
          <v-icon color="green">access_alarm</v-icon>
        </div>
        <div>{{runtime}}</div>
      </v-chip>
    </template>
    <!-- genres  -->
    <template v-for="(genre,index) in genres">
      <v-hover :key="index">
        <div slot-scope="{ hover }" class="genre">
          <v-chip
            class="cursor-pointer"
            label
            :outline="!hover"
          >{{genre.name}}</v-chip>
        </div>
      </v-hover>
    </template>

  </div>
</template>

<script>
export default {
    props:{
        title:String,
        release_date:String,
        vote_average:Number,
        runtime:Number,
        genres:Array,

    }
};
</script>

<style>
.genre{
  display: inline-flex;
}
.showPage .show-title{
  font-size: 2rem;
}
.showPage .infoBar{
  padding: .5rem 1rem;
}
</style>
