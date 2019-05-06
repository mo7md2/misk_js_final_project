<template>
  <posters-grid v-if="shows.length" :postersList="shows">
    <template slot-scope="{ item , index }">
      <poster-box :key="'box'+index" class="px-4">
          <!-- @click.native="$emit('showClick',item.id)"  -->
        <poster
        @click.native="$emit('showClick', item.id)"
          :currentUser="currentUser"
          :userShows="userShows"
          :id="item.id"
          :name="item.title"
          :rate="item.vote_average"
          :vote="item.vote_count"
          :tags="item.tags"
          :date="formateDate(item.release_date)"
          :path="'https://image.tmdb.org/t/p/w500'+item.poster_path"
          :lazyPath="'https://image.tmdb.org/t/p/w92'+item.poster_path"
        ></poster>
      </poster-box>
    </template>
  </posters-grid>
</template>

<script>
import PostersGrid from "@/components/PostersGrid.vue";
import PosterBox from "@/components/PosterBox.vue";
import Poster from "@/components/Poster.vue";

export default {
  props: {
    shows: Array,
    currentUser:Object,
    userShows:Array,
  },
  components: {
    PostersGrid,
    PosterBox,
    Poster
  },
  methods: {

    formateDate: function(date) {
      try {
        return date.slice(0, 4);
      } catch (error) {
        return null;
      }
    }
  },
  computed: {}
};
</script>

<style>
</style>
