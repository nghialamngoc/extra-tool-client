<template>
  <v-container fluid>
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
        <v-list-item link @click="openDialog" v-if="isShowUtilities">
          <v-list-item-icon>
            <v-icon class="fs-30">mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openDeleteConfirm" v-if="isShowUtilities">
          <v-list-item-icon>
            <v-icon class="fs-30">mdi-delete-alert-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
            <div v-html="data.content"></div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteConfirmDialog" max-width="400">
      <v-card class="confirm-dialog">
        <div class="d-flex flex-no-wrap justify-space-between pt-7">
          <v-icon class="ml-3 mb-3" size="80" tile>mdi-delete-empty-outline</v-icon>
          <div class="pr-2">
            <v-card-title class="headline">Are you sure?</v-card-title>

            <v-card-subtitle>Do you realy want to delete this article.</v-card-subtitle>
          </div>
        </div>

        <v-card-actions class="mt-6">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteConfirmDialog = false">No</v-btn>
          <v-btn text @click="deleteArticle" class="button__hover">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editArticleDialog" fullscreen>
      <app-article-edit-dialog
        v-bind:articleData="data"
        @closeDialog="closeDialog"
        @update="update"
      ></app-article-edit-dialog>
    </v-dialog>
  </v-container>
</template>

<script>
import ArticleEditDialogComponent from "../components/ArticleEditDialog";
import axios from "axios";

export default {
  components: {
    "app-article-edit-dialog": ArticleEditDialogComponent
  },
  data() {
    return {
      deleteConfirmDialog: false,
      editArticleDialog: false,
      data: {},
      articleId: ""
    };
  },
  computed: {
    isShowUtilities() {
      return (
        this.$vuetify.breakpoint.mdAndUp &&
        this.$store.state.isLogin === true &&
        this.$store.state.usData.usRole == "Admin"
      );
    }
  },
  created() {
    this.articleId = this.$route.query.id;
    axios
      .get(
        this.$store.state.dbUrl + "/article/search?articleid=" + this.articleId
      )
      .then(res => {
        this.data = res.data.data;
      });
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    closeDialog() {
      this.editArticleDialog = false;
    },
    update(newData) {
      this.data = { ...newData };
    },
    openDialog() {
      this.editArticleDialog = true;
    },
    openDeleteConfirm() {
      this.deleteConfirmDialog = true;
    },
    deleteArticle() {
      axios
        .delete(
          this.$store.state.dbUrl + "/article?articleId=" + this.data._id,
          { withCredentials: true }
        )
        .then(() => {
          this.deleteConfirmDialog = false;
          this.$router.go(-1);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.button__hover {
  color: #fbc3c3;
  &:hover {
    color: red;
  }
}
a {
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
    h1 {
      font-size: 34px;
      font-weight: 500;
    }
  }
  .author-name {
    font-weight: 500;
    font-size: 16px;
  }
  .author-desc {
    font-size: 13px;
    font-weight: 400;
  }
}
</style>