<template>
  <v-container fluid>
    <v-card>
      <v-navigation-drawer
        expand-on-hover
        permanent
        fixed
        right
        class="position_top-50 utilities"
        mini-variant-width="auto"
        height="auto"
        floating
        color="#FAFAFA"
        width="auto"
      >
        <v-list class="pa-0">
          <v-list-item link @click="goBack">
            <v-list-item-icon>
              <v-icon class="fs-30">mdi-undo</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Go Back</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openNewArticleDialog" v-if="isShowUtilities">
            <v-list-item-icon>
              <v-icon class="fs-30">mdi-shape-square-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add new</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <div class="article-top" align="center" justify="center" color="indigo darken-3">
      <p class="article-top-title">#{{title.toUpperCase()}}</p>
      <p class="article-top-count">A collection of 1511 posts</p>
      <div class="article-top-tags">
        <v-chip
          v-for="(item, i) in tags"
          :key="i"
          class="ma-2 pa-2 chip"
          color="#3b3b4f"
          label
          text-color="white"
          :to="item.linkTo"
          exact
        >
          <v-icon class="mr-1" :color="item.color">{{item.icon}}</v-icon>
          {{item.text}}
        </v-chip>
      </div>
    </div>
    <div class="article-list">
      <v-row justify="center">
        <template v-if="loading">
          <div style="margin-top:200px">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </div>
        </template>
        <template v-if="articleList.length > 0 && !loading">
          <v-col cols="10" md="8" lg="6" xl="5" :class="{ 'order-1': $vuetify.breakpoint.smOnly || $vuetify.breakpoint.xsOnly }">
            <template v-if="articleListShow.length > 0">
              <div class="article-one" v-for="article in articleListShow.slice(( page * articleOnPage ) - articleOnPage, ( page * articleOnPage ))" :key="article._id">
                <v-row>
                  <v-col cols="6" md="5" lg="4">
                    <v-img :src="article.articleImg"></v-img>
                  </v-col>
                  <v-col cols="6" md="7" lg="8" class="d-flex flex-column">
                    <div class="article-one-top">
                      <span>#{{article.tags}}</span>
                    </div>
                    <div class="article-one-title">
                      <router-link :to="'/article?id=' + article._id">{{article.title}}</router-link>
                    </div>
                    <v-spacer />
                    <div class="article-one-footer d-flex align-center">
                      <v-img
                        max-width="40px"
                        max-height="40px"
                        src="https://www.freecodecamp.org/news/content/images/size/w100/2018/12/quincy-headshot-highres.png"
                      ></v-img>
                      <p class="article-one-author">
                        <router-link to>{{article.author.name}}</router-link>
                      </p>
                      <p class="article-one-date">{{ article.createDate | moment("from") }}</p>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </template>
            <template v-else>
              <h2 class="mt-10">Nothing...</h2>
            </template>
          </v-col>
          <v-col cols="8" md="3" lg="2" xl="2" :class="{ 'order-0': $vuetify.breakpoint.smOnly || $vuetify.breakpoint.xsOnly }">
            <div class="search-wrapper mt-10">
              <neumorphimsm-input @func="searchStringChange"></neumorphimsm-input>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <template>
              <div class="text-center pagination">
                <v-pagination
                  v-model="page"
                  :length="numberOfPage"
                  :total-visible="7"
                ></v-pagination>
              </div>
            </template>
          </v-col>
        </template>
        <template v-if="articleList.length === 0 && !loading">
          <h3 class="ma-10">There aren't articles that relate to this subject. You can share your knowledge about it by creating a new article at the utility bar on the right side of the screen</h3>
        </template>
      </v-row>
    </div>
    <v-dialog v-model="displayCreateArticleDialog" fullscreen>
      <app-article-create-dialog
        @closeDialog="closeNewArticleDialog"
        @addNewArticle="addNewArticle"
        ref="articleCreateDialog"
      ></app-article-create-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
import ArticleCreateDialogComponent from "../components/ArticleCreateDialog";
import NeumorphimsmInput from "../components/NeumorphimsmInput";
import axios from "axios";

export default {
  components: {
    "app-article-create-dialog": ArticleCreateDialogComponent,
    "neumorphimsm-input": NeumorphimsmInput
  },
  data() {
    return {
      title: "",
      page: 1,
      articleOnPage: 3,
      displayCreateArticleDialog: false,
      tags: [
        {
          icon: "mdi-vuejs",
          text: "Vuejs",
          linkTo: "/articles?type=vuejs",
          color: "green"
        },
        {
          icon: "mdi-draw",
          text: "Design",
          linkTo: "/articles?type=design",
          color: "blue"
        },
        {
          icon: "mdi-language-javascript",
          text: "Javascript",
          linkTo: "/articles?type=javascript",
          color: "yellow"
        },
        {
          icon: "mdi-language-css3",
          text: "Css",
          linkTo: "/articles?type=css",
          color: "blue"
        },
        {
          icon: "mdi-language-typescript",
          text: "Typescript",
          linkTo: "/articles?type=typescript",
          color: "blue"
        },
        {
          icon: "mdi-alpha-a-box",
          text: "Algorithms",
          linkTo: "/articles?type=algorithms",
          color: "yellow"
        }
      ],
      articleList: [],
      loading: false,
      searchString: ""
    };
  },
  watch: {
    $route: function(to) {
      this.title = to.query.type;
      this.getData(to.query.type || "");
    }
  },
  created() {
    this.title = this.$route.query.type;
    this.getData(this.$route.query.type || "");
  },
  computed: {
    isShowUtilities() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    articleListShow() {
      return this.searchString === "" ? 
        this.articleList :
        this.filterArticle();
    },
    numberOfPage(){
      return Math.ceil(this.articleListShow.length / this.articleOnPage);
    }
  },
  methods: {
    filterArticle() {
      return this.articleList.filter(x => x.title.toLowerCase().includes(this.searchString));
    },
    searchStringChange(searchString) {
      this.searchString = searchString;
    },
    goBack() {
      this.$router.go(-1);
    },
    getData( type ) {
      console.log('getData')
      this.loading = true;
      axios.get(this.$store.state.dbUrl + "/article?type=" + type).then(res => {
        this.articleList = Object.values(res.data.data);
        this.loading = false;
      });
    },
    openNewArticleDialog() {
      if (this.$store.state.isLogin === true){
        this.displayCreateArticleDialog = true;
      }
      else
        this.$emit("login");
    },
    closeNewArticleDialog() {
      this.displayCreateArticleDialog = false;
    },
    addNewArticle(data) {
      this.articleList.push({
        ...data,
        author: {
          avatar: this.$store.state.usData.usAva,
          _id: this.$store.state.usData.usId,
          name: this.$store.state.usData.usName
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black !important;
}

.container {
  position: relative;
  padding: 0;
  padding-bottom: 50px;
  background-color: #e6e6e6;
  min-height: 93vh;
  .pagination{
    position: absolute;
    padding: 20px 0;
    bottom: 0;
  }
}

.article-top {
  padding: 30px;
  background-color: #1b1b32;
  color: white;
  .article-top-title {
    font-size: 2.4rem;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .article-top-count {
    font-size: 1.4rem;
    font-weight: 300;
  }
  .chip {
    font-size: 17px;
    font-weight: 400;
  }
}

.article-one {
  .article-one-top {
    font-size: 12px;
    text-transform: uppercase;
    span {
      padding: 2px;
      margin-right: 5px;
    }
  }
  .article-one-title {
    margin-top: 5px;
    font-size: 25px;
    font-weight: 500;
    a {
      &:hover {
        text-decoration: underline;
        color: black;
      }
    }
  }
  .article-one-footer {
    margin-bottom: 5px;
    font-size: 13px;
    text-transform: uppercase;
    .article-one-author {
      margin: 0;
      margin-left: 10px;
    }
    .article-one-date {
      margin: 0;
      margin-left: 10px;
    }
  }
}

@media screen and (min-width: 1265px) and (max-width: 1904px) {
  .article-one {
    .article-one-top {
      font-size: 12px;
    }
    .article-one-title {
      font-size: 21px;
    }
    .article-one-footer {
      font-size: 13px;
    }
  }
}

@media screen and (min-width: 601px) and (max-width: 1264px) {
  .article-one {
    .article-one-top {
      font-size: 12px;
    }
    .article-one-title {
      font-size: 20px;
    }
    .article-one-footer {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 600px) {
  .article-one {
    .article-one-top {
      font-size: 10px;
    }
    .article-one-title {
      font-size: 17px;
    }
    .article-one-footer {
      font-size: 11px;
    }
  }
}
</style>
