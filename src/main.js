import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

const fb = require('./Firebase.js')

Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',

            render: h => h(App)
        })
    }
})


