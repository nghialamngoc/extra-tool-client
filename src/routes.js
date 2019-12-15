//import components
import HomeComponent from './components/Home/Home.vue';
import PageNotFound from './components/ErrorPage/PageNotFound.vue';
import ArticlesComponent from './components/Articles/Articles.vue';
import ErrorPageComponent from './components/ErrorPage/PageError.vue';
import ArticleComponent from './components/Article/Article.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomeComponent },
  { path: '/articles', name: 'Articles', component: ArticlesComponent },
  { path: '/article', name: 'Article', component: ArticleComponent },
  { path: '/error', name: 'ErrorPage', component: ErrorPageComponent },
  { path: '*', name: 'PageNotFound', component: PageNotFound },
];

export default routes;
