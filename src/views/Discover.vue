<template>
  <div>
    <v-pagination
      dark
      v-model="page"
      @input="getPage"
      :length="totalPages"
      :total-visible="$vuetify.breakpoint.smAndDown?5:10"
      class="pagination"
    ></v-pagination>
    <div v-if="shows">
      <div v-for="(show, index) in pageShows" :key="index">{{show.title}}</div>
    </div>
  </div>
</template>

<script>
import helper from "@/helper";
export default {
  data() {
    return {
      shows: [],
      page: 1,
      totalPages: 1
    };
  },
  computed: {
    pageShows: function() {
      let res = this.shows.find(obj => obj.page == this.page);
      console.log(res);
      if (res) return res.results;
      return [];
    }
  },
  methods: {
    getPage: function(page) {
      var pageObj = null;
      if (!page) {
        page = 1;
      } else {
        this.page = page;
        pageObj = this.shows.find(obj => obj.page == this.page);
      }
      // fetch new page if not been fetched before
      if (!pageObj) {
        helper.tmdb.discover({ page: page }).then(res => {
          this.shows.push(res);
          this.totalPages = res.total_pages;
        });
      }
    }
  },
  created() {
    helper.tmdb.discover().then(res => {
      this.shows.push(res);
      this.totalPages = res.total_pages;
    });
  }
};
</script>

<style>
.pagination {
  width: 100%;
  justify-content: center;
}
</style>
