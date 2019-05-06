<template>
  <div>
    <div v-if="!loading">
      <shows :userShows="userShows"  :currentUser="currentUser" @showClick="$emit('showClick', $event)" :shows="pageShows"/>
      <v-pagination
        dark
        v-model="page"
        @input="getPage"
        :length="totalPages"
        :total-visible="$vuetify.breakpoint.smAndDown?5:10"
        class="pagination"
      ></v-pagination>
    </div>
    <div v-else>
      <v-card dark>
        <v-card-text>
          <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>


<script>
import helper from "@/helper";
import Shows from "@/components/Shows.vue";

export default {
  components: {
    Shows,
  },
  props:{
    currentUser:Object,
userShows:Array,
  },
  data() {
    return {
      shows: [],
      page: 1,
      totalPages: 1,
      loading: true
    };
  },
  computed: {
    pageShows: function() {
      let res = this.shows.find(obj => obj.page == this.page);
      if (res) return res.results;
      return [];
    }
  },
  methods: {
    getPage: function(page) {
      this.loading = true;
      var pageObj = null;
      if (!page) {
        page = 1;
      } else {
        this.page = page;
        pageObj = this.shows.find(obj => obj.page == this.page);
      }
      // fetch new page if not been fetched before
      if (!pageObj) {
        helper.tmdb
          .discover({ page: page })
          .then(res => {
            this.shows.push(res);
            console.log(res);
            this.totalPages = res.total_pages;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    }
  },
  created() {
    this.getPage();
  }
};
</script>

<style>
.pagination {
  width: 100%;
  justify-content: center;
}
</style>
