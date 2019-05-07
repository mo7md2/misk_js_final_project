<template>
  <v-app dark>
    <v-toolbar dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Movie Time</v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="!currentUser">
        <v-btn @click="signupDialog=true">Signup</v-btn>
        <v-btn @click="loginDialog=true">login</v-btn>
      </template>
      <v-btn v-else @click="onLogoutClick">Logout</v-btn>

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
          <discover
            :userShows="userShows"
            :currentUser="currentUser"
            @showClick="onShowClick"
          />
        </v-tab-item>
        <!-- show details page -->
        <v-tab-item lazy :key="1" class="show-tab" value="tab-show">
          <show :currentUser="currentUser" :userShows="userShows" :showId="showId"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <!--  -->
    <signup-form
      v-if="signupDialog"
      :openDialog="signupDialog"
      @update:dialogClose="signupDialog=false"
      @update:currentUser="onLogin"
    />
    <login-form
      v-if="loginDialog"
      :openDialog="loginDialog"
      @update:dialogClose="loginDialog=false"
      @update:currentUser="onLogin"
    />
  </v-app>
</template>


<script>
const fb = require("@/Firebase.js");

import Discover from "./views/Discover";
import Show from "./views/Show";
import keys from "./keys";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

export default {
  name: "App",
  components: {
    Discover,
    Show,
    SignupForm,
    LoginForm
  },
  data() {
    return {
      selectedTab: "tab-discover",
      showId: null,
      signupDialog: false,
      loginDialog: false,
      currentUser: null,
      userShows: []
    };
  },
  methods: {
    // add show to userShows if not added
    // addIfNotExists: function(dbShow) {
    //   let found = this.userShows.find(userShow => {
    //     return userShow.id == dbShow.id;
    //   });
    //   if (!found) {
    //     this.userShows.push(dbShow);
    //   }
    // },

    onShowClick: function(showId) {
      this.showId = showId;
      this.selectedTab = "tab-show";
    },
    onLogoutClick: function() {
      fb.auth.signOut().then(
        () => {
          this.currentUser = null;
        },
        function(error) {
          // An error happened.
        }
      );
    },
    onLogin: function(res) {
      this.setCurrentUser(res.user.uid);
    },
    setCurrentUser: function(uid) {
      fb.usersCollection.on(
        "value",
        snapshot => {
          let users = snapshot.val();
          if (users[uid]) {
            this.currentUser = {
              userName: users[uid].userName,
              userId: uid
            };
          } else {
            this.currentUser = null;
          }
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
    },

  },
  computed: {
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      this.this.setCurrentUser(user.uid);
})
    // get currentUser
    let uid = fb.auth.currentUser.uid;
    if (!uid) {
      this.currentUser = null;
    } else {
      this.setCurrentUser(uid);
    }
    // sync shows collection to userShows array
    fb.showsCollection.on("value", snapshot => {
      let dbShows = [];
      snapshot.forEach(show => {
        dbShows.push(show);
      });
      this.userShows = dbShows;
    });
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

