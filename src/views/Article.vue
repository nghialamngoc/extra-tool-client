<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="11" md="8" lg="7">
        <div class="article-top mt-10" v-if="data._id">
          <div class="article-top-date">{{data.createDate | moment("MMMM Do YYYY")}}</div>
          <div class="article-top-title mt-3">
            <h1>{{data.title}}</h1>
          </div>
          <div class="article-top-author mt-10 d-flex">
            <v-img
              max-width="50px"
              max-height="50px"
              src="https://www.freecodecamp.org/news/content/images/size/w100/2018/12/quincy-headshot-highres.png"
            ></v-img>
            <div class="ml-3 d-flex flex-column">
              <router-link to class="author-name">{{data.author.name}}</router-link>
              <div class="flex-grow-1"></div>
              <p class="ma-0 author-desc">A Deverloper at Global Cybersoft</p>
            </div>
          </div>
          <div class="article__content mt-10">
            <div v-html="data.content">

            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      data: {},
      articleId: ''
    }
  },
  created(){
    this.articleId = this.$route.query.id
    axios.get(this.$store.state.dbUrl + '/article/search?articleid=' + this.articleId)
     .then(res => {
       this.data = res.data.data
     })
  }
};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black !important;
}
.article-top {
  .article-top-date {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 14px;
  }
  .article-top-title {
    h1{
      font-size: 34px;
      font-weight: 500;
    }
  }
  .author-name{
    font-weight: 500;
    font-size: 16px;
  }
  .author-desc{
    font-size: 13px;
    font-weight: 400;
  }
}
</style>