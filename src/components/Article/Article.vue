<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="11" md="8" lg="6">
        <div class="article-top mt-10">
          <div class="article-top-date">6 december 2019</div>
          <div class="article-top-title mt-3">Web Development in 2020: What You Should Learn</div>
          <div class="article-top-author mt-10 d-flex">
            <v-img
              max-width="60px"
              max-height="60px"
              src="https://www.freecodecamp.org/news/content/images/size/w100/2018/12/quincy-headshot-highres.png"
            ></v-img>
            <div class="ml-3 d-flex flex-column">
              <router-link to class="author-name">Nghia.Lam</router-link>
              <div class="flex-grow-1"></div>
              <p class="ma-0 author-desc">A Deverloper at Global Cybersoft</p>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black !important;
}
.article-top {
  font-weight: 500;
  .article-top-date {
    text-transform: uppercase;
    text-decoration: underline;
    font-size: 14px;
  }
  .article-top-title {
    font-size: 35px;
  }
  .author-name{
    font-size: 18px;
  }
  .author-desc{
    font-size: 15px;
    font-weight: 400;
  }
}
</style>