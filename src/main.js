import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Router from 'vue-router';
import vueCookies from 'vue-cookies';
import routes from './routes';
import { store } from './assets/store/store';
import VueQuillEditor from 'vue-quill-editor'

require('./assets/scss/common.scss');
require('./assets/scss/main.scss');

Vue.use(Router);
Vue.use(vueCookies);
Vue.use(VueQuillEditor)
Vue.use(require('vue-moment'));

const router = new Router({ routes, mode: 'history' });

Vue.config.productionTip = false;
console.log(process.env.NODE_ENV)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
