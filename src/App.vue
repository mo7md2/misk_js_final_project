<template>
  <v-app dark>
    <v-toolbar dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Movie Time</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="signupDialog=true">Signup</v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <!-- tabs names -->
        <v-tabs v-model="selectedTab" color="transparent" centered>
          <v-tab :key="0" href="#tab-discover">Discover</v-tab>
          <v-tab :key="1" href="#tab-show">Show details</v-tab>
        </v-tabs>
        <!--  -->
      </template>
    </v-toolbar>
    <!-- tabs content -->
    <div class="tab-body">
      <v-tabs-items v-model="selectedTab">
        <!-- discover page -->
        <v-tab-item :key="0" class="discover-tab" value="tab-discover">
          <discover @showClick="onShowClick"/>
        </v-tab-item>
        <!-- show details page -->
        <v-tab-item lazy :key="1" class="show-tab" value="tab-show">
          <show :showId="showId"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <!--  -->
    <signup-form
      v-if="signupDialog"
      :openDialog="signupDialog"
      @update:signupDialogClose="signupDialog=false"
    />
  </v-app>
</template>


<script>
const fb = require("@/Firebase.js");

import Discover from "./views/Discover";
import Show from "./views/Show";
import keys from "./keys";
import SignupForm from "./components/SignupForm";

export default {
  name: "App",
  components: {
    Discover,
    Show,
    SignupForm
  },
  data() {
    return {
      selectedTab: "tab-discover",
      showId: null,
      signupDialog: false,
      currentUser: null
    };
  },
  methods: {
    onShowClick: function(showId) {
      this.showId = showId;
      this.selectedTab = "tab-show";
    }
  },
  computed: {
    // user:fb.auth.currentUser,
  },
  created() {
    
    let uid =  fb.auth.currentUser.uid;
    // this.currentUser = fb.usersCollection.doc();
    // console.log(this.currentUser)
  }
};
</script>
<style>
.tab-body {
  height: 100%;
  display: flex;
  justify-content: center;
}
.v-window {
  width: 100%;
}
.discover-tab {
  color: white;
  width: 100%;
  padding: 0 2rem 2rem 2rem;
}
</style>

