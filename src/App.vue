<template>
  <v-app dark>
    <v-toolbar dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Movie Tame</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <!-- tabs names -->
        <v-tabs v-model="model" color="transparent" centered  >
          <v-tab :key="0" href="#tab-discover">Discover</v-tab>
        </v-tabs>
        <!--  -->
      </template>
    </v-toolbar>
    <!-- tabs content -->
    <div class="tab-body">

    <v-tabs-items v-model="model">
      <v-tab-item  :key="0" class="discover-tab" value="tab-discover">
        <discover/>
      </v-tab-item>
    </v-tabs-items>
    </div>
    <!--  -->
  </v-app>
</template>


<script>
// import Discover from "./components/Discover";
import Discover from "./views/Discover";
import keys from "./keys";

export default {
  name: "App",
  components: {
    Discover
  },
  data() {
    return {
      model: "tab-2",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  created(){
    console.log(keys)
  }
};
</script>
<style>
.tab-body{
  height: 100%;
  display: flex;
  justify-content: center;
}
.v-window{
  width: 100%;
}
.discover-tab {
  color: white;
  width: 100%;
  padding: 0 2rem 2rem 2rem;
}
</style>

