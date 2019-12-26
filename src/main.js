import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/index'
import router from './router/index'
import VueQuillEditor from 'vue-quill-editor'

require('./assets/scss/common.scss');
require('./assets/scss/main.scss');

Vue.use(VueQuillEditor)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
