<template>
  <div>
    <div v-if="!showId">
      <v-alert :value="true" type="error">Click on show from Discover tab to view its details</v-alert>
    </div>
    <div v-else class="showPage">
      <v-container class="bg-black" fluid v-if="!loading">
        <!-- backdrop -->
        <v-layout row>
          <div class="flex flex-row w-full h-auto z-10 flex-wrap">
            <show-page-info-bar
              :title="mainShow.title"
              :release_date="mainShow.release_date"
              :vote_average="mainShow.vote_average"
              :runtime="mainShow.runtime"
              :genres="mainShow.genres"
            />
            <show-page-main-info :mainShow="mainShow"/>
            <v-flex xs12 px-3>
              <show-reviews/>>
            </v-flex>

            <!-- </div> -->
          </div>
        </v-layout>
      </v-container>
      <!-- after backdrop -->
      <div v-else>
        <v-card dark>
          <v-card-text>
            <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Poster from "@/components/Poster.vue";
import ShowPageInfoBar from "@/components/ShowPageInfoBar.vue";
import ShowPageMainInfo from "@/components/ShowPageMainInfo.vue";
import ShowReviews from "@/components/ShowReviews.vue";
import helper from "@/helper";

export default {
  components: {
    Poster,
    ShowReviews,
    ShowPageInfoBar,
    ShowPageMainInfo
  },
  props: {
    showId: Number
  },
  data() {
    return {
      loading: true,
      mainShow: {}
    };
  },

  methods: {
    fetchShow: function(showId) {
      this.loading = true;
      helper.tmdb
        .getShow(showId)
        .then(res => {
          this.mainShow = res;
          console.log(res);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.fetchShow(this.showId);
  },
  watch: {
    showId: function(newVal) {
      this.fetchShow(newVal);
    }
  }
};
</script>

<style >
.showPage .infoBar {
  background: rgba(0, 0, 0, 0.4);
}
.showPage .gradientOverBackdrop:before {
  height: 100%;
  width: 100%;
  content: "";
  position: absolute;
  left: 20%;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 0.5) 65%,
    rgba(0, 0, 0, 1) 100%
  );
}
.showPage .info-section .header .poster {
  width: 200px;
  max-width: 50%;
}
.showPage .info-section .header .poster img {
  height: 100%;
  width: 100%;
}
.showPage .container.fluid {
  margin: 0 !important;
  padding: 0 !important;
}
.showPage .linkItem {
  background: rgba(0, 0, 0, 0.3);
}
.showPage .keyword-chip {
  max-height: 40px !important;
  height: auto !important;
  min-width: 30%;
  max-width: 40%;
}
.showPage .keyword-chip span {
  height: auto !important;
  white-space: normal;
}
</style>
