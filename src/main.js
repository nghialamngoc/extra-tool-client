import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Router from 'vue-router';
import vueCookies from 'vue-cookies';
import routes from './routes';
import { store } from './assets/store/store';

require('./assets/scss/common.scss');
require('./assets/scss/main.scss');

Vue.use(Router);
Vue.use(vueCookies);

const router = new Router({ routes, mode: 'history' });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
