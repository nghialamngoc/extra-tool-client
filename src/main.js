import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/index'
import router from './router/index'

require('./assets/scss/common.scss');
//require('./assets/scss/main.scss');

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('froala-editor/css/froala_style.min.css')
require('froala-editor/js/plugins/link.min.js')
require('froala-editor/js/plugins/image.min.js')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
