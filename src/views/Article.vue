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
    <v-dialog v-model="deleteConfirmDialog" max-width="500" ref="deleteDialog">
      <div class="confirm-dialog">
        <div class="icon-trash">
          <v-icon class="icon">mdi-trash-can-outline</v-icon>
        </div>
        <div class="d-flex align-center justify-center flex-column confirm-dialog__content">
          <p class="confirm-dialog__title mb-4">You are about to delete a article</p>
          <p class="confirm-dialog__title-2">This will delete your article from catalog</p>
          <p class="confirm-dialog__title-2">Are you sure?</p>
        </div>
        <div class="confirm-dialog__footer">
          <div>
            <v-btn color="green darken-1" text @click="deleteConfirmDialog = false">No</v-btn>
            <v-btn text @click="deleteArticle" class="button__hover">Yes</v-btn>
          </div>
        </div>
      </div>
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
  mounted(){
    
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

//Confirm dialog
.confirm-dialog {
  background-color: white;
  width: 100%;
  height: 250px;
  position: relative;
  .icon-trash{
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(- 50%, -50% );
    padding: 9px;
    border-radius: 50%;
    background-color: #F6F6F6;
    .icon{
      font-size: 70px;
      color: #FF313A;
    }
  }
  .confirm-dialog__content{
    padding-top: 60px;
    .confirm-dialog__title{
      font-size: 22px;
      font-weight: 600;
    }
    .confirm-dialog__title-2{
      font-size: 19px;
      font-weight: 500;
      color: gray;
    }
  }
  .confirm-dialog__footer{
    padding-bottom: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style> 