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
          <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">Item {{ i }}</v-tab>
        </v-tabs>
        <!--  -->
      </template>
    </v-toolbar>
    <!-- tabs content -->
    <div class="tab-body">

    <v-tabs-items v-model="model">
      <v-tab-item v-for="i in 3" :key="i" :value="`tab-${i}`">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>
    <!--  -->
  </v-app>
</template>


<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      model: "tab-2",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>
<style>
.tab-body{
  height: 100%;
  display: flex;
}
</style>

