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
        v-if="isShowUtilities"
      >
        <v-list class="pa-0">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon class="fs-17">mdi-settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openNewArticleDialog">
            <v-list-item-icon>
              <v-icon class="fs-17">mdi-shape-square-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add new</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <div class="article-top" align="center" justify="center" color="indigo darken-3">
      <p class="article-top-title">#JAVASCRIPT</p>
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
      <v-row justify="center" align="center">
        <v-col cols="11" md="8" lg="6" xl="5">
          <template v-if="articleList.length > 0">
            <div class="article-one" v-for="article in articleList" :key="article._id">
              <v-row>
                <v-col cols="6" md="5" lg="4">
                  <v-img
                    :src="article.articleImg"
                  ></v-img>
                </v-col>
                <v-col cols="6" md="7" lg="8" class="d-flex flex-column">
                  <div class="article-one-top">
                    <span v-for="(tag, index) in article.tags.split(',')" :key="index">#{{tag}}</span>
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
        </v-col>
        <v-col cols="12" md="3" lg="2" xl="2">TO DO</v-col>
      </v-row>
    </div>
    <v-dialog v-model="newArticleDialog" max-width="70%">
      <article-create-dialog></article-create-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
import ArticleCreateDialogComponent from "../Article/ArticleCreateDialog";
import axios from "axios";

export default {
  components: {
    "article-create-dialog": ArticleCreateDialogComponent
  },
  data() {
    return {
      newArticleDialog: false,
      tags: [
        {
          icon: "mdi-angular",
          text: "Angular",
          linkTo: "/articles?type=angular",
          color: "red"
        },
        {
          icon: "mdi-react",
          text: "React",
          linkTo: "/articles?type=react",
          color: "blue"
        },
        {
          icon: "mdi-vuejs",
          text: "Vuejs",
          linkTo: "/articles?type=vuejs",
          color: "green"
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
        }
      ],
      articleList: []
    };
  },
  created() {
    axios.get(this.$store.state.dbUrl + "/article").then(res => {
      this.articleList = Object.values(res.data.data);
    });
  },
  computed: {
    isShowUtilities() {
      return (
        this.$vuetify.breakpoint.mdAndUp && this.$store.state.isLogin === true
      );
    }
  },
  methods: {
    openNewArticleDialog() {
      this.newArticleDialog = true;
    },
    closeNewArticleDialog() {
      this.newArticleDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.utilities {
  padding: 0 !important;
  border: 1px solid #d6d3d3 !important;
  border-right: none !important;
  border-radius: 0 !important;
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  -webkit-box-shadow: 4px 10px 20px -1px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 4px 10px 20px -1px rgba(0, 0, 0, 0.4);
  box-shadow: 4px 10px 20px -1px rgba(0, 0, 0, 0.4);
}

a {
  text-decoration: none;
  color: black !important;
}

.container {
  padding: 0;
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
    span{
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
