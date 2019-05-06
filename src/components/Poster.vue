<template>
  <div
    class="poster flex hoverGrow"
    :class="{'hoverGrowActive':activePoster,'displayInfo':$vuetify.breakpoint.smAndDown}"
  >
    <v-img
      v-on:mousedown="onMousedown"
      v-on:mouseup="onMouseup"
      :imgId="id"
      class="posterImg round elevation-24 z-depth-3 hoverable"
      :src="path"
      :lazy-src="lazyPath"
      ref="img"
    >
      <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </template>
    </v-img>
    <!-- bottom bar -->
    <!-- info -->
    <div class="info-gradient-background poster-info-box">
      <template>
        <template>
          <div class="dark-transparent">{{name}}</div>
        </template>
        <div class="flex">
          <template v-if="date">
            <div class>
              <v-icon small color="red">date_range</v-icon>
              {{date}}
            </div>
          </template>

          <template v-if="rate">
            <div>
              <v-icon small color="yellow">star</v-icon>
              {{rate}}
            </div>
          </template>
        </div>
      </template>
    </div>

    <!-- top bar -->
    <div class="poster-top-bar">
      <v-btn
        v-if="!!currentUser"
        @click.stop="onFavClick"
        small
        fab
        icon
        class="m-0 p-0"
        color="white"
      >
        <v-icon :color="isFavorite?'red':'black'">{{isFavorite?'favorite':'favorite_border'}}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
const fb = require("@/Firebase.js");

export default {
  components: {},
  props: {
    id: Number,
    path: String,
    lazyPath: String,
    name: String,
    rate: Number,
    vote: Number,
    date: String,
    currentUser: Object,
    userShows: Array
  },
  data() {
    return {
      activePoster: false
    };
  },
  computed: {
    userShow: function() {

      let userShow = this.userShows.find(show => {
        return (show.val().id == this.id && show.val().userId==this.currentUser.userId);
      });
      if (!userShow) return null;
      return userShow;
    },
    isFavorite: function() {
      if (!this.userShow) return false;
      console.log(this.userShow.val())
      return this.userShow.val().favorite;
    }
  },
  methods: {
    onFavClick: function() {
      if (this.userShow) {
        this.userShow.getRef().update({
          favorite: !this.isFavorite
        });
      } else {
        fb.db
          .ref("/shows/")
          .push({ id: this.id, favorite: true ,userId:this.currentUser.userId})
          .then(() => {
          });
      }
    },
    onMousedown: function(e) {
      this.activePoster = true;
    },
    onMouseup: function(e) {
      this.activePoster = false;
    }
  }
};
</script>

<style >
.m-0 {
  margin: 0 !important;
}
.round {
  border-radius: 6px !important ;
}
.poster-top-bar {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  cursor: pointer;
}
.poster.displayInfo .poster-info-box,
.poster.displayInfo .posterHeader {
  opacity: 1;
}
.poster:hover .poster-info-box,
.poster:hover .posterHeader {
  opacity: 1;
}
.posterImg {
  height: 100%;
  width: 100%;
}
.hoverGrow {
  transform: scale(1);
  transform-origin: 50% 70%;
  transition: transform 0.25s cubic-bezier(0.04, 0.69, 0.4, 1);
}
.hoverGrow:hover {
  transform: scale(1.05);
}
.hoverGrow.active {
  -webkit-box-shadow: 0px 4px 30px 5px rgba(43, 187, 173, 0.55);
  -moz-box-shadow: 0px 4px 30px 5px rgba(43, 187, 173, 0.55);
  box-shadow: 0px 4px 30px 5px rgba(43, 187, 173, 0.55);
  transform: scale(1.05);
}
.hoverGrowActive:active {
  transform: scale(1);
}
.poster-info-box {
  padding: 0.5rem 1rem;
  position: absolute;
  bottom: 0;
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  border-radius: 0 0 6px 6px !important ;

  opacity: 0;
  transition: visibility 0s, opacity 0.25s linear;
}
.info-gradient-background {
  border-radius: 0 0 6px 6px !important ;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) -5%,
    rgba(0, 0, 0, 0.75) 90%
  );
}
.posterHeader {
  width: 100%;
  visibility: visible;
  opacity: 0;
  transition: visibility 0s, opacity 0.25s linear;
}
.posterHeader.visible {
  opacity: 1;
}

.v-speed-dial__list {
  display: flex !important;
  flex-direction: row-reverse !important;
}
.dot {
  height: 5px;
  width: 5px;
  background-color: #4db6ac;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 5px;
}
.poster .v-chip {
  margin: 1px 0 1px 0 !important;
  padding: 0 !important;
}
.dark-transparent {
  background: rgba(0, 0, 0, 0.2);
}
.light-transparent {
  background: rgba(255, 255, 255, 0.2);
}
.posterChip span {
  background: rgba(0, 0, 0, 0.3) !important;
}
.cursor-pointer .v-chip__content {
  cursor: pointer !important;
}
</style>
