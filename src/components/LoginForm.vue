<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="f_email" label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="f_password" label="Password*" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" :loading="loading" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
const fb = require("@/Firebase.js");

export default {
  props: {
    openDialog: Boolean
  },
  data: () => ({
    f_email: "",
    f_password: "",
    loading: false
  }),
  methods: {
    login() {
      this.loading = true;
      fb.auth
        .signInWithEmailAndPassword(this.f_email, this.f_password)
        .then(res => {
          this.loading = false;

          this.$emit("update:dialogClose", false);
          this.$emit("update:currentUser", res);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    dialog: {
      get: function() {
        return this.openDialog;
      },
      set: function(newValue) {
        if (newValue == false) {
          this.$emit("update:dialogClose", false);
        }
      }
    }
  }
};
</script>