<template>
  <v-layout mt-2 mx-3 row wrap class="info-section">
    <!-- poster section -->
    <v-flex xs12 sm4 md3 class="flex-col">
      <v-img
        class="round z-depth-3"
        :src="'https://image.tmdb.org/t/p/w500'+mainShow.poster_path"
        :lazy-src="'https://image.tmdb.org/t/p/w92'+mainShow.poster_path"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
<!-- info under poster -->
    </v-flex>
    <!-- info body -->
    <v-flex xs12 sm8 md9 class="px-2 flex-col">
      <v-img
        class="showBackdrop"
        ref="showBackdrop"
        :src="'https://image.tmdb.org/t/p/w1280'+mainShow.backdrop_path"
        :lazy-src="'https://image.tmdb.org/t/p/w300'+mainShow.backdrop_path"
      >
      <div
      v-if="mainShow.overview"
      class="round transparent-background overview"
    >
      <div class="vertical-divider-title-ltr text-start text-3xl">overview:</div>
      <div class="text-start text-xl">{{mainShow.overview}}</div>
    </div>
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
      <div class="flex flex-col w-full md:mx-3 mt-2 bg-black">
        <!-- <show-info-tabs :show="mainShow" :seasons="seasons"/> -->
        <!--  -->
      </div>
    </v-flex>

  </v-layout>
</template>

<script>


// import ShowInfoTabs from "@/components/ShowInfoTabs.vue";

export default {
  components: {
    //   ShowInfoTabs,
  },
  props: {
    mainShow: Object
  },
  methods: {
    currencyFormatter: function(num) {
      if (!num) {
        return null;
      }
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      });
      return formatter.format(num);
    }
  },
  computed: {}
};
</script>

<style>
.showPage .overview{
    /* flex flex-col flex-none align-start m-2 p-4 w-full */
    display: flex;
    position: absolute;
    bottom: 0;
    flex-direction: column;
    width:80%;
    font-size: 1.5rem;
    margin-left: 4rem; 
    background: rgba(0, 0, 0, 0.5);
    padding:1rem;
}
</style>
